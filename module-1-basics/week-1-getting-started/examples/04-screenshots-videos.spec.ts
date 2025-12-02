import { test, expect } from '@playwright/test';

/**
 * Example 04: Screenshots & Videos - Chụp Màn Hình & Quay Video
 *
 * Playwright hỗ trợ capture screenshots và record videos để:
 * - Debug tests
 * - Visual documentation
 * - Bug reports
 * - Visual regression testing
 *
 * Học được gì:
 * - Chụp screenshot của page hoặc element
 * - Record video test execution
 * - Cấu hình screenshot/video settings
 * - Visual comparison basics
 */

test.describe('Screenshots - Chụp Màn Hình', () => {

  /**
   * Test 1: Screenshot toàn bộ page
   */
  test('should capture full page screenshot', async ({ page }) => {
    await page.goto('https://playwright.dev');

    // Screenshot toàn bộ page
    await page.screenshot({
      path: 'test-results/screenshots/playwright-homepage.png',
      fullPage: true // Chụp cả phần scroll
    });

    console.log('✅ Full page screenshot saved');
  });

  /**
   * Test 2: Screenshot chỉ viewport (visible area)
   */
  test('should capture viewport screenshot', async ({ page }) => {
    await page.goto('https://playwright.dev');

    // Screenshot chỉ visible area
    await page.screenshot({
      path: 'test-results/screenshots/viewport-only.png',
      fullPage: false // Chỉ phần nhìn thấy
    });

    console.log('✅ Viewport screenshot saved');
  });

  /**
   * Test 3: Screenshot một element cụ thể
   */
  test('should capture element screenshot', async ({ page }) => {
    await page.goto('https://playwright.dev');

    // Locate element
    const logo = page.locator('.navbar__logo');

    // Screenshot element
    await logo.screenshot({
      path: 'test-results/screenshots/logo.png'
    });

    console.log('✅ Element screenshot saved');
  });

  /**
   * Test 4: Screenshot với options khác nhau
   */
  test('should capture screenshot with different options', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Screenshot với quality (chỉ cho JPEG)
    await page.screenshot({
      path: 'test-results/screenshots/quality-80.jpg',
      type: 'jpeg',
      quality: 80 // 0-100
    });

    // Screenshot với omit background (PNG only)
    await page.screenshot({
      path: 'test-results/screenshots/transparent-bg.png',
      omitBackground: true // Background transparent
    });

    // Screenshot với clip (crop specific area)
    await page.screenshot({
      path: 'test-results/screenshots/clipped.png',
      clip: {
        x: 0,
        y: 0,
        width: 800,
        height: 600
      }
    });

    console.log('✅ Various screenshot options demonstrated');
  });

  /**
   * Test 5: Screenshot khi test fail
   */
  test('should capture screenshot on failure', async ({ page }) => {
    // Trong playwright.config.ts đã config:
    // screenshot: 'only-on-failure'
    // Nên khi test này fail, sẽ tự động chụp screenshot

    await page.goto('https://practice.expandtesting.com/login');

    await page.fill('#username', 'wrong_user');
    await page.fill('#password', 'wrong_password');
    await page.click('button[type="submit"]');

    // Verify error message appears
    const errorMessage = page.locator('.alert-danger');
    await expect(errorMessage).toBeVisible();

    console.log('✅ Error message verified (screenshot auto-captured if failed)');
  });

  /**
   * Test 6: Screenshot trong test flow để document steps
   */
  test('should capture screenshots at different steps', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Step 1 screenshot
    await page.screenshot({
      path: 'test-results/screenshots/step-1-login-page.png'
    });

    // Fill form
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // Step 2 screenshot
    await page.screenshot({
      path: 'test-results/screenshots/step-2-filled-form.png'
    });

    // Submit
    await page.click('button[type="submit"]');
    await page.waitForURL('**/secure');

    // Step 3 screenshot
    await page.screenshot({
      path: 'test-results/screenshots/step-3-logged-in.png'
    });

    console.log('✅ Multi-step screenshots captured');
  });

});

test.describe('Videos - Quay Video', () => {

  /**
   * Test 7: Video recording configuration
   *
   * Video được config trong playwright.config.ts:
   *
   * use: {
   *   video: 'on',                    // Always record
   *   video: 'off',                   // Never record
   *   video: 'retain-on-failure',     // Only keep if test fails
   *   video: 'on-first-retry',        // Record on retry
   * }
   */
  test('should record video of test execution', async ({ page }) => {
    // Video tự động record nếu config bật

    await page.goto('https://practice.expandtesting.com');

    // Navigate around
    await page.click('text=Test Login Page');
    await page.waitForURL('**/login');

    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/secure');

    console.log('✅ Test completed (video recorded if enabled in config)');
    console.log('📹 Video location: test-results/videos/');
  });

  /**
   * Test 8: Programmatic video control
   */
  test('should control video recording programmatically', async ({ browser }) => {
    // Create context với video enabled
    const context = await browser.newContext({
      recordVideo: {
        dir: 'test-results/videos/',
        size: { width: 1280, height: 720 } // Video resolution
      }
    });

    const page = await context.newPage();

    // Your test actions
    await page.goto('https://playwright.dev');
    await page.click('text=Get started');

    // Close context để save video
    await context.close();

    console.log('✅ Video saved with custom settings');
  });

});

test.describe('Visual Comparison - So Sánh Hình Ảnh', () => {

  /**
   * Test 9: Visual regression testing với toHaveScreenshot()
   *
   * Lần đầu chạy: Tạo baseline screenshot
   * Lần sau: So sánh với baseline
   */
  test('should perform visual regression test', async ({ page }) => {
    await page.goto('https://playwright.dev');

    // So sánh với baseline screenshot
    await expect(page).toHaveScreenshot('playwright-homepage.png', {
      maxDiffPixels: 100 // Allow 100 pixels difference
    });

    console.log('✅ Visual regression test passed');
  });

  /**
   * Test 10: Element visual comparison
   */
  test('should compare element visually', async ({ page }) => {
    await page.goto('https://playwright.dev');

    const logo = page.locator('.navbar__logo');

    // So sánh element với baseline
    await expect(logo).toHaveScreenshot('logo-element.png');

    console.log('✅ Element visual comparison passed');
  });

  /**
   * Test 11: Visual comparison với threshold
   */
  test('should allow visual differences within threshold', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Allow 5% pixel difference
    await expect(page).toHaveScreenshot('practice-home.png', {
      maxDiffPixelRatio: 0.05 // 5%
    });

    console.log('✅ Visual test passed with threshold');
  });

  /**
   * Test 12: Ignore specific areas trong visual comparison
   */
  test('should ignore dynamic areas in visual test', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Mask dynamic elements (ads, dates, etc.)
    await expect(page).toHaveScreenshot('masked-comparison.png', {
      mask: [
        page.locator('.advertisement'), // Mask ads
        page.locator('.current-date')   // Mask date
      ]
    });

    console.log('✅ Visual test with masked areas passed');
  });

});

test.describe('Best Practices - Thực Hành Tốt', () => {

  /**
   * Test 13: Organize screenshots trong folders
   */
  test('should organize screenshots in folders', async ({ page }, testInfo) => {
    await page.goto('https://playwright.dev');

    // Use test name for folder organization
    const testName = testInfo.title.replace(/\s+/g, '-');
    const screenshotPath = `test-results/screenshots/${testName}/`;

    await page.screenshot({
      path: `${screenshotPath}page.png`
    });

    console.log(`✅ Screenshot saved to: ${screenshotPath}`);
  });

  /**
   * Test 14: Conditional screenshots (debug mode)
   */
  test('should take screenshots only in debug mode', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    const debugMode = process.env.DEBUG === 'true';

    if (debugMode) {
      await page.screenshot({
        path: 'test-results/screenshots/debug-screenshot.png'
      });
      console.log('🐛 Debug screenshot captured');
    }

    console.log('✅ Test completed');
  });

  /**
   * Test 15: Screenshot helpers
   */
  test('should use screenshot helper functions', async ({ page }) => {
    // Helper function
    async function captureStep(stepName: string) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await page.screenshot({
        path: `test-results/screenshots/${stepName}-${timestamp}.png`
      });
      console.log(`📸 Captured: ${stepName}`);
    }

    await page.goto('https://practice.expandtesting.com/login');
    await captureStep('01-login-page');

    await page.fill('#username', 'practice');
    await captureStep('02-username-filled');

    await page.fill('#password', 'SuperSecretPassword!');
    await captureStep('03-password-filled');

    await page.click('button[type="submit"]');
    await page.waitForURL('**/secure');
    await captureStep('04-logged-in');

    console.log('✅ All steps captured with helper');
  });

});

/**
 * Configuration Tips - Cấu Hình Trong playwright.config.ts:
 *
 * export default defineConfig({
 *   use: {
 *     // Screenshots
 *     screenshot: 'only-on-failure',  // 'on', 'off', 'only-on-failure'
 *
 *     // Videos
 *     video: 'retain-on-failure',     // 'on', 'off', 'retain-on-failure', 'on-first-retry'
 *   },
 * });
 */

/**
 * Key Takeaways - Điểm Quan Trọng:
 *
 * 1. Screenshots:
 *    - page.screenshot() - Full page hoặc viewport
 *    - element.screenshot() - Specific element
 *    - fullPage: true - Include scrollable content
 *    - type: 'png' | 'jpeg' - Image format
 *
 * 2. Videos:
 *    - Config trong playwright.config.ts
 *    - Tự động record khi enabled
 *    - Saved in test-results/videos/
 *
 * 3. Visual Regression:
 *    - toHaveScreenshot() - Compare với baseline
 *    - maxDiffPixels - Pixel threshold
 *    - maxDiffPixelRatio - Percentage threshold
 *    - mask - Ignore dynamic areas
 *
 * 4. Best Practices:
 *    - Screenshot on failure cho debugging
 *    - Organize screenshots trong folders
 *    - Use meaningful file names
 *    - Clean up old screenshots
 *    - Use visual regression cho UI stability
 *
 * Output Locations:
 * - Screenshots: test-results/screenshots/
 * - Videos: test-results/videos/
 * - HTML Report: playwright-report/
 *
 * Commands:
 * - Update baseline: npx playwright test --update-snapshots
 * - View report: npx playwright show-report
 *
 * End of Week 1 Examples! 🎉
 * Next: Exercises to practice what you learned
 */
