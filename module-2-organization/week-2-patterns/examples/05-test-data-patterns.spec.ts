import { test, expect } from '@playwright/test';

const testUsers = [
  { username: 'user1', password: 'pass1', shouldPass: false },
  { username: 'practice', password: 'SuperSecretPassword!', shouldPass: true },
];

test.describe('Data-Driven Testing', () => {
  for (const user of testUsers) {
    test(`should test ${user.username}`, async ({ page }) => {
      await page.goto('https://practice.expandtesting.com/login');
      await page.fill('#username', user.username);
      await page.fill('#password', user.password);
      await page.click('button[type="submit"]');

      if (user.shouldPass) {
        await expect(page).toHaveURL(/secure/);
      } else {
        await expect(page.locator('.alert-danger')).toBeVisible();
      }
    });
  }
});
