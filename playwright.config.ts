import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Đọc biến môi trường từ file .env
dotenv.config();

/**
 * Cấu hình Playwright Test (Playwright Test Configuration)
 * Tài liệu: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Thư mục chứa test files
  testDir: './',

  // Các pattern để match test files
  testMatch: '**/*.spec.ts',

  // Timeout cho mỗi test (milliseconds)
  timeout: 30 * 1000,

  // Expect timeout cho assertions
  expect: {
    timeout: 5000,
  },

  // Chạy tests song song (parallel)
  fullyParallel: true,

  // Fail build nếu có test.only trong CI
  forbidOnly: !!process.env.CI,

  // Số lần retry khi test fail
  retries: process.env.CI ? 2 : 0,

  // Số workers chạy song song
  workers: process.env.CI ? 1 : undefined,

  // Reporter - công cụ báo cáo kết quả test
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list'],
  ],

  // Cấu hình chung cho tất cả tests
  use: {
    // Base URL cho navigation
    baseURL: process.env.BASE_URL || 'https://practice.expandtesting.com',

    // Trace - ghi lại quá trình test để debug
    trace: 'on-first-retry',

    // Screenshot khi test fail
    screenshot: 'only-on-failure',

    // Video khi test fail
    video: 'retain-on-failure',

    // Action timeout
    actionTimeout: 10 * 1000,

    // Navigation timeout
    navigationTimeout: 30 * 1000,
  },

  // Projects - cấu hình cho từng browser/môi trường
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 },
      },
    },

    // Mobile browsers (tùy chọn - optional)
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // Tablet
    // {
    //   name: 'iPad',
    //   use: { ...devices['iPad Pro'] },
    // },
  ],

  // Web Server (tùy chọn - nếu cần chạy local dev server)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
