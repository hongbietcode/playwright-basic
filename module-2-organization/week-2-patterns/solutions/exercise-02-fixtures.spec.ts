import { test as base } from '@playwright/test';

const test = base.extend({
  authenticatedUser: async ({ page }, use) => {
    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await use(page);
  },
});

test('uses auth fixture', async ({ authenticatedUser }) => {
  console.log('Already logged in!');
});
