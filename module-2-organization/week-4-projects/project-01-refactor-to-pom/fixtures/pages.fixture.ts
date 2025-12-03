/**
 * Custom fixtures for page objects
 */

import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

type PageFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authenticatedPage: DashboardPage;
};

export const test = base.extend<PageFixtures>({
  /**
   * Fixture: LoginPage instance
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  /**
   * Fixture: DashboardPage instance
   */
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  /**
   * Fixture: Authenticated DashboardPage
   * Automatically logs in before test
   */
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Perform login
    await loginPage.goto();
    await loginPage.login('practice', 'SuperSecretPassword!');

    // Wait for redirect to secure area
    await page.waitForURL('**/secure');

    // Provide authenticated dashboard page
    await use(dashboardPage);

    // Cleanup: logout (optional)
    // await dashboardPage.logout();
  },
});

export { expect } from '@playwright/test';
