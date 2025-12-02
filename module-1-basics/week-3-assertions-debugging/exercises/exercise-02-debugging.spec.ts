import { test, expect } from '@playwright/test';

/**
 * EXERCISE 02: Debugging Practice
 *
 * BÀI TẬP: Thực hành debugging và troubleshooting
 *
 * NHIỆM VỤ (Tasks):
 * 1. Add console logging for debugging
 * 2. Use test.step() for organized logs
 * 3. Take screenshots at key points
 * 4. Log element states
 * 5. Measure action timings
 * 6. Capture browser console
 * 7. Use annotations
 * 8. Handle test failures
 *
 * HƯỚNG DẪN (Instructions):
 * - Thêm debug code để track test execution
 * - Chạy test: yarn test exercises/exercise-02-debugging.spec.ts
 * - Xem headed: yarn test exercises/exercise-02-debugging.spec.ts --headed
 * - Tham khảo: examples/03-debug-modes.spec.ts
 *
 * MỨC ĐỘ (Difficulty): ⭐⭐⭐ (Hard)
 */

test.describe('Exercise 02: Debugging Practice', () => {

  /**
   * Task 1: Console Logging
   * Thêm console.log tại các checkpoint quan trọng
   */
  test('Task 1: should add console logging for debugging', async ({ page }) => {
    // TODO: Log "Starting test"


    await page.goto('https://practice.expandtesting.com/login');

    // TODO: Log current URL using page.url()


    // TODO: Log page title using await page.title()


    await page.fill('#username', 'practice');

    // TODO: Log "Username filled"


    await page.fill('#password', 'SuperSecretPassword!');

    // TODO: Log "Password filled"


    await page.click('button[type="submit"]');

    // TODO: Log "Form submitted"


    await page.waitForURL('**/secure');

    // TODO: Log "Navigation complete"


    console.log('✅ Task 1 completed');
  });

  /**
   * Task 2: Test Steps
   * Organize test với test.step()
   */
  test('Task 2: should use test.step() for organized logs', async ({ page }) => {
    // TODO: Create step "Navigate to login page"
    // Inside: goto login page and log completion


    // TODO: Create step "Fill credentials"
    // Inside: fill username and password, log completion


    // TODO: Create step "Submit form"
    // Inside: click submit, wait for URL change, log completion


    // TODO: Create step "Verify success"
    // Inside: assert success message visible, log completion


    console.log('✅ Task 2 completed');
  });

  /**
   * Task 3: Screenshots for Debugging
   * Chụp screenshots tại các điểm quan trọng
   */
  test('Task 3: should capture screenshots at key points', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO: Take screenshot "step-1-initial.png" in test-results/screenshots/


    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // TODO: Take screenshot "step-2-filled.png"


    await page.click('button[type="submit"]');
    await page.waitForURL('**/secure');

    // TODO: Take full page screenshot "step-3-success.png"
    // Hint: { path: '...', fullPage: true }


    console.log('✅ Task 3 completed');
  });

  /**
   * Task 4: Log Element States
   * Log trạng thái của elements
   */
  test('Task 4: should log element states', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const usernameInput = page.locator('#username');

    // TODO: Log "Username field state:"


    // TODO: Log visible state: await usernameInput.isVisible()


    // TODO: Log enabled state: await usernameInput.isEnabled()


    // TODO: Log editable state: await usernameInput.isEditable()


    // TODO: Log current value: await usernameInput.inputValue()


    await usernameInput.fill('testuser');

    // TODO: Log "After filling:"


    // TODO: Log new value


    console.log('✅ Task 4 completed');
  });

  /**
   * Task 5: Measure Action Timings
   * Đo thời gian thực hiện các actions
   */
  test('Task 5: should measure action timings', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // TODO: Record start time for navigation


    await page.goto('https://practice.expandtesting.com/login');

    // TODO: Calculate and log navigation time


    // TODO: Record start time for filling


    await page.fill('#username', 'practice');

    // TODO: Calculate and log fill time


    // TODO: Record start time for submission


    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/secure');

    // TODO: Calculate and log submission time


    console.log('✅ Task 5 completed');
  });

  /**
   * Task 6: Capture Browser Console
   * Listen và log browser console messages
   */
  test('Task 6: should capture browser console messages', async ({ page }) => {
    // TODO: Add page.on('console') listener
    // Log format: `BROWSER [type]: text`
    // Hint: msg.type() and msg.text()


    await page.goto('https://practice.expandtesting.com');

    // TODO: Use page.evaluate() to run console.log('Test message from browser')


    // TODO: Use page.evaluate() to run console.error('Test error')


    // TODO: Use page.evaluate() to run console.warn('Test warning')


    console.log('✅ Task 6 completed');
  });

  /**
   * Task 7: Test Annotations
   * Thêm metadata với annotations
   */
  test('Task 7: should use annotations for metadata', async ({ page }, testInfo) => {
    // TODO: Add annotation type "issue" with description "BUG-123"


    // TODO: Add annotation type "feature" with description "Login System"


    // TODO: Add annotation type "priority" with description "P1"


    const startTime = Date.now();

    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/secure');

    const duration = Date.now() - startTime;

    // TODO: Attach duration to test report
    // Hint: testInfo.attach('duration', { body: `${duration}ms`, contentType: 'text/plain' })


    console.log('✅ Task 7 completed');
  });

  /**
   * Task 8: Screenshot on Failure
   * Tự động chụp screenshot khi test fail
   */
  test('Task 8: should capture screenshot on failure', async ({ page }, testInfo) => {
    await page.goto('https://practice.expandtesting.com/login');

    // This test will pass, but shows the pattern
    await expect(page.locator('h2')).toBeVisible();

    // TODO: In afterEach hook (add at describe level), implement:
    // if (testInfo.status === 'failed') {
    //   const screenshot = await page.screenshot();
    //   await testInfo.attach('failure-screenshot', {
    //     body: screenshot,
    //     contentType: 'image/png'
    //   });
    // }

    console.log('✅ Task 8 pattern demonstrated');
  });

  /**
   * Task 9: Nested Steps
   * Tạo nested test steps
   */
  test('Task 9: should create nested test steps', async ({ page }) => {
    // TODO: Create outer step "Setup test"
    // Inside outer step:
    //   - Create inner step "Navigate"
    //   - Create inner step "Wait for load"


    // TODO: Create outer step "Execute test"
    // Inside: fill form and submit


    // TODO: Create outer step "Verify results"
    // Inside: assert success


    console.log('✅ Task 9 completed');
  });

  /**
   * Task 10: Debug Failing Test
   * Tìm và fix lỗi trong test này
   */
  test('Task 10: should fix the failing test', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // BUG: Selector không đúng
    // TODO: Fix the selector to correctly find the username input
    await page.fill('#usernamee', 'practice'); // ← Lỗi: có 2 chữ 'e'

    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*secure/);

    console.log('✅ Task 10 completed');
  });

  /**
   * BONUS Task 1: Performance Tracking Hook
   * Tạo hook để track performance của mọi test
   */
  test('BONUS 1: should track test performance', async ({ page }, testInfo) => {
    // TODO: Add annotation for start time


    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/secure');

    // TODO: Calculate duration from start annotation


    // TODO: Add duration annotation


    // TODO: Log duration


    console.log('✅ BONUS 1 completed');
  });

  /**
   * BONUS Task 2: Comprehensive Debug Test
   * Kết hợp tất cả debugging techniques
   */
  test('BONUS 2: should use all debugging techniques', async ({ page }, testInfo) => {
    // TODO: Add annotations (issue, feature, priority)


    // TODO: Add console listener


    // TODO: Use test.step() for each major section


    // TODO: Log element states at key points


    // TODO: Take screenshots at key points


    // TODO: Measure timing for actions


    // TODO: Attach all artifacts to test report


    console.log('✅ BONUS 2 completed');
  });

});

/**
 * ADD HOOKS HERE:
 * Thêm beforeEach và afterEach hooks ở đây
 */

// TODO: Add afterEach hook for screenshot on failure


/**
 * TESTING YOUR SOLUTION:
 *
 * 1. Run all exercises:
 *    yarn test exercises/exercise-02-debugging.spec.ts
 *
 * 2. Run in headed mode to see actions:
 *    yarn test exercises/exercise-02-debugging.spec.ts --headed
 *
 * 3. Run with UI mode:
 *    yarn test:ui exercises/exercise-02-debugging.spec.ts
 *
 * 4. View HTML report:
 *    yarn report
 *
 * CHECKING YOUR WORK:
 * - Check console output for your logs
 * - Check test-results/screenshots/ folder
 * - Check HTML report for annotations and attachments
 * - Compare with solutions/exercise-02-debugging.spec.ts
 *
 * KEY CONCEPTS PRACTICED:
 * ✅ Console logging at checkpoints
 * ✅ test.step() for organization
 * ✅ Screenshot capture
 * ✅ Element state inspection
 * ✅ Performance timing
 * ✅ Browser console listening
 * ✅ Test annotations
 * ✅ Artifact attachment
 * ✅ Nested steps
 * ✅ Debug failing tests
 */
