import { test, expect } from "@playwright/test";
import { CASE_ACCESS_STORAGE_KEY } from "../src/caseAccess.js";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(key => sessionStorage.setItem(key, 'granted'), CASE_ACCESS_STORAGE_KEY);
});

test("el sitio incluye nueve editables y diez PDFs actualizados", async ({
  request,
}) => {
  const manifest = await (await request.get("/case-documents/manifest.json")).json();
  expect(manifest.enabled).toBe(true);
  expect(
    manifest.documents.filter((document) => document.original),
  ).toHaveLength(9);
  expect(manifest.documents.filter((document) => document.pdf)).toHaveLength(10);
  for (const document of manifest.documents) {
    if (document.original) {
      const original = await request.head(
        `/case-documents/${document.id.toLowerCase()}.${document.format.toLowerCase()}`,
      );
      expect(original.status()).toBe(200);
      expect(Number(original.headers()["content-length"])).toBeGreaterThan(0);
    }
    if (document.pdf) {
      const pdf = await request.head(
        `/case-documents/${document.id.toLowerCase()}.pdf`,
      );
      expect(pdf.headers()["content-type"]).toBe("application/pdf");
    }
  }
  expect(manifest.documents.find(document => document.id === 'T-10')).toMatchObject({ original: false, pdf: true });
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
  await page.getByRole("tab", { name: "Documentos de la entrega" }).click();
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

test("la RFP ofrece el PDF resumen y la matriz Excel completa", async ({
  page,
  request,
}) => {
  const manifest = await (await request.get("/case-documents/manifest.json")).json();
  expect(manifest.documents.find(document => document.id === 'T-06')?.original).toBe(true);
  await page.goto("/caso-fan-de-pan?entrega=t-06");
  await page.getByRole("tab", { name: "Documentos de la entrega" }).click();
  await expect(
    page.getByRole("link", { name: "Descargar XLSX" }),
  ).toBeVisible();
  await expect(page.getByTitle(/PDF de lectura T-06/)).toHaveAttribute('src', '/case-documents/t-06.pdf');
  const response = await request.get("/case-documents/t-06.xlsx");
  expect((await response.body()).subarray(0, 2).toString()).toBe("PK");
});

test("T-10 permite leer el informe PDF sin ofrecer un editable inexistente", async ({ page, request }) => {
  await page.goto('/caso-fan-de-pan?entrega=t-10');
  await page.getByRole('tab', { name: 'Documentos de la entrega' }).click();
  await expect(page.getByTitle(/PDF de lectura T-10/)).toHaveAttribute('src', '/case-documents/t-10.pdf');
  await expect(page.getByRole('link', { name: /Descargar/ })).toHaveCount(0);
  const pdf = await request.get('/case-documents/t-10.pdf');
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
});

test("el resumen T-10 enlaza la demo y permite consultar y descargar comprobantes y evidencia", async ({ page, request }) => {
  await page.goto('/caso-fan-de-pan?entrega=t-10');
  const resources = page.getByRole('region', { name: 'Probá el prototipo' });
  await expect(resources.getByRole('link', { name: 'Abrir formulario de prueba' })).toHaveAttribute(
    'href', 'https://fce2026.app.n8n.cloud/form/fdp-t10-demo-995b4dbb2c3440e198b77d1bbf6ac41f',
  );
  await expect(resources.getByRole('link', { name: 'Abrir formulario de prueba' })).toHaveAttribute('target', '_blank');
  await expect(resources.getByRole('link', { name: 'Descargar imagen' })).toHaveCount(2);
  await expect(resources.getByRole('link', { name: 'Descargar PDF' })).toHaveCount(2);
  await expect(resources.getByRole('link', { name: /Gasto de prueba confirmado/ })).toBeVisible();
  for (const [name, signature] of [
    ['comprobantes-sinteticos.zip', 'PK'],
    ['evidencia-tecnica.zip', 'PK'],
    ['comprobantes_sinteticos/10-primera-carga-para-presentar.png', '\x89PNG'],
    ['comprobantes_sinteticos/11-factura-sintetica-89721981.pdf', '%PDF-'],
    ['evidencia/evidencia-confirmacion.png', '\x89PNG'],
  ]) {
    const asset = await request.get(`/case-documents/t10-demo/${name}`);
    expect(asset.status()).toBe(200);
    expect((await asset.body()).subarray(0, signature.length).toString('latin1')).toBe(signature);
  }
  const download = page.waitForEvent('download');
  await resources.getByRole('link', { name: 'Descargar toda la evidencia' }).click();
  expect((await download).suggestedFilename()).toBe('evidencia-tecnica.zip');
  await resources.screenshot({ path: 'test-results/t10-resources-desktop.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  await resources.screenshot({ path: 'test-results/t10-resources-mobile.png' });
  const dimensions = await page.evaluate(() => ({ page: document.documentElement.scrollWidth, viewport: innerWidth }));
  expect(dimensions.page).toBeLessThanOrEqual(dimensions.viewport);
});
