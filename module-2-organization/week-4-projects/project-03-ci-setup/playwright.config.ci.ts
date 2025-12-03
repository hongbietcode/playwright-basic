/**
 * Playwright Configuration for CI/CD
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // CI optimizations
  fullyParallel: false, // Sequential for stability
  forbidOnly: true, // Fail if test.only() found
  retries: 2, // More retries in CI
  workers: 1, // Single worker for stability

  reporter: [
    ['list'],
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],

  use: {
    baseURL: 'https://practice.expandtesting.com',

    // Minimal capture in CI
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // CI environment
    headless: true,
    viewport: { width: 1280, height: 720 },
  },

  // Longer timeout for CI
  timeout: 60000,
  expect: {
    timeout: 10000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
