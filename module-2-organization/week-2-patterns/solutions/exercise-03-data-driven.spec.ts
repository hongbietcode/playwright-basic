import { test, expect } from '@playwright/test';

const users = [
  { username: 'practice', password: 'SuperSecretPassword!', valid: true },
  { username: 'invalid', password: 'wrong', valid: false },
];

for (const user of users) {
  test(`test ${user.username}`, async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', user.username);
    await page.fill('#password', user.password);
    await page.click('button[type="submit"]');

    if (user.valid) {
      await expect(page).toHaveURL(/secure/);
    } else {
      await expect(page.locator('.alert-danger')).toBeVisible();
    }
  });
}
