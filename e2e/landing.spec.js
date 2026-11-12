import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("presenta Mallow y su encuadre de consultoría sin errores de ejecución", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Rigurosos",
  );
  for (const id of [
    "nosotros",
    "servicios",
    "metodo",
    "caso",
    "equipo",
    "contacto",
  ]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await expect(page.locator("#equipo .person")).toHaveCount(7);
  await expect(
    page.getByText("Proyecto académico", { exact: false }).first(),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("las etapas del método responden a clic y navegación de teclado", async ({
  page,
}) => {
  await page.goto("/");
  const tab = page.getByRole("tab", { name: "02 Conectamos" });
  await tab.click();
  await expect(tab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText(
    "Arquitectura destino y análisis de brechas",
  );
  await tab.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "03 Contrastamos" }),
  ).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Comparativa de proveedores",
  );
  await page.keyboard.press("End");
  await expect(page.getByRole("tabpanel")).toContainText(
    "La organización decide",
  );
  await page.keyboard.press("Home");
  await expect(
    page.getByRole("tab", { name: "01 Escuchamos" }),
  ).toHaveAttribute("aria-selected", "true");
});

test("el resumen del caso se abre, contiene límites y devuelve el foco al cerrar", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Explorar el caso" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("contraseña académica");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole("button", { name: "Cerrar detalle del proyecto" })
    .click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

for (const width of [320, 390, 768, 1440]) {
  test(`sin desborde horizontal y con navegación operativa a ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    if (width <= 800) {
      await page.getByRole("button", { name: "Abrir menú" }).click();
      await expect(
        page.getByRole("navigation", { name: "Navegación móvil" }),
      ).toBeVisible();
      await page
        .getByRole("navigation", { name: "Navegación móvil" })
        .getByRole("link", { name: "Servicios" })
        .click();
      await expect(
        page.getByRole("button", { name: "Abrir menú" }),
      ).toHaveAttribute("aria-expanded", "false");
    }
    const dimensions = await page.evaluate(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
    }));
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
    await page.getByRole("button", { name: "Explorar el caso" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    expect(
      await page
        .getByRole("dialog")
        .evaluate((el) => el.scrollWidth <= el.clientWidth),
    ).toBe(true);
  });
}

test("movimiento reducido y capturas de escritorio y móvil", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const id of [
      "nosotros",
      "servicios",
      "metodo",
      "caso",
      "equipo",
      "contacto",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `test-results/mallow-${width}.png`,
      fullPage: true,
    });
  }
});

test("accesibilidad automatizada WCAG AA en página y diálogo", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const id of [
    "nosotros",
    "servicios",
    "metodo",
    "caso",
    "equipo",
    "contacto",
  ]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  }
  const audit = () =>
    new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
  expect(
    (await audit()).violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  await page.getByRole("button", { name: "Explorar el caso" }).click();
  expect(
    (await audit()).violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
});
