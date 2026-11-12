import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

test("respeta el isotipo botánico y las tipografías de la identidad Mallow", async ({
  page,
}) => {
  await page.goto("/");
  const brand = page.getByRole("link", {
    name: "Mallow — inicio",
    exact: true,
  });
  await expect(brand.locator("img")).toHaveAttribute("src", "/mallow-mark.svg");
  await expect(brand).toHaveText("mallow");
  const fonts = await page.evaluate(() => ({
    body: getComputedStyle(document.body).fontFamily,
    title: getComputedStyle(document.querySelector("h1")).fontFamily,
    wordmark: getComputedStyle(document.querySelector(".brand > span"))
      .fontFamily,
    accent: getComputedStyle(document.documentElement)
      .getPropertyValue("--purple")
      .trim(),
  }));
  expect(fonts.body).toContain("Inter");
  expect(fonts.title).toContain("DM Serif Display");
  expect(fonts.wordmark).toContain("DM Serif Display");
  expect(fonts.accent).toBe("#6956E8");
  const svg = readFileSync(
    new URL("../public/mallow-mark.svg", import.meta.url),
    "utf8",
  );
  expect(svg.match(/<path\s/g)).toHaveLength(3);
  expect(svg).toContain("M75.79979 0c-27.06094");
  expect(svg).toContain("M71.25592 23.66132");
  expect(svg).toContain("M0 33.10277c0.81591");
  expect(svg).toContain("#111827");
  expect(svg).toContain("#6956E8");
});
