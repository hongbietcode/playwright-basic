import { Page, expect } from '@playwright/test';

/**
 * Authentication Helper Functions
 *
 * Các hàm helper để tái sử dụng trong tests
 */

/**
 * Login to the application
 *
 * @param page - Playwright Page object
 * @param username - Username to login with
 * @param password - Password to login with
 */
export async function login(page: Page, username: string, password: string): Promise<void> {
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');
}

/**
 * Login and wait for successful navigation
 *
 * @param page - Playwright Page object
 * @param username - Username
 * @param password - Password
 */
export async function loginAndWait(page: Page, username: string, password: string): Promise<void> {
  await login(page, username, password);
  await page.waitForURL('**/secure');
}

/**
 * Logout from the application
 *
 * @param page - Playwright Page object
 */
export async function logout(page: Page): Promise<void> {
  await page.click('a:has-text("Logout")');
  await page.waitForURL('**/login');
}

/**
 * Navigate to login page
 *
 * @param page - Playwright Page object
 */
export async function navigateToLogin(page: Page): Promise<void> {
  await page.goto('https://practice.expandtesting.com/login');
}

/**
 * Verify user is logged in (on secure page)
 *
 * @param page - Playwright Page object
 */
export async function verifyLoggedIn(page: Page): Promise<void> {
  await expect(page).toHaveURL(/.*secure/);
  await expect(page.locator('.alert-success')).toBeVisible();
}

/**
 * Verify user is logged out (on login page)
 *
 * @param page - Playwright Page object
 */
export async function verifyLoggedOut(page: Page): Promise<void> {
  await expect(page).toHaveURL(/.*login/);
}

/**
 * Get error message text
 *
 * @param page - Playwright Page object
 * @returns Error message text
 */
export async function getErrorMessage(page: Page): Promise<string> {
  const errorElement = page.locator('.alert-danger');
  await expect(errorElement).toBeVisible();
  return await errorElement.textContent() || '';
}

/**
 * Get success message text
 *
 * @param page - Playwright Page object
 * @returns Success message text
 */
export async function getSuccessMessage(page: Page): Promise<string> {
  const successElement = page.locator('.alert-success');
  await expect(successElement).toBeVisible();
  return await successElement.textContent() || '';
}

/**
 * Clear login form fields
 *
 * @param page - Playwright Page object
 */
export async function clearLoginForm(page: Page): Promise<void> {
  await page.fill('#username', '');
  await page.fill('#password', '');
}

/**
 * Check if element is required (HTML5 validation)
 *
 * @param page - Playwright Page object
 * @param selector - Element selector
 * @returns True if element has required attribute
 */
export async function isRequired(page: Page, selector: string): Promise<boolean> {
  return await page.locator(selector).getAttribute('required') !== null;
}
