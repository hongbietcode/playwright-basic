import { test, expect, chromium } from '@playwright/test';

/**
 * SOLUTION: Exercise 02 - Browser Context Setup
 *
 * Lời giải đầy đủ cho Exercise 02
 */

test.describe('Exercise 02: Browser Context - SOLUTION', () => {

  test('should create context with custom viewport', async () => {
    // Launch browser
    const browser = await chromium.launch();

    // Tạo context với viewport 1920x1080
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });

    // Tạo page
    const page = await context.newPage();

    // Navigate
    await page.goto('https://practice.expandtesting.com');

    // Get viewport size
    const size = page.viewportSize();

    // Verify dimensions
    expect(size?.width).toBe(1920);
    expect(size?.height).toBe(1080);

    console.log('✅ Viewport size verified:', size);

    // Cleanup
    await browser.close();

    console.log('✅ Test 1 completed');
  });

  test('should handle multiple user contexts', async () => {
    const browser = await chromium.launch();

    // Tạo contexts
    const contextA = await browser.newContext();
    const contextB = await browser.newContext();

    // Tạo pages
    const pageA = await contextA.newPage();
    const pageB = await contextB.newPage();

    // Navigate
    await Promise.all([
      pageA.goto('https://practice.expandtesting.com/login'),
      pageB.goto('https://practice.expandtesting.com/login')
    ]);

    // User A login
    await pageA.fill('#username', 'practice');
    await pageA.fill('#password', 'SuperSecretPassword!');
    await pageA.click('button[type="submit"]');
    await pageA.waitForURL('**/secure', { timeout: 10000 });

    // User B login (will fail - demo purpose)
    await pageB.fill('#username', 'student');
    await pageB.fill('#password', 'Password123');
    await pageB.click('button[type="submit"]');

    // Wait for error or success
    await pageB.waitForTimeout(2000);

    console.log('📍 User A at:', pageA.url());
    console.log('📍 User B at:', pageB.url());

    // Cleanup
    await contextA.close();
    await contextB.close();
    await browser.close();

    console.log('✅ Test 2 completed');
  });

  test('should create contexts for different devices', async () => {
    const browser = await chromium.launch();

    // Mobile context
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true
    });

    // Desktop context
    const desktopContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });

    // Create pages
    const mobilePage = await mobileContext.newPage();
    const desktopPage = await desktopContext.newPage();

    // Navigate
    await Promise.all([
      mobilePage.goto('https://practice.expandtesting.com'),
      desktopPage.goto('https://practice.expandtesting.com')
    ]);

    // Get sizes
    const mobileSize = mobilePage.viewportSize();
    const desktopSize = desktopPage.viewportSize();

    // Verify
    expect(mobileSize?.width).toBe(390);
    expect(desktopSize?.width).toBe(1920);

    console.log('📱 Mobile viewport:', mobileSize);
    console.log('💻 Desktop viewport:', desktopSize);

    // Cleanup
    await mobileContext.close();
    await desktopContext.close();
    await browser.close();

    console.log('✅ Test 3 completed');
  });

  test('should save and reuse storage state', async () => {
    const browser = await chromium.launch();

    // PHASE 1: Login và save
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();

    await page1.goto('https://practice.expandtesting.com/login');
    await page1.fill('#username', 'practice');
    await page1.fill('#password', 'SuperSecretPassword!');
    await page1.click('button[type="submit"]');
    await page1.waitForURL('**/secure', { timeout: 10000 });

    // Save state
    await context1.storageState({ path: 'test-results/auth-state.json' });
    console.log('💾 Storage state saved');

    await context1.close();

    // PHASE 2: Load và verify
    const context2 = await browser.newContext({
      storageState: 'test-results/auth-state.json'
    });
    const page2 = await context2.newPage();

    // Navigate trực tiếp (đã logged in)
    await page2.goto('https://practice.expandtesting.com/secure');

    // Verify
    await expect(page2).toHaveURL(/.*secure/);

    console.log('✅ Logged in automatically with saved state');

    // Cleanup
    await context2.close();
    await browser.close();

    console.log('✅ Test 4 completed');
  });

  test('should create context with custom locale and timezone', async () => {
    const browser = await chromium.launch();

    // Tạo context với Vietnamese settings
    const context = await browser.newContext({
      locale: 'vi-VN',
      timezoneId: 'Asia/Ho_Chi_Minh'
    });

    const page = await context.newPage();
    await page.goto('https://practice.expandtesting.com');

    // Check locale
    const locale = await page.evaluate(() => navigator.language);
    console.log('🌍 Page locale:', locale);

    // Verify
    expect(locale.startsWith('vi')).toBeTruthy();

    // Cleanup
    await context.close();
    await browser.close();

    console.log('✅ Test 5 completed');
  });

});

/**
 * Key Concepts:
 *
 * 1. browser.newContext() - Tạo isolated session
 * 2. viewport - Control screen size
 * 3. isMobile - Enable mobile features
 * 4. storageState - Save/load cookies & storage
 * 5. locale & timezone - Localization settings
 *
 * Best Practices:
 * - Always close browser/context sau khi xong
 * - Use contexts cho isolation
 * - Reuse storage state để tăng tốc
 */
