import { test, expect } from "@playwright/test"

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/")
  await page.getByRole("button", { name: "Login" }).click()
  await page.getByPlaceholder("example@domain.com").click()
  await page.getByPlaceholder("example@domain.com").fill("help@help.com")
  await page.getByPlaceholder("example@domain.com").press("Tab")
  await page.getByLabel("Password").fill("123456789")
  await page.getByRole("button", { name: "Log in" }).click()
  await expect(page).toHaveURL("http://localhost:5173/")
  await page.getByRole("link", { name: "Tickets" }).click()
  await page.getByRole("link", { name: "Buy tickets" }).click()
  await page.getByLabel("standard").click()
  await page.getByLabel("standard").fill("2")
  await page.locator("#date").fill("2023-12-22")
  await page.getByRole("button", { name: "buy tickets" }).click()
  await page.goto("http://localhost:5173/ticket")
})
