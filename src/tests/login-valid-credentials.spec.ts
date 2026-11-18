import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CREDENTIALS } from '../test-data/credentials';

// Contexto limpio (sin storageState) para probar el login de forma real
test.use({ storageState: { cookies: [], origins: [] } });

test('TC01 - Iniciar sesion con credenciales validas', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.iniciarSesion(CREDENTIALS.VALID.email, CREDENTIALS.VALID.password);

  // Evidencia: el enlace "Mi cuenta" debe estar disponible tras loguearse
  await expect(homePage.accountLink).toBeVisible();
});