import { test, expect } from '@playwright/test';

/**
 * EXERCISE 03: Waits & Timeouts Practice
 *
 * BÀI TẬP: Thực hành waiting strategies và timeouts
 *
 * NHIỆM VỤ (Tasks):
 * 1. Trust auto-wait for standard actions
 * 2. Use explicit waits for custom conditions
 * 3. waitForSelector with different states
 * 4. waitForLoadState for page load
 * 5. waitForURL for navigation
 * 6. waitForFunction for complex conditions
 * 7. waitForResponse for network
 * 8. Custom timeouts
 * 9. Handle dynamic content
 * 10. Combine multiple waits
 *
 * HƯỚNG DẪN (Instructions):
 * - Chọn wait strategy phù hợp cho từng scenario
 * - Chạy test: yarn test exercises/exercise-03-waits.spec.ts
 * - Tham khảo: examples/05-auto-waits.spec.ts, examples/06-explicit-waits.spec.ts
 *
 * MỨC ĐỘ (Difficulty): ⭐⭐⭐ (Hard)
 */

test.describe('Exercise 03: Waits & Timeouts Practice', () => {

  /**
   * Task 1: Auto-Wait with Dynamic Content
   * Tin tưởng auto-wait mechanism
   */
  test('Task 1: should trust auto-wait for dynamic content', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    // TODO: Click start button (auto-waits for clickable)


    // TODO: Assert #finish becomes visible (auto-waits)


    // TODO: Assert text "Hello World!" appears (auto-waits)


    // ❌ KHÔNG cần page.waitForTimeout() - auto-wait đã xử lý!

    console.log('✅ Task 1 completed');
  });

  /**
   * Task 2: waitForSelector with Visible State
   * Đợi element trở nên visible
   */
  test('Task 2: should wait for element to be visible', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.click('#start button');

    // TODO: Use waitForSelector to wait for #finish to be visible
    // Hint: { state: 'visible', timeout: 10000 }


    // TODO: Assert element is now visible


    console.log('✅ Task 2 completed');
  });

  /**
   * Task 3: waitForSelector with Hidden State
   * Đợi element biến mất
   */
  test('Task 3: should wait for element to disappear', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    // Verify loading spinner is initially visible
    await page.waitForSelector('#loading', { state: 'visible' });

    await page.click('#start button');

    // TODO: Wait for loading spinner to become hidden


    // TODO: Verify result is now visible


    console.log('✅ Task 3 completed');
  });

  /**
   * Task 4: waitForLoadState
   * Đợi page load hoàn toàn
   */
  test('Task 4: should wait for different load states', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // TODO: Wait for 'load' event (page fully loaded)


    console.log('✓ Page loaded');

    // TODO: Wait for 'domcontentloaded'


    console.log('✓ DOM content loaded');

    // TODO: Wait for 'networkidle' (no requests for 500ms)


    console.log('✓ Network idle');

    console.log('✅ Task 4 completed');
  });

  /**
   * Task 5: waitForURL
   * Đợi URL thay đổi
   */
  test('Task 5: should wait for URL to change', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    await page.click('a:has-text("Login")');

    // TODO: Wait for URL to match '**/login'


    // TODO: Verify URL contains 'login'


    console.log('✅ Task 5 completed');
  });

  /**
   * Task 6: waitForFunction - Element Count
   * Đợi số lượng elements thỏa điều kiện
   */
  test('Task 6: should wait for element count', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // TODO: Wait for at least 10 links on the page
    // Hint: waitForFunction(() => document.querySelectorAll('a').length >= 10)


    const linkCount = await page.locator('a').count();
    console.log(`Found ${linkCount} links`);

    // TODO: Assert count is >= 10


    console.log('✅ Task 6 completed');
  });

  /**
   * Task 7: waitForFunction - Text Content
   * Đợi text content thay đổi
   */
  test('Task 7: should wait for text to change', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.click('#start button');

    // TODO: Wait for #finish h4 text to equal 'Hello World!'
    // Hint: waitForFunction(() => {
    //   const element = document.querySelector('#finish h4');
    //   return element?.textContent === 'Hello World!';
    // })


    // TODO: Assert the text


    console.log('✅ Task 7 completed');
  });

  /**
   * Task 8: waitForResponse
   * Đợi API response
   */
  test('Task 8: should wait for API response', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // TODO: Start waiting for response to '**/login' BEFORE triggering navigation


    // TODO: Click login link to trigger navigation


    // TODO: Await the response


    // TODO: Verify response is ok (status 200-299)


    console.log('✅ Task 8 completed');
  });

  /**
   * Task 9: waitForResponse with Condition
   * Đợi specific API response
   */
  test('Task 9: should wait for specific API response', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO: Start waiting for response where:
    // - URL includes 'authenticate'
    // - Status is 200
    // Hint: waitForResponse(response => ...)


    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // TODO: Click submit to trigger API call


    // TODO: Await the response


    console.log('Response status:', response.status());

    console.log('✅ Task 9 completed');
  });

  /**
   * Task 10: Custom Timeout
   * Sử dụng custom timeout cho slow operations
   */
  test('Task 10: should use custom timeout for slow content', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/slow');

    // TODO: Wait for h1 to be visible with 15 second timeout
    // Hint: waitForSelector('#', { timeout: 15000 })


    // TODO: Assert h1 is visible


    console.log('✅ Task 10 completed');
  });

  /**
   * Task 11: Handle Timeout Gracefully
   * Xử lý timeout errors
   */
  test('Task 11: should handle wait timeout gracefully', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    try {
      // TODO: Wait for non-existent element with 2 second timeout
      // This should throw timeout error


    } catch (error) {
      console.log('⚠️ Timeout occurred as expected');

      // TODO: Assert error is defined


    }

    console.log('✅ Task 11 completed');
  });

  /**
   * Task 12: Combine Multiple Waits
   * Kết hợp nhiều wait strategies
   */
  test('Task 12: should combine multiple waits', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO: Wait for network to be idle


    // TODO: Wait for username input to be visible


    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // TODO: Use Promise.all to wait for both:
    // - Response to '**/authenticate'
    // - Click submit button
    // Hint: const [response] = await Promise.all([...])


    console.log('Response status:', response.status());

    // TODO: Wait for URL to change to '**/secure'


    console.log('✅ Task 12 completed');
  });

  /**
   * Task 13: waitForEvent - Console Message
   * Đợi browser console event
   */
  test('Task 13: should wait for console message', async ({ page }) => {
    // TODO: Start waiting for console event where type is 'log' and text includes 'Ready'
    // Hint: waitForEvent('console', msg => ...)


    await page.goto('https://practice.expandtesting.com');

    // TODO: Evaluate to trigger console.log('Ready')


    // TODO: Await the message


    console.log('Caught message:', message.text());

    console.log('✅ Task 13 completed');
  });

  /**
   * Task 14: No Manual Waits Pattern
   * So sánh auto-wait vs manual wait
   */
  test('Task 14: should demonstrate auto-wait is better than manual wait', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    // ❌ BAD PATTERN (commented out):
    // await page.click('#start button');
    // await page.waitForTimeout(5000); // Always waits 5s, even if loads faster

    // ✅ GOOD PATTERN:
    // TODO: Click start button


    // TODO: Assert #finish h4 has text "Hello World!"
    // This auto-waits only as long as needed!


    console.log('✅ Task 14 completed - Auto-wait is better!');
  });

  /**
   * BONUS Task 1: Complex waitForFunction
   * Điều kiện phức tạp với arguments
   */
  test('BONUS 1: should use complex waitForFunction', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    const minLinks = 10;
    const minHeadings = 3;

    // TODO: Wait for both conditions:
    // - At least minLinks links
    // - At least minHeadings h2 elements
    // Pass minLinks and minHeadings as arguments
    // Hint: waitForFunction((min1, min2) => { ... }, minLinks, minHeadings)


    console.log('✅ BONUS 1 completed');
  });

  /**
   * BONUS Task 2: File Download Wait
   * Đợi file download
   */
  test('BONUS 2: should wait for file download', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');

    // TODO: Start waiting for download event BEFORE clicking


    // TODO: Click first download link


    // TODO: Await the download


    console.log('Download started:', await download.suggestedFilename());

    // TODO: Save download to test-results/downloads/ folder


    console.log('✅ BONUS 2 completed');
  });

  /**
   * BONUS Task 3: Comprehensive Wait Strategy
   * Kết hợp tất cả wait techniques
   */
  test('BONUS 3: should demonstrate comprehensive wait strategy', async ({ page }) => {
    // TODO: Navigate and wait for network idle


    // TODO: Wait for page to be fully loaded (all 3 states)


    // TODO: Click login link and wait for URL


    // TODO: Wait for form elements to be ready


    // TODO: Fill form and wait for API response + submission


    // TODO: Wait for success message with custom timeout


    console.log('✅ BONUS 3 completed');
  });

});

/**
 * TESTING YOUR SOLUTION:
 *
 * 1. Run all exercises:
 *    yarn test exercises/exercise-03-waits.spec.ts
 *
 * 2. Run specific task:
 *    yarn test exercises/exercise-03-waits.spec.ts -g "Task 1"
 *
 * 3. Run in headed mode:
 *    yarn test exercises/exercise-03-waits.spec.ts --headed
 *
 * 4. Run with trace:
 *    yarn test exercises/exercise-03-waits.spec.ts --trace on
 *
 * CHECKING YOUR WORK:
 * - All tasks should pass ✅
 * - No manual page.waitForTimeout() should be used
 * - Compare with solutions/exercise-03-waits.spec.ts
 * - Review examples for guidance
 *
 * KEY CONCEPTS PRACTICED:
 * ✅ Trust auto-wait (95% of cases)
 * ✅ waitForSelector (visible, hidden, attached, detached)
 * ✅ waitForLoadState (load, domcontentloaded, networkidle)
 * ✅ waitForURL (navigation)
 * ✅ waitForFunction (custom conditions)
 * ✅ waitForResponse (network)
 * ✅ waitForEvent (browser events)
 * ✅ Custom timeouts
 * ✅ Timeout error handling
 * ✅ Combining multiple waits with Promise.all
 * ✅ Choosing right wait strategy
 *
 * DECISION TREE:
 * - Standard action (click, fill)? → Use auto-wait ✅
 * - Standard assertion (toBeVisible)? → Use auto-wait ✅
 * - Custom condition? → Use waitForFunction ✅
 * - Network request? → Use waitForResponse ✅
 * - Navigation? → Use waitForURL ✅
 * - Page load? → Use waitForLoadState ✅
 * - Element state? → Use waitForSelector ✅
 * - Browser event? → Use waitForEvent ✅
 */
