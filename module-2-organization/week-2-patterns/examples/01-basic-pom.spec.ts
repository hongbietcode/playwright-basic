import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

/**
 * Example 01: Basic Page Object Model
 * Run: yarn test examples/01-basic-pom.spec.ts
 */

test.describe('Basic POM Example', () => {

  test('should login using page objects @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('practice', 'SuperSecretPassword!');

    const dashboard = new DashboardPage(page);
    expect(await dashboard.isOnDashboard()).toBeTruthy();
  });

  test('should handle invalid login using POM @negative', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid', 'wrong');

    expect(await loginPage.isErrorVisible()).toBeTruthy();
  });
});
