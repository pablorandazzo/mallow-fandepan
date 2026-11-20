import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { CASE_ACCESS_STORAGE_KEY } from "../src/caseAccess.js";

// Access behavior is exercised through the real form in case-access.spec.js.
// These scenarios isolate the case reading/navigation behavior after entry.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(key => sessionStorage.setItem(key, 'granted'), CASE_ACCESS_STORAGE_KEY);
});

test("el modal lleva a una página del caso con las once entregas", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Explorar el caso" }).click();
  await page.getByRole("link", { name: "Ir al caso Fan de Pan" }).click();
  await expect(page).toHaveURL(/\/caso-fan-de-pan$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Una red que crece",
  );
  const index = page.getByRole("navigation", { name: "Entregas del caso" });
  await expect(index.locator("a[data-delivery]")).toHaveCount(11);
  await index.getByRole("link", { name: /T-01/ }).click();
  await expect(page).toHaveURL(/entrega=t-01/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Caso de negocio",
  );
  await expect(
    page.getByRole("tab", { name: "Introducción" }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(
    page.getByRole("tab", { name: "Documentos de la entrega" }),
  ).toBeVisible();
});

test("cada entrega tiene contenido, estado y URL propia sin simular pendientes", async ({
  page,
}) => {
  await page.goto("/caso-fan-de-pan");
  const index = page.getByRole("navigation", { name: "Entregas del caso" });
  for (let number = 1; number <= 11; number++) {
    const id = `T-${String(number).padStart(2, "0")}`;
    await index.getByRole("link", { name: new RegExp(id) }).click();
    await expect(page).toHaveURL(new RegExp(`entrega=${id.toLowerCase()}`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".delivery-intro")).toHaveCount(1);
    await expect(page.locator(".delivery-sections > section")).toHaveCount(0);
    await expect(page.locator(".delivery-header .delivery-status")).toHaveText(
      "Disponible",
    );
  }
  await page.getByRole("tab", { name: "Documentos de la entrega" }).click();
  await expect(page.getByTitle(/PDF de lectura T-11/)).toHaveAttribute('src', '/case-documents/t-11.pdf');
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Carpeta de cierre",
  );
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Diseño y validación",
  );
});

test("la entrega muestra solo una introducción antes de abrir el PDF", async ({ page }) => {
  await page.goto("/caso-fan-de-pan?entrega=t-03");
  await expect(page.locator(".delivery-intro")).toHaveText(
    "Describe las capacidades de negocio, datos, aplicaciones y tecnología previstas para gestionar la información financiera de la red.",
  );
  await expect(page.getByRole("heading", { name: "Sobre este documento" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Lo esencial, en pocas líneas." })).toHaveCount(0);
  await page.screenshot({ path: "test-results/case-intro-desktop.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "test-results/case-intro-mobile.png" });
});

test("la matriz se introduce brevemente y permite descargar el Excel completo", async ({
  page,
}) => {
  await page.goto("/caso-fan-de-pan?entrega=t-06");
  await expect(page.locator(".delivery-intro")).toContainText("el Excel contiene su detalle");
  await expect(page.getByRole("table")).toHaveCount(0);
  await page.getByRole("tab", { name: "Documentos de la entrega" }).click();
  await expect(
    page.getByRole("link", { name: "Descargar XLSX" }),
  ).toBeVisible();
  await expect(page.getByTitle(/PDF de lectura T-06/)).toBeVisible();
  await expect(page.getByRole("link", { name: /Descargar/ })).toHaveCount(1);
});

test("enlaces inválidos no seleccionan ni descargan otra entrega", async ({
  page,
}) => {
  await page.goto("/caso-fan-de-pan?entrega=t-99");
  await expect(
    page.getByRole("heading", { name: "Entrega no encontrada." }),
  ).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("link", { name: "Volver al índice" }).click();
  await expect(page).toHaveURL(/\/caso-fan-de-pan$/);
});

for (const width of [320, 390, 768, 1440]) {
  test(`el caso es navegable y legible a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/caso-fan-de-pan");
    if (width <= 800) {
      await page
        .getByRole("combobox", { name: "Elegir entrega" })
        .selectOption("t-06");
    } else {
      await page
        .getByRole("navigation", { name: "Entregas del caso" })
        .getByRole("link", { name: /T-06/ })
        .click();
    }
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Matriz RFP",
    );
    const sizes = await page.evaluate(() => ({
      viewport: innerWidth,
      page: document.documentElement.scrollWidth,
      text: document.querySelector(".delivery-header").clientWidth,
    }));
    expect(sizes.page).toBeLessThanOrEqual(sizes.viewport);
    expect(sizes.text).toBeGreaterThan(width <= 800 ? width * 0.7 : 500);
    await page.screenshot({
      path: `test-results/case-${width}.png`,
      fullPage: true,
    });
  });
}

test("el caso mantiene teclado de pestañas y accesibilidad automatizada", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const url of [
    "/caso-fan-de-pan",
    "/caso-fan-de-pan?entrega=t-01",
    "/caso-fan-de-pan?entrega=t-06",
  ]) {
    await page.goto(url);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        targets: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  }
  const summary = page.getByRole("tab", { name: "Introducción" });
  await summary.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Documentos de la entrega" }),
  ).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText(
    "PDF actualizado y archivo editable disponible por separado",
  );
  await page.keyboard.press("Home");
  await expect(summary).toHaveAttribute("aria-selected", "true");
});
