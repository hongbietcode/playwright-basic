/**
 * Playwright Configuration for PRODUCTION Environment
 * Conservative configuration for production smoke tests
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../../../tests',

  fullyParallel: false, // Sequential in production
  forbidOnly: true,
  retries: 2, // More retries for production stability
  workers: 1, // Single worker - be careful in production

  reporter: [
    ['list'],
    ['html'],
    ['json', { outputFile: 'test-results/prod-results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],

  use: {
    // Production URL
    baseURL: 'https://practice.expandtesting.com',

    // Minimal capture to reduce overhead
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',

    headless: true,
    viewport: { width: 1920, height: 1080 },

    extraHTTPHeaders: {
      'X-Environment': 'production',
    },
  },

  // Longer timeouts for production
  timeout: 60000, // 60 seconds
  expect: {
    timeout: 10000,
  },

  // Full browser coverage in production
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      grep: /@smoke/, // Only smoke tests in production
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
      grep: /@smoke/,
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
      grep: /@smoke/,
    },
  ],
});
