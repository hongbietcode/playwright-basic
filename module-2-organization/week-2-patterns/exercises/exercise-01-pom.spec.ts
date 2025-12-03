import { test, expect } from '@playwright/test';

/**
 * EXERCISE: Convert this test to use Page Object Model
 * TODO: Create CartPage.ts and use it here
 */

test('should add product to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

// TODO: Refactor using Page Objects
// See solutions/exercise-01-pom.spec.ts
