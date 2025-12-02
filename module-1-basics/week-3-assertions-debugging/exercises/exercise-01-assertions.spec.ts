import { test, expect } from '@playwright/test';

/**
 * EXERCISE 01: Assertions Practice
 *
 * BÀI TẬP: Thực hành các loại assertion khác nhau
 *
 * NHIỆM VỤ (Tasks):
 * 1. Element visibility assertions
 * 2. Text and value assertions
 * 3. State assertions (enabled, checked, focused)
 * 4. URL and title assertions
 * 5. Count and attribute assertions
 * 6. Custom timeout and negation
 *
 * HƯỚNG DẪN (Instructions):
 * - Thay thế TODO comments bằng code thực tế
 * - Chạy test: yarn test exercises/exercise-01-assertions.spec.ts
 * - Tham khảo: examples/01-basic-assertions.spec.ts
 *
 * MỨC ĐỘ (Difficulty): ⭐⭐ (Medium)
 */

test.describe('Exercise 01: Assertions Practice', () => {

  /**
   * Task 1: Element Visibility
   * Test trang login và verify các element hiển thị
   */
  test('Task 1: should verify all login page elements are visible', async ({ page }) => {
    // TODO: Navigate to https://practice.expandtesting.com/login


    // TODO: Assert that h2 heading is visible


    // TODO: Assert that username input is visible


    // TODO: Assert that password input is visible


    // TODO: Assert that submit button is visible


    console.log('✅ Task 1 completed');
  });

  /**
   * Task 2: Text Assertions
   * Verify text content với toHaveText và toContainText
   */
  test('Task 2: should verify text content', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO: Assert h2 has exact text "Test login"


    // TODO: Assert h2 contains text "login" (case insensitive using regex /login/i)


    // TODO: Assert page title contains "Practice"


    console.log('✅ Task 2 completed');
  });

  /**
   * Task 3: Input Value Assertions
   * Fill input và verify giá trị
   */
  test('Task 3: should verify input values', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO: Fill username with "testuser"


    // TODO: Assert username input has value "testuser"


    // TODO: Fill password with "password123"


    // TODO: Assert password input has value "password123"


    // TODO: Clear username input


    // TODO: Assert username has empty value ""


    console.log('✅ Task 3 completed');
  });

  /**
   * Task 4: Checkbox State
   * Test checkbox checked/unchecked state
   */
  test('Task 4: should verify checkbox states', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    const checkbox1 = page.locator('#checkbox1');

    // TODO: Check if checkbox1 is currently checked or unchecked
    // If checked, assert it's checked. If unchecked, assert it's not checked
    // Hint: Use await checkbox1.isChecked()


    // TODO: Check the checkbox


    // TODO: Assert checkbox is now checked


    // TODO: Uncheck the checkbox


    // TODO: Assert checkbox is not checked


    console.log('✅ Task 4 completed');
  });

  /**
   * Task 5: URL and Navigation
   * Test URL assertions và navigation
   */
  test('Task 5: should verify URL changes', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // TODO: Assert current URL is exactly "https://practice.expandtesting.com/"


    // TODO: Click on "Login" link


    // TODO: Assert URL contains "login" using regex /.*login$/


    console.log('✅ Task 5 completed');
  });

  /**
   * Task 6: Element Count
   * Đếm số lượng elements
   */
  test('Task 6: should count elements', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // TODO: Assert there are exactly 2 checkboxes
    // Hint: page.locator('input[type="checkbox"]')


    // TODO: Assert there are 0 elements with class ".non-existent"


    console.log('✅ Task 6 completed');
  });

  /**
   * Task 7: Attribute Assertions
   * Verify HTML attributes
   */
  test('Task 7: should verify element attributes', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO: Assert username input has attribute "type" with value "text"


    // TODO: Assert password input has attribute "type" with value "password"


    // TODO: Assert submit button has attribute "type" (any value is ok)


    console.log('✅ Task 7 completed');
  });

  /**
   * Task 8: Negation Assertions
   * Sử dụng .not với assertions
   */
  test('Task 8: should use negation assertions', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO: Assert h2 is NOT hidden (use not.toBeHidden())


    // TODO: Assert h2 does NOT have text "Wrong Title"


    // TODO: Assert username does NOT have value "anything"


    console.log('✅ Task 8 completed');
  });

  /**
   * Task 9: Auto-Wait with Dynamic Content
   * Test auto-wait mechanism
   */
  test('Task 9: should wait for dynamic content', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    // TODO: Click the "Start" button


    // TODO: Assert #finish element becomes visible (will auto-wait)


    // TODO: Assert #finish h4 has text "Hello World!"


    console.log('✅ Task 9 completed');
  });

  /**
   * Task 10: Custom Timeout
   * Sử dụng custom timeout cho assertions
   */
  test('Task 10: should use custom timeout', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.click('#start button');

    // TODO: Assert #finish is visible with 10 second timeout
    // Hint: { timeout: 10000 }


    console.log('✅ Task 10 completed');
  });

  /**
   * Task 11: Multiple Assertions
   * Kết hợp nhiều assertions
   */
  test('Task 11: should perform multiple assertions', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const usernameInput = page.locator('#username');

    // TODO: Assert username is visible


    // TODO: Assert username is enabled


    // TODO: Assert username is editable


    // TODO: Assert username has value "" (empty)


    console.log('✅ Task 11 completed');
  });

  /**
   * Task 12: CSS Class Assertion
   * Verify CSS classes
   */
  test('Task 12: should verify CSS classes', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const submitButton = page.locator('button[type="submit"]');

    // TODO: Assert button has class containing "btn"
    // Hint: Use toHaveClass(/btn/)


    console.log('✅ Task 12 completed');
  });

  /**
   * BONUS Task: Login Flow with Assertions
   * Thực hiện login flow hoàn chỉnh với assertions
   */
  test('BONUS: should complete full login flow with assertions', async ({ page }) => {
    // TODO: Navigate to login page


    // TODO: Verify page title contains "Login"


    // TODO: Fill username with "practice"


    // TODO: Fill password with "SuperSecretPassword!"


    // TODO: Verify both inputs have correct values


    // TODO: Click submit button


    // TODO: Wait for URL to change to secure page


    // TODO: Verify success message is visible


    console.log('✅ BONUS Task completed');
  });

});

/**
 * TESTING YOUR SOLUTION:
 *
 * 1. Run all exercises:
 *    yarn test exercises/exercise-01-assertions.spec.ts
 *
 * 2. Run specific task:
 *    yarn test exercises/exercise-01-assertions.spec.ts -g "Task 1"
 *
 * 3. Run in UI mode:
 *    yarn test:ui exercises/exercise-01-assertions.spec.ts
 *
 * 4. View in headed mode:
 *    yarn test exercises/exercise-01-assertions.spec.ts --headed
 *
 * CHECKING YOUR WORK:
 * - All tasks should pass ✅
 * - Compare with solutions/exercise-01-assertions.spec.ts
 * - Review examples/01-basic-assertions.spec.ts for guidance
 *
 * KEY CONCEPTS PRACTICED:
 * ✅ toBeVisible() / toBeHidden()
 * ✅ toHaveText() / toContainText()
 * ✅ toHaveValue()
 * ✅ toBeEnabled() / toBeChecked()
 * ✅ toHaveURL() / toHaveTitle()
 * ✅ toHaveCount()
 * ✅ toHaveAttribute() / toHaveClass()
 * ✅ Negation with .not
 * ✅ Auto-wait mechanism
 * ✅ Custom timeouts
 */
