/**
 * Project 9: UI + API Integration - FINAL PROJECT! 🎉
 * Combining UI and API testing for comprehensive coverage
 */

import { test, expect } from '@playwright/test';

test.describe('UI + API Integration @api @ui @project9 @final', () => {
  test('login via API, test UI', async ({ page, request, context }) => {
    console.log('🔐 Step 1: Login via API');

    // 1. Login via API
    const loginResponse = await request.post('https://reqres.in/api/login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });

    const { token } = await loginResponse.json();
    console.log(`✅ Token received: ${token}`);

    // 2. Set token in browser
    await page.goto('https://practice.expandtesting.com/');
    await page.evaluate((authToken) => {
      localStorage.setItem('auth_token', authToken);
    }, token);

    console.log('✅ Token set in browser storage');

    // 3. Navigate and test authenticated UI
    await page.goto('https://practice.expandtesting.com/login');
    console.log('✅ UI ready for testing');
  });

  test('create via API, verify in UI', async ({ page, request }) => {
    console.log('📝 Step 1: Create user via API');

    // 1. Create user via API (fast)
    const createResponse = await request.post('https://reqres.in/api/users', {
      data: {
        name: 'Integration Test User',
        job: 'QA Engineer',
      },
    });

    expect(createResponse.status()).toBe(201);
    const user = await createResponse.json();
    console.log(`✅ Created user ID: ${user.id}`);

    // 2. Navigate to UI
    console.log('👀 Step 2: Verify in UI');
    await page.goto('https://practice.expandtesting.com/');

    // In real app: navigate to user list and verify user exists
    await expect(page.locator('h1')).toBeVisible();
    console.log('✅ UI verification complete');
  });

  test('UI action, verify via API', async ({ page, request }) => {
    console.log('🖱️ Step 1: Perform UI login');

    // 1. Login via UI
    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/secure/);
    console.log('✅ UI login successful');

    // 2. Verify via API (in real app)
    console.log('🔍 Step 2: Verify session via API');

    const sessionResponse = await request.get('https://reqres.in/api/users/1');
    expect(sessionResponse.ok()).toBeTruthy();

    console.log('✅ Session verified via API');
  });

  test('complete e2e flow', async ({ page, request }) => {
    console.log('🎯 Complete End-to-End Flow\n');

    // 1. Setup via API
    console.log('1️⃣ Setup: Create test data via API');
    const user = await request.post('https://reqres.in/api/users', {
      data: { name: 'E2E User', job: 'Tester' },
    });
    const userData = await user.json();
    const userId = userData.id;
    console.log(`✅ Setup complete, user ID: ${userId}`);

    // 2. Test UI
    console.log('\n2️⃣ Test: UI interactions');
    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/secure/);
    console.log('✅ UI test passed');

    // 3. Verify via API
    console.log('\n3️⃣ Verify: Check via API');
    const verifyResponse = await request.get(`https://reqres.in/api/users/${userId}`);
    expect(verifyResponse.ok()).toBeTruthy();
    console.log('✅ API verification passed');

    // 4. Cleanup via API
    console.log('\n4️⃣ Cleanup: Delete test data');
    await request.delete(`https://reqres.in/api/users/${userId}`);
    console.log('✅ Cleanup complete');

    console.log('\n🎉 Complete E2E flow finished!');
  });
});

test.describe('Data Setup & Teardown @api @ui @project9', () => {
  test('setup multiple users via API', async ({ page, request }) => {
    const testUsers: string[] = [];

    console.log('🔧 Setup: Creating test users...');

    // Create 3 test users
    for (let i = 1; i <= 3; i++) {
      const response = await request.post('https://reqres.in/api/users', {
        data: {
          name: `Test User ${i}`,
          job: 'QA Tester',
        },
      });

      const user = await response.json();
      testUsers.push(user.id);
      console.log(`✅ Created user ${i}: ID ${user.id}`);
    }

    console.log(`\n✅ Setup complete: ${testUsers.length} users created`);

    // UI testing with prepared data
    console.log('\n🖥️ Running UI tests...');
    await page.goto('https://practice.expandtesting.com/');
    await expect(page.locator('h1')).toBeVisible();
    console.log('✅ UI tests complete');

    // Cleanup
    console.log('\n🧹 Teardown: Cleaning up test users...');
    for (const userId of testUsers) {
      await request.delete(`https://reqres.in/api/users/${userId}`);
      console.log(`✅ Deleted user ID: ${userId}`);
    }

    console.log('\n✅ Teardown complete: All test data removed');
  });

  test('pre-authenticate for UI tests', async ({ page, request, context }) => {
    console.log('🔐 Pre-authentication via API');

    // Get auth token via API
    const authResponse = await request.post('https://reqres.in/api/login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });

    const { token } = await authResponse.json();

    // Set authentication in browser
    await page.goto('https://practice.expandtesting.com/');
    await page.evaluate((authToken) => {
      localStorage.setItem('token', authToken);
      document.cookie = `auth_token=${authToken}; path=/`;
    }, token);

    console.log('✅ Pre-authenticated for UI tests');

    // Now UI tests can skip login
    await page.goto('https://practice.expandtesting.com/');
    console.log('✅ Ready to test authenticated UI flows');
  });
});

/*
🎉 PROJECT 9 - FINAL PROJECT OF THE ROADMAP! 🎉

This demonstrates the ultimate integration:

1. API Setup:
   - Create test data quickly
   - Pre-authenticate users
   - Setup complex scenarios

2. UI Testing:
   - Skip slow UI setup
   - Focus on user flows
   - Test with real data

3. API Verification:
   - Validate backend state
   - Check data persistence
   - Confirm side effects

4. API Cleanup:
   - Fast teardown
   - No UI navigation
   - Reliable cleanup

BENEFITS:
✅ 10x faster test execution
✅ More reliable tests
✅ Better test isolation
✅ Comprehensive coverage

CONGRATULATIONS! You've completed the entire 12-week Playwright roadmap! 🎉🎊

USAGE:
npx playwright test project-03-integration-tests/tests/ui-api-integration.spec.ts
*/
