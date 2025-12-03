import { test, expect } from '@playwright/test';

/**
 * Example 01: Good Folder Structure Demo
 *
 * This file demonstrates organizing tests by feature
 * Run: yarn test examples/01-folder-structure.spec.ts
 */

// ✅ GOOD - Organized by feature
test.describe('Example: Feature-Based Organization', () => {

  test('demonstrates auth feature tests would go in tests/auth/', async ({ page }) => {
    // Auth tests in: tests/auth/login.spec.ts, tests/auth/logout.spec.ts
    await page.goto('https://practice.expandtesting.com/login');
    await expect(page).toHaveURL(/login/);
    console.log('✅ Auth tests organized in tests/auth/');
  });

  test('demonstrates cart feature tests would go in tests/cart/', async ({ page }) => {
    // Cart tests in: tests/cart/add-items.spec.ts, tests/cart/checkout.spec.ts
    console.log('✅ Cart tests organized in tests/cart/');
  });

  test('demonstrates search feature tests would go in tests/search/', async ({ page }) => {
    // Search tests in: tests/search/product-search.spec.ts
    console.log('✅ Search tests organized in tests/search/');
  });
});

/**
 * Recommended Project Structure:
 *
 * project/
 * ├── tests/
 * │   ├── auth/              ← Feature-based folders
 * │   │   ├── login.spec.ts
 * │   │   └── logout.spec.ts
 * │   ├── cart/
 * │   │   ├── add-items.spec.ts
 * │   │   └── checkout.spec.ts
 * │   └── search/
 * │       └── product-search.spec.ts
 * ├── pages/                 ← Page Object Models
 * ├── helpers/               ← Utilities
 * ├── test-data/             ← Test data
 * └── playwright.config.ts   ← Configuration
 */

/**
 * Key Takeaways:
 * - Organize tests by feature/module
 * - Each feature gets its own folder
 * - Related tests grouped together
 * - Easy to find and maintain
 * - Scales well as project grows
 */
