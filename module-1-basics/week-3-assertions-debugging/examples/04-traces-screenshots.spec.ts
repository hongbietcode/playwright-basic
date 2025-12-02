import { test, expect } from '@playwright/test';

/**
 * Example 04: Traces & Screenshots
 *
 * Demonstrates artifact generation:
 * - Capturing traces
 * - Taking screenshots
 * - Recording videos
 * - Attaching artifacts to reports
 *
 * Run: yarn test examples/04-traces-screenshots.spec.ts
 * With trace: yarn test examples/04-traces-screenshots.spec.ts --trace on
 * View trace: npx playwright show-trace trace.zip
 */

test.describe('Traces & Screenshots Examples', () => {

  test('should capture trace programmatically', async ({ page, context }) => {
    // Start tracing
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true
    });

    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/secure');

    // Stop tracing and save
    await context.tracing.stop({ path: 'test-results/trace.zip' });

    console.log('✅ Trace captured: test-results/trace.zip');
    console.log('📊 View with: npx playwright show-trace test-results/trace.zip');
  });

  test('should take full page screenshots', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Full page screenshot
    await page.screenshot({
      path: 'test-results/screenshots/homepage-full.png',
      fullPage: true
    });

    console.log('✅ Full page screenshot captured');
  });

  test('should take element screenshots', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Screenshot specific element
    await page.locator('.card').screenshot({
      path: 'test-results/screenshots/login-form.png'
    });

    // Screenshot button
    await page.locator('button[type="submit"]').screenshot({
      path: 'test-results/screenshots/submit-button.png'
    });

    console.log('✅ Element screenshots captured');
  });

  test('should capture screenshots at different points', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Before action
    await page.screenshot({ path: 'test-results/screenshots/step-1-initial.png' });

    await page.fill('#username', 'practice');
    await page.screenshot({ path: 'test-results/screenshots/step-2-username.png' });

    await page.fill('#password', 'SuperSecretPassword!');
    await page.screenshot({ path: 'test-results/screenshots/step-3-password.png' });

    await page.click('button[type="submit"]');
    await page.waitForURL('**/secure');
    await page.screenshot({ path: 'test-results/screenshots/step-4-success.png' });

    console.log('✅ Sequential screenshots captured');
  });

  test('should capture screenshot to buffer', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Get screenshot as buffer (useful for comparison)
    const buffer = await page.screenshot();

    console.log('Screenshot buffer size:', buffer.length, 'bytes');
    expect(buffer.length).toBeGreaterThan(0);

    console.log('✅ Screenshot buffer captured');
  });

  test('should attach screenshot to test report', async ({ page }, testInfo) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Take screenshot
    const screenshot = await page.screenshot();

    // Attach to test report
    await testInfo.attach('login-page', {
      body: screenshot,
      contentType: 'image/png'
    });

    console.log('✅ Screenshot attached to report');
  });

  test('should configure screenshot options', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // With options
    await page.screenshot({
      path: 'test-results/screenshots/with-options.png',
      fullPage: false,           // Viewport only
      clip: {                     // Crop to specific area
        x: 0,
        y: 0,
        width: 800,
        height: 600
      },
      quality: 80,                // JPEG quality (0-100)
      type: 'jpeg',               // 'png' | 'jpeg'
      animations: 'disabled'      // Disable animations
    });

    console.log('✅ Screenshot with options captured');
  });

  test('should demonstrate auto-screenshot on failure', async ({ page }) => {
    // Note: Configure in playwright.config.ts:
    // use: { screenshot: 'only-on-failure' }

    await page.goto('https://practice.expandtesting.com/login');

    // This will pass - no screenshot
    await expect(page.locator('h2')).toBeVisible();

    console.log('✅ Test passed - no auto-screenshot');

    // If test failed, screenshot would be auto-captured
  });

  test('should capture trace with custom options', async ({ page, context }) => {
    await context.tracing.start({
      screenshots: true,          // Capture screenshots
      snapshots: true,            // Capture DOM snapshots
      sources: true,              // Capture source code
    });

    await page.goto('https://practice.expandtesting.com/checkboxes');

    const checkboxes = page.locator('input[type="checkbox"]');
    await checkboxes.first().check();
    await checkboxes.last().check();

    await context.tracing.stop({
      path: 'test-results/checkboxes-trace.zip'
    });

    console.log('✅ Custom trace captured');
  });

  test('should use trace for debugging failed test', async ({ page, context }) => {
    await context.tracing.start({ screenshots: true, snapshots: true });

    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    // This passes
    await expect(page).toHaveURL(/.*secure/);

    await context.tracing.stop({ path: 'test-results/debug-trace.zip' });

    console.log('✅ Debug trace captured');
    console.log('💡 If test fails, trace shows exactly what happened');
  });

  test('should attach multiple artifacts', async ({ page }, testInfo) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Screenshot
    const screenshot = await page.screenshot();
    await testInfo.attach('screenshot', {
      body: screenshot,
      contentType: 'image/png'
    });

    // HTML content
    const html = await page.content();
    await testInfo.attach('page-html', {
      body: html,
      contentType: 'text/html'
    });

    // Custom JSON data
    const pageInfo = {
      url: page.url(),
      title: await page.title(),
      timestamp: new Date().toISOString()
    };
    await testInfo.attach('page-info', {
      body: JSON.stringify(pageInfo, null, 2),
      contentType: 'application/json'
    });

    console.log('✅ Multiple artifacts attached');
  });

  test('should compare screenshots (visual regression)', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Visual regression test (compares with baseline)
    // First run creates baseline, subsequent runs compare
    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixels: 100,         // Allow 100 pixels difference
      threshold: 0.2              // 20% threshold
    });

    console.log('✅ Visual regression test completed');
  });

  test('should mask sensitive data in screenshots', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Fill sensitive data
    await page.fill('#password', 'SecretPassword123');

    // Screenshot with masking
    await page.screenshot({
      path: 'test-results/screenshots/masked.png',
      mask: [page.locator('#password')]  // Password field will be masked
    });

    console.log('✅ Screenshot with masking captured');
  });

});

/**
 * Key Takeaways:
 *
 * 1. Traces:
 *    - context.tracing.start() / stop()
 *    - Captures: screenshots, DOM snapshots, network, console
 *    - View with: npx playwright show-trace trace.zip
 *    - Best for: Debugging failures, especially on CI
 *
 * 2. Screenshots:
 *    - page.screenshot() - Full page or viewport
 *    - locator.screenshot() - Specific element
 *    - Attach to reports with testInfo.attach()
 *    - Options: fullPage, clip, quality, type
 *
 * 3. Configuration:
 *    - In playwright.config.ts:
 *      * trace: 'on-first-retry' (recommended)
 *      * screenshot: 'only-on-failure'
 *      * video: 'retain-on-failure'
 *
 * 4. Use Cases:
 *    - Debugging: Trace everything
 *    - Visual regression: Compare screenshots
 *    - Evidence: Attach to reports
 *    - CI/CD: Auto-capture on failure
 *
 * 5. Best Practices:
 *    - Enable trace on CI (on-first-retry)
 *    - Screenshot on failure (auto)
 *    - Mask sensitive data
 *    - Attach important artifacts to reports
 *
 * 6. Viewing Artifacts:
 *    - Traces: npx playwright show-trace trace.zip
 *    - Screenshots: Check test-results/ folder
 *    - Videos: Check test-results/ folder
 *    - HTML Report: yarn report
 *
 * Next: 05-auto-waits.spec.ts
 */
