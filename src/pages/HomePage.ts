import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model - Página de inicio de Cetrogar.
 *
 * Selectores semánticos de Playwright (no CSS ni XPath hardcodeados).
 * NOTA: verificar el placeholder/texto real en https://www.cetrogar.com.ar y ajustar si es necesario.
 */
export class HomePage {
  readonly page: Page;

  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly accountLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Input del buscador (por placeholder, semántico)
    this.searchInput = page.getByPlaceholder(/Estoy buscando/i);
    // Botón del buscador
    this.searchButton = page.getByRole('button', { name: /buscar/i });

    // Enlace a la cuenta del usuario
   this.accountLink = page.getByText(/mi cuenta/i);
  }

  /** Navega a la página de inicio de Cetrogar */
  async goto(): Promise<void> {
    await this.page.goto('https://www.cetrogar.com.ar/');
  }

  /** Busca un producto usando el buscador del sitio */
  async search(product: string): Promise<void> {
    await this.searchInput.click();
    await this.searchInput.fill(product);
    await this.searchInput.press('Enter');
  }
}
