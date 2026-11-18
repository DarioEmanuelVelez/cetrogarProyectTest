import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model - Página de login (Cetrogar)
 *
 * Selectores obtenidos inspeccionando el sitio real de Cetrogar:
 * - https://www.cetrogar.com.ar/login
 *
 * Todos los selectores utilizan los localizadores semánticos de Playwright
 * (getByRole, getByPlaceholder, getByText, etc.) evitando selectores
 * hardcodeados de CSS o XPath.
 */
export class LoginPage {
  readonly page: Page;

  // --- Locators (sin hardcodear selectores CSS/XPath) ---

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly emailPasswordButton: Locator;
  readonly buttonAceptar: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Input de email
    this.emailInput = page.getByPlaceholder(/Ej\.:\s*ejemplo@mail\.com/i);

    // Input de contraseña
    this.passwordInput = page.getByPlaceholder(/Ingrese su contraseña/i);

    // Botón de iniciar sesión
    this.loginButton = page.getByRole('button', {
      name: /Iniciar sesión/i,
    });

   

    

    // Botón para entrar con email y contraseña
    this.emailPasswordButton = page.getByRole('button', {
      name: /Entrar con e-mail y contraseña/i,
    });

    
     this.buttonAceptar = page.getByRole('button', { name: 'Close modal' });    

    // Mensaje de error
    this.errorMessage = page.getByText(
      'Usuario y/o contraseña equivocada'
    );
  }

  // --- Actions ---

  /** Navega a la página de login de Cetrogar */
  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  /** Completa el correo electrónico */
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /** Completa la contraseña */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /** Clic en el botón de iniciar sesión */
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

async closeModal(): Promise<void> {
  try {
    await this.buttonAceptar.waitFor({ state: 'visible', timeout: 4000 });
    await this.buttonAceptar.click();
  } catch {
    // Si no aparece el modal, no rompe el test
  }
}

  /** Ejecuta el flujo completo de inicio de sesión */
  async iniciarSesion(email: string, password: string): Promise<void> {
    await this.goto();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
    await this.closeModal();
  }

}