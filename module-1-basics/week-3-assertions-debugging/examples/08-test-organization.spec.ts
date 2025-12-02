import { test, expect } from '@playwright/test';

/**
 * Example 08: Test Organization
 *
 * Demonstrates test organization patterns:
 * - test.describe() for grouping
 * - test.step() for readable logs
 * - test.skip() / test.only() / test.fixme()
 * - Annotations and tags
 * - Test naming conventions
 * - Organizing test suites
 *
 * Run: yarn test examples/08-test-organization.spec.ts
 * Run specific: yarn test examples/08-test-organization.spec.ts -g "Login"
 * Run tagged: yarn test examples/08-test-organization.spec.ts --grep @smoke
 */

test.describe('Login Feature', () => {
  // Group related tests together

  test('should login with valid credentials @smoke', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*secure/);
    console.log('✅ Valid login works');
  });

  test('should show error with invalid credentials @negative', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'invalid');
    await page.fill('#password', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('.alert-danger')).toBeVisible();
    console.log('✅ Invalid login shows error');
  });

  test('should show error with empty credentials @negative', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    await page.click('button[type="submit"]');

    // Some validation should occur
    console.log('✅ Empty login handled');
  });

});

test.describe('Test Steps Examples', () => {

  test('should use test.step() for readable logs', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto('https://practice.expandtesting.com/login');
      await expect(page).toHaveURL(/.*login/);
      console.log('✓ Navigation complete');
    });

    await test.step('Fill login credentials', async () => {
      await page.fill('#username', 'practice');
      await page.fill('#password', 'SuperSecretPassword!');
      console.log('✓ Credentials filled');
    });

    await test.step('Submit login form', async () => {
      await page.click('button[type="submit"]');
      await page.waitForURL('**/secure');
      console.log('✓ Form submitted');
    });

    await test.step('Verify successful login', async () => {
      await expect(page.locator('.alert-success')).toBeVisible();
      console.log('✓ Login verified');
    });

    console.log('✅ Test with steps completed');
  });

  test('should nest test steps', async ({ page }) => {
    await test.step('Setup test', async () => {
      await test.step('Navigate', async () => {
        await page.goto('https://practice.expandtesting.com/login');
      });

      await test.step('Wait for page load', async () => {
        await page.waitForLoadState('networkidle');
      });
    });

    await test.step('Run test', async () => {
      await page.fill('#username', 'practice');
      await page.click('button[type="submit"]');
    });

    console.log('✅ Nested steps work');
  });

});

test.describe('Test Annotations', () => {

  test('should use annotations for metadata', async ({ page }, testInfo) => {
    // Add annotations
    testInfo.annotations.push({
      type: 'issue',
      description: 'https://github.com/issues/123'
    });

    testInfo.annotations.push({
      type: 'feature',
      description: 'User Authentication'
    });

    testInfo.annotations.push({
      type: 'priority',
      description: 'P1'
    });

    await page.goto('https://practice.expandtesting.com/login');
    await expect(page.locator('h2')).toBeVisible();

    console.log('✅ Annotations added to report');
  });

});

test.describe('Selective Test Execution', () => {

  test.skip('should skip this test', async ({ page }) => {
    // This test is skipped
    await page.goto('https://practice.expandtesting.com');
    console.log('This will not run');
  });

  test('should run normally', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');
    console.log('✅ This test runs');
  });

  test.only.skip('should demonstrate only + skip', async ({ page }) => {
    // Run with: yarn test file.spec.ts
    // Note: When .only is uncommented, ONLY tests with .only will run
    // Combine with .skip to skip even if .only is active
    await page.goto('https://practice.expandtesting.com');
  });

});

test.describe('Conditional Skipping', () => {

  test('should skip on condition', async ({ page, browserName }) => {
    // Skip on Firefox
    test.skip(browserName === 'firefox', 'Not supported on Firefox');

    await page.goto('https://practice.expandtesting.com');
    console.log('✅ Runs on Chrome/WebKit only');
  });

  test('should run only on Chromium', async ({ page, browserName }) => {
    // Only run on Chromium
    test.skip(browserName !== 'chromium', 'Chromium-only test');

    await page.goto('https://practice.expandtesting.com');
    console.log('✅ Chromium-only test');
  });

});

test.describe('Test Fixme', () => {

  test.fixme('should mark known failing test', async ({ page }) => {
    // Known issue - will be skipped
    await page.goto('https://practice.expandtesting.com');
    await expect(page.locator('#does-not-exist')).toBeVisible();
  });

});

test.describe('Test Fail', () => {

  test('should demonstrate test.fail()', async ({ page }) => {
    // Mark test as expected to fail
    test.fail();

    await page.goto('https://practice.expandtesting.com');
    // This assertion will fail, but test is marked as "expected to fail"
    // await expect(page.locator('#does-not-exist')).toBeVisible();

    // For demo, we'll pass instead
    await expect(page.locator('h1')).toBeVisible();
    console.log('✅ Test.fail() demonstrated');
  });

});

test.describe('Slow Tests', () => {

  test('should mark slow test', async ({ page }) => {
    test.slow(); // 3x timeout

    await page.goto('https://practice.expandtesting.com/slow');
    await expect(page.locator('h1')).toBeVisible();

    console.log('✅ Slow test completed');
  });

});

test.describe('Test Grouping by Feature', () => {

  test.describe('User Management', () => {

    test('should create user @crud @smoke', async () => {
      console.log('✅ User created');
    });

    test('should update user @crud', async () => {
      console.log('✅ User updated');
    });

    test('should delete user @crud', async () => {
      console.log('✅ User deleted');
    });

  });

  test.describe('Product Management', () => {

    test('should list products @smoke', async () => {
      console.log('✅ Products listed');
    });

    test('should search products @search', async () => {
      console.log('✅ Products searched');
    });

  });

});

test.describe('Test Naming Conventions', () => {

  // ✅ GOOD - Descriptive, follows pattern
  test('should display error message when form is submitted with empty email', async () => {
    console.log('✅ Good test name');
  });

  // ✅ GOOD - Uses Given-When-Then
  test('given logged in user, when viewing profile, then should see user details', async () => {
    console.log('✅ Good test name (GWT)');
  });

  // ❌ BAD - Too vague
  test.skip('test login', async () => {
    console.log('Bad test name');
  });

  // ❌ BAD - Too technical
  test.skip('should call validateForm() and return true', async () => {
    console.log('Bad test name');
  });

});

test.describe('Parameterized Tests', () => {

  const testUsers = [
    { username: 'practice', password: 'SuperSecretPassword!', shouldPass: true },
    { username: 'invalid', password: 'wrong', shouldPass: false },
  ];

  for (const user of testUsers) {
    test(`should login with ${user.username} (expect: ${user.shouldPass ? 'success' : 'failure'})`, async ({ page }) => {
      await page.goto('https://practice.expandtesting.com/login');
      await page.fill('#username', user.username);
      await page.fill('#password', user.password);
      await page.click('button[type="submit"]');

      if (user.shouldPass) {
        await expect(page).toHaveURL(/.*secure/);
      } else {
        await expect(page.locator('.alert-danger')).toBeVisible();
      }

      console.log(`✅ Test passed for ${user.username}`);
    });
  }

});

test.describe('Test Timeouts', () => {

  test('should use custom timeout for slow test', async ({ page }) => {
    test.setTimeout(60000); // 60 seconds

    await page.goto('https://practice.expandtesting.com/slow');
    await expect(page.locator('h1')).toBeVisible();

    console.log('✅ Custom timeout works');
  });

});

test.describe('Test Retries', () => {

  test('should demonstrate retry logic', async ({ page }, testInfo) => {
    if (testInfo.retry < testInfo.project.retries) {
      console.log(`Attempt ${testInfo.retry + 1}`);
    }

    await page.goto('https://practice.expandtesting.com');
    await expect(page.locator('h1')).toBeVisible();

    console.log('✅ Test passed');
  });

});

test.describe('Test Info Usage', () => {

  test('should access test metadata', async ({ page }, testInfo) => {
    console.log('Test info:');
    console.log('  Title:', testInfo.title);
    console.log('  File:', testInfo.file);
    console.log('  Line:', testInfo.line);
    console.log('  Column:', testInfo.column);
    console.log('  Retry:', testInfo.retry);
    console.log('  Project:', testInfo.project.name);

    await page.goto('https://practice.expandtesting.com');

    console.log('✅ Test metadata accessed');
  });

});

/**
 * Key Takeaways:
 *
 * 1. test.describe():
 *    - Group related tests
 *    - Can be nested
 *    - Improves organization and readability
 *    - Can have dedicated hooks
 *
 * 2. test.step():
 *    - Break test into logical steps
 *    - Shows in trace viewer
 *    - Improves debugging
 *    - Can be nested
 *    - Makes logs readable
 *
 * 3. Selective Execution:
 *    - test.skip() - Skip test
 *    - test.only() - Run only this test
 *    - test.fixme() - Known failing test
 *    - test.fail() - Expected to fail
 *    - test.slow() - 3x timeout
 *
 * 4. Tags:
 *    - Add tags with @tagname in test title
 *    - Run with: --grep @smoke
 *    - Exclude with: --grep-invert @skip
 *    - Common tags: @smoke, @regression, @negative, @crud
 *
 * 5. Annotations:
 *    - Add metadata to tests
 *    - Visible in HTML report
 *    - Types: issue, feature, priority, etc.
 *    - Use testInfo.annotations.push()
 *
 * 6. Test Naming:
 *    ✅ Should be descriptive and clear
 *    ✅ Use "should" or Given-When-Then
 *    ✅ Describe expected behavior
 *    ❌ Avoid vague names like "test login"
 *    ❌ Don't describe implementation
 *
 * 7. Test Organization Patterns:
 *    - Group by feature
 *    - Group by test type (smoke, regression)
 *    - Use describe blocks
 *    - Use consistent naming
 *    - Tag appropriately
 *
 * 8. Parameterized Tests:
 *    - Loop over test data
 *    - DRY (Don't Repeat Yourself)
 *    - Generate dynamic test names
 *    - Run same logic with different inputs
 *
 * 9. Conditional Logic:
 *    - test.skip(condition, reason)
 *    - Skip on specific browsers
 *    - Skip on specific environments
 *    - Always provide reason
 *
 * 10. Best Practices:
 *     - Keep tests focused (one thing per test)
 *     - Use descriptive names
 *     - Group related tests
 *     - Use tags for filtering
 *     - Add annotations for tracking
 *     - Use test.step() for complex tests
 *     - Set appropriate timeouts
 *     - Clean test data in hooks
 *
 * 11. Running Tests:
 *     - All: yarn test
 *     - File: yarn test file.spec.ts
 *     - Grep: yarn test -g "Login"
 *     - Tags: yarn test --grep @smoke
 *     - Exclude: yarn test --grep-invert @slow
 *     - UI Mode: yarn test:ui
 *     - Debug: yarn test --debug
 *
 * This completes Week 3 Examples! 🎉
 * Next: Exercises (Week 3)
 */
