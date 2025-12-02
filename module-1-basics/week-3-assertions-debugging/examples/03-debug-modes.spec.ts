import { test, expect } from '@playwright/test';

/**
 * Example 03: Debug Modes
 *
 * Demonstrates debugging techniques:
 * - Headed mode (see browser)
 * - Slow motion
 * - page.pause() for debugging
 * - Console logging
 * - Test info annotations
 *
 * Run with different modes:
 * - Normal: yarn test examples/03-debug-modes.spec.ts
 * - Headed: yarn test examples/03-debug-modes.spec.ts --headed
 * - UI Mode: yarn test:ui examples/03-debug-modes.spec.ts
 * - Debug: yarn test examples/03-debug-modes.spec.ts --debug
 */

test.describe('Debug Modes Examples', () => {

  test('should run in headed mode (visible browser)', async ({ page }) => {
    // Run with: yarn test examples/03-debug-modes.spec.ts --headed
    // You'll see the browser window!

    await page.goto('https://practice.expandtesting.com/login');

    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/secure');
    await expect(page.locator('.alert-success')).toBeVisible();

    console.log('✅ Headed mode - you should see the browser!');
  });

  test('should run with slow motion', async ({ page }) => {
    // Run with: SLOW_MO=1000 yarn test examples/03-debug-modes.spec.ts --headed
    // Actions will be slowed down

    await page.goto('https://practice.expandtesting.com/checkboxes');

    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();

    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).check();
      // With slow motion, you'll see each check slowly
    }

    console.log('✅ Slow motion mode');
  });

  test('should use console logging for debugging', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Log checkpoints
    console.log('📍 Checkpoint 1: Page loaded');
    console.log('Current URL:', page.url());
    console.log('Page title:', await page.title());

    await page.fill('#username', 'practice');
    console.log('📍 Checkpoint 2: Username filled');

    await page.fill('#password', 'SuperSecretPassword!');
    console.log('📍 Checkpoint 3: Password filled');

    await page.click('button[type="submit"]');
    console.log('📍 Checkpoint 4: Submit clicked');

    await page.waitForURL('**/secure');
    console.log('📍 Checkpoint 5: Navigated to secure page');

    console.log('✅ Console logging complete');
  });

  test('should capture and log page console messages', async ({ page }) => {
    // Listen to browser console
    page.on('console', msg => {
      console.log(`🌐 BROWSER LOG [${msg.type()}]:`, msg.text());
    });

    await page.goto('https://practice.expandtesting.com');

    // Any console.log from the page will be captured
    await page.evaluate(() => {
      console.log('Hello from the browser!');
      console.error('This is an error');
      console.warn('This is a warning');
    });

    console.log('✅ Browser console captured');
  });

  test('should use test.info() for annotations', async ({ page }, testInfo) => {
    // Add annotations visible in reports
    testInfo.annotations.push({
      type: 'issue',
      description: 'Related to BUG-123'
    });

    testInfo.annotations.push({
      type: 'performance',
      description: 'Should complete in < 5s'
    });

    const startTime = Date.now();

    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/secure');

    const duration = Date.now() - startTime;
    console.log(`⏱️ Test duration: ${duration}ms`);

    // Attach custom data
    testInfo.attach('duration', {
      body: `${duration}ms`,
      contentType: 'text/plain'
    });

    console.log('✅ Test info captured');
  });

  test('should take screenshots for debugging', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Screenshot before action
    await page.screenshot({ path: 'test-results/before-login.png' });
    console.log('📸 Screenshot taken: before-login.png');

    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // Screenshot before submit
    await page.screenshot({ path: 'test-results/before-submit.png' });
    console.log('📸 Screenshot taken: before-submit.png');

    await page.click('button[type="submit"]');
    await page.waitForURL('**/secure');

    // Screenshot after success
    await page.screenshot({ path: 'test-results/after-login.png', fullPage: true });
    console.log('📸 Screenshot taken: after-login.png');

    console.log('✅ Screenshots captured for debugging');
  });

  test('should log element states', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const usernameInput = page.locator('#username');

    // Log element state
    console.log('Username field state:');
    console.log('  - Visible:', await usernameInput.isVisible());
    console.log('  - Enabled:', await usernameInput.isEnabled());
    console.log('  - Editable:', await usernameInput.isEditable());
    console.log('  - Value:', await usernameInput.inputValue());

    await usernameInput.fill('testuser');

    console.log('After filling:');
    console.log('  - Value:', await usernameInput.inputValue());

    console.log('✅ Element states logged');
  });

  test('should measure action timings', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Measure navigation time
    const navStart = Date.now();
    await page.goto('https://practice.expandtesting.com/login');
    const navTime = Date.now() - navStart;
    console.log(`⏱️ Navigation time: ${navTime}ms`);

    // Measure fill time
    const fillStart = Date.now();
    await page.fill('#username', 'practice');
    const fillTime = Date.now() - fillStart;
    console.log(`⏱️ Fill time: ${fillTime}ms`);

    // Measure click time
    const clickStart = Date.now();
    await page.click('button[type="submit"]');
    await page.waitForURL('**/secure');
    const clickTime = Date.now() - clickStart;
    console.log(`⏱️ Submit + navigation time: ${clickTime}ms`);

    console.log('✅ Action timings measured');
  });

  test('should use step() for organized logging', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto('https://practice.expandtesting.com/login');
      console.log('✓ Navigated');
    });

    await test.step('Fill login form', async () => {
      await page.fill('#username', 'practice');
      await page.fill('#password', 'SuperSecretPassword!');
      console.log('✓ Form filled');
    });

    await test.step('Submit and verify', async () => {
      await page.click('button[type="submit"]');
      await page.waitForURL('**/secure');
      await expect(page.locator('.alert-success')).toBeVisible();
      console.log('✓ Login successful');
    });

    console.log('✅ Test steps completed');
  });

  test('should demonstrate test.skip for debugging', async ({ page }) => {
    // Skip this test (useful when debugging specific tests)
    // test.skip();

    await page.goto('https://practice.expandtesting.com');
    console.log('✅ This test runs (not skipped)');
  });

  test('should use test.fixme for known issues', async ({ page }) => {
    // Mark as fixme (will skip with special annotation)
    // test.fixme();

    await page.goto('https://practice.expandtesting.com');
    console.log('✅ This test runs (not marked as fixme)');
  });

  test('should demonstrate conditional test.fail', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Mark test as expected to fail (useful for known bugs)
    // test.fail();

    // Your test logic here
    await expect(page.locator('h2')).toBeVisible();

    console.log('✅ Test completed');
  });

});

/**
 * Key Takeaways:
 *
 * 1. Run Modes:
 *    - Normal: yarn test file.spec.ts
 *    - Headed: yarn test file.spec.ts --headed
 *    - UI Mode: yarn test:ui file.spec.ts
 *    - Debug: yarn test file.spec.ts --debug
 *    - Slow motion: SLOW_MO=1000 yarn test --headed
 *
 * 2. Console Logging:
 *    - console.log() for checkpoints
 *    - Log element states
 *    - Measure timings
 *    - Listen to browser console
 *
 * 3. Screenshots:
 *    - page.screenshot() at key points
 *    - Before/after actions
 *    - Full page screenshots
 *
 * 4. Test Info:
 *    - testInfo.annotations for metadata
 *    - testInfo.attach() for custom data
 *    - Visible in HTML report
 *
 * 5. Test Organization:
 *    - test.step() for structured logging
 *    - test.skip() to skip tests
 *    - test.fixme() for known issues
 *    - test.fail() for expected failures
 *
 * 6. Best Practices:
 *    - Use headed mode to see what's happening
 *    - Add console.log at key points
 *    - Take screenshots before/after actions
 *    - Use test.step() for clarity
 *
 * Next: 04-traces-screenshots.spec.ts
 */
