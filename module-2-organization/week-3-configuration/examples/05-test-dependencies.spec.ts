/**
 * Example: Test Dependencies and Execution Order
 * Demonstrates serial tests, setup/teardown, and test dependencies
 */

import { test, expect } from '@playwright/test';

// EXAMPLE 1: Parallel Tests (default behavior)
test.describe('Parallel Tests (default)', () => {
  test('test A runs in parallel', async ({ page }) => {
    console.log('⚡ Test A starting');
    await page.goto('https://practice.expandtesting.com/');
    await expect(page.locator('h1')).toBeVisible();
    console.log('✅ Test A complete');
  });

  test('test B runs in parallel', async ({ page }) => {
    console.log('⚡ Test B starting');
    await page.goto('https://practice.expandtesting.com/login');
    await expect(page.locator('h2')).toBeVisible();
    console.log('✅ Test B complete');
  });

  test('test C runs in parallel', async ({ page }) => {
    console.log('⚡ Test C starting');
    await page.goto('https://practice.expandtesting.com/');
    await expect(page).toHaveTitle(/Test Automation/);
    console.log('✅ Test C complete');
  });

  // All 3 tests run simultaneously in different workers
});

// EXAMPLE 2: Serial Tests (sequential execution)
test.describe.serial('Serial Tests (sequential)', () => {
  let sharedData: string;

  test('Step 1: Login', async ({ page }) => {
    console.log('🔵 Step 1: Login');

    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/secure/);

    // Save data for next test
    sharedData = 'user_session_123';
    console.log(`💾 Saved session: ${sharedData}`);
  });

  test('Step 2: Access Secure Area', async ({ page }) => {
    console.log('🔵 Step 2: Access Secure Area');
    console.log(`📖 Using session: ${sharedData}`);

    // This test uses data from Step 1
    expect(sharedData).toBe('user_session_123');

    await page.goto('https://practice.expandtesting.com/secure');
    await expect(page.locator('h2')).toContainText('Secure Area');
  });

  test('Step 3: Logout', async ({ page }) => {
    console.log('🔵 Step 3: Logout');

    await page.goto('https://practice.expandtesting.com/secure');
    await page.click('a:has-text("Logout")');

    await expect(page).toHaveURL(/login/);
    console.log('✅ All steps completed in order');
  });

  // These 3 tests run one after another, not in parallel
  // If one fails, subsequent tests are skipped
});

// EXAMPLE 3: Shopping Cart Workflow (serial)
test.describe.serial('Shopping Cart Workflow', () => {
  test('Add product to cart', async ({ page }) => {
    console.log('🛒 Step 1: Add product');

    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    const cartBadge = await page.locator('.shopping_cart_badge').textContent();
    expect(cartBadge).toBe('1');

    console.log('✅ Product added');
  });

  test('View cart', async ({ page }) => {
    console.log('🛒 Step 2: View cart');

    // Cart state preserved from previous test
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.click('.shopping_cart_link');

    const cartItems = await page.locator('.cart_item').count();
    expect(cartItems).toBeGreaterThan(0);

    console.log('✅ Cart viewed');
  });

  test('Checkout', async ({ page }) => {
    console.log('🛒 Step 3: Checkout');

    await page.goto('https://www.saucedemo.com/cart.html');
    await page.click('#checkout');

    await page.fill('#first-name', 'Test');
    await page.fill('#last-name', 'User');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');

    await page.click('#finish');

    await expect(page.locator('.complete-header')).toContainText('Thank you');
    console.log('✅ Checkout complete');
  });
});

// EXAMPLE 4: Setup and Teardown Hooks
test.describe('Hooks Example', () => {
  let setupData: string;

  test.beforeAll(async () => {
    console.log('🔧 beforeAll: Runs ONCE before all tests in this describe');
    setupData = 'global_data_123';
  });

  test.beforeEach(async ({ page }) => {
    console.log('🔧 beforeEach: Runs before EACH test');
    await page.goto('https://practice.expandtesting.com/');
  });

  test.afterEach(async ({ page }) => {
    console.log('🧹 afterEach: Runs after EACH test');
    // Cleanup after each test
  });

  test.afterAll(async () => {
    console.log('🧹 afterAll: Runs ONCE after all tests in this describe');
    // Global cleanup
  });

  test('Test 1', async ({ page }) => {
    console.log('🧪 Test 1 running');
    console.log(`Data from beforeAll: ${setupData}`);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Test 2', async ({ page }) => {
    console.log('🧪 Test 2 running');
    console.log(`Data from beforeAll: ${setupData}`);
    await expect(page).toHaveTitle(/Test Automation/);
  });

  // Execution order:
  // 1. beforeAll
  // 2. beforeEach → Test 1 → afterEach
  // 3. beforeEach → Test 2 → afterEach
  // 4. afterAll
});

// EXAMPLE 5: Conditional Test Skipping
test.describe('Conditional Tests', () => {
  let setupSuccess = false;

  test.beforeAll(async () => {
    console.log('🔧 Attempting setup...');

    try {
      // Simulate setup that might fail
      setupSuccess = true;
      console.log('✅ Setup successful');
    } catch (error) {
      console.error('❌ Setup failed');
      setupSuccess = false;
    }
  });

  test('depends on setup', async ({ page }) => {
    test.skip(!setupSuccess, 'Setup failed, skipping test');

    console.log('Running test that depends on setup');
    await page.goto('https://practice.expandtesting.com/');
  });
});

// EXAMPLE 6: Test with Cleanup
test.describe('Cleanup Example', () => {
  let createdResourceId: string | null = null;

  test('create resource', async ({ page }) => {
    console.log('📝 Creating resource...');

    await page.goto('https://practice.expandtesting.com/');

    // Simulate resource creation
    createdResourceId = `resource_${Date.now()}`;
    console.log(`✅ Created resource: ${createdResourceId}`);
  });

  test.afterAll(async () => {
    if (createdResourceId) {
      console.log(`🧹 Cleaning up resource: ${createdResourceId}`);
      // Delete the resource
      createdResourceId = null;
    }
  });
});

// EXAMPLE 7: Nested Describe Blocks with Serial
test.describe('Outer Describe', () => {
  test.beforeAll(() => {
    console.log('🔧 Outer beforeAll');
  });

  test('outer test', async ({ page }) => {
    console.log('🧪 Outer test');
    await page.goto('https://practice.expandtesting.com/');
  });

  test.describe.serial('Inner Serial Describe', () => {
    test.beforeAll(() => {
      console.log('🔧 Inner beforeAll');
    });

    test('inner test 1', async ({ page }) => {
      console.log('🧪 Inner test 1 (serial)');
      await page.goto('https://practice.expandtesting.com/login');
    });

    test('inner test 2', async ({ page }) => {
      console.log('🧪 Inner test 2 (serial)');
      await page.goto('https://practice.expandtesting.com/');
    });
  });
});

// EXAMPLE 8: Retry Behavior with Serial Tests
test.describe.serial('Serial with Retry', () => {
  test('test that might fail', async ({ page }, testInfo) => {
    console.log(`🔄 Attempt ${testInfo.retry + 1}`);

    await page.goto('https://practice.expandtesting.com/');

    // Simulate occasional failure
    const shouldPass = Math.random() > 0.2;

    if (shouldPass) {
      await expect(page.locator('h1')).toBeVisible();
      console.log('✅ Test passed');
    } else {
      console.log('❌ Test failed, will retry');
      throw new Error('Random failure');
    }
  });

  test('subsequent test in serial', async ({ page }) => {
    // This only runs if previous test passes
    console.log('🧪 Subsequent test running');
    await page.goto('https://practice.expandtesting.com/');
  });
});

/*
KEY TAKEAWAYS:
1. **Parallel (default)**: Tests run simultaneously in different workers
2. **Serial (test.describe.serial)**: Tests run one after another
3. **beforeAll**: Runs once before all tests in describe block
4. **beforeEach**: Runs before each test
5. **afterEach**: Runs after each test
6. **afterAll**: Runs once after all tests in describe block
7. **Shared state**: Variables can be shared in serial tests
8. **Cleanup**: Use afterAll/afterEach for cleanup
9. **Skip conditions**: Use test.skip() to conditionally skip tests
10. **Serial tests fail-fast**: If one fails, rest are skipped

WHEN TO USE SERIAL:
✅ Multi-step workflows (create → update → delete)
✅ Tests that share state or resources
✅ Setup/teardown dependencies

WHEN TO USE PARALLEL:
✅ Independent tests
✅ Faster execution
✅ Most tests should be parallel

EXECUTION ORDER:
Parallel:  Test A, Test B, Test C (all at once)
Serial:    Test A → Test B → Test C (one by one)

PROJECT DEPENDENCIES (in playwright.config.ts):
{
  name: 'tests',
  dependencies: ['setup'],  // Runs after 'setup' project
}
*/
