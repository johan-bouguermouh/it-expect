import { test, expect } from "@playwright/test";

test("Table Should Be Present", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();
  await page.getByRole("cell", { name: "First Name" }).click();
  await page.getByRole("cell", { name: "Last Name" }).click();
  await page.getByRole("cell", { name: "Email" }).click();
  await page.getByRole("cell", { name: "Jane", exact: true }).click();
  await page.getByRole("cell", { name: "Doe" }).nth(2).click();
  await page.getByRole("cell", { name: "janedoe@mail.fr" }).click();
});
