import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model - Resultados de búsqueda de Cetrogar.
 */
export class SearchResultsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Espera a que carguen los resultados y devuelve true si hay al menos uno */
  async hasResults(): Promise<boolean> {
    const results = this.page.getByRole('listitem').or(this.page.locator('article'));
    return (await results.count()) > 0;
  }

  /** Verifica que el producto buscado aparezca en los resultados */
  async isProductVisible(productName: string): Promise<boolean> {
    return await this.page
      .getByText(new RegExp(productName, 'i'))
      .first()
      .isVisible();
  }

  /** Agrega el primer producto visible al carrito (botón semántico) */
  async addFirstProductToCart(): Promise<void> {
    const addButtons = this.page.getByRole('button', {
      name: /agregar al carrito|comprar|agregar/i,
    });
    await addButtons.first().click();
  }
}
