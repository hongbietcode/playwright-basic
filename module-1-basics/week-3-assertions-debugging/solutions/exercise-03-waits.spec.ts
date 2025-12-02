import { test, expect } from '@playwright/test';

/**
 * SOLUTION 03: Waits & Timeouts Practice
 *
 * ĐÁP ÁN: Bài tập thực hành waits và timeouts
 *
 * This file contains complete working solutions for Exercise 03
 */

test.describe('Exercise 03: Waits & Timeouts Practice - SOLUTIONS', () => {

  /**
   * Task 1: Auto-Wait with Dynamic Content
   */
  test('Task 1: should trust auto-wait for dynamic content', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    // Click start (auto-waits for clickable)
    await page.click('#start button');

    // Assert visible (auto-waits)
    await expect(page.locator('#finish')).toBeVisible();

    // Assert text (auto-waits)
    await expect(page.locator('#finish h4')).toHaveText('Hello World!');

    console.log('✅ Task 1 completed');
  });

  /**
   * Task 2: waitForSelector with Visible State
   */
  test('Task 2: should wait for element to be visible', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.click('#start button');

    // Explicit wait for visible
    await page.waitForSelector('#finish', {
      state: 'visible',
      timeout: 10000
    });

    await expect(page.locator('#finish')).toBeVisible();

    console.log('✅ Task 2 completed');
  });

  /**
   * Task 3: waitForSelector with Hidden State
   */
  test('Task 3: should wait for element to disappear', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    await page.waitForSelector('#loading', { state: 'visible' });

    await page.click('#start button');

    // Wait for hidden
    await page.waitForSelector('#loading', { state: 'hidden' });

    // Verify result visible
    await expect(page.locator('#finish')).toBeVisible();

    console.log('✅ Task 3 completed');
  });

  /**
   * Task 4: waitForLoadState
   */
  test('Task 4: should wait for different load states', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Wait for load event
    await page.waitForLoadState('load');
    console.log('✓ Page loaded');

    // Wait for DOM content loaded
    await page.waitForLoadState('domcontentloaded');
    console.log('✓ DOM content loaded');

    // Wait for network idle
    await page.waitForLoadState('networkidle');
    console.log('✓ Network idle');

    console.log('✅ Task 4 completed');
  });

  /**
   * Task 5: waitForURL
   */
  test('Task 5: should wait for URL to change', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    await page.click('a:has-text("Login")');

    // Wait for URL
    await page.waitForURL('**/login');

    // Verify URL
    expect(page.url()).toContain('login');

    console.log('✅ Task 5 completed');
  });

  /**
   * Task 6: waitForFunction - Element Count
   */
  test('Task 6: should wait for element count', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Wait for at least 10 links
    await page.waitForFunction(() => {
      return document.querySelectorAll('a').length >= 10;
    });

    const linkCount = await page.locator('a').count();
    console.log(`Found ${linkCount} links`);

    expect(linkCount).toBeGreaterThanOrEqual(10);

    console.log('✅ Task 6 completed');
  });

  /**
   * Task 7: waitForFunction - Text Content
   */
  test('Task 7: should wait for text to change', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.click('#start button');

    // Wait for text to change
    await page.waitForFunction(() => {
      const element = document.querySelector('#finish h4');
      return element?.textContent === 'Hello World!';
    });

    await expect(page.locator('#finish h4')).toHaveText('Hello World!');

    console.log('✅ Task 7 completed');
  });

  /**
   * Task 8: waitForResponse
   */
  test('Task 8: should wait for API response', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Start waiting for response
    const responsePromise = page.waitForResponse('**/login');

    // Trigger navigation
    await page.click('a:has-text("Login")');

    // Await response
    const response = await responsePromise;

    // Verify response
    expect(response.ok()).toBeTruthy();

    console.log('✅ Task 8 completed');
  });

  /**
   * Task 9: waitForResponse with Condition
   */
  test('Task 9: should wait for specific API response', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Wait for specific response
    const responsePromise = page.waitForResponse(response =>
      response.url().includes('authenticate') && response.status() === 200
    );

    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // Trigger API call
    await page.click('button[type="submit"]');

    // Await response
    const response = await responsePromise;

    console.log('Response status:', response.status());

    console.log('✅ Task 9 completed');
  });

  /**
   * Task 10: Custom Timeout
   */
  test('Task 10: should use custom timeout for slow content', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/slow');

    // Wait with custom timeout
    await page.waitForSelector('h1', { timeout: 15000 });

    await expect(page.locator('h1')).toBeVisible();

    console.log('✅ Task 10 completed');
  });

  /**
   * Task 11: Handle Timeout Gracefully
   */
  test('Task 11: should handle wait timeout gracefully', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    try {
      // This will timeout
      await page.waitForSelector('#non-existent-element', {
        timeout: 2000
      });
    } catch (error) {
      console.log('⚠️ Timeout occurred as expected');
      expect(error).toBeDefined();
    }

    console.log('✅ Task 11 completed');
  });

  /**
   * Task 12: Combine Multiple Waits
   */
  test('Task 12: should combine multiple waits', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Wait for network idle
    await page.waitForLoadState('networkidle');

    // Wait for username visible
    await page.waitForSelector('#username', { state: 'visible' });

    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // Parallel wait for response and click
    const [response] = await Promise.all([
      page.waitForResponse('**/authenticate'),
      page.click('button[type="submit"]')
    ]);

    console.log('Response status:', response.status());

    // Wait for URL change
    await page.waitForURL('**/secure');

    console.log('✅ Task 12 completed');
  });

  /**
   * Task 13: waitForEvent - Console Message
   */
  test('Task 13: should wait for console message', async ({ page }) => {
    // Start waiting for console event
    const messagePromise = page.waitForEvent('console', msg =>
      msg.type() === 'log' && msg.text().includes('Ready')
    );

    await page.goto('https://practice.expandtesting.com');

    // Trigger console log
    await page.evaluate(() => {
      console.log('Ready');
    });

    // Await message
    const message = await messagePromise;

    console.log('Caught message:', message.text());

    console.log('✅ Task 13 completed');
  });

  /**
   * Task 14: No Manual Waits Pattern
   */
  test('Task 14: should demonstrate auto-wait is better than manual wait', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    // Click start
    await page.click('#start button');

    // Auto-wait (no manual timeout!)
    await expect(page.locator('#finish h4')).toHaveText('Hello World!');

    console.log('✅ Task 14 completed - Auto-wait is better!');
  });

  /**
   * BONUS Task 1: Complex waitForFunction
   */
  test('BONUS 1: should use complex waitForFunction', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    const minLinks = 10;
    const minHeadings = 3;

    // Wait for both conditions
    await page.waitForFunction((min1, min2) => {
      const linkCount = document.querySelectorAll('a').length;
      const headingCount = document.querySelectorAll('h2').length;
      return linkCount >= min1 && headingCount >= min2;
    }, minLinks, minHeadings);

    console.log('✅ BONUS 1 completed');
  });

  /**
   * BONUS Task 2: File Download Wait
   */
  test('BONUS 2: should wait for file download', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');

    // Start waiting for download
    const downloadPromise = page.waitForEvent('download');

    // Click download link
    await page.locator('a').first().click();

    // Await download
    const download = await downloadPromise;

    console.log('Download started:', await download.suggestedFilename());

    // Save download
    const filename = await download.suggestedFilename();
    await download.saveAs('test-results/downloads/' + filename);

    console.log('✅ BONUS 2 completed');
  });

  /**
   * BONUS Task 3: Comprehensive Wait Strategy
   */
  test('BONUS 3: should demonstrate comprehensive wait strategy', async ({ page }) => {
    // Navigate with network idle
    await page.goto('https://practice.expandtesting.com');
    await page.waitForLoadState('networkidle');

    // Wait for all load states
    await page.waitForLoadState('load');
    await page.waitForLoadState('domcontentloaded');

    // Click and wait for URL
    await page.click('a:has-text("Login")');
    await page.waitForURL('**/login');

    // Wait for form elements
    await page.waitForSelector('#username', { state: 'visible' });
    await page.waitForSelector('#password', { state: 'visible' });

    // Fill form
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // Wait for API response and submit
    const [response] = await Promise.all([
      page.waitForResponse('**/authenticate'),
      page.click('button[type="submit"]')
    ]);

    console.log('API response:', response.status());

    // Wait for success message with custom timeout
    await page.waitForSelector('.alert-success', {
      state: 'visible',
      timeout: 10000
    });

    console.log('✅ BONUS 3 completed');
  });

});

/**
 * KEY LEARNINGS FROM SOLUTIONS:
 *
 * 1. Auto-Wait (Preferred):
 *    - click(), fill() auto-wait for actionable
 *    - expect().toBeVisible() auto-waits
 *    - Use for 95% of cases
 *
 * 2. waitForSelector:
 *    - States: 'visible', 'hidden', 'attached', 'detached'
 *    - Use when: Need explicit control
 *    - Always specify timeout
 *
 * 3. waitForLoadState:
 *    - 'load' - Load event fired
 *    - 'domcontentloaded' - DOM ready
 *    - 'networkidle' - No requests for 500ms
 *    - Use when: Need page fully loaded
 *
 * 4. waitForURL:
 *    - Supports string patterns and regex
 *    - Use when: Waiting for navigation
 *    - Better than checking page.url()
 *
 * 5. waitForFunction:
 *    - Most flexible wait method
 *    - Pass arguments if needed
 *    - Use when: Custom conditions
 *
 * 6. waitForResponse:
 *    - Start waiting BEFORE action
 *    - Can filter by URL or condition
 *    - Use when: Need to verify API calls
 *
 * 7. waitForEvent:
 *    - Events: 'console', 'download', 'popup', 'request'
 *    - Start waiting BEFORE triggering
 *    - Use when: Waiting for browser events
 *
 * 8. Custom Timeouts:
 *    - Use { timeout: ms } option
 *    - Set reasonable timeouts
 *    - Default: actions 30s, assertions 5s
 *
 * 9. Error Handling:
 *    - Use try-catch for timeouts
 *    - Handle gracefully
 *    - Provide meaningful messages
 *
 * 10. Combining Waits:
 *     - Promise.all() for parallel waits
 *     - Start waits before actions
 *     - Chain waits logically
 *
 * 11. When to Use What:
 *     Standard action → Auto-wait ✅
 *     Custom condition → waitForFunction ✅
 *     Network request → waitForResponse ✅
 *     Navigation → waitForURL ✅
 *     Page load → waitForLoadState ✅
 *     Element state → waitForSelector ✅
 *     Browser event → waitForEvent ✅
 *
 * 12. Anti-Patterns:
 *     ❌ page.waitForTimeout() - hardcoded wait
 *     ❌ Guessing timeouts - use realistic values
 *     ❌ Not handling timeout errors
 *     ❌ Using explicit waits when auto-wait works
 *
 * 13. Best Practices:
 *     ✅ Trust auto-wait first
 *     ✅ Use explicit waits for specific needs
 *     ✅ Always set timeouts
 *     ✅ Start waits before actions
 *     ✅ Handle timeout errors
 *     ✅ Combine waits with Promise.all
 *     ✅ Choose appropriate wait method
 */
