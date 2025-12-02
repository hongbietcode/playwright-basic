import { test, expect } from '@playwright/test';

/**
 * SOLUTION 01: Assertions Practice
 *
 * ĐÁP ÁN: Bài tập thực hành assertions
 *
 * This file contains complete working solutions for Exercise 01
 */

test.describe('Exercise 01: Assertions Practice - SOLUTIONS', () => {

  /**
   * Task 1: Element Visibility
   */
  test('Task 1: should verify all login page elements are visible', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://practice.expandtesting.com/login');

    // Assert all elements are visible
    await expect(page.locator('h2')).toBeVisible();
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    console.log('✅ Task 1 completed');
  });

  /**
   * Task 2: Text Assertions
   */
  test('Task 2: should verify text content', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Exact text match
    await expect(page.locator('h2')).toHaveText('Test login');

    // Contains text (case insensitive)
    await expect(page.locator('h2')).toHaveText(/login/i);

    // Page title
    await expect(page).toHaveTitle(/Practice/);

    console.log('✅ Task 2 completed');
  });

  /**
   * Task 3: Input Value Assertions
   */
  test('Task 3: should verify input values', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Fill username
    await page.fill('#username', 'testuser');
    await expect(page.locator('#username')).toHaveValue('testuser');

    // Fill password
    await page.fill('#password', 'password123');
    await expect(page.locator('#password')).toHaveValue('password123');

    // Clear username
    await page.fill('#username', '');
    await expect(page.locator('#username')).toHaveValue('');

    console.log('✅ Task 3 completed');
  });

  /**
   * Task 4: Checkbox State
   */
  test('Task 4: should verify checkbox states', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    const checkbox1 = page.locator('#checkbox1');

    // Check initial state
    const isChecked = await checkbox1.isChecked();
    if (isChecked) {
      await expect(checkbox1).toBeChecked();
    } else {
      await expect(checkbox1).not.toBeChecked();
    }

    // Check the checkbox
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();

    // Uncheck the checkbox
    await checkbox1.uncheck();
    await expect(checkbox1).not.toBeChecked();

    console.log('✅ Task 4 completed');
  });

  /**
   * Task 5: URL and Navigation
   */
  test('Task 5: should verify URL changes', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Exact URL
    await expect(page).toHaveURL('https://practice.expandtesting.com/');

    // Click login link
    await page.click('a:has-text("Login")');

    // URL with regex
    await expect(page).toHaveURL(/.*login$/);

    console.log('✅ Task 5 completed');
  });

  /**
   * Task 6: Element Count
   */
  test('Task 6: should count elements', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // Count checkboxes
    await expect(page.locator('input[type="checkbox"]')).toHaveCount(2);

    // No elements
    await expect(page.locator('.non-existent')).toHaveCount(0);

    console.log('✅ Task 6 completed');
  });

  /**
   * Task 7: Attribute Assertions
   */
  test('Task 7: should verify element attributes', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Verify input types
    await expect(page.locator('#username')).toHaveAttribute('type', 'text');
    await expect(page.locator('#password')).toHaveAttribute('type', 'password');

    // Verify attribute exists
    await expect(page.locator('button[type="submit"]')).toHaveAttribute('type');

    console.log('✅ Task 7 completed');
  });

  /**
   * Task 8: Negation Assertions
   */
  test('Task 8: should use negation assertions', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Not hidden
    await expect(page.locator('h2')).not.toBeHidden();

    // Does not have text
    await expect(page.locator('h2')).not.toHaveText('Wrong Title');

    // Does not have value
    await expect(page.locator('#username')).not.toHaveValue('anything');

    console.log('✅ Task 8 completed');
  });

  /**
   * Task 9: Auto-Wait with Dynamic Content
   */
  test('Task 9: should wait for dynamic content', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    // Click start button
    await page.click('#start button');

    // Auto-wait for element
    await expect(page.locator('#finish')).toBeVisible();

    // Auto-wait for text
    await expect(page.locator('#finish h4')).toHaveText('Hello World!');

    console.log('✅ Task 9 completed');
  });

  /**
   * Task 10: Custom Timeout
   */
  test('Task 10: should use custom timeout', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.click('#start button');

    // Custom timeout
    await expect(page.locator('#finish')).toBeVisible({ timeout: 10000 });

    console.log('✅ Task 10 completed');
  });

  /**
   * Task 11: Multiple Assertions
   */
  test('Task 11: should perform multiple assertions', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const usernameInput = page.locator('#username');

    // Multiple assertions
    await expect(usernameInput).toBeVisible();
    await expect(usernameInput).toBeEnabled();
    await expect(usernameInput).toBeEditable();
    await expect(usernameInput).toHaveValue('');

    console.log('✅ Task 11 completed');
  });

  /**
   * Task 12: CSS Class Assertion
   */
  test('Task 12: should verify CSS classes', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const submitButton = page.locator('button[type="submit"]');

    // CSS class
    await expect(submitButton).toHaveClass(/btn/);

    console.log('✅ Task 12 completed');
  });

  /**
   * BONUS Task: Login Flow with Assertions
   */
  test('BONUS: should complete full login flow with assertions', async ({ page }) => {
    // Navigate
    await page.goto('https://practice.expandtesting.com/login');

    // Verify title
    await expect(page).toHaveTitle(/Login/);

    // Fill credentials
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // Verify values
    await expect(page.locator('#username')).toHaveValue('practice');
    await expect(page.locator('#password')).toHaveValue('SuperSecretPassword!');

    // Submit
    await page.click('button[type="submit"]');

    // Wait for navigation
    await page.waitForURL('**/secure');

    // Verify success
    await expect(page.locator('.alert-success')).toBeVisible();

    console.log('✅ BONUS Task completed');
  });

});

/**
 * KEY LEARNINGS FROM SOLUTIONS:
 *
 * 1. Element Visibility:
 *    - toBeVisible() for visible elements
 *    - toBeHidden() or not.toBeVisible() for hidden
 *
 * 2. Text Assertions:
 *    - toHaveText() for exact match
 *    - toContainText() for partial match
 *    - Use regex for case-insensitive: /text/i
 *
 * 3. Value Assertions:
 *    - toHaveValue() for input values
 *    - Always fill() before asserting value
 *
 * 4. State Assertions:
 *    - toBeChecked() for checkboxes
 *    - toBeEnabled() for enabled state
 *    - toBeEditable() for editable inputs
 *
 * 5. Navigation:
 *    - toHaveURL() for URL assertions
 *    - toHaveTitle() for page title
 *    - Use regex for flexible matching
 *
 * 6. Count & Attributes:
 *    - toHaveCount() for element count
 *    - toHaveAttribute() for HTML attributes
 *    - toHaveClass() for CSS classes
 *
 * 7. Negation:
 *    - Use .not before assertion
 *    - not.toBeVisible(), not.toHaveText(), etc.
 *
 * 8. Auto-Wait:
 *    - Assertions automatically wait
 *    - No manual waits needed
 *    - Use custom timeout when needed
 *
 * 9. Multiple Assertions:
 *    - Chain multiple assertions on same element
 *    - Each assertion auto-waits independently
 *
 * 10. Best Practices:
 *     - Use descriptive test names
 *     - One logical assertion per test
 *     - Trust auto-wait mechanism
 *     - Use custom timeouts sparingly
 */
