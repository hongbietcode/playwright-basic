import { test, expect } from '@playwright/test';

/**
 * Example 01: Basic Navigation - Điều hướng cơ bản
 *
 * Bài học này giới thiệu các phương thức navigation cơ bản trong Playwright:
 * - goto(): Navigate đến URL
 * - goBack(): Quay lại trang trước
 * - goForward(): Tiến đến trang sau
 * - reload(): Tải lại trang hiện tại
 * - waitForLoadState(): Chờ page load xong
 *
 * Học được gì:
 * - Cách navigate giữa các pages
 * - Verify URL sau navigation
 * - Wait strategies cho page load
 */

test.describe('Basic Navigation - Điều Hướng Cơ Bản', () => {

  /**
   * Test 1: Navigate đến một trang web
   */
  test('should navigate to a webpage', async ({ page }) => {
    // goto() - Navigate đến URL
    await page.goto('https://playwright.dev');

    // Verify URL sau khi navigate
    await expect(page).toHaveURL('https://playwright.dev/');

    // Verify page title
    await expect(page).toHaveTitle(/Playwright/);

    console.log('✅ Navigated successfully to:', page.url());
  });

  /**
   * Test 2: Navigate với wait for specific load state
   */
  test('should wait for different load states', async ({ page }) => {
    // Navigate và chờ 'domcontentloaded' event
    await page.goto('https://practice.expandtesting.com', {
      waitUntil: 'domcontentloaded' // Chờ DOM loaded (nhanh)
    });

    console.log('✅ DOM Content Loaded');

    // Hoặc chờ 'load' event (full load)
    await page.waitForLoadState('load');
    console.log('✅ Page Fully Loaded');

    // Hoặc chờ 'networkidle' (không còn network requests)
    await page.waitForLoadState('networkidle');
    console.log('✅ Network Idle');
  });

  /**
   * Test 3: Navigate qua lại (back/forward)
   */
  test('should navigate back and forward', async ({ page }) => {
    // Step 1: Go to page 1
    await page.goto('https://playwright.dev');
    await expect(page).toHaveURL('https://playwright.dev/');
    console.log('📍 At Page 1:', page.url());

    // Step 2: Go to page 2
    await page.goto('https://playwright.dev/docs/intro');
    await expect(page).toHaveURL(/.*docs\/intro/);
    console.log('📍 At Page 2:', page.url());

    // Step 3: Go back to page 1
    await page.goBack();
    await expect(page).toHaveURL('https://playwright.dev/');
    console.log('⬅️  Went back to:', page.url());

    // Step 4: Go forward to page 2
    await page.goForward();
    await expect(page).toHaveURL(/.*docs\/intro/);
    console.log('➡️  Went forward to:', page.url());
  });

  /**
   * Test 4: Reload page
   */
  test('should reload the current page', async ({ page }) => {
    // Navigate to page
    await page.goto('https://practice.expandtesting.com');

    // Get initial title
    const initialTitle = await page.title();
    console.log('📄 Initial title:', initialTitle);

    // Reload page
    await page.reload();
    console.log('🔄 Page reloaded');

    // Title should be the same after reload
    const titleAfterReload = await page.title();
    expect(titleAfterReload).toBe(initialTitle);
    console.log('✅ Title unchanged after reload');
  });

  /**
   * Test 5: Navigate với timeout custom
   */
  test('should handle navigation timeout', async ({ page }) => {
    // Set timeout cho navigation (milliseconds)
    await page.goto('https://playwright.dev', {
      timeout: 10000 // 10 seconds
    });

    console.log('✅ Navigated within timeout');
  });

  /**
   * Test 6: Navigate và wait for specific URL pattern
   */
  test('should navigate and wait for URL pattern', async ({ page }) => {
    // Navigate
    await page.goto('https://practice.expandtesting.com');

    // Click link và chờ URL change
    const [response] = await Promise.all([
      page.waitForURL('**/login'), // Wait for URL containing '/login'
      page.click('a[href="/login"]')  // Click login link
    ]);

    // Verify final URL
    await expect(page).toHaveURL(/.*login/);
    console.log('✅ Navigated to:', page.url());
  });

});

/**
 * Key Takeaways - Điểm Quan Trọng:
 *
 * 1. goto() là method chính để navigate
 * 2. Có thể config waitUntil: 'load' | 'domcontentloaded' | 'networkidle'
 * 3. goBack() và goForward() giống buttons trong browser
 * 4. reload() để tải lại trang
 * 5. waitForURL() để chờ URL thay đổi
 * 6. Playwright tự động wait, nhưng có thể customize timeout
 *
 * Best Practices:
 * - Luôn verify URL sau navigation
 * - Dùng waitForLoadState() khi cần chờ page load hoàn toàn
 * - Set timeout hợp lý cho slow pages
 *
 * Next Example: 02-multiple-browsers.spec.ts
 */
