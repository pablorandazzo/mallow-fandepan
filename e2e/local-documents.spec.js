import { test, expect } from "@playwright/test";

test("los originales están cerrados por defecto fuera del modo local explícito", async ({
  request,
}) => {
  const manifest = await request.get("/__local-case/manifest");
  expect(manifest.headers()["content-type"]).toContain("application/json");
  expect(await manifest.json()).toMatchObject({ enabled: false });
  const document = await request.get("/__local-case/documents/T-01/pdf");
  expect(document.status()).toBe(403);
});
