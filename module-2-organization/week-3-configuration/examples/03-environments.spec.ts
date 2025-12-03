/**
 * Example: Environment Management
 * Demonstrates testing across different environments (dev/staging/prod)
 */

import { test, expect } from '@playwright/test';

test.describe('Environment-aware Tests', () => {
  test('detects current environment', async ({ page, baseURL }) => {
    let environment = 'unknown';

    if (baseURL?.includes('dev')) environment = 'dev';
    else if (baseURL?.includes('staging')) environment = 'staging';
    else environment = 'prod';

    console.log(`🌍 Environment: ${environment}`);
    console.log(`🔗 Base URL: ${baseURL}`);

    await page.goto('/');
    await expect(page).toHaveTitle(/Test Automation/);
  });

  test('uses environment-specific credentials', async ({ page }) => {
    // Credentials should come from environment variables
    const username = process.env.TEST_USERNAME || 'practice';
    const password = process.env.TEST_PASSWORD || 'SuperSecretPassword!';

    console.log(`🔐 Using credentials for: ${username}`);

    await page.goto('/login');
    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/secure/);
  });
});

test.describe('Environment-specific Behavior', () => {
  test('skip destructive tests in production', async ({ page, baseURL }) => {
    const isProduction = !baseURL?.includes('dev') && !baseURL?.includes('staging');

    test.skip(isProduction, 'Destructive test - skip in production');

    console.log('Running destructive test in non-production environment');

    await page.goto('/admin');
    // Destructive operations only safe in dev/staging
  });

  test('only run smoke tests in production', async ({ page, baseURL }) => {
    const isProduction = !baseURL?.includes('dev') && !baseURL?.includes('staging');

    if (!isProduction) {
      test.skip(true, 'Full test suite only in dev/staging');
    }

    console.log('Running smoke test (safe for production)');

    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('debug features only in dev', async ({ page, baseURL }) => {
    const isDev = baseURL?.includes('dev');

    test.skip(!isDev, 'Debug features only available in dev');

    console.log('Testing debug features in dev environment');

    await page.goto('/');
    // Check for debug toolbar or console
  });
});

test.describe('Environment-specific Timeouts', () => {
  test('adjust timeout based on environment', async ({ page, baseURL }) => {
    let navigationTimeout = 30000; // default

    if (baseURL?.includes('dev')) {
      navigationTimeout = 10000; // Dev is faster
    } else if (baseURL?.includes('staging')) {
      navigationTimeout = 20000; // Staging medium speed
    } else {
      navigationTimeout = 30000; // Production can be slower
    }

    console.log(`⏱️ Navigation timeout: ${navigationTimeout}ms`);

    await page.goto('/', { timeout: navigationTimeout });
    await expect(page.locator('h1')).toBeVisible();
  });

  test('slow test in staging/prod', async ({ baseURL }) => {
    const isSlow = !baseURL?.includes('dev');

    if (isSlow) {
      test.slow(); // Triple timeout
      console.log('Running in slow mode (staging/prod)');
    }

    // Test that might be slow in staging/prod
  });
});

test.describe('Environment-specific Data', () => {
  test('uses environment-specific test data', async ({ page, baseURL }) => {
    let testUser = {
      username: 'dev_user',
      email: 'dev@example.com',
    };

    if (baseURL?.includes('staging')) {
      testUser = {
        username: 'staging_user',
        email: 'staging@example.com',
      };
    } else if (!baseURL?.includes('dev')) {
      testUser = {
        username: 'prod_user',
        email: 'prod@example.com',
      };
    }

    console.log(`👤 Test user: ${testUser.username}`);

    await page.goto('/login');
    // Use environment-specific test data
  });

  test('environment-specific API endpoints', async ({ request, baseURL }) => {
    let apiURL = 'https://api.dev.example.com';

    if (baseURL?.includes('staging')) {
      apiURL = 'https://api.staging.example.com';
    } else if (!baseURL?.includes('dev')) {
      apiURL = 'https://api.example.com';
    }

    console.log(`🔌 API URL: ${apiURL}`);

    // Make API request to environment-specific endpoint
    // const response = await request.get(`${apiURL}/health`);
    // expect(response.ok()).toBeTruthy();
  });
});

test.describe('Feature Flags by Environment', () => {
  test('feature flag enabled in dev/staging', async ({ page, baseURL }) => {
    const featureEnabled = baseURL?.includes('dev') || baseURL?.includes('staging');

    console.log(`🚩 Feature X enabled: ${featureEnabled}`);

    await page.goto('/');

    if (featureEnabled) {
      // Test new feature in dev/staging
      console.log('Testing experimental feature');
    } else {
      // Feature not available in production yet
      console.log('Feature not yet in production');
    }
  });

  test('payment processing', async ({ page, baseURL }) => {
    const useRealPayment = !baseURL?.includes('dev') && !baseURL?.includes('staging');

    await page.goto('/checkout');

    if (useRealPayment) {
      console.log('Using REAL payment gateway (production)');
      // Real payment test
    } else {
      console.log('Using MOCK payment gateway (dev/staging)');
      // Mock payment test
    }
  });
});

test.describe('Environment Validation', () => {
  test.beforeAll(async () => {
    // Validate environment is properly configured
    const baseURL = process.env.BASE_URL;
    const apiKey = process.env.API_KEY;

    if (!baseURL) {
      throw new Error('BASE_URL environment variable is required');
    }

    console.log(`✅ Environment validated: ${baseURL}`);

    if (apiKey) {
      console.log('✅ API Key configured');
    }
  });

  test('environment health check', async ({ request, baseURL }) => {
    console.log(`🏥 Health check for: ${baseURL}`);

    // Check if environment is reachable
    try {
      const response = await request.get(`${baseURL}/`);
      expect(response.ok()).toBeTruthy();
      console.log('✅ Environment is healthy');
    } catch (error) {
      console.error('❌ Environment health check failed:', error);
      throw error;
    }
  });
});

test.describe('Environment-specific Logging', () => {
  test('verbose logging in dev', async ({ page, baseURL }) => {
    const isDev = baseURL?.includes('dev');

    if (isDev) {
      // Enable verbose logging in dev
      page.on('console', (msg) => console.log(`[Browser Console] ${msg.text()}`));
      page.on('request', (request) => console.log(`→ ${request.method()} ${request.url()}`));
      page.on('response', (response) =>
        console.log(`← ${response.status()} ${response.url()}`)
      );
    }

    await page.goto('/');
    await page.click('a:has-text("Login")');
  });

  test('minimal logging in production', async ({ page, baseURL }) => {
    const isProduction = !baseURL?.includes('dev') && !baseURL?.includes('staging');

    if (isProduction) {
      console.log('Production mode: minimal logging');
      // Only log errors in production
      page.on('pageerror', (error) => console.error('Page error:', error));
    }

    await page.goto('/');
  });
});

/*
KEY TAKEAWAYS:
1. Use environment variables for environment-specific configuration
2. Detect environment from baseURL or environment variables
3. Skip destructive tests in production with test.skip()
4. Adjust timeouts based on environment (dev faster, prod slower)
5. Use different test data per environment
6. Feature flags control which tests run in which environment
7. Validate environment before running tests
8. Logging verbosity should differ by environment

RUNNING TESTS ON DIFFERENT ENVIRONMENTS:
- TEST_ENV=dev npx playwright test
- TEST_ENV=staging npx playwright test
- TEST_ENV=prod npx playwright test --grep @smoke

OR with config files:
- npx playwright test --config=configs/playwright.config.dev.ts
- npx playwright test --config=configs/playwright.config.staging.ts
- npx playwright test --config=configs/playwright.config.prod.ts
*/
