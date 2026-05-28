import { test, expect } from "@playwright/test";

test("home page returns 200 and has correct heading", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/EILI/);
  const heading = page.getByRole("heading", { level: 1 });
  await expect(heading).toContainText("Financial Stability");
});
