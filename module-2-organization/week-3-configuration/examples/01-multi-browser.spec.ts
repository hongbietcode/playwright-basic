/**
 * Example: Multi-browser Testing
 * Demonstrates running same tests across Chromium, Firefox, and WebKit
 */

import { test, expect } from '@playwright/test';

test.describe('Multi-browser Examples @all-browsers', () => {
  test('should work on all browsers', async ({ page, browserName }) => {
    console.log(`🌐 Running on: ${browserName}`);

    await page.goto('https://practice.expandtesting.com/');

    // Basic assertions work across all browsers
    await expect(page.locator('h1')).toBeVisible();
    await expect(page).toHaveTitle(/Test Automation/);

    console.log(`✅ Test passed on ${browserName}`);
  });

  test('browser-specific user agent', async ({ page, browserName }) => {
    await page.goto('https://practice.expandtesting.com/');

    const userAgent = await page.evaluate(() => navigator.userAgent);
    console.log(`User Agent (${browserName}):`, userAgent);

    // Different browsers have different user agents
    if (browserName === 'chromium') {
      expect(userAgent).toContain('Chrome');
    } else if (browserName === 'firefox') {
      expect(userAgent).toContain('Firefox');
    } else if (browserName === 'webkit') {
      expect(userAgent).toContain('Safari');
    }
  });

  test('login works across browsers', async ({ page, browserName }) => {
    console.log(`Testing login on ${browserName}`);

    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/secure/);
    await expect(page.locator('.alert-success')).toBeVisible();

    console.log(`✅ Login successful on ${browserName}`);
  });
});

test.describe('Browser-specific Tests', () => {
  test('Chromium-only: Chrome DevTools Protocol', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'CDP only available in Chromium');

    await page.goto('https://practice.expandtesting.com/');

    // Chromium-specific: Access Chrome DevTools Protocol
    const client = await page.context().newCDPSession(page);
    await client.send('Network.enable');

    console.log('✅ CDP enabled in Chromium');
  });

  test('Firefox-only: Gecko specific test', async ({ browserName }) => {
    test.skip(browserName !== 'firefox', 'Firefox-only test');

    console.log('Running Firefox-specific logic');
    // Firefox-specific test logic here
  });

  test('WebKit-only: Safari specific test', async ({ page, browserName }) => {
    test.skip(browserName !== 'webkit', 'Safari-only test');

    // WebKit might need extra wait time
    test.slow();

    await page.goto('https://practice.expandtesting.com/');
    await page.waitForTimeout(1000); // Extra wait for Safari

    console.log('✅ WebKit test complete');
  });
});

test.describe('Cross-browser Screenshots', () => {
  test('visual comparison', async ({ page, browserName }) => {
    await page.goto('https://practice.expandtesting.com/');

    // Take screenshot with browser name
    await page.screenshot({
      path: `screenshots/homepage-${browserName}.png`,
      fullPage: true,
    });

    console.log(`📸 Screenshot saved: homepage-${browserName}.png`);
  });

  test('visual regression test', async ({ page, browserName }) => {
    await page.goto('https://practice.expandtesting.com/');

    // Visual regression testing per browser
    await expect(page).toHaveScreenshot(`homepage-${browserName}.png`, {
      maxDiffPixels: 100, // Allow small differences
    });
  });
});

test.describe('Browser Differences Handling', () => {
  test('date input across browsers', async ({ page, browserName }) => {
    await page.goto('https://practice.expandtesting.com/');

    // Date pickers render differently across browsers
    const dateInput = page.locator('input[type="date"]');

    if (browserName === 'webkit') {
      // Safari might need special handling
      await dateInput.evaluate((el, value) => {
        (el as HTMLInputElement).value = value;
      }, '2024-01-15');
    } else {
      // Chromium and Firefox
      await dateInput.fill('2024-01-15');
    }

    console.log(`Date set on ${browserName}`);
  });

  test('performance across browsers', async ({ page, browserName }) => {
    const startTime = Date.now();

    await page.goto('https://practice.expandtesting.com/');

    const loadTime = Date.now() - startTime;
    console.log(`${browserName} load time: ${loadTime}ms`);

    // Different browsers have different performance characteristics
    if (browserName === 'chromium') {
      expect(loadTime).toBeLessThan(3000); // Chromium usually fastest
    } else if (browserName === 'webkit') {
      expect(loadTime).toBeLessThan(5000); // WebKit can be slower
    }
  });
});

test.describe('Browser-specific Annotations', () => {
  test('flaky on specific browser', async ({ page, browserName }) => {
    test.fixme(browserName === 'webkit', 'Known issue on Safari');

    await page.goto('https://practice.expandtesting.com/');
    // Test logic
  });

  test('slow on specific browser', async ({ page, browserName }) => {
    test.slow(browserName === 'firefox', 'Animation slower on Firefox');

    await page.goto('https://practice.expandtesting.com/');
    // Test with animations
  });

  test('expected failure', async ({ page, browserName }) => {
    test.fail(browserName === 'webkit', 'File upload broken on Safari');

    await page.goto('https://practice.expandtesting.com/upload');
    // File upload test that fails on Safari
  });
});

/*
KEY TAKEAWAYS:
1. Same test code runs on multiple browsers with Playwright projects
2. Use browserName fixture to detect current browser
3. Handle browser-specific differences with conditional logic
4. Use test.skip(), test.fixme(), test.fail() for browser-specific issues
5. Screenshots can include browser name for visual comparison
6. CDP (Chrome DevTools Protocol) only available in Chromium
7. Different browsers have different performance characteristics
8. Test both common features and browser-specific behaviors
*/
