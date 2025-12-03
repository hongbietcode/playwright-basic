import { Page, expect } from '@playwright/test';

/**
 * Product and Cart Helper Functions
 */

export async function login(page: Page): Promise<void> {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.waitForURL('**/inventory.html');
}

export async function addProductToCart(page: Page, productName: string): Promise<void> {
  const productCard = page.locator('.inventory_item', { hasText: productName });
  await productCard.locator('button[class*="btn_inventory"]').click();
}

export async function addProductByIndex(page: Page, index: number): Promise<void> {
  const products = page.locator('.inventory_item');
  await products.nth(index).locator('button[class*="btn_inventory"]').click();
}

export async function getCartCount(page: Page): Promise<number> {
  const badge = page.locator('.shopping_cart_badge');
  const isVisible = await badge.isVisible();
  if (!isVisible) return 0;
  const text = await badge.textContent();
  return parseInt(text || '0');
}

export async function goToCart(page: Page): Promise<void> {
  await page.click('.shopping_cart_link');
  await page.waitForURL('**/cart.html');
}

export async function getProductPrice(page: Page, productName: string): Promise<number> {
  const productCard = page.locator('.inventory_item', { hasText: productName });
  const priceText = await productCard.locator('.inventory_item_price').textContent();
  return parseFloat(priceText!.replace('$', ''));
}

export async function removeProductFromCart(page: Page, productName: string): Promise<void> {
  const cartItem = page.locator('.cart_item', { hasText: productName });
  await cartItem.locator('button[class*="remove"]').click();
}

export async function calculateCartTotal(page: Page): Promise<number> {
  const prices = await page.locator('.inventory_item_price').allTextContents();
  return prices.reduce((sum, priceText) => {
    return sum + parseFloat(priceText.replace('$', ''));
  }, 0);
}

export async function verifyProductInCart(page: Page, productName: string): Promise<void> {
  const cartItem = page.locator('.cart_item', { hasText: productName });
  await expect(cartItem).toBeVisible();
}

export async function getCartProducts(page: Page): Promise<string[]> {
  const items = page.locator('.cart_item .inventory_item_name');
  return await items.allTextContents();
}

export async function continueShopping(page: Page): Promise<void> {
  await page.click('#continue-shopping');
  await page.waitForURL('**/inventory.html');
}

export async function proceedToCheckout(page: Page): Promise<void> {
  await page.click('#checkout');
  await page.waitForURL('**/checkout-step-one.html');
}

export async function fillCheckoutInfo(page: Page, firstName: string, lastName: string, zipCode: string): Promise<void> {
  await page.fill('#first-name', firstName);
  await page.fill('#last-name', lastName);
  await page.fill('#postal-code', zipCode);
  await page.click('#continue');
}

export async function finishCheckout(page: Page): Promise<void> {
  await page.click('#finish');
  await page.waitForURL('**/checkout-complete.html');
}

export async function verifyOrderComplete(page: Page): Promise<void> {
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
}
