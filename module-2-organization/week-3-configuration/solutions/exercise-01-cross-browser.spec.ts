/**
 * SOLUTION: Exercise 1 - Cross-browser Test Suite
 */

import { test, expect } from '@playwright/test';

test.describe('Exercise 1 Solution: Cross-browser Tests', () => {
  test('should work on all browsers', async ({ page, browserName }) => {
    console.log(`🌐 Running on: ${browserName}`);

    await page.goto('https://practice.expandtesting.com/');

    await expect(page).toHaveTitle(/Test Automation/);
    await expect(page.locator('h1')).toBeVisible();

    console.log(`✅ Test passed on ${browserName}`);
  });

  test('browser-specific feature', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Chromium-only test');

    console.log('Testing Chromium-specific CDP feature');

    await page.goto('https://practice.expandtesting.com/');

    // Chromium-specific: Chrome DevTools Protocol
    const client = await page.context().newCDPSession(page);
    await client.send('Network.enable');

    console.log('✅ CDP enabled in Chromium');
  });

  test('cross-browser screenshot', async ({ page, browserName }) => {
    await page.goto('https://practice.expandtesting.com/');

    const screenshotPath = `screenshots/exercise-${browserName}.png`;
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    console.log(`📸 Screenshot saved: ${screenshotPath}`);
  });

  test('handle browser differences', async ({ page, browserName }) => {
    await page.goto('https://practice.expandtesting.com/');

    // Simulate date input (most sites have them in forms)
    const dateInput = page.locator('input[type="date"]');

    // Check if date input exists
    const exists = await dateInput.count() > 0;

    if (exists) {
      if (browserName === 'webkit') {
        // Safari needs special handling
        console.log('Using WebKit-specific date handling');
        await dateInput.evaluate((el, value) => {
          (el as HTMLInputElement).value = value;
        }, '2024-01-15');
      } else {
        // Chromium and Firefox
        console.log('Using standard date handling');
        await dateInput.fill('2024-01-15');
      }

      console.log(`✅ Date set on ${browserName}`);
    } else {
      console.log('No date input found on this page');
    }
  });

  test('performance comparison', async ({ page, browserName }) => {
    const startTime = Date.now();

    await page.goto('https://practice.expandtesting.com/');

    const loadTime = Date.now() - startTime;
    console.log(`⚡ ${browserName} load time: ${loadTime}ms`);

    // Different expectations per browser
    if (browserName === 'chromium') {
      expect(loadTime).toBeLessThan(5000); // Chromium usually fastest
    } else if (browserName === 'firefox') {
      expect(loadTime).toBeLessThan(6000); // Firefox slightly slower
    } else if (browserName === 'webkit') {
      expect(loadTime).toBeLessThan(7000); // WebKit can be slower
    }

    console.log(`✅ Performance test passed for ${browserName}`);
  });
});

/*
SOLUTION EXPLANATION:

1. **All Browsers Test**:
   - Uses browserName fixture to log current browser
   - Standard assertions work across all browsers

2. **Browser-specific Test**:
   - Uses test.skip() to only run on Chromium
   - Tests CDP which is Chromium-exclusive

3. **Screenshot Test**:
   - Includes browser name in filename
   - Enables visual comparison across browsers

4. **Browser Differences**:
   - Detects browser and handles differently
   - WebKit uses .evaluate() for date inputs
   - Other browsers use standard .fill()

5. **Performance Test**:
   - Measures load time
   - Different thresholds per browser
   - Logs metrics for analysis

KEY LEARNINGS:
- Browser detection with browserName fixture
- Conditional logic for browser-specific code
- test.skip() for excluding browsers
- Different performance characteristics per browser
*/
