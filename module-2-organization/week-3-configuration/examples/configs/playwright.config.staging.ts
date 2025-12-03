/**
 * Playwright Configuration for STAGING Environment
 * Balanced configuration for pre-production testing
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../../../tests',

  fullyParallel: true,
  forbidOnly: true, // Fail if test.only() is used
  retries: 1, // Retry once on failure
  workers: 3, // Moderate parallelism

  reporter: [
    ['list'],
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  use: {
    // Staging URL
    baseURL: 'https://staging.practice.expandtesting.com',

    // Capture on failure
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',

    headless: true,
    viewport: { width: 1280, height: 720 },

    extraHTTPHeaders: {
      'X-Environment': 'staging',
    },
  },

  timeout: 45000, // 45 seconds
  expect: {
    timeout: 7500,
  },

  // Test on multiple browsers in staging
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
  ],
});
