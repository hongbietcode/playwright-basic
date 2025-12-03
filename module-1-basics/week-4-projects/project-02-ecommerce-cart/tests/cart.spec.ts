import { test, expect } from '@playwright/test';
import * as helpers from './product-helpers';

/**
 * PROJECT 2: Shopping Cart Testing
 * Complete test suite for e-commerce cart functionality
 * Run: yarn test tests/cart.spec.ts
 */

test.describe('Shopping Cart Tests', () => {

  test.beforeEach(async ({ page }) => {
    await helpers.login(page);
  });

  test('should add single product to cart @smoke', async ({ page }) => {
    await helpers.addProductToCart(page, 'Sauce Labs Backpack');

    const cartCount = await helpers.getCartCount(page);
    expect(cartCount).toBe(1);

    await helpers.goToCart(page);
    await helpers.verifyProductInCart(page, 'Sauce Labs Backpack');
  });

  test('should add multiple products @smoke', async ({ page }) => {
    await helpers.addProductByIndex(page, 0);
    await helpers.addProductByIndex(page, 1);
    await helpers.addProductByIndex(page, 2);

    expect(await helpers.getCartCount(page)).toBe(3);

    await helpers.goToCart(page);
    const products = await helpers.getCartProducts(page);
    expect(products.length).toBe(3);
  });

  test('should remove product from cart', async ({ page }) => {
    await helpers.addProductByIndex(page, 0);
    await helpers.addProductByIndex(page, 1);
    await helpers.goToCart(page);

    const products = await helpers.getCartProducts(page);
    await helpers.removeProductFromCart(page, products[0]);

    expect(await helpers.getCartCount(page)).toBe(1);
  });

  test('should calculate correct total price', async ({ page }) => {
    await helpers.addProductByIndex(page, 0);
    await helpers.addProductByIndex(page, 1);
    await helpers.goToCart(page);

    const total = await helpers.calculateCartTotal(page);
    expect(total).toBeGreaterThan(0);
  });

  test('should allow continue shopping', async ({ page }) => {
    await helpers.addProductByIndex(page, 0);
    await helpers.goToCart(page);
    await helpers.continueShopping(page);

    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('should complete checkout flow @smoke', async ({ page }) => {
    await helpers.addProductByIndex(page, 0);
    await helpers.goToCart(page);
    await helpers.proceedToCheckout(page);
    await helpers.fillCheckoutInfo(page, 'John', 'Doe', '12345');
    await helpers.finishCheckout(page);
    await helpers.verifyOrderComplete(page);
  });
});
