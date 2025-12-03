/**
 * Login Tests using Page Object Model
 */

import { test, expect } from '../fixtures/pages.fixture';

test.describe('Login Tests with POM @pom', () => {
  test('should login successfully with valid credentials', async ({ loginPage, dashboardPage }) => {
    await loginPage.goto();
    await loginPage.login('practice', 'SuperSecretPassword!');

    // Verify redirected to dashboard
    expect(dashboardPage.isOnDashboard()).toBeTruthy();
    await expect(dashboardPage.page.locator('h2')).toContainText('Secure Area');
  });

  test('should show error with invalid username', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('invalid_user', 'SuperSecretPassword!');

    expect(await loginPage.hasErrorMessage()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain('invalid');
  });

  test('should show error with invalid password', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('practice', 'wrongpassword');

    expect(await loginPage.hasErrorMessage()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain('invalid');
  });

  test('should show error with empty fields', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.clickSubmit();

    // Empty fields should trigger validation or error
    expect(loginPage.isOnLoginPage()).toBeTruthy();
  });
});

test.describe('Dashboard Tests with POM @pom', () => {
  test('should display welcome message', async ({ authenticatedPage }) => {
    // Already logged in via fixture
    const welcomeMessage = await authenticatedPage.getWelcomeMessage();
    expect(welcomeMessage).toContain('Secure Area');

    expect(await authenticatedPage.hasLogoutButton()).toBeTruthy();
  });

  test('should logout successfully', async ({ authenticatedPage, loginPage }) => {
    // Already logged in via fixture
    expect(authenticatedPage.isOnDashboard()).toBeTruthy();

    await authenticatedPage.logout();

    // Verify redirected to login page
    expect(loginPage.isOnLoginPage()).toBeTruthy();
  });
});

test.describe('Session Tests with POM @pom', () => {
  test('should maintain session across pages', async ({ loginPage, dashboardPage }) => {
    await loginPage.goto();
    await loginPage.login('practice', 'SuperSecretPassword!');

    expect(dashboardPage.isOnDashboard()).toBeTruthy();

    // Navigate away and back
    await dashboardPage.navigate('https://practice.expandtesting.com/');
    await dashboardPage.goto();

    // Should still be logged in
    expect(await dashboardPage.hasLogoutButton()).toBeTruthy();
  });
});

/*
KEY BENEFITS OF POM:

1. **Maintainability**:
   - Locators defined once in page classes
   - Changes to UI require updates in one place

2. **Readability**:
   - Test reads like user actions
   - No technical details (locators) in tests

3. **Reusability**:
   - Page methods used across multiple tests
   - Common flows encapsulated

4. **Fixtures**:
   - Dependency injection for page objects
   - Automatic setup (e.g., authenticatedPage)

COMPARE TO NON-POM:
❌ await page.fill('#username', 'practice');
✅ await loginPage.fillUsername('practice');

❌ await page.locator('button[type="submit"]').click();
✅ await loginPage.clickSubmit();

❌ await page.fill('#username', 'user');
    await page.fill('#password', 'pass');
    await page.click('button[type="submit"]');
✅ await loginPage.login('user', 'pass');
*/
