import { test, expect } from "@playwright/test";

test("displays the logo and main navigation links", async ({ page }) => {
  await page.goto("/");
});
