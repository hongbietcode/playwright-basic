import { test, expect } from '@playwright/test';

/**
 * SOLUTION 02: Configuration Management
 *
 * This demonstrates proper config usage.
 * Actual config files would be:
 *
 * configs/dev.config.ts:
 * ```
 * import { defineConfig } from '@playwright/test';
 *
 * export default defineConfig({
 *   use: {
 *     baseURL: 'https://dev.practice.expandtesting.com',
 *     trace: 'on-first-retry',
 *     screenshot: 'only-on-failure',
 *   },
 *   timeout: 30000,
 *   retries: 0,
 * });
 * ```
 *
 * configs/staging.config.ts:
 * ```
 * export default defineConfig({
 *   use: {
 *     baseURL: 'https://staging.practice.expandtesting.com',
 *     trace: 'on-first-retry',
 *   },
 *   timeout: 30000,
 *   retries: process.env.CI ? 2 : 0,
 * });
 * ```
 *
 * Run with:
 * npx playwright test --config=configs/dev.config.ts
 * npx playwright test --config=configs/staging.config.ts
 */

test.describe('Configuration Solution', () => {

  test('uses baseURL from config', async ({ page }) => {
    // With baseURL configured, use relative paths
    await page.goto('/login');
    await expect(page).toHaveURL(/login/);
  });

  test('respects timeout configuration', async ({ page }) => {
    await page.goto('/slow');
    await expect(page.locator('h1')).toBeVisible();
  });
});

/**
 * Complete playwright.config.ts example:
 *
 * export default defineConfig({
 *   testDir: './tests',
 *   timeout: 30000,
 *   retries: process.env.CI ? 2 : 0,
 *   workers: process.env.CI ? 1 : undefined,
 *   reporter: [['html'], ['list']],
 *   use: {
 *     baseURL: 'https://practice.expandtesting.com',
 *     trace: 'on-first-retry',
 *     screenshot: 'only-on-failure',
 *     video: 'retain-on-failure',
 *     actionTimeout: 10000,
 *   },
 *   projects: [
 *     {
 *       name: 'chromium',
 *       use: { ...devices['Desktop Chrome'] },
 *     },
 *   ],
 * });
 */
