import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";

export const documentFiles = Object.freeze({
  "T-01": "TPL 01 actualizado.docx",
  "T-02": "TPL 02 actualizado.docx",
  "T-03": "TPL 03 actualizado.docx",
  "T-04": "TPL 04 actualizado.docx",
  "T-05": "TPL 05 actualizado.docx",
  "T-06": "TPL 06 actualizado.xlsx",
  "T-07": "TPL 07 actualizado.docx",
  "T-08": "TPL 08 v1.docx",
  "T-09": "TPL 09.docx",
});

function sendJson(response, status, value) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(JSON.stringify(value));
}

function isLocalRequest(request) {
  const remote = request.socket.remoteAddress;
  if (!["127.0.0.1", "::1", "::ffff:127.0.0.1"].includes(remote)) return false;
  try {
    const host = new URL(`http://${request.headers.host}`);
    if (!["127.0.0.1", "localhost", "[::1]"].includes(host.hostname))
      return false;
    if (
      request.headers.origin &&
      new URL(request.headers.origin).host !== host.host
    )
      return false;
    return request.headers["sec-fetch-site"] !== "cross-site";
  } catch {
    return false;
  }
}

export function createCaseDocumentsMiddleware({
  enabled = false,
  sourceDir,
  pdfDir,
}) {
  return (request, response, next) => {
    let pathname;
    try {
      pathname = decodeURIComponent(
        new URL(request.url, "http://localhost").pathname,
      );
    } catch {
      return sendJson(response, 400, { error: "Ruta inválida." });
    }
    // Vite serves project files during development. Never expose the private
    // conversion directory through that static-file route or /@fs/ aliases.
    if (pathname.toLowerCase().includes(".local-documents"))
      return sendJson(response, 403, { error: "Directorio privado." });
    if (!pathname.startsWith("/__local-case/")) return next();
    if (!isLocalRequest(request))
      return sendJson(response, 403, {
        error: "Acceso solo desde este equipo.",
      });
    if (!["GET", "HEAD"].includes(request.method)) {
      response.setHeader("Allow", "GET, HEAD");
      return sendJson(response, 405, { error: "Método no permitido." });
    }
    if (pathname === "/__local-case/manifest") {
      const entries = Object.entries(documentFiles).map(([id, filename]) => {
        const original = enabled && existsSync(path.join(sourceDir, filename));
        const pdf = path.join(pdfDir, `${id.toLowerCase()}.pdf`);
        const hasPdf = Boolean(
          original &&
          existsSync(pdf) &&
          statSync(pdf).mtimeMs >=
            statSync(path.join(sourceDir, filename)).mtimeMs,
        );
        return {
          id,
          original: Boolean(original),
          pdf: hasPdf,
          format: filename.endsWith(".xlsx") ? "XLSX" : "DOCX",
        };
      });
      return sendJson(response, 200, {
        enabled,
        mode: enabled ? "local" : "restricted",
        documents: entries,
      });
    }
    if (!enabled)
      return sendJson(response, 403, {
        error:
          "Los originales requieren acceso privado. El modo local no está habilitado.",
      });
    const match = pathname.match(
      /^\/__local-case\/documents\/(T-\d{2})\/(pdf|original)$/,
    );
    if (!match || !Object.hasOwn(documentFiles, match[1]))
      return sendJson(response, 404, { error: "Documento no encontrado." });
    const [, id, kind] = match;
    const source = path.join(sourceDir, documentFiles[id]);
    const file =
      kind === "pdf" ? path.join(pdfDir, `${id.toLowerCase()}.pdf`) : source;
    if (!existsSync(source) || !existsSync(file))
      return sendJson(response, 404, { error: "Documento no disponible." });
    if (kind === "pdf" && statSync(file).mtimeMs < statSync(source).mtimeMs)
      return sendJson(response, 409, {
        error: "El PDF debe regenerarse desde la fuente actual.",
      });
    const isPdf = kind === "pdf";
    const name = isPdf ? `${id}-lectura.pdf` : documentFiles[id];
    const contentType = isPdf
      ? "application/pdf"
      : file.endsWith(".xlsx")
        ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    response.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": statSync(file).size,
      "Content-Disposition": `${isPdf ? "inline" : "attachment"}; filename*=UTF-8''${encodeURIComponent(name)}`,
      "Cache-Control": "no-store",
      "Accept-Ranges": "none",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "frame-ancestors 'self'",
      "Cross-Origin-Resource-Policy": "same-origin",
    });
    if (request.method === "HEAD") return response.end();
    const stream = createReadStream(file);
    stream.on("error", () => response.destroy());
    response.on("close", () => stream.destroy());
    stream.pipe(response);
  };
}

export function caseDocumentsPlugin() {
  const root = process.cwd();
  const folders = {
    sourceDir: path.resolve(
      root,
      "..",
      "..",
      "Contexto",
      "Templates Resueltos",
    ),
    pdfDir: path.resolve(root, ".local-documents"),
  };
  return {
    name: "mallow-private-local-documents",
    configureServer(server) {
      server.middlewares.use(
        createCaseDocumentsMiddleware({
          ...folders,
          enabled: process.env.MALLOW_LOCAL_DOCUMENTS === "1",
        }),
      );
    },
    configurePreviewServer(server) {
      // A production preview never inherits the local-document opt-in.
      server.middlewares.use(
        createCaseDocumentsMiddleware({ ...folders, enabled: false }),
      );
    },
  };
}
