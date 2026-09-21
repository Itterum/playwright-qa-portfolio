import { type Locator, type Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;

  readonly header: Locator;
  readonly menu: Locator;

  readonly searchInput: Locator;
  readonly searchButton: Locator;

  readonly productsSection: Locator;
  readonly productsTitle: Locator;
  readonly productCards: Locator;

  readonly sidebar: Locator;
  readonly categoryProducts: Locator;
  readonly brandsProducts: Locator;

  readonly cartModal: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.header = page.locator("#header");
    this.menu = this.header.locator(".shop-menu");

    this.searchInput = page.locator("#search_product");
    this.searchButton = page.locator("#submit_search");

    this.productsSection = page.locator(".features_items");
    this.productsTitle = this.productsSection.getByRole("heading", {
      name: /products/i,
    });
    this.productCards = this.productsSection.locator(".product-image-wrapper");

    this.sidebar = page.locator(".left-sidebar");
    this.categoryProducts = this.sidebar.locator(".category-products");
    this.brandsProducts = this.sidebar.locator(".brands_products");

    this.cartModal = page.locator("#cartModal");
    this.continueShoppingButton = this.cartModal.getByRole("button", {
      name: "Continue Shopping",
    });
    this.viewCartLink = this.cartModal.getByRole("link", {
      name: "View Cart",
    });
  }

  async goto() {
    await this.page.goto("/products");
    await this.productsTitle.waitFor();
  }

  async search(productName: string): Promise<void> {
    await this.searchInput.fill(productName);

    await Promise.all([
      this.page.waitForURL((url) => {
        return (
          url.pathname === "/products" &&
          url.searchParams.get("search") === productName
        );
      }),
      this.searchButton.click(),
    ]);
  }

  productCardByName(productName: string): Locator {
    return this.productCards.filter({
      has: this.page
        .locator(".productinfo")
        .getByText(productName, { exact: true }),
    });
  }

  async addProductToCart(productName: string): Promise<void> {
    const card = this.productCardByName(productName);

    await card.locator(".productinfo .add-to-cart").click();
    await this.cartModal.waitFor({ state: "visible" });
  }

  async openProduct(productName: string): Promise<void> {
    await this.productCardByName(productName)
      .getByRole("link", { name: "View Product" })
      .click();
  }

  category(name: string): Locator {
    return this.categoryProducts.getByRole("link", {
      name,
      exact: true,
    });
  }

  brand(name: string): Locator {
    return this.brandsProducts.getByRole("link").filter({ hasText: name });
  }
}
