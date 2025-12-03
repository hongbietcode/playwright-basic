import { test, expect } from '@playwright/test';

/**
 * Example 04: Naming Convention Patterns
 * Run: yarn test examples/04-naming-patterns.spec.ts
 */

// ✅ GOOD - Descriptive describe block
test.describe('User Authentication Functionality', () => {

  // ✅ GOOD - Clear, behavior-focused test names
  test('should successfully login with valid credentials @smoke', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/secure/);
    console.log('✅ Valid login test passed');
  });

  test('should display error message when credentials are invalid @negative', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    await page.fill('#username', 'invalid');
    await page.fill('#password', 'wrong');
    await page.click('button[type="submit"]');
    await expect(page.locator('.alert-danger')).toBeVisible();
    console.log('✅ Invalid credentials test passed');
  });

  test('must require username field for form submission @validation', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    // Check HTML5 required attribute
    const required = await page.locator('#username').getAttribute('required');
    expect(required).not.toBeNull();
    console.log('✅ Required field validation test passed');
  });
});

// ✅ GOOD - Nested organization
test.describe('Shopping Cart Management', () => {

  test.describe('Add Items to Cart', () => {

    test('should add single product to cart @smoke', async () => {
      // Test implementation
      console.log('✅ Add single item test');
    });

    test('should add multiple products to cart', async () => {
      // Test implementation
      console.log('✅ Add multiple items test');
    });
  });

  test.describe('Remove Items from Cart', () => {

    test('should remove product from cart', async () => {
      // Test implementation
      console.log('✅ Remove item test');
    });
  });
});

// ✅ GOOD - Given-When-Then style
test.describe('Password Reset Flow', () => {

  test('given valid email, when requesting reset, then should send reset email', async ({ page }) => {
    // Test implementation
    console.log('✅ GWT style test');
  });

  test('given invalid email, when requesting reset, then should show error', async ({ page }) => {
    // Test implementation
    console.log('✅ GWT negative test');
  });
});

/**
 * Naming Convention Examples:
 *
 * ✅ GOOD Test Names:
 * - "should login successfully with valid credentials"
 * - "should display error when email format is invalid"
 * - "must require password field"
 * - "given valid user, when logging in, then should see dashboard"
 *
 * ❌ BAD Test Names:
 * - "login" (too vague)
 * - "test1" (meaningless)
 * - "check if user can login" (not behavior-focused)
 * - "testLogin" (technical, not descriptive)
 *
 * ✅ GOOD Tags:
 * @smoke - Critical path tests
 * @regression - Full regression suite
 * @negative - Negative test scenarios
 * @validation - Validation tests
 * @security - Security-related tests
 *
 * ✅ GOOD File Names:
 * login.spec.ts
 * user-registration.spec.ts
 * shopping-cart.spec.ts
 * password-reset.spec.ts
 *
 * ❌ BAD File Names:
 * Login.spec.ts (PascalCase)
 * testLogin.spec.ts (camelCase with test prefix)
 * test_login.spec.ts (snake_case)
 */

/**
 * Key Takeaways:
 * - Use descriptive test names (should/must/given-when-then)
 * - Tag tests for easy filtering
 * - kebab-case for file names
 * - PascalCase for class names
 * - camelCase for variables/functions
 * - Be consistent across the project
 */
