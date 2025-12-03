import { test, expect } from '@playwright/test';

/**
 * EXERCISE 02: Configuration Management
 *
 * Task: Create environment-specific configurations
 * 1. Create configs/dev.config.ts
 * 2. Create configs/staging.config.ts
 * 3. Use baseURL from config
 * 4. Configure timeouts
 * 5. Set up retries for CI
 *
 * Run: yarn test exercises/exercise-02-config.spec.ts
 */

test.describe('Configuration Exercise', () => {

  test('should use baseURL from config', async ({ page }) => {
    // TODO: Instead of full URL, use relative path
    // This requires setting baseURL in playwright.config.ts
    await page.goto('https://practice.expandtesting.com/login');
    // Should be: await page.goto('/login');

    await expect(page).toHaveURL(/login/);
  });

  test('should respect timeout configuration', async ({ page }) => {
    // TODO: Configure custom timeouts in playwright.config.ts
    await page.goto('https://practice.expandtesting.com/slow');
    await expect(page.locator('h1')).toBeVisible();
  });
});

/**
 * INSTRUCTIONS:
 * 1. Create configs/dev.config.ts with baseURL for dev
 * 2. Create configs/staging.config.ts with baseURL for staging
 * 3. Configure retries (2 for CI, 0 for local)
 * 4. Set timeout to 30000ms
 * 5. Enable trace on first retry
 *
 * Example config structure:
 *
 * // configs/dev.config.ts
 * import { defineConfig } from '@playwright/test';
 *
 * export default defineConfig({
 *   use: {
 *     baseURL: 'https://dev.example.com',
 *   },
 *   retries: process.env.CI ? 2 : 0,
 *   timeout: 30000,
 * });
 *
 * See solutions/exercise-02-config.spec.ts for complete solution
 */
