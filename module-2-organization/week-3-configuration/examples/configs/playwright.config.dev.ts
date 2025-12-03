/**
 * Playwright Configuration for DEVELOPMENT Environment
 * Optimized for local development with fast feedback
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../../../tests',

  // Fast execution in dev
  fullyParallel: true,
  forbidOnly: false, // Allow test.only in dev
  retries: 0, // No retries - fail fast in dev
  workers: 5, // More workers for speed

  // Detailed reporting for debugging
  reporter: [
    ['list'],
    ['html', { open: 'on-failure' }],
  ],

  use: {
    // Development URL
    baseURL: 'https://dev.practice.expandtesting.com',

    // Always capture for debugging
    trace: 'on',
    video: 'on',
    screenshot: 'on',

    // Verbose logging
    headless: false, // Run headed for debugging
    viewport: { width: 1280, height: 720 },

    // Extra headers for dev
    extraHTTPHeaders: {
      'X-Environment': 'development',
    },
  },

  // Generous timeouts in dev
  timeout: 60000, // 60 seconds
  expect: {
    timeout: 10000,
  },

  // Only test on Chromium in dev for speed
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
