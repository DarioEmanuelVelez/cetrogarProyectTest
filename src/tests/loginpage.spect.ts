import { test, expect } from '../fixtures/baseFixtures';
import * as dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

test.describe('Login Page - POM con aserciones en el spec', () => {
  // Datos del usuario desde variables de entorno (.env)
  const userData = {
    email: process.env.USER_EMAIL || '',
    password: process.env.USER_PASSWORD || '',
  };

  test('debería cargar la página de login correctamente', async ({ loginPage, page }) => {
    // loginPage ya viene instanciado y en la URL /login gracias al fixture

    // Aserciones directamente en el spec
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(page).toHaveURL(/login/i);
  });

  test('debería iniciar sesión con credenciales válidas', async ({ loginPage, page }) => {
    await loginPage.iniciarSesion(userData.email, userData.password);

    // Aserción de redirección tras login exitoso
    await expect(page).toHaveURL(/dashboard|home|welcome|inicio/i);
  });

  test('debería mostrar error con credenciales inválidas', async ({ loginPage }) => {
    await loginPage.fillEmail('email-invalido@test.com');
    await loginPage.fillPassword('password-invalida');
    await loginPage.clickLoginButton();

    // Aserción de mensaje de error visible
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('debería mostrar los inputs vacíos al cargar la página', async ({ loginPage }) => {
    await expect(loginPage.emailInput).toBeEmpty();
    await expect(loginPage.passwordInput).toBeEmpty();
  });
});
