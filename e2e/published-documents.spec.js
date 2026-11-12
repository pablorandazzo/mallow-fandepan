import { test, expect } from '@playwright/test';

test('la clave del frontend habilita los originales sin requerir el modo local', async ({ page, request }) => {
  await page.goto('/caso-fan-de-pan?entrega=t-01');
  await page.getByLabel('Contraseña del caso').fill('fce2026');
  await page.getByRole('button', { name: 'Entrar al caso' }).click();
  await page.getByRole('tab', { name: 'Documento original' }).click();
  await expect(page.getByRole('link', { name: 'Descargar DOCX' })).toBeVisible();
  await expect(page.getByTitle(/PDF de lectura T-01/)).toHaveAttribute('src', '/case-documents/t-01.pdf');
  const pdf = await request.get('/case-documents/t-01.pdf');
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
  const source = await request.get('/case-documents/t-01.docx');
  expect(source.status()).toBe(200);
  expect((await source.body()).subarray(0, 2).toString()).toBe('PK');
});
