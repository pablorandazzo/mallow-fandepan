import { test, expect } from "@playwright/test";
import { CASE_ACCESS_STORAGE_KEY } from "../src/caseAccess.js";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(key => sessionStorage.setItem(key, 'granted'), CASE_ACCESS_STORAGE_KEY);
});

test("el sitio incluye nueve originales y ocho PDFs reales", async ({
  request,
}) => {
  const manifest = await (await request.get("/case-documents/manifest.json")).json();
  expect(manifest.enabled).toBe(true);
  expect(
    manifest.documents.filter((document) => document.original),
  ).toHaveLength(9);
  expect(manifest.documents.filter((document) => document.pdf)).toHaveLength(8);
  for (const document of manifest.documents) {
    const original = await request.head(
      `/case-documents/${document.id.toLowerCase()}.${document.format.toLowerCase()}`,
    );
    expect(original.status()).toBe(200);
    expect(Number(original.headers()["content-length"])).toBeGreaterThan(0);
    if (document.pdf) {
      const pdf = await request.head(
        `/case-documents/${document.id.toLowerCase()}.pdf`,
      );
      expect(pdf.headers()["content-type"]).toBe("application/pdf");
    }
  }
  expect(manifest.documents.some(document => document.id === 'T-10')).toBe(false);
  expect((await request.get("/.local-documents/t-01.pdf")).status()).toBe(403);
});

test("el PDF se carga solo al elegir documento, y permite abrir o descargar la fuente", async ({
  page,
  request,
}) => {
  const manifest = await (await request.get("/case-documents/manifest.json")).json();
  expect(manifest.documents.find(document => document.id === 'T-01')?.pdf).toBe(true);
  const pdfRequests = [];
  page.on("request", (request) => {
    if (request.url().includes("/case-documents/t-01.pdf")) pdfRequests.push(request.method());
  });
  await page.goto("/caso-fan-de-pan?entrega=t-01");
  await expect(page.locator(".case-access-banner")).toContainText(
    "Acceso al caso habilitado",
  );
  await expect(page.locator("iframe")).toHaveCount(0);
  expect(pdfRequests).toHaveLength(0);
  const response = page.waitForResponse(
    (response) =>
      response.url().includes("/case-documents/t-01.pdf") &&
      response.request().method() === "GET",
  );
  await page.getByRole("tab", { name: "Documento original" }).click();
  await expect(page.getByTitle(/PDF de lectura T-01/)).toBeVisible();
  const pdf = await response;
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toBe("application/pdf");
  // Edge wraps a PDF navigation in its native <embed> viewer. Verify the
  // actual bytes with an independent same-origin HTTP read, not that wrapper.
  const sourcePdf = await request.get("/case-documents/t-01.pdf");
  expect((await sourcePdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await expect(page.getByRole("link", { name: "Abrir PDF" })).toHaveAttribute(
    "target",
    "_blank",
  );
  const download = page.waitForEvent("download");
  await page.getByRole("link", { name: "Descargar DOCX" }).click();
  expect((await download).suggestedFilename()).toBe("TPL 01 actualizado.docx");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "test-results/case-pdf.png", fullPage: true });
});

test("la RFP conserva su Excel y no inventa un PDF de la planilla", async ({
  page,
  request,
}) => {
  const manifest = await (await request.get("/case-documents/manifest.json")).json();
  expect(manifest.documents.find(document => document.id === 'T-06')?.original).toBe(true);
  await page.goto("/caso-fan-de-pan?entrega=t-06");
  await page.getByRole("tab", { name: "Documento original" }).click();
  await expect(
    page.getByRole("link", { name: "Descargar XLSX" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Una matriz para explorar, no solo para mirar.",
    }),
  ).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(0);
  const response = await request.get("/case-documents/t-06.xlsx");
  expect((await response.body()).subarray(0, 2).toString()).toBe("PK");
});
