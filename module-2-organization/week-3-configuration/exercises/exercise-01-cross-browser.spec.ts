/**
 * EXERCISE 1: Cross-browser Test Suite
 *
 * OBJECTIVE:
 * Create tests that run on Chromium, Firefox, and WebKit.
 * Handle browser-specific differences gracefully.
 *
 * REQUIREMENTS:
 * 1. Create a test that works across all 3 browsers
 * 2. Create a browser-specific test that only runs on Chromium
 * 3. Take screenshots with browser name in filename
 * 4. Handle a known browser difference (e.g., date input)
 * 5. Measure and log performance per browser
 *
 * TODO: Implement the tests below
 * See solutions/exercise-01-cross-browser.spec.ts for complete solution
 */

import { test, expect } from '@playwright/test';

test.describe('Exercise 1: Cross-browser Tests', () => {
  test('should work on all browsers', async ({ page, browserName }) => {
    // TODO: Navigate to https://practice.expandtesting.com/
    // TODO: Log current browser name
    // TODO: Assert page title contains "Test Automation"
    // TODO: Assert h1 is visible
  });

  test('browser-specific feature', async ({ page, browserName }) => {
    // TODO: Skip if not Chromium
    // TODO: Navigate to a page
    // TODO: Test Chromium-specific feature
  });

  test('cross-browser screenshot', async ({ page, browserName }) => {
    // TODO: Navigate to https://practice.expandtesting.com/
    // TODO: Take screenshot with browser name in filename
    // TODO: Log screenshot path
  });

  test('handle browser differences', async ({ page, browserName }) => {
    // TODO: Navigate to a page with a date input
    // TODO: Handle date input differently based on browser
    // HINT: WebKit might need special handling
  });

  test('performance comparison', async ({ page, browserName }) => {
    // TODO: Measure page load time
    // TODO: Log performance metric
    // TODO: Assert load time is reasonable for the browser
  });
});

/*
HINTS:
- Use browserName fixture to detect current browser
- Use test.skip() to skip browser-specific tests
- Screenshots: page.screenshot({ path: `filename-${browserName}.png` })
- Performance: const start = Date.now(); ... const duration = Date.now() - start;
- Date inputs render differently: use .evaluate() for WebKit

RUN TESTS:
npx playwright test exercises/exercise-01-cross-browser.spec.ts --project=chromium
npx playwright test exercises/exercise-01-cross-browser.spec.ts --project=firefox
npx playwright test exercises/exercise-01-cross-browser.spec.ts --project=webkit
*/
