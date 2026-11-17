import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CREDENTIALS } from '../test-data/credentials';

// Contexto limpio (sin storageState) para probar el login de forma real
test.use({ storageState: { cookies: [], origins: [] } });

test('TC02 - Iniciar sesion con usuario y contraseña erroneos', async ({ page }) => {
  const loginPage = new LoginPage(page);


  await loginPage.iniciarSesion(
    CREDENTIALS.INVALID.email,
    CREDENTIALS.INVALID.password,
  );


  // El usuario no debe haber iniciado sesion (sigue en el formulario de login)
  await expect(loginPage.emailInput).toBeVisible();
});
