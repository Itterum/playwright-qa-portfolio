import { test, expect } from "@playwright/test";

test("displays the logo and main navigation links", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Automation Exercise");

  const header = page.locator("header");

  await expect(
    header.getByRole("img", { name: "Website for automation practice" }),
  ).toBeVisible();

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Cart", href: "/view_cart" },
    { name: "Signup / Login", href: "/login" },
    { name: "Test Cases", href: "/test_cases" },
    { name: "API Testing", href: "/api_list" },
    {
      name: "Video Tutorials",
      href: "https://www.youtube.com/c/AutomationExercise",
    },
    { name: "Contact us", href: "/contact_us" },
  ];

  const menu = header.locator(".shop-menu");

  for (const { name, href } of navigationLinks) {
    const link = menu.getByRole("link").filter({ hasText: name });

    await expect(link).toHaveCount(1);
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", href);
  }
});
