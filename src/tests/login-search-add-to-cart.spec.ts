import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { CartPage } from '../pages/CartPage';
import { CREDENTIALS, PRODUCT } from '../test-data/credentials';

// Contexto limpio (sin storageState) para hacer el login de forma real en cada test
test.use({ storageState: { cookies: [], origins: [] } });

test('TC04 - Iniciar sesion, buscar un producto y agregarlo al carrito', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const searchResults = new SearchResultsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.iniciarSesion(CREDENTIALS.VALID.email, CREDENTIALS.VALID.password);
 

  await homePage.search(PRODUCT.NAME);

  await searchResults.addFirstProductToCart();
  await cartPage.goto();
});
