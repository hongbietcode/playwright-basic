/**
 * CI-ready Tests
 * Optimized for continuous integration environments
 */

import { test, expect } from '@playwright/test';

test.describe('CI Smoke Tests @ci @smoke', () => {
  test('should load homepage', async ({ page }) => {
    console.log('✅ Running in CI environment');

    await page.goto('/');

    await expect(page).toHaveTitle(/Test Automation/);
    await expect(page.locator('h1')).toBeVisible();

    console.log('✅ Homepage loaded successfully');
  });

  test('should login successfully', async ({ page }) => {
    await page.goto('/login');

    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/secure/);
    await expect(page.locator('h2')).toContainText('Secure Area');

    console.log('✅ Login successful');
  });

  test('should handle navigation', async ({ page }) => {
    await page.goto('/');

    await page.click('a:has-text("Login")');
    await expect(page).toHaveURL(/login/);

    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();

    console.log('✅ Navigation works');
  });
});

test.describe('CI Reliability Tests @ci', () => {
  test('should wait for elements properly', async ({ page }) => {
    await page.goto('/');

    // Wait for element with explicit timeout
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

    console.log('✅ Element waiting works');
  });

  test('should handle slow networks', async ({ page }) => {
    // Longer timeout for CI
    await page.goto('/', { timeout: 30000 });

    await expect(page).toHaveTitle(/Test Automation/);

    console.log('✅ Handled slow network');
  });

  test('should be idempotent', async ({ page }) => {
    // Test can run multiple times with same result
    await page.goto('/');
    const title1 = await page.title();

    await page.goto('/');
    const title2 = await page.title();

    expect(title1).toBe(title2);

    console.log('✅ Test is idempotent');
  });
});

test.describe('CI Reporting Tests @ci', () => {
  test('should generate proper logs', async ({ page }, testInfo) => {
    console.log(`Test: ${testInfo.title}`);
    console.log(`Project: ${testInfo.project.name}`);

    await page.goto('/');

    console.log(`URL: ${page.url()}`);
    console.log(`✅ Logs generated`);
  });

  test('should capture failure artifacts', async ({ page }) => {
    await page.goto('/');

    // Take screenshot for CI artifacts
    await page.screenshot({
      path: 'test-results/ci-screenshot.png',
      fullPage: true,
    });

    console.log('✅ Artifacts captured');
  });
});
