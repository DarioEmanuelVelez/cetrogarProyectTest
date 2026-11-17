import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { CREDENTIALS, PRODUCT } from '../test-data/credentials';

// Contexto limpio (sin storageState) para hacer el login de forma real en cada test
test.use({ storageState: { cookies: [], origins: [] } });

test('TC03 - Iniciar sesion y filtrar por buscador un producto', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const searchResults = new SearchResultsPage(page);
  

  await loginPage.iniciarSesion(CREDENTIALS.VALID.email, CREDENTIALS.VALID.password);

  await homePage.search(PRODUCT.NAME);

});
