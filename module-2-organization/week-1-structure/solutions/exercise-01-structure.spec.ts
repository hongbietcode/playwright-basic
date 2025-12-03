import { test, expect } from '@playwright/test';

/**
 * SOLUTION 01: Organized Test Suite
 */

test.describe('User Authentication', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
  });

  test('should login successfully with valid credentials @smoke', async ({ page }) => {
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/secure/);
  });

  test('should show error with invalid credentials @negative', async ({ page }) => {
    await page.fill('#username', 'wrong');
    await page.fill('#password', 'wrong');
    await page.click('button[type="submit"]');
    await expect(page.locator('.alert-danger')).toBeVisible();
  });
});

test.describe('Shopping Cart', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  test('should add product to cart @smoke', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('should remove product from cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.click('.shopping_cart_link');
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });
});

/**
 * Key Improvements:
 * ✅ Grouped by feature (Auth, Cart)
 * ✅ beforeEach removes duplicate code
 * ✅ Descriptive test names
 * ✅ Tags added (@smoke, @negative)
 * ✅ Clean, maintainable structure
 */
