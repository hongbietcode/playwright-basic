import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Advanced POM', () => {
  test('demonstrates method chaining', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('practice', 'SuperSecretPassword!');
    expect(await loginPage.getURL()).toContain('secure');
  });
});
