import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { CASE_ACCESS_STORAGE_KEY } from "../src/caseAccess.js";

async function expectOfficialLogo(logo) {
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute("src", "/fan-de-pan-logo.png");
  await expect.poll(() => logo.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
  const geometry = await logo.evaluate(image => {
    const box = image.getBoundingClientRect();
    const style = getComputedStyle(image);
    return {
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      ratio: box.width / box.height,
      filter: style.filter,
      transform: style.transform,
    };
  });
  expect(geometry.naturalWidth).toBe(226);
  expect(geometry.naturalHeight).toBe(23);
  expect(geometry.ratio).toBeCloseTo(226 / 23, 1);
  expect(geometry.filter).toBe("none");
  expect(geometry.transform).toBe("none");
}

test("el logo del cliente queda centrado sobre un fondo sin círculos decorativos", async ({ page }) => {
  await page.goto("/");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const art = page.locator("#caso .case-art");
    await art.scrollIntoViewIfNeeded();
    const layout = await art.evaluate(element => {
      const panel = element.getBoundingClientRect();
      const brand = element.querySelector(".case-client-brand").getBoundingClientRect();
      return {
        before: getComputedStyle(element, "::before").content,
        centerOffset: Math.abs((panel.left + panel.width / 2) - (brand.left + brand.width / 2)),
      };
    });
    expect(["none", "normal"]).toContain(layout.before);
    expect(layout.centerOffset).toBeLessThan(1);
    await expect(art.locator(".case-orbit")).toHaveCount(0);
  }
});

test("usa el logotipo oficial de Fan de Pan sin recrearlo ni deformarlo", async ({ page, request }) => {
  await page.addInitScript(key => sessionStorage.setItem(key, "granted"), CASE_ACCESS_STORAGE_KEY);
  await page.goto("/");
  const logo = page.locator("#caso .case-art").getByRole("img", { name: "Fan de Pan", exact: true });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.locator("#caso").scrollIntoViewIfNeeded();
    await expectOfficialLogo(logo);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await expect(page.locator(".bread-seal")).toHaveCount(0);
  await page.getByRole("button", { name: "Explorar el caso" }).click();
  await expectOfficialLogo(page.getByRole("dialog").getByRole("img", { name: "Fan de Pan", exact: true }));
  await page.getByRole("link", { name: "Ir al caso Fan de Pan" }).click();
  await expectOfficialLogo(page.locator(".case-header-project").getByRole("img", { name: "Fan de Pan", exact: true }));

  // Exact original bytes from the official site's custom-logo (no recoloring or tracing).
  const bytes = readFileSync(new URL("../public/fan-de-pan-logo.png", import.meta.url));
  expect(createHash("sha256").update(bytes).digest("hex")).toBe("12d7057b579d50ffc88a6829e658f9b9867a1d94b39efa092f1995f49393d89f");
  const response = await request.get("/fan-de-pan-logo.png");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("image/png");
  expect(await response.body()).toEqual(bytes);
});
