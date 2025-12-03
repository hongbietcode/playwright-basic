import { test, expect } from '@playwright/test';

/**
 * EXERCISE 01: Organize Test Suite
 *
 * Task: Refactor this messy test file by:
 * 1. Group related tests with test.describe()
 * 2. Add beforeEach/afterEach hooks
 * 3. Remove duplicate code
 * 4. Use better test names
 * 5. Add appropriate tags
 *
 * Run: yarn test exercises/exercise-01-structure.spec.ts
 */

// TODO: Add describe block for "User Authentication"
test('login test', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/login');
  await page.fill('#username', 'practice');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/secure/);
});

// TODO: This test has duplicate navigation - use beforeEach
test('invalid login', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/login');
  await page.fill('#username', 'wrong');
  await page.fill('#password', 'wrong');
  await page.click('button[type="submit"]');
  await expect(page.locator('.alert-danger')).toBeVisible();
});

// TODO: Add describe block for "Shopping Cart"
test('cart test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  // TODO: Complete cart test
});

// TODO: Better test name and organization
test('test2', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  // TODO: Complete test
});

/**
 * INSTRUCTIONS:
 * 1. Create describe blocks for Auth and Cart features
 * 2. Add beforeEach hooks to avoid duplicate navigation
 * 3. Rename tests to be descriptive
 * 4. Add tags (@smoke, @negative)
 * 5. Extract common login logic
 *
 * See solutions/exercise-01-structure.spec.ts for answer
 */
