import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * Fixtures personalizados para Playwright.
 * Inyecta el Page Object LoginPage automáticamente en cada test.
 */

type LoginFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<LoginFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
