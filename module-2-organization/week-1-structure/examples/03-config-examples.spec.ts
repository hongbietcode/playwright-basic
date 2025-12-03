import { test, expect } from '@playwright/test';

/**
 * Example 03: Configuration Patterns
 * Run: yarn test examples/03-config-examples.spec.ts
 */

test.describe('Configuration Examples', () => {

  test('should use baseURL from config', async ({ page }) => {
    // If baseURL is set in playwright.config.ts, you can use relative URLs
    // await page.goto('/login');  // Goes to baseURL + /login

    // For demo, using full URL
    await page.goto('https://practice.expandtesting.com/login');
    await expect(page).toHaveURL(/login/);
    console.log('✅ baseURL configuration demonstrated');
  });

  test('should use custom timeout from config', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Timeout configured in playwright.config.ts
    // Default: 30000ms for actions, 5000ms for assertions

    await expect(page.locator('h2')).toBeVisible();
    console.log('✅ Timeout configuration applied');
  });

  test('should demonstrate test.slow() for slow tests', async ({ page }) => {
    // Triple the default timeout
    test.slow();

    await page.goto('https://practice.expandtesting.com/slow');
    await expect(page.locator('h1')).toBeVisible();
    console.log('✅ Slow test configuration demonstrated');
  });

  test('should use screenshot configuration @screenshot', async ({ page }) => {
    // Screenshots configured in playwright.config.ts:
    // - 'on': Always capture
    // - 'off': Never capture
    // - 'only-on-failure': Capture on test failure

    await page.goto('https://practice.expandtesting.com/login');
    await expect(page.locator('h2')).toBeVisible();

    console.log('✅ Screenshot config applied (check config for settings)');
  });
});

/**
 * Example playwright.config.ts:
 *
 * export default defineConfig({
 *   testDir: './tests',
 *   timeout: 30000,
 *   retries: 2,
 *   use: {
 *     baseURL: 'https://practice.expandtesting.com',
 *     trace: 'on-first-retry',
 *     screenshot: 'only-on-failure',
 *     actionTimeout: 10000,
 *   },
 *   projects: [
 *     { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
 *     { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
 *   ],
 * });
 */

/**
 * Key Takeaways:
 * - Configure baseURL for cleaner tests
 * - Set appropriate timeouts
 * - Use test.slow() for long tests
 * - Configure screenshots/traces
 * - Use projects for multi-browser
 */
