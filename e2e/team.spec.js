import { test, expect } from "@playwright/test";

const portraits = [
  ["Ian Belaev", "ian-belaev"],
  ["Agustín Duarte", "agustin-duarte"],
  ["Federico Glorioso", "federico-glorioso"],
  ["Lourdes Devit", "lourdes-devit"],
  ["Lucía Dumit", "lucia-dumit"],
  ["Pablo Randazzo", "pablo-randazzo"],
  ["Ramiro Scheinaizen", "ramiro-scheinaizen"],
];

for (const width of [320, 390, 768, 1440]) {
  test(`el equipo muestra las siete fotos y el nombre corregido a ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator("#equipo");
    await section.scrollIntoViewIfNeeded();
    await expect(section.locator(".person")).toHaveCount(7);
    // Preserve a before capture if the feature is not present yet.
    if (await section.locator(".person-photo").count() === 0) {
      await section.screenshot({ path: testInfo.outputPath(`team-before-${width}.png`) });
    }
    for (const [name, file] of portraits) {
      const card = section.locator(".person").filter({ has: page.getByRole("heading", { name, exact: true }) });
      await expect(card).toHaveCount(1);
      const image = card.getByRole("img", { name: `Foto de ${name}`, exact: true });
      await expect(image).toHaveAttribute("src", `/team/${file}.webp`);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
      const geometry = await image.evaluate(img => {
        const rect = img.getBoundingClientRect();
        const frame = img.parentElement.getBoundingClientRect();
        return { width: rect.width, height: rect.height, frameWidth: frame.width, frameHeight: frame.height, fit: getComputedStyle(img).objectFit };
      });
      expect(geometry.width).toBeGreaterThan(100);
      expect(Math.abs(geometry.width - geometry.height)).toBeLessThan(1);
      expect(Math.abs(geometry.width - geometry.frameWidth)).toBeLessThan(1);
      expect(Math.abs(geometry.height - geometry.frameHeight)).toBeLessThan(1);
      expect(geometry.fit).toBe("cover");
    }
    await expect(section).not.toContainText("Lucía Nahir Dumit");
    const dimensions = await section.evaluate(section => ({
      width: innerWidth,
      content: section.scrollWidth,
      available: section.clientWidth,
      cards: [...section.querySelectorAll('.person')].map(card => {
        const rect = card.getBoundingClientRect();
        return { left: rect.left, right: rect.right };
      }),
    }));
    expect(dimensions.width).toBe(width);
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.available);
    for (const card of dimensions.cards) {
      expect(card.left).toBeGreaterThanOrEqual(0);
      expect(card.right).toBeLessThanOrEqual(width);
    }
    expect(errors).toEqual([]);
    await section.locator('.team-grid').screenshot({ path: testInfo.outputPath(`team-after-${width}.png`) });
  });
}
