import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model - Carrito de compras de Cetrogar.
 */
export class CartPage {
  readonly page: Page;

  readonly cartItems: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartItems = this.page.getByRole('listitem').or(this.page.locator('tr'));
    this.emptyCartMessage = this.page.getByText(
      /el carrito.?est.?á vacío|no hay productos|carrito vacío/i,
    );
  }

  /** Navega a la página del carrito */
  async goto(): Promise<void> {
    await this.page.goto('https://www.cetrogar.com.ar/carrito');
  }

  /** Verifica si un producto esta presente en el carrito por su nombre */
  async isProductInCart(productName: string): Promise<boolean> {
    return await this.page
      .getByText(new RegExp(productName, 'i'))
      .first()
      .isVisible();
  }
}
