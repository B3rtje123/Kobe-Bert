import { test, expect } from "@playwright/test"

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/auth/register")
  await page.getByRole("button", { name: "Login" }).click()
  await page.getByRole("link", { name: "Don't have an account yet?" }).click()
  await page.getByPlaceholder("Joey").click()
  await page.getByPlaceholder("Joey").fill("help")
  await page.getByPlaceholder("Joey").press("Tab")
  await page.getByPlaceholder("example@domain.com").fill("help@help.com")
  await page.getByPlaceholder("example@domain.com").press("Tab")
  await page.getByLabel("Password*").fill("123456789")
  await page.getByRole("button", { name: "Sign up" }).click()
  await page.getByRole("button", { name: "Account" }).click()
  await page.getByRole("button", { name: "Logout" }).click()
})
