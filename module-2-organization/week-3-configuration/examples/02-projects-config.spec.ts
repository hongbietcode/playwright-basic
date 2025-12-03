/**
 * Example: Playwright Projects Configuration
 * Demonstrates using projects for different configurations
 */

import { test, expect } from '@playwright/test';

test.describe('Project Configuration Examples', () => {
  test('detects current project', async ({ page }, testInfo) => {
    console.log(`📦 Running in project: ${testInfo.project.name}`);
    console.log(`🌐 Browser: ${testInfo.project.use.browserName}`);
    console.log(`🔗 Base URL: ${testInfo.project.use.baseURL}`);

    await page.goto('/');
    await expect(page).toHaveURL(/practice\.expandtesting\.com/);
  });

  test('uses project-specific base URL', async ({ page, baseURL }) => {
    console.log(`Using base URL: ${baseURL}`);

    // Navigate using relative path (uses baseURL from config)
    await page.goto('/login');

    await expect(page.locator('h2')).toBeVisible();
    console.log(`✅ Navigated to: ${page.url()}`);
  });

  test('project-specific timeout', async ({ page }, testInfo) => {
    const timeout = testInfo.project.timeout;
    console.log(`⏱️ Project timeout: ${timeout}ms`);

    await page.goto('/');

    // Timeout is configured per-project in playwright.config.ts
    expect(timeout).toBeGreaterThan(0);
  });
});

test.describe('Storage State per Project', () => {
  test('authenticated project uses saved state', async ({ page }, testInfo) => {
    // If project uses storageState, cookies/localStorage are pre-loaded
    const storageState = testInfo.project.use.storageState;
    console.log(`🔐 Storage state: ${storageState}`);

    await page.goto('/secure');

    // Should already be logged in if storageState is configured
    const isLoggedIn = await page.locator('a:has-text("Logout")').isVisible();
    console.log(`Logged in: ${isLoggedIn}`);
  });

  test('guest project has no auth', async ({ page }, testInfo) => {
    const storageState = testInfo.project.use.storageState;

    if (!storageState || JSON.stringify(storageState) === '{"cookies":[],"origins":[]}') {
      console.log('👤 Guest project (no authentication)');

      await page.goto('/login');
      await expect(page.locator('#username')).toBeVisible();
      console.log('✅ Login page accessible for guests');
    }
  });
});

test.describe('Device-specific Projects', () => {
  test('detects device viewport', async ({ page, viewport }) => {
    if (viewport) {
      console.log(`📱 Viewport: ${viewport.width}x${viewport.height}`);

      // Different assertions based on viewport size
      if (viewport.width < 768) {
        console.log('Mobile viewport detected');
        // Check mobile-specific elements
      } else if (viewport.width >= 768 && viewport.width < 1024) {
        console.log('Tablet viewport detected');
      } else {
        console.log('Desktop viewport detected');
      }
    }

    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('mobile vs desktop navigation', async ({ page, isMobile }) => {
    await page.goto('/');

    if (isMobile) {
      console.log('📱 Mobile device - checking hamburger menu');
      // Mobile might have hamburger menu
      const mobileMenu = page.locator('#mobile-menu, .hamburger');
      if (await mobileMenu.isVisible()) {
        await mobileMenu.click();
      }
    } else {
      console.log('💻 Desktop device - checking desktop nav');
      // Desktop has full navigation
      const desktopNav = page.locator('nav, #desktop-nav');
      await expect(desktopNav).toBeVisible();
    }
  });

  test('touch capability detection', async ({ hasTouch }) => {
    console.log(`👆 Touch enabled: ${hasTouch}`);

    if (hasTouch) {
      console.log('Device supports touch events');
      // Can use tap() instead of click()
    } else {
      console.log('Device uses mouse events');
      // Use click() as normal
    }
  });
});

test.describe('Test Filtering by Project', () => {
  test('smoke test @smoke', async ({ page }) => {
    // This test can be filtered by @smoke tag
    // Run with: npx playwright test --grep @smoke

    await page.goto('/');
    await expect(page).toHaveTitle(/Test Automation/);
    console.log('✅ Smoke test passed');
  });

  test('regression test @regression', async ({ page }) => {
    // This test can be filtered by @regression tag
    // Run with: npx playwright test --grep @regression

    await page.goto('/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/secure/);
    console.log('✅ Regression test passed');
  });

  test('e2e test @e2e', async ({ page }) => {
    // This test can be filtered by @e2e tag
    // Run with: npx playwright test --grep @e2e

    await page.goto('/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/secure/);

    await page.click('a:has-text("Logout")');
    await expect(page).toHaveURL(/login/);

    console.log('✅ E2E test passed');
  });
});

test.describe('Project-specific Retries', () => {
  test('flaky test with retry', async ({ page }, testInfo) => {
    console.log(`🔄 Retry attempt: ${testInfo.retry + 1}`);

    await page.goto('/');

    // Simulate flaky test (random failure)
    const shouldPass = Math.random() > 0.3;

    if (shouldPass) {
      await expect(page.locator('h1')).toBeVisible();
      console.log('✅ Test passed');
    } else {
      console.log('❌ Test failed, will retry if retries configured');
      throw new Error('Simulated flaky failure');
    }
  });
});

test.describe('Environment Detection from Project', () => {
  test('detects environment from baseURL', async ({ page, baseURL }) => {
    let environment = 'unknown';

    if (baseURL?.includes('dev')) {
      environment = 'development';
    } else if (baseURL?.includes('staging')) {
      environment = 'staging';
    } else if (baseURL?.includes('practice.expandtesting.com')) {
      environment = 'production';
    }

    console.log(`🌍 Environment: ${environment}`);
    console.log(`🔗 Base URL: ${baseURL}`);

    await page.goto('/');

    // Environment-specific logic
    if (environment === 'development') {
      console.log('Running in DEV - verbose logging enabled');
    } else if (environment === 'production') {
      console.log('Running in PROD - careful with destructive operations');
    }
  });
});

/*
KEY TAKEAWAYS:
1. Projects allow same tests to run with different configurations
2. Each project can have: different browser, baseURL, storageState, timeout, retries
3. Use testInfo.project to access current project configuration
4. Projects can be filtered with testMatch or grep patterns
5. Storage state enables per-project authentication
6. Device properties (viewport, isMobile, hasTouch) vary by project
7. Retry configuration can differ per project
8. Projects enable multi-environment testing (dev/staging/prod)

TO RUN SPECIFIC PROJECTS:
- npx playwright test --project=chromium
- npx playwright test --project=mobile
- npx playwright test --project=dev
- npx playwright test --grep @smoke --project=chromium
*/
