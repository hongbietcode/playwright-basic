import { test, expect } from '@playwright/test';

/**
 * Example 07: Test Hooks
 *
 * Demonstrates test lifecycle hooks:
 * - beforeEach / afterEach (runs before/after each test)
 * - beforeAll / afterAll (runs once per file)
 * - Test isolation
 * - Custom fixtures
 * - Setup and teardown patterns
 *
 * Run: yarn test examples/07-test-hooks.spec.ts
 */

test.describe('Test Hooks Examples', () => {

  test.beforeEach(async ({ page }) => {
    // Runs before EACH test in this describe block
    console.log('🔧 beforeEach: Setting up test');
    await page.goto('https://practice.expandtesting.com/login');
  });

  test.afterEach(async ({ page }) => {
    // Runs after EACH test in this describe block
    console.log('🧹 afterEach: Cleaning up test');
    // Screenshot on failure is auto-captured by Playwright
  });

  test('should run with beforeEach setup', async ({ page }) => {
    // Page is already on login page (from beforeEach)
    await expect(page).toHaveURL(/.*login/);
    console.log('✅ Test 1: beforeEach setup worked');
  });

  test('should have fresh context', async ({ page }) => {
    // Each test gets fresh browser context (test isolation)
    await expect(page.locator('#username')).toHaveValue('');
    console.log('✅ Test 2: Fresh context confirmed');
  });

});

test.describe('beforeAll / afterAll Examples', () => {

  let sharedData: string;

  test.beforeAll(async () => {
    // Runs ONCE before all tests in this describe block
    console.log('🚀 beforeAll: One-time setup');
    sharedData = 'Shared test data';
  });

  test.afterAll(async () => {
    // Runs ONCE after all tests in this describe block
    console.log('🏁 afterAll: One-time cleanup');
  });

  test('should access shared data', async () => {
    expect(sharedData).toBe('Shared test data');
    console.log('✅ Shared data accessible');
  });

  test('should also access shared data', async () => {
    expect(sharedData).toBe('Shared test data');
    console.log('✅ Shared data still accessible');
  });

});

test.describe('Nested Hooks Examples', () => {

  test.beforeEach(async () => {
    console.log('🔧 Outer beforeEach');
  });

  test.afterEach(async () => {
    console.log('🧹 Outer afterEach');
  });

  test('should run outer hooks', async () => {
    console.log('  ▶ Test 1');
    expect(true).toBe(true);
  });

  test.describe('Inner describe block', () => {

    test.beforeEach(async () => {
      console.log('  🔧 Inner beforeEach');
    });

    test.afterEach(async () => {
      console.log('  🧹 Inner afterEach');
    });

    test('should run both outer and inner hooks', async () => {
      // Hook execution order:
      // 1. Outer beforeEach
      // 2. Inner beforeEach
      // 3. Test runs
      // 4. Inner afterEach
      // 5. Outer afterEach
      console.log('    ▶ Inner test');
      expect(true).toBe(true);
    });

  });

});

test.describe('Test Isolation Examples', () => {

  test('should have isolated browser context - Test 1', async ({ page, context }) => {
    // Each test gets its own browser context
    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'user1');

    // Store value in context storage
    await context.addCookies([{
      name: 'test_cookie',
      value: 'test1',
      url: 'https://practice.expandtesting.com'
    }]);

    console.log('✅ Test 1: Set cookie in context');
  });

  test('should have fresh context - Test 2', async ({ page, context }) => {
    // New test = new context (isolation)
    await page.goto('https://practice.expandtesting.com/login');

    // Cookie from previous test is NOT present
    const cookies = await context.cookies();
    const testCookie = cookies.find(c => c.name === 'test_cookie');
    expect(testCookie).toBeUndefined();

    console.log('✅ Test 2: Fresh context confirmed');
  });

});

test.describe('Setup and Teardown Patterns', () => {

  test('should demonstrate login setup pattern', async ({ page }) => {
    // Setup: Login
    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/secure');

    // Test: Verify logged in
    await expect(page.locator('.alert-success')).toBeVisible();

    // Teardown: Logout
    await page.click('a:has-text("Logout")');
    await expect(page).toHaveURL(/.*login/);

    console.log('✅ Setup-test-teardown pattern works');
  });

});

test.describe('Conditional Hooks Examples', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`🔧 Running test: ${testInfo.title}`);

    // Conditional setup based on test name
    if (testInfo.title.includes('admin')) {
      console.log('  → Admin setup');
    } else {
      console.log('  → Regular setup');
    }
  });

  test('should run regular user test', async ({ page }) => {
    expect(true).toBe(true);
    console.log('✅ Regular test completed');
  });

  test('should run admin user test', async ({ page }) => {
    expect(true).toBe(true);
    console.log('✅ Admin test completed');
  });

});

test.describe('Screenshot on Failure Hook', () => {

  test.afterEach(async ({ page }, testInfo) => {
    // Only screenshot if test failed
    if (testInfo.status === 'failed') {
      const screenshot = await page.screenshot();
      await testInfo.attach('failure-screenshot', {
        body: screenshot,
        contentType: 'image/png'
      });
      console.log('📸 Screenshot captured for failed test');
    }
  });

  test('should pass without screenshot', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');
    await expect(page.locator('h1')).toBeVisible();
    console.log('✅ Test passed - no screenshot');
  });

  test.skip('should fail with screenshot (skipped)', async ({ page }) => {
    // Skipped to avoid actual failure
    // If run, would trigger screenshot
    await page.goto('https://practice.expandtesting.com');
    await expect(page.locator('#non-existent')).toBeVisible();
  });

});

test.describe('Performance Tracking Hook', () => {

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({
      type: 'start-time',
      description: Date.now().toString()
    });
    console.log('⏱️ Started timing test');
  });

  test.afterEach(async ({}, testInfo) => {
    const startAnnotation = testInfo.annotations.find(a => a.type === 'start-time');
    if (startAnnotation) {
      const startTime = parseInt(startAnnotation.description);
      const duration = Date.now() - startTime;
      console.log(`⏱️ Test duration: ${duration}ms`);

      testInfo.annotations.push({
        type: 'duration',
        description: `${duration}ms`
      });
    }
  });

  test('should track test duration', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    console.log('✅ Test completed (check duration above)');
  });

});

test.describe('Retry-specific Hooks', () => {

  test.beforeEach(async ({}, testInfo) => {
    if (testInfo.retry > 0) {
      console.log(`🔄 Retry attempt ${testInfo.retry}`);
    }
  });

  test('should log retry attempts', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');
    await expect(page.locator('h1')).toBeVisible();
    console.log('✅ Test passed');
  });

});

test.describe('Database Cleanup Hook Example', () => {

  test.afterEach(async () => {
    // In real scenario, clean up test data
    console.log('🗑️ Cleaning up test data from database');
    // await database.deleteTestUser('test@example.com');
  });

  test('should create test user', async () => {
    // Test that creates data
    console.log('✅ User created (would be cleaned up)');
  });

});

test.describe('API Setup Hook Example', () => {

  let authToken: string;

  test.beforeAll(async ({ request }) => {
    // Get auth token once for all tests
    console.log('🔑 Getting auth token via API');

    // In real scenario:
    // const response = await request.post('/api/login', {
    //   data: { username: 'test', password: 'pass' }
    // });
    // const data = await response.json();
    // authToken = data.token;

    authToken = 'mock-token-123';
    console.log('✅ Auth token acquired');
  });

  test('should use shared auth token', async () => {
    expect(authToken).toBeDefined();
    console.log('✅ Token available:', authToken);
  });

});

/**
 * Key Takeaways:
 *
 * 1. beforeEach / afterEach:
 *    - Runs before/after EACH test
 *    - Use for: Page navigation, login, cleanup
 *    - Has access to page, context, testInfo
 *
 * 2. beforeAll / afterAll:
 *    - Runs ONCE per describe block
 *    - Use for: One-time setup, shared data
 *    - No access to page/context (they're test-specific)
 *
 * 3. Hook Execution Order:
 *    1. beforeAll (outer describe)
 *    2. beforeAll (inner describe)
 *    3. beforeEach (outer describe)
 *    4. beforeEach (inner describe)
 *    5. → Test runs
 *    6. afterEach (inner describe)
 *    7. afterEach (outer describe)
 *    8. afterAll (inner describe)
 *    9. afterAll (outer describe)
 *
 * 4. Test Isolation:
 *    - Each test gets fresh browser context
 *    - No state shared between tests
 *    - Ensures tests don't affect each other
 *
 * 5. Common Hook Patterns:
 *    - Login setup in beforeEach
 *    - Screenshot on failure in afterEach
 *    - Performance tracking with annotations
 *    - Conditional setup based on test name
 *    - Database cleanup in afterEach
 *    - API authentication in beforeAll
 *
 * 6. testInfo Object:
 *    - testInfo.title - Test name
 *    - testInfo.status - 'passed' | 'failed' | 'skipped'
 *    - testInfo.retry - Current retry attempt
 *    - testInfo.annotations - Custom metadata
 *    - testInfo.attach() - Attach files to report
 *
 * 7. Best Practices:
 *    - Keep hooks simple and fast
 *    - Use beforeEach for per-test setup
 *    - Use beforeAll for expensive operations
 *    - Always clean up in afterEach/afterAll
 *    - Log hook execution for debugging
 *    - Use test isolation (avoid shared state)
 *
 * 8. Anti-patterns to Avoid:
 *    ❌ Heavy operations in beforeEach
 *    ❌ Shared mutable state between tests
 *    ❌ Hooks that depend on test execution order
 *    ❌ Forgetting cleanup in afterEach
 *
 * Next: 08-test-organization.spec.ts
 */
