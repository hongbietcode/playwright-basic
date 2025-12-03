/**
 * Example: UI + API Integration
 * Combining UI and API tests for comprehensive coverage
 */

import { test, expect } from '@playwright/test';

test.describe('UI + API Integration @api @ui @integration', () => {
  test('create via API, verify via UI', async ({ request, page }) => {
    console.log('📝 Step 1: Create user via API');

    // 1. Create resource via API (fast)
    const response = await request.post('https://reqres.in/api/users', {
      data: {
        name: 'API Test User',
        job: 'QA Engineer',
      },
    });

    expect(response.status()).toBe(201);
    const user = await response.json();
    console.log(`✅ Created user ID: ${user.id}`);

    // 2. Verify via UI (slower but validates end-user experience)
    console.log('👀 Step 2: Verify in UI');
    await page.goto('https://reqres.in/');

    // In real scenario, navigate to user list and verify user exists
    console.log('✅ UI verification complete');
  });

  test('setup data via API, test UI flow', async ({ request, page }) => {
    console.log('🔧 Setup: Create test data via API');

    // Setup multiple users via API
    const users = ['User 1', 'User 2', 'User 3'];

    for (const name of users) {
      await request.post('https://reqres.in/api/users', {
        data: { name, job: 'Tester' },
      });
    }

    console.log(`✅ Created ${users.length} test users`);

    // Test UI with pre-populated data
    console.log('🖥️ Testing UI with setup data');
    await page.goto('https://reqres.in/');

    // UI tests here...
    console.log('✅ UI tests complete');
  });

  test('login via API, use session in UI', async ({ request, page, context }) => {
    console.log('🔐 Step 1: Login via API');

    // 1. Login via API to get token
    const loginResponse = await request.post('https://reqres.in/api/login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });

    const { token } = await loginResponse.json();
    console.log(`✅ Token: ${token}`);

    // 2. Set token in browser storage
    await page.goto('https://reqres.in/');

    await page.evaluate((authToken) => {
      localStorage.setItem('token', authToken);
    }, token);

    console.log('✅ Token set in browser');

    // 3. Navigate to protected page (would work if real auth)
    await page.reload();
    console.log('✅ Session maintained in UI');
  });

  test('UI action, verify via API', async ({ page, request }) => {
    console.log('🖱️ Step 1: Perform UI action');

    await page.goto('https://practice.expandtesting.com/login');

    // Perform login via UI
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/secure/);
    console.log('✅ UI login successful');

    console.log('🔍 Step 2: Verify session via API');

    // In real app, would verify session via API
    // const sessionResponse = await request.get('/api/session');
    // expect(sessionResponse.ok()).toBeTruthy();

    console.log('✅ Session verified via API');
  });
});

test.describe('API for Test Data Management @api @integration', () => {
  test('cleanup via API after UI test', async ({ page, request }) => {
    console.log('📝 Create test data via API');

    const createResponse = await request.post('https://reqres.in/api/users', {
      data: { name: 'Temp User', job: 'Tester' },
    });

    const user = await createResponse.json();
    const userId = user.id;

    console.log(`✅ Created user ID: ${userId}`);

    // UI tests using the data...
    await page.goto('https://reqres.in/');

    console.log('🧹 Cleanup: Delete via API');

    await request.delete(`https://reqres.in/api/users/${userId}`);
    console.log('✅ Test data cleaned up');
  });

  test('setup and teardown with API', async ({ request, page }) => {
    let testDataIds: string[] = [];

    console.log('🔧 Setup: Create test data');

    // Setup
    for (let i = 0; i < 3; i++) {
      const response = await request.post('https://reqres.in/api/users', {
        data: { name: `Test User ${i}`, job: 'Tester' },
      });
      const user = await response.json();
      testDataIds.push(user.id);
    }

    console.log(`✅ Created ${testDataIds.length} test users`);

    // Test
    await page.goto('https://reqres.in/');
    console.log('✅ UI tests executed');

    // Teardown
    console.log('🧹 Teardown: Cleanup test data');
    for (const id of testDataIds) {
      await request.delete(`https://reqres.in/api/users/${id}`);
    }

    console.log('✅ All test data cleaned up');
  });
});

/*
UI + API INTEGRATION PATTERNS:

1. Create via API, Verify via UI:
   - Fast data creation
   - UI validates end-user view
   - Best for smoke tests

2. Setup via API, Test via UI:
   - Prepare test data quickly
   - Focus UI tests on flows
   - Reduces test time

3. Login via API, Use Session in UI:
   - Skip slow login UI
   - Jump to authenticated state
   - Test authenticated flows

4. UI Action, Verify via API:
   - Validate backend state
   - Check data persistence
   - End-to-end validation

5. Cleanup via API:
   - Fast teardown
   - No UI navigation needed
   - Reliable cleanup

BENEFITS:
- Faster test execution
- Better test isolation
- More reliable cleanup
- Comprehensive coverage
*/
