import { test, expect } from '@playwright/test';

/**
 * Example 02: Test Organization with Describe & Hooks
 * Run: yarn test examples/02-test-organization.spec.ts
 */

test.describe('Test Organization Examples', () => {

  // ✅ beforeEach - runs before EACH test
  test.beforeEach(async ({ page }) => {
    console.log('🔧 Setup: Navigating to login page');
    await page.goto('https://practice.expandtesting.com/login');
  });

  // ✅ afterEach - runs after EACH test
  test.afterEach(async ({ page }) => {
    console.log('🧹 Cleanup: Test completed');
  });

  test('Test 1: Verify page loaded', async ({ page }) => {
    // page is already on login page (from beforeEach)
    await expect(page.locator('h2')).toBeVisible();
    console.log('✅ Test 1 passed');
  });

  test('Test 2: Verify form elements', async ({ page }) => {
    // page is already on login page (from beforeEach)
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    console.log('✅ Test 2 passed');
  });

  // ✅ Nested describe for sub-features
  test.describe('Login Validation', () => {

    test('Should validate empty username', async ({ page }) => {
      await page.click('button[type="submit"]');
      // HTML5 validation prevents submission
      await expect(page).toHaveURL(/login/);
      console.log('✅ Empty validation works');
    });

    test('Should validate invalid credentials', async ({ page }) => {
      await page.fill('#username', 'invalid');
      await page.fill('#password', 'wrong');
      await page.click('button[type="submit"]');
      await expect(page.locator('.alert-danger')).toBeVisible();
      console.log('✅ Invalid credentials handled');
    });
  });
});

/**
 * Hook Execution Order Example
 */
test.describe('Hook Execution Order Demo', () => {

  test.beforeAll(() => {
    console.log('1️⃣ beforeAll: Runs ONCE before all tests');
  });

  test.beforeEach(() => {
    console.log('2️⃣ beforeEach: Runs before EACH test');
  });

  test('First test', () => {
    console.log('3️⃣ Test 1 executing');
  });

  test('Second test', () => {
    console.log('3️⃣ Test 2 executing');
  });

  test.afterEach(() => {
    console.log('4️⃣ afterEach: Runs after EACH test');
  });

  test.afterAll(() => {
    console.log('5️⃣ afterAll: Runs ONCE after all tests');
  });
});

/**
 * Key Takeaways:
 * - Use beforeEach() for common setup
 * - Use afterEach() for cleanup
 * - beforeAll/afterAll for expensive operations
 * - Nest describes for sub-features
 * - Each test is isolated (fresh browser context)
 */
