import { test, expect } from "@playwright/test";
import AxeBuilder from '@axe-core/playwright';

test("el acceso desde el modal pide clave, rechaza otra y acepta fce2026", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Explorar el caso" }).click();
  await page.getByRole("link", { name: "Ir al caso Fan de Pan" }).click();
  await expect(
    page.getByRole("heading", { name: "Acceso al caso Fan de Pan" }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Entregas del caso" }),
  ).toHaveCount(0);
  await page.getByLabel("Contraseña del caso").fill("incorrecta");
  await page.getByRole("button", { name: "Entrar al caso" }).click();
  await expect(page.getByRole("alert")).toContainText("Contraseña incorrecta");
  await page.getByLabel("Contraseña del caso").fill("fce2026");
  await page.getByRole("button", { name: "Entrar al caso" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Una red que crece",
  );
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Una red que crece",
  );
});

test("un enlace directo conserva la entrega solicitada y permite cerrar el acceso", async ({
  page,
}) => {
  await page.goto("/caso-fan-de-pan?entrega=t-06");
  await expect(
    page.getByRole("heading", { name: "Acceso al caso Fan de Pan" }),
  ).toBeVisible();
  await page.getByLabel("Contraseña del caso").fill("fce2026");
  await page.getByLabel("Contraseña del caso").press("Enter");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Matriz RFP",
  );
  await expect(page).toHaveURL(/entrega=t-06/);
  await page.getByRole("button", { name: "Salir del caso" }).click();
  await expect(
    page.getByRole("heading", { name: "Acceso al caso Fan de Pan" }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Acceso al caso Fan de Pan" }),
  ).toBeVisible();
});

for (const width of [320, 390, 1440]) {
  test(`la pantalla de acceso es legible y accesible a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    await page.goto('/caso-fan-de-pan');
    await expect(page.getByLabel('Contraseña del caso')).toHaveAttribute('type', 'password');
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations.map(v => v.id)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/case-access-${width}.png`, fullPage: true });
  });
}
