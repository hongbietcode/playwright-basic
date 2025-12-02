import { test, expect } from '@playwright/test';

/**
 * EXERCISE 01: Navigation Practice - Thực Hành Điều Hướng
 *
 * Mục tiêu:
 * - Luyện tập navigate giữa các pages
 * - Verify URLs và titles
 * - Sử dụng goBack() và goForward()
 * - Wait for page load states
 *
 * Instructions:
 * 1. Đọc kỹ yêu cầu của mỗi test
 * 2. Hoàn thành code tại các vị trí có TODO
 * 3. Chạy test: yarn test week-1-getting-started/exercises/exercise-01
 * 4. Tất cả tests phải PASS
 * 5. So sánh code của bạn với solution
 *
 * Thời gian dự kiến: 20-30 phút
 * Độ khó: ⭐ Easy
 */

test.describe('Exercise 01: Navigation', () => {

  /**
   * Test 1: Navigate đến Expand Testing và verify
   *
   * TODO:
   * - Navigate đến https://practice.expandtesting.com
   * - Verify URL chính xác
   * - Verify title chứa "Practice"
   */
  test('should navigate to Expand Testing homepage', async ({ page }) => {
    // TODO: Navigate đến https://practice.expandtesting.com
    // Hint: Sử dụng page.goto()


    // TODO: Verify URL chính xác là 'https://practice.expandtesting.com/'
    // Hint: Sử dụng expect(page).toHaveURL()


    // TODO: Verify title chứa từ "Practice"
    // Hint: Sử dụng expect(page).toHaveTitle() với regex /Practice/


    console.log('✅ Test 1 completed');
  });

  /**
   * Test 2: Navigate qua nhiều pages
   *
   * TODO:
   * - Navigate đến homepage
   * - Click vào link "Test Login Page"
   * - Verify URL chứa "/login"
   * - Click vào link "Home"
   * - Verify quay về homepage
   */
  test('should navigate through multiple pages', async ({ page }) => {
    // TODO: Navigate đến https://practice.expandtesting.com


    // TODO: Click vào link có text "Test Login Page"
    // Hint: page.click('text=...')


    // TODO: Verify URL chứa "/login"
    // Hint: Sử dụng regex /.*login/


    // TODO: Click vào link "Home" để quay về
    // Hint: Tìm link bằng text hoặc href


    // TODO: Verify URL là homepage
    // Hint: URL phải là 'https://practice.expandtesting.com/'


    console.log('✅ Test 2 completed');
  });

  /**
   * Test 3: Sử dụng browser back/forward
   *
   * TODO:
   * - Navigate đến homepage
   * - Navigate đến /login
   * - Navigate đến /checkboxes
   * - Dùng goBack() 2 lần để về homepage
   * - Dùng goForward() để đến /login
   */
  test('should use browser back and forward buttons', async ({ page }) => {
    // TODO: Navigate đến homepage
    await page.goto('https://practice.expandtesting.com');

    // TODO: Navigate đến /login
    // Hint: goto('/login') hoặc click link


    // TODO: Navigate đến /checkboxes


    // TODO: Go back 1 lần (về /login)
    // Hint: page.goBack()


    // TODO: Verify đang ở /login


    // TODO: Go back 1 lần nữa (về homepage)


    // TODO: Verify đang ở homepage


    // TODO: Go forward 1 lần (đến /login)


    // TODO: Verify đang ở /login


    console.log('✅ Test 3 completed');
  });

  /**
   * Test 4: Wait for different load states
   *
   * TODO:
   * - Navigate với waitUntil: 'domcontentloaded'
   * - Wait for 'load' state
   * - Wait for 'networkidle' state
   * - Verify page đã load xong
   */
  test('should wait for different load states', async ({ page }) => {
    // TODO: Navigate với waitUntil: 'domcontentloaded'
    // Hint: page.goto(url, { waitUntil: '...' })


    console.log('📄 DOM Content Loaded');

    // TODO: Wait for 'load' state
    // Hint: page.waitForLoadState('load')


    console.log('📄 Page Fully Loaded');

    // TODO: Wait for 'networkidle' state (optional - có thể timeout)
    // Hint: page.waitForLoadState('networkidle')
    // Note: Bỏ comment dòng dưới nếu muốn test networkidle
    // await page.waitForLoadState('networkidle');

    console.log('📄 Network Idle');

    // TODO: Verify title để confirm page loaded
    // Hint: Title phải chứa "Practice"


    console.log('✅ Test 4 completed');
  });

  /**
   * Test 5: Navigate và capture screenshot
   *
   * TODO:
   * - Navigate đến /login
   * - Capture screenshot của page
   * - Verify screenshot file được tạo
   */
  test('should navigate and capture screenshot', async ({ page }) => {
    // TODO: Navigate đến login page


    // TODO: Capture screenshot
    // Hint: page.screenshot({ path: 'test-results/screenshots/exercise-01-login.png' })


    console.log('📸 Screenshot captured');

    // TODO: Verify đang ở login page


    console.log('✅ Test 5 completed');
  });

});

/**
 * Self-Check Questions - Tự Kiểm Tra:
 *
 * 1. ❓ Sự khác biệt giữa goto() và click() để navigate?
 *    💡 goto() = direct URL, click() = user interaction
 *
 * 2. ❓ Khi nào nên dùng waitForLoadState('networkidle')?
 *    💡 Khi page có nhiều async requests, SPAs
 *
 * 3. ❓ goBack() có giống với browser's back button không?
 *    💡 Có, tương tự như user click nút back
 *
 * 4. ❓ Làm sao verify navigation thành công?
 *    💡 Check URL, title, hoặc elements trên page mới
 *
 * 5. ❓ waitUntil options nào nhanh nhất?
 *    💡 'domcontentloaded' < 'load' < 'networkidle'
 */

/**
 * Khi hoàn thành:
 * ✅ Tất cả 5 tests pass
 * ✅ Không có TODO nào còn lại
 * ✅ Code clean và có comments
 * ✅ Hiểu rõ navigation concepts
 *
 * Next:
 * 👉 So sánh với solutions/exercise-01-navigation.spec.ts
 * 👉 Chuyển sang exercise-02-browser-setup.spec.ts
 */
