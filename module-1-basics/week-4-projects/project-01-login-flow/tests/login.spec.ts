import { test, expect } from '@playwright/test';
import {
  login,
  loginAndWait,
  logout,
  navigateToLogin,
  verifyLoggedIn,
  verifyLoggedOut,
  getErrorMessage,
  getSuccessMessage,
} from './auth-helpers';

/**
 * PROJECT 1: Login Flow Testing
 *
 * Comprehensive test suite for authentication functionality
 *
 * Test Coverage:
 * - Valid login scenarios
 * - Invalid credentials handling
 * - Empty field validation
 * - Error message verification
 * - Session management
 * - Logout functionality
 *
 * Run: yarn test tests/login.spec.ts
 */

test.describe('Login Flow Testing', () => {

  test.beforeEach(async ({ page }) => {
    await navigateToLogin(page);
  });

  /**
   * Test 1: Valid Login
   * Verify successful login with valid credentials
   */
  test('should login successfully with valid credentials @smoke', async ({ page }) => {
    // Arrange
    const validUsername = 'practice';
    const validPassword = 'SuperSecretPassword!';

    // Act
    await loginAndWait(page, validUsername, validPassword);

    // Assert
    await verifyLoggedIn(page);

    const successMessage = await getSuccessMessage(page);
    expect(successMessage).toContain('secure area');

    console.log('✅ Valid login successful');
  });

  /**
   * Test 2: Invalid Username
   * Verify error message when username is invalid
   */
  test('should show error message with invalid username @negative', async ({ page }) => {
    // Arrange
    const invalidUsername = 'invaliduser';
    const validPassword = 'SuperSecretPassword!';

    // Act
    await login(page, invalidUsername, validPassword);

    // Assert
    const errorMessage = await getErrorMessage(page);
    expect(errorMessage).toContain('username is invalid');

    // Verify still on login page
    await expect(page).toHaveURL(/.*login/);

    console.log('✅ Invalid username handled correctly');
  });

  /**
   * Test 3: Invalid Password
   * Verify error message when password is invalid
   */
  test('should show error message with invalid password @negative', async ({ page }) => {
    // Arrange
    const validUsername = 'practice';
    const invalidPassword = 'wrongpassword';

    // Act
    await login(page, validUsername, invalidPassword);

    // Assert
    const errorMessage = await getErrorMessage(page);
    expect(errorMessage).toContain('password is invalid');

    // Verify still on login page
    await expect(page).toHaveURL(/.*login/);

    console.log('✅ Invalid password handled correctly');
  });

  /**
   * Test 4: Both Invalid Credentials
   * Verify error when both username and password are invalid
   */
  test('should show error with both invalid credentials @negative', async ({ page }) => {
    // Arrange
    const invalidUsername = 'invaliduser';
    const invalidPassword = 'wrongpassword';

    // Act
    await login(page, invalidUsername, invalidPassword);

    // Assert
    const errorMessage = await getErrorMessage(page);
    expect(errorMessage).toContain('invalid');

    await expect(page).toHaveURL(/.*login/);

    console.log('✅ Both invalid credentials handled');
  });

  /**
   * Test 5: Empty Credentials
   * Verify HTML5 validation or error message for empty fields
   */
  test('should require username and password fields @validation', async ({ page }) => {
    // Check HTML5 required attributes
    const usernameRequired = await page.locator('#username').getAttribute('required');
    const passwordRequired = await page.locator('#password').getAttribute('required');

    expect(usernameRequired).not.toBeNull();
    expect(passwordRequired).not.toBeNull();

    console.log('✅ Required field validation present');
  });

  /**
   * Test 6: Empty Username Only
   * Verify validation when only username is empty
   */
  test('should validate empty username @validation', async ({ page }) => {
    // Arrange
    const validPassword = 'SuperSecretPassword!';

    // Fill only password
    await page.fill('#password', validPassword);

    // Try to submit (will be blocked by HTML5 validation)
    await page.click('button[type="submit"]');

    // Verify still on login page (form didn't submit)
    await expect(page).toHaveURL(/.*login/);

    console.log('✅ Empty username validation works');
  });

  /**
   * Test 7: Logout Functionality
   * Verify successful logout flow
   */
  test('should logout successfully @smoke', async ({ page }) => {
    // Arrange - First login
    await loginAndWait(page, 'practice', 'SuperSecretPassword!');
    await verifyLoggedIn(page);

    // Act - Logout
    await logout(page);

    // Assert
    await verifyLoggedOut(page);

    // Verify logout message (if present)
    const message = await page.locator('.alert').textContent();
    if (message) {
      expect(message.toLowerCase()).toContain('logged out');
    }

    console.log('✅ Logout successful');
  });

  /**
   * Test 8: Session Persistence
   * Verify session persists after page refresh
   */
  test('should maintain session after page refresh @smoke', async ({ page }) => {
    // Arrange - Login first
    await loginAndWait(page, 'practice', 'SuperSecretPassword!');
    await verifyLoggedIn(page);

    // Act - Refresh page
    await page.reload();

    // Assert - Still logged in
    await expect(page).toHaveURL(/.*secure/);
    await expect(page.locator('h2')).toBeVisible();

    console.log('✅ Session persisted after refresh');
  });

  /**
   * Test 9: Login After Logout
   * Verify can login again after logging out
   */
  test('should allow login after logout @smoke', async ({ page }) => {
    // First login-logout cycle
    await loginAndWait(page, 'practice', 'SuperSecretPassword!');
    await logout(page);

    // Second login
    await loginAndWait(page, 'practice', 'SuperSecretPassword!');

    // Verify logged in again
    await verifyLoggedIn(page);

    console.log('✅ Login after logout successful');
  });

  /**
   * Test 10: UI Elements Verification
   * Verify all login form elements are present
   */
  test('should display all login form elements @ui', async ({ page }) => {
    // Verify page title/heading
    await expect(page.locator('h2')).toHaveText(/login/i);

    // Verify form fields
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();

    // Verify labels
    await expect(page.locator('label[for="username"]')).toBeVisible();
    await expect(page.locator('label[for="password"]')).toBeVisible();

    // Verify submit button
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();

    console.log('✅ All UI elements present');
  });

  /**
   * Test 11: Password Field Masking
   * Verify password input is masked (type="password")
   */
  test('should mask password input @security', async ({ page }) => {
    const passwordInput = page.locator('#password');

    // Verify type attribute
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Fill password
    await passwordInput.fill('TestPassword123');

    // Verify value exists but is masked in UI
    await expect(passwordInput).toHaveValue('TestPassword123');

    console.log('✅ Password is masked');
  });

  /**
   * Test 12: Username Case Sensitivity
   * Verify if username is case-sensitive
   */
  test('should handle username case sensitivity @edge-case', async ({ page }) => {
    // Try with uppercase username
    await login(page, 'PRACTICE', 'SuperSecretPassword!');

    // Check if login succeeds or fails
    // (This depends on the application's behavior)
    try {
      await page.waitForURL('**/secure', { timeout: 5000 });
      console.log('✅ Username is case-insensitive');
    } catch {
      const errorMessage = await getErrorMessage(page);
      expect(errorMessage).toContain('invalid');
      console.log('✅ Username is case-sensitive');
    }
  });

  /**
   * Test 13: Multiple Failed Login Attempts
   * Verify behavior after multiple failed attempts
   */
  test('should handle multiple failed login attempts @security', async ({ page }) => {
    // Attempt login 3 times with wrong credentials
    for (let i = 0; i < 3; i++) {
      await login(page, 'wronguser', 'wrongpass');

      // Wait a bit before next attempt
      await page.waitForTimeout(500);

      // Verify error message
      await expect(page.locator('.alert-danger')).toBeVisible();

      // Reload page for next attempt
      if (i < 2) {
        await page.reload();
      }
    }

    // Verify still on login page
    await expect(page).toHaveURL(/.*login/);

    console.log('✅ Multiple failed attempts handled');
  });

  /**
   * Test 14: Login Form Keyboard Navigation
   * Verify form can be submitted using Enter key
   */
  test('should submit form using Enter key @accessibility', async ({ page }) => {
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // Press Enter from password field
    await page.locator('#password').press('Enter');

    // Verify login successful
    await page.waitForURL('**/secure');
    await verifyLoggedIn(page);

    console.log('✅ Keyboard submission works');
  });

  /**
   * Test 15: Login Performance
   * Measure login flow performance
   */
  test('should complete login within reasonable time @performance', async ({ page }) => {
    const startTime = Date.now();

    await loginAndWait(page, 'practice', 'SuperSecretPassword!');

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`⏱️ Login completed in ${duration}ms`);

    // Verify completed within 5 seconds
    expect(duration).toBeLessThan(5000);

    console.log('✅ Login performance acceptable');
  });

});

/**
 * KEY LEARNINGS FROM PROJECT 1:
 *
 * 1. Test Organization:
 *    - Use describe blocks for grouping
 *    - Use beforeEach for setup
 *    - Use clear, descriptive test names
 *
 * 2. Helper Functions:
 *    - Extract reusable logic
 *    - Make tests more readable
 *    - Easier to maintain
 *
 * 3. Test Coverage:
 *    - Positive scenarios (happy path)
 *    - Negative scenarios (error cases)
 *    - Edge cases
 *    - Validation
 *    - Security
 *    - Performance
 *
 * 4. Assertions:
 *    - Verify navigation (toHaveURL)
 *    - Verify messages (toContain)
 *    - Verify element states
 *
 * 5. Best Practices:
 *    - Use tags (@smoke, @negative)
 *    - Clear test structure (Arrange-Act-Assert)
 *    - Good locator strategies
 *    - Trust auto-wait
 *    - Meaningful console logs
 */
