import { test, expect } from '@playwright/test';

for (const width of [390, 1440]) {
  test(`identidad FCE y nombre completo de la carrera a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    const section = page.locator('.team-academic');
    await section.scrollIntoViewIfNeeded();
    await expect(section).toContainText('Licenciatura en Sistemas de Información de las Organizaciones');
    const textWidth = await section.locator(':scope > div').evaluate(element => element.clientWidth);
    expect(textWidth).toBeGreaterThan((await section.evaluate(element => element.clientWidth)) * 0.55);
    const logo = section.getByRole('img', { name: 'Facultad de Ciencias Económicas · Universidad de Buenos Aires' });
    await expect(logo).toBeVisible();
    await expect.poll(() => logo.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
    const size = await logo.evaluate(image => ({ natural: image.naturalWidth / image.naturalHeight, rendered: image.clientWidth / image.clientHeight }));
    expect(Math.abs(size.natural - size.rendered)).toBeLessThan(0.03);
    expect(await section.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    await section.screenshot({ path: `test-results/fce-${width}.png` });
  });
}
