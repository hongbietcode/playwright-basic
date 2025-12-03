/**
 * EXERCISE 2: Multi-environment Configuration
 *
 * OBJECTIVE:
 * Create tests that adapt to different environments (dev/staging/prod).
 * Use environment variables and conditional logic.
 *
 * REQUIREMENTS:
 * 1. Detect current environment from baseURL
 * 2. Use environment-specific test data
 * 3. Skip destructive tests in production
 * 4. Adjust timeouts based on environment
 * 5. Log environment-specific information
 *
 * TODO: Implement the tests below
 * See solutions/exercise-02-environments.spec.ts for complete solution
 */

import { test, expect } from '@playwright/test';

test.describe('Exercise 2: Environment Tests', () => {
  test('detect environment', async ({ page, baseURL }) => {
    // TODO: Determine environment from baseURL
    // TODO: Log the detected environment
    // TODO: Navigate to baseURL
    // TODO: Assert page loads successfully
  });

  test('environment-specific credentials', async ({ page }) => {
    // TODO: Get credentials from environment variables or use defaults
    // HINT: const username = process.env.TEST_USERNAME || 'practice';
    // TODO: Login with environment-specific credentials
    // TODO: Assert login successful
  });

  test('skip destructive test in production', async ({ page, baseURL }) => {
    // TODO: Determine if environment is production
    // TODO: Skip test if in production using test.skip()
    // TODO: Perform destructive operation (if not production)
    // TODO: Log that destructive test ran
  });

  test('environment-specific timeout', async ({ page, baseURL }) => {
    // TODO: Set timeout based on environment
    // HINT: dev: 10s, staging: 20s, prod: 30s
    // TODO: Navigate with custom timeout
    // TODO: Assert page loaded
  });

  test('environment-specific feature flag', async ({ page, baseURL }) => {
    // TODO: Determine if feature is enabled in this environment
    // HINT: Feature enabled in dev/staging, disabled in prod
    // TODO: Conditionally test the feature
    // TODO: Log feature status
  });
});

/*
HINTS:
- Detect environment: baseURL?.includes('dev') || baseURL?.includes('staging')
- Environment variables: process.env.TEST_USERNAME
- Skip in prod: test.skip(isProduction, 'Skip in production')
- Timeouts: page.goto('/', { timeout: customTimeout })
- Feature flags: Use environment detection to enable/disable features

RUN TESTS:
TEST_ENV=dev npx playwright test exercises/exercise-02-environments.spec.ts
TEST_ENV=staging npx playwright test exercises/exercise-02-environments.spec.ts
TEST_ENV=prod npx playwright test exercises/exercise-02-environments.spec.ts

OR with config files:
npx playwright test exercises/exercise-02-environments.spec.ts --config=configs/playwright.config.dev.ts
*/
