/**
 * Cross-browser Test Suite
 */

import { test, expect } from '@playwright/test';

test.describe('Cross-browser Tests @cross-browser', () => {
  test('should work on all browsers', async ({ page, browserName }) => {
    console.log(`🌐 Testing on: ${browserName}`);

    await page.goto('/');

    await expect(page).toHaveTitle(/Test Automation/);
    await expect(page.locator('h1')).toBeVisible();

    console.log(`✅ ${browserName} test passed`);
  });

  test('login on all browsers', async ({ page, browserName }) => {
    console.log(`🔐 Login test on: ${browserName}`);

    await page.goto('/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/secure/);
    console.log(`✅ Login successful on ${browserName}`);
  });

  test('performance comparison', async ({ page, browserName }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    console.log(`⚡ ${browserName} load time: ${loadTime}ms`);

    if (browserName === 'chromium') {
      expect(loadTime).toBeLessThan(5000);
    } else if (browserName === 'firefox') {
      expect(loadTime).toBeLessThan(6000);
    } else {
      expect(loadTime).toBeLessThan(7000);
    }
  });

  test('visual screenshot', async ({ page, browserName }) => {
    await page.goto('/');

    await page.screenshot({
      path: `screenshots/${browserName}-homepage.png`,
      fullPage: true,
    });

    console.log(`📸 Screenshot: ${browserName}-homepage.png`);
  });
});

test.describe('Browser-specific Tests', () => {
  test('Chromium CDP', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'CDP only in Chromium');

    await page.goto('/');

    const client = await page.context().newCDPSession(page);
    await client.send('Network.enable');

    console.log('✅ CDP enabled');
  });

  test('detect browser', async ({ page, browserName }) => {
    await page.goto('/');

    const userAgent = await page.evaluate(() => navigator.userAgent);
    console.log(`User Agent: ${userAgent}`);

    if (browserName === 'chromium') {
      expect(userAgent).toContain('Chrome');
    } else if (browserName === 'firefox') {
      expect(userAgent).toContain('Firefox');
    } else if (browserName === 'webkit') {
      expect(userAgent).toContain('Safari');
    }
  });
});
