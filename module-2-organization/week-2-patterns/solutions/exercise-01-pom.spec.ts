import { test, expect } from '@playwright/test';

class CartPage {
  constructor(private page: any) {}

  async login() {
    await this.page.goto('https://www.saucedemo.com/');
    await this.page.fill('#user-name', 'standard_user');
    await this.page.fill('#password', 'secret_sauce');
    await this.page.click('#login-button');
  }

  async addProduct() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  async getCartCount() {
    return await this.page.locator('.shopping_cart_badge').textContent();
  }
}

test('should add product using POM', async ({ page }) => {
  const cartPage = new CartPage(page);
  await cartPage.login();
  await cartPage.addProduct();
  expect(await cartPage.getCartCount()).toBe('1');
});
