import { test, expect } from '@playwright/test';

/**
 * SOLUTION 02: Debugging Practice
 *
 * ĐÁP ÁN: Bài tập thực hành debugging
 *
 * This file contains complete working solutions for Exercise 02
 */

test.describe('Exercise 02: Debugging Practice - SOLUTIONS', () => {

  // Add afterEach hook for screenshot on failure
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      const screenshot = await page.screenshot();
      await testInfo.attach('failure-screenshot', {
        body: screenshot,
        contentType: 'image/png'
      });
      console.log('📸 Screenshot captured for failed test');
    }
  });

  /**
   * Task 1: Console Logging
   */
  test('Task 1: should add console logging for debugging', async ({ page }) => {
    console.log('🚀 Starting test');

    await page.goto('https://practice.expandtesting.com/login');

    console.log('📍 Current URL:', page.url());
    console.log('📍 Page title:', await page.title());

    await page.fill('#username', 'practice');
    console.log('✓ Username filled');

    await page.fill('#password', 'SuperSecretPassword!');
    console.log('✓ Password filled');

    await page.click('button[type="submit"]');
    console.log('✓ Form submitted');

    await page.waitForURL('**/secure');
    console.log('✓ Navigation complete');

    console.log('✅ Task 1 completed');
  });

  /**
   * Task 2: Test Steps
   */
  test('Task 2: should use test.step() for organized logs', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto('https://practice.expandtesting.com/login');
      console.log('✓ Navigation complete');
    });

    await test.step('Fill credentials', async () => {
      await page.fill('#username', 'practice');
      await page.fill('#password', 'SuperSecretPassword!');
      console.log('✓ Credentials filled');
    });

    await test.step('Submit form', async () => {
      await page.click('button[type="submit"]');
      await page.waitForURL('**/secure');
      console.log('✓ Form submitted');
    });

    await test.step('Verify success', async () => {
      await expect(page.locator('.alert-success')).toBeVisible();
      console.log('✓ Success verified');
    });

    console.log('✅ Task 2 completed');
  });

  /**
   * Task 3: Screenshots for Debugging
   */
  test('Task 3: should capture screenshots at key points', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Screenshot 1
    await page.screenshot({ path: 'test-results/screenshots/step-1-initial.png' });

    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // Screenshot 2
    await page.screenshot({ path: 'test-results/screenshots/step-2-filled.png' });

    await page.click('button[type="submit"]');
    await page.waitForURL('**/secure');

    // Screenshot 3 (full page)
    await page.screenshot({
      path: 'test-results/screenshots/step-3-success.png',
      fullPage: true
    });

    console.log('✅ Task 3 completed');
  });

  /**
   * Task 4: Log Element States
   */
  test('Task 4: should log element states', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const usernameInput = page.locator('#username');

    console.log('Username field state:');
    console.log('  - Visible:', await usernameInput.isVisible());
    console.log('  - Enabled:', await usernameInput.isEnabled());
    console.log('  - Editable:', await usernameInput.isEditable());
    console.log('  - Value:', await usernameInput.inputValue());

    await usernameInput.fill('testuser');

    console.log('After filling:');
    console.log('  - Value:', await usernameInput.inputValue());

    console.log('✅ Task 4 completed');
  });

  /**
   * Task 5: Measure Action Timings
   */
  test('Task 5: should measure action timings', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Measure navigation
    const navStart = Date.now();
    await page.goto('https://practice.expandtesting.com/login');
    const navTime = Date.now() - navStart;
    console.log(`⏱️ Navigation time: ${navTime}ms`);

    // Measure fill
    const fillStart = Date.now();
    await page.fill('#username', 'practice');
    const fillTime = Date.now() - fillStart;
    console.log(`⏱️ Fill time: ${fillTime}ms`);

    // Measure submission
    const submitStart = Date.now();
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/secure');
    const submitTime = Date.now() - submitStart;
    console.log(`⏱️ Submit + navigation time: ${submitTime}ms`);

    console.log('✅ Task 5 completed');
  });

  /**
   * Task 6: Capture Browser Console
   */
  test('Task 6: should capture browser console messages', async ({ page }) => {
    // Listen to browser console
    page.on('console', msg => {
      console.log(`🌐 BROWSER [${msg.type()}]: ${msg.text()}`);
    });

    await page.goto('https://practice.expandtesting.com');

    // Trigger console messages
    await page.evaluate(() => {
      console.log('Test message from browser');
      console.error('Test error');
      console.warn('Test warning');
    });

    console.log('✅ Task 6 completed');
  });

  /**
   * Task 7: Test Annotations
   */
  test('Task 7: should use annotations for metadata', async ({ page }, testInfo) => {
    // Add annotations
    testInfo.annotations.push({
      type: 'issue',
      description: 'BUG-123'
    });

    testInfo.annotations.push({
      type: 'feature',
      description: 'Login System'
    });

    testInfo.annotations.push({
      type: 'priority',
      description: 'P1'
    });

    const startTime = Date.now();

    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/secure');

    const duration = Date.now() - startTime;

    // Attach duration
    await testInfo.attach('duration', {
      body: `${duration}ms`,
      contentType: 'text/plain'
    });

    console.log('✅ Task 7 completed');
  });

  /**
   * Task 8: Screenshot on Failure
   */
  test('Task 8: should capture screenshot on failure', async ({ page }, testInfo) => {
    await page.goto('https://practice.expandtesting.com/login');

    await expect(page.locator('h2')).toBeVisible();

    // Note: Screenshot on failure is handled by afterEach hook above

    console.log('✅ Task 8 pattern demonstrated');
  });

  /**
   * Task 9: Nested Steps
   */
  test('Task 9: should create nested test steps', async ({ page }) => {
    await test.step('Setup test', async () => {
      await test.step('Navigate', async () => {
        await page.goto('https://practice.expandtesting.com/login');
      });

      await test.step('Wait for load', async () => {
        await page.waitForLoadState('networkidle');
      });
    });

    await test.step('Execute test', async () => {
      await page.fill('#username', 'practice');
      await page.fill('#password', 'SuperSecretPassword!');
      await page.click('button[type="submit"]');
    });

    await test.step('Verify results', async () => {
      await page.waitForURL('**/secure');
      await expect(page.locator('.alert-success')).toBeVisible();
    });

    console.log('✅ Task 9 completed');
  });

  /**
   * Task 10: Debug Failing Test (FIXED)
   */
  test('Task 10: should fix the failing test', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // FIXED: Corrected selector from '#usernamee' to '#username'
    await page.fill('#username', 'practice');

    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*secure/);

    console.log('✅ Task 10 completed');
  });

  /**
   * BONUS Task 1: Performance Tracking Hook
   */
  test('BONUS 1: should track test performance', async ({ page }, testInfo) => {
    // Add start time annotation
    const startTime = Date.now();
    testInfo.annotations.push({
      type: 'start-time',
      description: startTime.toString()
    });

    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/secure');

    // Calculate duration
    const duration = Date.now() - startTime;

    // Add duration annotation
    testInfo.annotations.push({
      type: 'duration',
      description: `${duration}ms`
    });

    console.log(`⏱️ Test duration: ${duration}ms`);

    console.log('✅ BONUS 1 completed');
  });

  /**
   * BONUS Task 2: Comprehensive Debug Test
   */
  test('BONUS 2: should use all debugging techniques', async ({ page }, testInfo) => {
    // Annotations
    testInfo.annotations.push(
      { type: 'issue', description: 'TEST-456' },
      { type: 'feature', description: 'Comprehensive Debugging' },
      { type: 'priority', description: 'P2' }
    );

    // Console listener
    page.on('console', msg => {
      console.log(`🌐 BROWSER [${msg.type()}]: ${msg.text()}`);
    });

    // Test with steps
    await test.step('Navigate and setup', async () => {
      const navStart = Date.now();
      await page.goto('https://practice.expandtesting.com/login');
      console.log(`⏱️ Navigation: ${Date.now() - navStart}ms`);

      await page.screenshot({ path: 'test-results/screenshots/bonus-step-1.png' });

      const usernameInput = page.locator('#username');
      console.log('Username visible:', await usernameInput.isVisible());
      console.log('Username enabled:', await usernameInput.isEnabled());
    });

    await test.step('Fill and submit', async () => {
      const fillStart = Date.now();
      await page.fill('#username', 'practice');
      await page.fill('#password', 'SuperSecretPassword!');
      console.log(`⏱️ Fill: ${Date.now() - fillStart}ms`);

      await page.screenshot({ path: 'test-results/screenshots/bonus-step-2.png' });

      const submitStart = Date.now();
      await page.click('button[type="submit"]');
      await page.waitForURL('**/secure');
      console.log(`⏱️ Submit: ${Date.now() - submitStart}ms`);
    });

    await test.step('Verify and capture', async () => {
      await expect(page.locator('.alert-success')).toBeVisible();

      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('final-screenshot', {
        body: screenshot,
        contentType: 'image/png'
      });

      const pageInfo = {
        url: page.url(),
        title: await page.title()
      };
      await testInfo.attach('page-info', {
        body: JSON.stringify(pageInfo, null, 2),
        contentType: 'application/json'
      });
    });

    console.log('✅ BONUS 2 completed');
  });

});

/**
 * KEY LEARNINGS FROM SOLUTIONS:
 *
 * 1. Console Logging:
 *    - Log at key checkpoints
 *    - Include context (URL, title, values)
 *    - Use emojis for visibility: 🚀 ✓ ⏱️ 📸
 *
 * 2. Test Steps:
 *    - Use test.step() for organization
 *    - Can be nested for hierarchy
 *    - Shows in trace viewer
 *    - Makes debugging easier
 *
 * 3. Screenshots:
 *    - Capture at key points
 *    - Use descriptive filenames
 *    - fullPage: true for complete view
 *    - Attach to test report
 *
 * 4. Element States:
 *    - Log visibility, enabled, editable
 *    - Log values before and after
 *    - Helps understand test failures
 *
 * 5. Timings:
 *    - Use Date.now() for measurement
 *    - Measure navigation, actions, API calls
 *    - Identify performance issues
 *
 * 6. Browser Console:
 *    - page.on('console') captures logs
 *    - msg.type() and msg.text()
 *    - Helps debug client-side issues
 *
 * 7. Annotations:
 *    - Add metadata for tracking
 *    - Visible in HTML report
 *    - Types: issue, feature, priority
 *
 * 8. Artifacts:
 *    - testInfo.attach() for files
 *    - Screenshots, JSON, text
 *    - Preserved in test results
 *
 * 9. Hooks:
 *    - afterEach for failure handling
 *    - Automatic screenshot on fail
 *    - Clean up resources
 *
 * 10. Best Practices:
 *     - Log at key points
 *     - Capture screenshots strategically
 *     - Use test.step() for clarity
 *     - Add annotations for tracking
 *     - Measure performance
 *     - Handle failures gracefully
 */
