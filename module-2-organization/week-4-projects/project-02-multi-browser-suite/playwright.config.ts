/**
 * Multi-browser Playwright Configuration
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  use: {
    baseURL: 'https://practice.expandtesting.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      timeout: 30000,
      retries: 1,
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
      timeout: 35000,
      retries: 1,
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
      timeout: 40000,
      retries: 2,
    },
  ],
});
