import { test, expect, chromium, firefox, webkit } from '@playwright/test';

/**
 * Example 02: Multiple Browsers - Nhiều Trình Duyệt
 *
 * Playwright hỗ trợ 3 browser engines:
 * - Chromium (Chrome, Edge)
 * - Firefox
 * - WebKit (Safari)
 *
 * Học được gì:
 * - Chạy tests trên nhiều browsers
 * - Sử dụng projects trong config
 * - Launch browsers programmatically
 * - So sánh behavior giữa browsers
 */

test.describe('Multiple Browsers - Chạy Trên Nhiều Browsers', () => {

  /**
   * Test 1: Test này tự động chạy trên tất cả browsers được config
   *
   * Trong playwright.config.ts, chúng ta đã define 3 projects:
   * - chromium
   * - firefox
   * - webkit
   *
   * Test này sẽ chạy 3 lần, mỗi browser 1 lần!
   */
  test('should run on all configured browsers', async ({ page, browserName }) => {
    // Navigate
    await page.goto('https://playwright.dev');

    // Verify title (same trên tất cả browsers)
    await expect(page).toHaveTitle(/Playwright/);

    // Log browser name
    console.log(`✅ Test passed on: ${browserName}`);
  });

  /**
   * Test 2: Conditional test - Chỉ chạy trên browser cụ thể
   */
  test('should only run on Chromium', async ({ page, browserName }) => {
    // Skip nếu không phải Chromium
    test.skip(browserName !== 'chromium', 'This test is only for Chromium');

    await page.goto('https://practice.expandtesting.com');
    console.log('✅ Running on Chromium only');
  });

  /**
   * Test 3: Test behavior khác nhau giữa browsers
   */
  test('should handle browser-specific behavior', async ({ page, browserName }) => {
    await page.goto('https://practice.expandtesting.com');

    // Get user agent
    const userAgent = await page.evaluate(() => navigator.userAgent);

    // Verify user agent chứa browser name
    if (browserName === 'chromium') {
      expect(userAgent).toContain('Chrome');
      console.log('🌐 Chromium user agent:', userAgent);
    } else if (browserName === 'firefox') {
      expect(userAgent).toContain('Firefox');
      console.log('🦊 Firefox user agent:', userAgent);
    } else if (browserName === 'webkit') {
      expect(userAgent).toContain('Safari');
      console.log('🧭 WebKit user agent:', userAgent);
    }
  });

});

/**
 * Advanced: Launch browsers programmatically
 * (Không dùng fixture { page })
 */
test.describe('Programmatic Browser Launch', () => {

  /**
   * Test 4: Launch Chromium manually
   */
  test('should launch Chromium manually', async () => {
    // Launch browser
    const browser = await chromium.launch({
      headless: false, // Hiển thị browser
      slowMo: 100      // Chậm lại 100ms mỗi action
    });

    // Create context
    const context = await browser.newContext();

    // Create page
    const page = await context.newPage();

    // Navigate
    await page.goto('https://playwright.dev');

    // Verify
    await expect(page).toHaveTitle(/Playwright/);
    console.log('✅ Chromium launched manually');

    // Cleanup
    await browser.close();
  });

  /**
   * Test 5: Launch all 3 browsers và verify cùng một site
   */
  test('should launch all 3 browsers simultaneously', async () => {
    // Launch tất cả browsers
    const [chromiumBrowser, firefoxBrowser, webkitBrowser] = await Promise.all([
      chromium.launch({ headless: true }),
      firefox.launch({ headless: true }),
      webkit.launch({ headless: true })
    ]);

    console.log('🚀 All browsers launched');

    // Create pages
    const chromiumPage = await chromiumBrowser.newPage();
    const firefoxPage = await firefoxBrowser.newPage();
    const webkitPage = await webkitBrowser.newPage();

    // Navigate all pages
    await Promise.all([
      chromiumPage.goto('https://practice.expandtesting.com'),
      firefoxPage.goto('https://practice.expandtesting.com'),
      webkitPage.goto('https://practice.expandtesting.com')
    ]);

    console.log('📍 All pages navigated');

    // Verify titles
    const [chromiumTitle, firefoxTitle, webkitTitle] = await Promise.all([
      chromiumPage.title(),
      firefoxPage.title(),
      webkitPage.title()
    ]);

    // All titles should be the same
    expect(chromiumTitle).toBe(firefoxTitle);
    expect(firefoxTitle).toBe(webkitTitle);
    console.log('✅ All browsers show same title:', chromiumTitle);

    // Cleanup
    await Promise.all([
      chromiumBrowser.close(),
      firefoxBrowser.close(),
      webkitBrowser.close()
    ]);

    console.log('🧹 All browsers closed');
  });

  /**
   * Test 6: Browser với custom arguments
   */
  test('should launch browser with custom arguments', async () => {
    const browser = await chromium.launch({
      headless: false,
      args: [
        '--start-maximized',           // Maximize window
        '--disable-infobars',          // Disable infobars
        '--disable-extensions',        // Disable extensions
        '--disable-blink-features=AutomationControlled' // Hide automation
      ]
    });

    const context = await browser.newContext({
      viewport: null // Use window size from args
    });

    const page = await context.newPage();
    await page.goto('https://playwright.dev');

    console.log('✅ Browser launched with custom args');

    await browser.close();
  });

});

/**
 * Tips for Running on Specific Browsers:
 *
 * Command Line:
 * npx playwright test --project=chromium
 * npx playwright test --project=firefox
 * npx playwright test --project=webkit
 * npx playwright test --project=chromium --project=firefox
 *
 * In Code:
 * test.use({ browserName: 'chromium' });
 *
 * Skip Browsers:
 * test.skip(browserName === 'webkit', 'Not for Safari');
 */

/**
 * Key Takeaways:
 *
 * 1. Playwright hỗ trợ Chromium, Firefox, WebKit
 * 2. Cấu hình projects trong playwright.config.ts để chạy tất cả browsers
 * 3. Dùng { browserName } fixture để biết đang chạy browser nào
 * 4. test.skip() để skip test trên browser cụ thể
 * 5. Có thể launch browsers manually với chromium.launch()
 * 6. Chạy parallel tests trên nhiều browsers cùng lúc
 *
 * Best Practices:
 * - Test trên tất cả 3 browsers cho production code
 * - Dùng Chromium cho development (nhanh nhất)
 * - Test browser-specific bugs trên browser đó
 * - Dùng headless: false khi debug
 *
 * Next Example: 03-page-interactions.spec.ts
 */
