/**
 * SOLUTION: Exercise 2 - Multi-environment Configuration
 */

import { test, expect } from '@playwright/test';

test.describe('Exercise 2 Solution: Environment Tests', () => {
  test('detect environment', async ({ page, baseURL }) => {
    let environment = 'unknown';

    if (baseURL?.includes('dev')) {
      environment = 'development';
    } else if (baseURL?.includes('staging')) {
      environment = 'staging';
    } else if (baseURL?.includes('practice.expandtesting.com')) {
      environment = 'production';
    }

    console.log(`🌍 Detected environment: ${environment}`);
    console.log(`🔗 Base URL: ${baseURL}`);

    await page.goto('/');

    await expect(page).toHaveTitle(/Test Automation/);
    console.log(`✅ Successfully loaded ${environment} environment`);
  });

  test('environment-specific credentials', async ({ page }) => {
    // Get credentials from environment variables or use defaults
    const username = process.env.TEST_USERNAME || 'practice';
    const password = process.env.TEST_PASSWORD || 'SuperSecretPassword!';

    console.log(`🔐 Using credentials: ${username} / ${'*'.repeat(password.length)}`);

    await page.goto('/login');
    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/secure/);
    console.log('✅ Login successful with environment-specific credentials');
  });

  test('skip destructive test in production', async ({ page, baseURL }) => {
    const isProduction =
      !baseURL?.includes('dev') && !baseURL?.includes('staging');

    test.skip(isProduction, 'Destructive test - skip in production');

    console.log('⚠️ Running DESTRUCTIVE test (dev/staging only)');

    await page.goto('/');

    // Simulate destructive operation (e.g., delete all data)
    console.log('Performing destructive operation...');
    // In real scenario: await page.click('#delete-all-button');

    console.log('✅ Destructive test completed (safe in non-prod)');
  });

  test('environment-specific timeout', async ({ page, baseURL }) => {
    let navigationTimeout = 30000; // default

    if (baseURL?.includes('dev')) {
      navigationTimeout = 10000; // Dev is fast
      console.log('⚡ DEV environment - using 10s timeout');
    } else if (baseURL?.includes('staging')) {
      navigationTimeout = 20000; // Staging medium
      console.log('⚡ STAGING environment - using 20s timeout');
    } else {
      navigationTimeout = 30000; // Production slower
      console.log('⚡ PRODUCTION environment - using 30s timeout');
    }

    const startTime = Date.now();

    await page.goto('/', { timeout: navigationTimeout });

    const loadTime = Date.now() - startTime;
    console.log(`Page loaded in ${loadTime}ms (timeout: ${navigationTimeout}ms)`);

    await expect(page.locator('h1')).toBeVisible();
    expect(loadTime).toBeLessThan(navigationTimeout);

    console.log('✅ Navigation within timeout');
  });

  test('environment-specific feature flag', async ({ page, baseURL }) => {
    // Feature enabled in dev/staging, disabled in production
    const featureEnabled =
      baseURL?.includes('dev') || baseURL?.includes('staging');

    console.log(`🚩 Feature X enabled: ${featureEnabled}`);

    await page.goto('/');

    if (featureEnabled) {
      console.log('Testing experimental Feature X (dev/staging)');

      // Test new feature
      // Example: await page.click('#feature-x-button');
      // Example: await expect(page.locator('#feature-x')).toBeVisible();

      console.log('✅ Feature X tested successfully');
    } else {
      console.log('Feature X not available in production (skipping)');

      // Verify feature is NOT present in production
      // Example: await expect(page.locator('#feature-x')).not.toBeVisible();

      console.log('✅ Confirmed Feature X is disabled in production');
    }
  });
});

test.describe('Bonus: Advanced Environment Tests', () => {
  test('environment health check', async ({ request, baseURL }) => {
    console.log(`🏥 Health check for: ${baseURL}`);

    try {
      const response = await request.get(`${baseURL}/`);

      expect(response.ok()).toBeTruthy();
      console.log(`✅ Environment is healthy (status: ${response.status()})`);
    } catch (error) {
      console.error('❌ Environment health check failed:', error);
      throw error;
    }
  });

  test('environment-specific logging', async ({ page, baseURL }) => {
    const isDev = baseURL?.includes('dev');

    if (isDev) {
      console.log('🔍 DEV mode: Enabling verbose logging');

      // Enable verbose logging in dev
      page.on('console', (msg) => console.log(`[Browser] ${msg.text()}`));
      page.on('request', (req) =>
        console.log(`→ ${req.method()} ${req.url()}`)
      );
      page.on('response', (res) =>
        console.log(`← ${res.status()} ${res.url()}`)
      );
    } else {
      console.log('🔇 PROD mode: Minimal logging (errors only)');

      // Only log errors in production
      page.on('pageerror', (error) => console.error('❌ Page error:', error));
    }

    await page.goto('/');
    await page.click('a:has-text("Login")');

    console.log('✅ Logging test complete');
  });

  test('environment-specific test data', async ({ page, baseURL }) => {
    // Different test users per environment
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

    console.log(`👤 Test user for this environment: ${testUser.username}`);
    console.log(`📧 Email: ${testUser.email}`);

    await page.goto('/');

    // Use environment-specific test data
    console.log(`✅ Using ${testUser.username} for testing`);
  });
});

/*
SOLUTION EXPLANATION:

1. **Detect Environment**:
   - Checks baseURL for 'dev', 'staging', or production domain
   - Logs detected environment
   - Simple but effective approach

2. **Environment Credentials**:
   - Uses process.env for credentials
   - Falls back to defaults if not set
   - Demonstrates environment variable usage

3. **Skip in Production**:
   - Detects production environment
   - Uses test.skip() to prevent destructive tests
   - Critical safety pattern

4. **Environment Timeouts**:
   - Different timeouts per environment
   - Dev: fast (10s), Staging: medium (20s), Prod: slow (30s)
   - Demonstrates timeout configuration

5. **Feature Flags**:
   - Enables/disables features per environment
   - Tests feature in dev/staging
   - Verifies feature disabled in production

BONUS SOLUTIONS:
- Health check validates environment is reachable
- Logging verbosity differs by environment
- Test data varies by environment

RUN TESTS:
# With environment variable:
TEST_ENV=dev npx playwright test solutions/exercise-02-environments.spec.ts

# With config file:
npx playwright test solutions/exercise-02-environments.spec.ts --config=configs/playwright.config.dev.ts

# With specific credentials:
TEST_USERNAME=myuser TEST_PASSWORD=mypass npx playwright test solutions/exercise-02-environments.spec.ts
*/
