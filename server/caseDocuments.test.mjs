import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { mkdir, mkdtemp, writeFile, rm, utimes } from "node:fs/promises";
import path from "node:path";
import {
  createCaseDocumentsMiddleware,
  documentFiles,
} from "./caseDocuments.mjs";

async function fixture(run, enabled = true) {
  const base = path.resolve(".local-documents", "test-fixtures");
  await mkdir(base, { recursive: true });
  const root = await mkdtemp(path.join(base, "case-"));
  const sourceDir = path.join(root, "sources");
  const pdfDir = path.join(root, "pdfs");
  await mkdir(sourceDir);
  await mkdir(pdfDir);
  // Explicit test fixtures; never used by the UI or presented as real sources.
  await writeFile(
    path.join(sourceDir, documentFiles["T-01"]),
    "DOCX fixture only",
  );
  await writeFile(path.join(pdfDir, "t-01.pdf"), "%PDF-1.4\nPDF fixture only");
  const middleware = createCaseDocumentsMiddleware({
    enabled,
    sourceDir,
    pdfDir,
  });
  const server = http.createServer((req, res) =>
    middleware(req, res, () => {
      res.statusCode = 404;
      res.end("not found");
    }),
  );
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  try {
    await run(baseUrl, { sourceDir, pdfDir });
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
    await rm(root, { recursive: true, force: true });
  }
}

test("closed by default, including direct Vite private-directory paths", async () => {
  await fixture(async (url) => {
    const manifest = await (await fetch(`${url}/__local-case/manifest`)).json();
    assert.equal(manifest.enabled, false);
    assert.ok(manifest.documents.every((d) => !d.original && !d.pdf));
    for (const route of [
      "/__local-case/documents/T-01/pdf",
      "/.local-documents/t-01.pdf",
      "/@fs/C:/repo/.local-documents/t-01.pdf",
    ]) {
      assert.equal((await fetch(url + route)).status, 403);
    }
  }, false);
});

test("opt-in returns only allowlisted files with no-store and correct content types", async () => {
  await fixture(async (url) => {
    const manifest = await (await fetch(`${url}/__local-case/manifest`)).json();
    assert.equal(manifest.documents.filter((d) => d.original).length, 1);
    assert.equal(manifest.documents[0].pdf, true);
    const pdf = await fetch(`${url}/__local-case/documents/T-01/pdf`);
    assert.equal(pdf.status, 200);
    assert.equal(pdf.headers.get("content-type"), "application/pdf");
    assert.equal(pdf.headers.get("cache-control"), "no-store");
    assert.ok((await pdf.text()).startsWith("%PDF-"));
    const original = await fetch(
      `${url}/__local-case/documents/T-01/original`,
      { method: "HEAD" },
    );
    assert.equal(original.status, 200);
    assert.ok(
      original.headers.get("content-disposition").startsWith("attachment;"),
    );
    for (const route of [
      "T-10/pdf",
      "T-99/original",
      "T-01/secret",
      "TPL%2001%20actualizado.docx/pdf",
    ]) {
      assert.equal(
        (await fetch(`${url}/__local-case/documents/${route}`)).status,
        404,
      );
    }
  });
});

test("cross-origin, forged hosts, and mutation methods are denied", async () => {
  await fixture(async (url) => {
    assert.equal(
      (
        await fetch(`${url}/__local-case/manifest`, {
          headers: { Origin: "https://example.com" },
        })
      ).status,
      403,
    );
    const forgedHostStatus = await new Promise((resolve, reject) => {
      http
        .get(
          `${url}/__local-case/manifest`,
          { headers: { Host: "example.com" } },
          (response) => {
            response.resume();
            resolve(response.statusCode);
          },
        )
        .on("error", reject);
    });
    assert.equal(forgedHostStatus, 403);
    assert.equal(
      (
        await fetch(`${url}/__local-case/manifest`, {
          headers: { "Sec-Fetch-Site": "cross-site" },
        })
      ).status,
      403,
    );
    assert.equal(
      (
        await fetch(`${url}/__local-case/documents/T-01/original`, {
          method: "POST",
        })
      ).status,
      405,
    );
  });
});

test("stale converted PDFs cannot masquerade as current source documents", async () => {
  await fixture(async (url, { pdfDir }) => {
    await utimes(path.join(pdfDir, "t-01.pdf"), new Date(0), new Date(0));
    const manifest = await (await fetch(`${url}/__local-case/manifest`)).json();
    assert.equal(manifest.documents[0].pdf, false);
    assert.equal(
      (await fetch(`${url}/__local-case/documents/T-01/pdf`)).status,
      409,
    );
  });
});
