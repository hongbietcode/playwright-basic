import { test, expect, chromium } from '@playwright/test';

/**
 * EXERCISE 02: Browser Context Setup - Thiết Lập Browser Context
 *
 * Mục tiêu:
 * - Tạo và quản lý browser contexts
 * - Thiết lập viewport sizes
 * - Test với multiple contexts (multi-user scenario)
 * - Save và load storage state
 *
 * Instructions:
 * 1. Hoàn thành code tại các TODO
 * 2. Chạy: yarn test week-1-getting-started/exercises/exercise-02
 * 3. Tất cả tests phải PASS
 *
 * Thời gian dự kiến: 30-40 phút
 * Độ khó: ⭐⭐ Medium
 */

test.describe('Exercise 02: Browser Context', () => {

  /**
   * Test 1: Tạo context với viewport custom
   *
   * TODO:
   * - Launch browser
   * - Tạo context với viewport 1920x1080
   * - Tạo page và verify viewport size
   */
  test('should create context with custom viewport', async () => {
    // TODO: Launch Chromium browser
    // Hint: const browser = await chromium.launch()


    // TODO: Tạo context với viewport 1920x1080
    // Hint: browser.newContext({ viewport: { width: ..., height: ... } })


    // TODO: Tạo page từ context


    // TODO: Navigate đến https://practice.expandtesting.com


    // TODO: Get viewport size để verify
    // Hint: const size = page.viewportSize()


    // TODO: Verify viewport width = 1920
    // Hint: expect(size?.width).toBe(1920)


    // TODO: Verify viewport height = 1080


    console.log('✅ Viewport size verified:', size);

    // TODO: Cleanup - close browser


    console.log('✅ Test 1 completed');
  });

  /**
   * Test 2: Multiple contexts - 2 users cùng lúc
   *
   * TODO:
   * - Tạo 2 contexts riêng biệt
   * - User A login với username "practice"
   * - User B login với username "student"
   * - Verify cả 2 users đều logged in
   */
  test('should handle multiple user contexts', async () => {
    const browser = await chromium.launch();

    // TODO: Tạo context cho User A


    // TODO: Tạo context cho User B


    // TODO: Tạo pages cho cả 2 users
    const pageA = await contextA.newPage();
    const pageB = await contextB.newPage();

    // TODO: Navigate cả 2 pages đến /login
    await Promise.all([
      pageA.goto('https://practice.expandtesting.com/login'),
      pageB.goto('https://practice.expandtesting.com/login')
    ]);

    // TODO: User A login với "practice" / "SuperSecretPassword!"
    // Hint: fill username, fill password, click submit


    // TODO: User B login với "student" / "Password123"
    // Note: Student user có thể không tồn tại, test sẽ show error - điều này OK


    // TODO: Wait for navigation hoặc verify login attempt
    // Hint: Có thể wait for URL change hoặc error message


    console.log('📍 User A at:', pageA.url());
    console.log('📍 User B at:', pageB.url());

    // TODO: Cleanup - close contexts
    await contextA.close();
    await contextB.close();
    await browser.close();

    console.log('✅ Test 2 completed');
  });

  /**
   * Test 3: Context với device emulation
   *
   * TODO:
   * - Tạo mobile context (iPhone 12)
   * - Tạo desktop context
   * - Verify cả 2 có viewport khác nhau
   */
  test('should create contexts for different devices', async () => {
    const browser = await chromium.launch();

    // TODO: Tạo mobile context (iPhone viewport: 390x844)
    // Hint: viewport: { width: 390, height: 844 }, isMobile: true


    // TODO: Tạo desktop context (1920x1080)


    // TODO: Tạo pages
    const mobilePage = await mobileContext.newPage();
    const desktopPage = await desktopContext.newPage();

    // TODO: Navigate cả 2 đến cùng 1 URL


    // TODO: Get viewport sizes
    const mobileSize = mobilePage.viewportSize();
    const desktopSize = desktopPage.viewportSize();

    // TODO: Verify mobile viewport
    // Hint: width should be 390


    // TODO: Verify desktop viewport
    // Hint: width should be 1920


    console.log('📱 Mobile viewport:', mobileSize);
    console.log('💻 Desktop viewport:', desktopSize);

    // TODO: Cleanup


    console.log('✅ Test 3 completed');
  });

  /**
   * Test 4: Save và load storage state
   *
   * TODO:
   * - Login và save storage state
   * - Tạo context mới với saved state
   * - Verify vẫn logged in (không cần login lại)
   */
  test('should save and reuse storage state', async () => {
    const browser = await chromium.launch();

    // === PHASE 1: Login và save state ===
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();

    // TODO: Navigate và login
    await page1.goto('https://practice.expandtesting.com/login');


    // TODO: Fill credentials
    // Username: practice, Password: SuperSecretPassword!


    // TODO: Click login button


    // TODO: Wait for successful login
    // Hint: wait for URL /secure


    // TODO: Save storage state
    // Hint: context1.storageState({ path: 'test-results/auth-state.json' })


    console.log('💾 Storage state saved');

    await context1.close();

    // === PHASE 2: Load state và verify ===

    // TODO: Tạo context mới với saved storage state
    // Hint: browser.newContext({ storageState: 'test-results/auth-state.json' })


    const page2 = await context2.newPage();

    // TODO: Navigate trực tiếp đến /secure (không cần login)


    // TODO: Verify đang ở /secure page


    console.log('✅ Logged in automatically with saved state');

    // TODO: Cleanup


    console.log('✅ Test 4 completed');
  });

  /**
   * Test 5: Context với custom options
   *
   * TODO:
   * - Tạo context với locale Vietnamese
   * - Tạo context với timezone Hồ Chí Minh
   * - Verify settings
   */
  test('should create context with custom locale and timezone', async () => {
    const browser = await chromium.launch();

    // TODO: Tạo context với Vietnamese locale và timezone
    // Hint: locale: 'vi-VN', timezoneId: 'Asia/Ho_Chi_Minh'


    const page = await context.newPage();

    // TODO: Navigate đến trang có date/time display


    // TODO: Check locale thông qua navigator.language
    // Hint: page.evaluate(() => navigator.language)


    console.log('🌍 Page locale:', locale);

    // TODO: Verify locale là 'vi-VN' hoặc 'vi'
    // Hint: locale.startsWith('vi')


    // TODO: Cleanup


    console.log('✅ Test 5 completed');
  });

});

/**
 * Advanced Challenge - Thử Thách Nâng Cao:
 *
 * Nếu bạn hoàn thành 5 tests trên, thử challenges này:
 *
 * 1. Tạo 3 contexts đồng thời với 3 users khác nhau
 * 2. Tạo context với geolocation (vị trí địa lý)
 * 3. Tạo context với permissions (camera, microphone)
 * 4. Test color scheme: light vs dark mode
 */

/**
 * Self-Check Questions:
 *
 * 1. ❓ Browser Context khác Browser như thế nào?
 *    💡 Context = isolated session, Browser chứa nhiều contexts
 *
 * 2. ❓ Tại sao cần multiple contexts?
 *    💡 Test multi-user, different devices, isolation
 *
 * 3. ❓ Storage state chứa gì?
 *    💡 Cookies, localStorage, sessionStorage
 *
 * 4. ❓ Khi nào nên save storage state?
 *    💡 Sau login, để reuse trong tests khác
 *
 * 5. ❓ isMobile: true làm gì?
 *    💡 Enable mobile viewport, touch events
 */

/**
 * Completion Checklist:
 * ✅ Test 1: Custom viewport
 * ✅ Test 2: Multiple users
 * ✅ Test 3: Device emulation
 * ✅ Test 4: Storage state
 * ✅ Test 5: Locale & timezone
 * ✅ All tests PASS
 * ✅ Hiểu Browser Context concepts
 *
 * Next:
 * 👉 Check solutions/exercise-02-browser-setup.spec.ts
 * 👉 Move to exercise-03-basic-interaction.spec.ts
 */
