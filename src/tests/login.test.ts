import { test, expect } from '../fixtures/baseFixtures';
import * as dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

test.describe('Inicio de sesión', () => {
  // Datos del usuario desde variables de entorno (.env)
  const userData = {
    email: process.env.USER_EMAIL || '',
    password: process.env.USER_PASSWORD || '',
  };

  test('debería cargar la página de login correctamente', async ({ loginPage }) => {
    // loginPage ya viene instanciado y en la URL /login gracias al fixture

    // Aserciones directamente en el test (no en el page object)
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('debería iniciar sesión con credenciales válidas', async ({ loginPage, page }) => {
    await loginPage.iniciarSesion(userData.email, userData.password);

    await expect(page).toHaveURL(/dashboard|home|welcome/i);
  });

  test('debería mostrar error con credenciales inválidas', async ({ loginPage }) => {
    await loginPage.fillEmail('email-invalido@test.com');
    await loginPage.fillPassword('password-invalida');
    await loginPage.clickLoginButton();

    // Aserción directamente en el test (no en el page object)
    await expect(loginPage.errorMessage).toBeVisible();
  });
});
