import { test, expect } from "@playwright/test";

test("Should Be form with user Detail", async ({ page }) => {
  await page.goto("http://localhost:3000/users/1");
  await page
    .locator("div")
    .filter({ hasText: /^First Name$/ })
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Last Name$/ })
    .click();
  await page.getByText("Email").click();
  await page.getByPlaceholder("Your Email").click();
});
