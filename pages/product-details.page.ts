import { Locator, type Page } from "@playwright/test";

export class ProductDetailsPage {
  readonly page: Page;

  readonly header: Locator;
  readonly menu: Locator;

  readonly productsSection: Locator;
  readonly productImage: Locator;
  readonly productDetails: Locator;
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productRating: Locator;
  readonly prodcutPrice: Locator;
  readonly productQuantity: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;

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

    this.productsSection = page.locator(".product-details");

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

  async goto(id: string) {
    await this.page.goto(`/product_details/${id}`);
    await this.productImage.waitFor();
  }
}
