import { test, expect } from '@playwright/test';

/**
 * Example 01: Basic Assertions
 *
 * Demonstrates fundamental assertions:
 * - Element visibility (toBeVisible, toBeHidden)
 * - Text assertions (toHaveText, toContainText)
 * - Value assertions (toHaveValue)
 * - State assertions (toBeEnabled, toBeChecked, toBeFocused)
 *
 * Run: yarn test examples/01-basic-assertions.spec.ts
 */

test.describe('Basic Assertions Examples', () => {

  test('should verify element visibility', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Verify elements are visible
    await expect(page.locator('h2')).toBeVisible();
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    console.log('✅ All elements are visible');
  });

  test('should verify element is hidden', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dynamic-loading');

    // Initially, the result is hidden
    await expect(page.locator('#finish')).toBeHidden();
    // Or use not.toBeVisible()
    await expect(page.locator('#finish')).not.toBeVisible();

    console.log('✅ Element is hidden');
  });

  test('should verify exact text with toHaveText', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Exact text match
    await expect(page.locator('h2')).toHaveText('Test login');

    // With regex
    await expect(page.locator('h2')).toHaveText(/test login/i);

    // Ignore case
    await expect(page.locator('h2')).toHaveText('TEST LOGIN', { ignoreCase: true });

    console.log('✅ Text matches exactly');
  });

  test('should verify partial text with toContainText', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Partial text match
    await expect(page.locator('p')).toContainText('Username');

    // With regex
    await expect(page.locator('p')).toContainText(/username/i);

    console.log('✅ Text contains expected substring');
  });

  test('should verify input value', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Fill input
    await page.fill('#username', 'testuser');

    // Verify value
    await expect(page.locator('#username')).toHaveValue('testuser');

    // Empty value
    await page.fill('#username', '');
    await expect(page.locator('#username')).toHaveValue('');

    console.log('✅ Input values verified');
  });

  test('should verify element enabled/disabled state', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Button is enabled by default
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();

    // Inputs are enabled
    await expect(page.locator('#username')).toBeEnabled();
    await expect(page.locator('#password')).toBeEnabled();

    console.log('✅ Elements are enabled');
  });

  test('should verify checkbox checked state', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    const checkbox1 = page.locator('#checkbox1');
    const checkbox2 = page.locator('#checkbox2');

    // Check initial state
    if (await checkbox1.isChecked()) {
      await expect(checkbox1).toBeChecked();
    } else {
      await expect(checkbox1).not.toBeChecked();
    }

    // Check checkbox
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();

    // Uncheck checkbox
    await checkbox1.uncheck();
    await expect(checkbox1).not.toBeChecked();

    console.log('✅ Checkbox states verified');
  });

  test('should verify element focus', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Focus on username field
    await page.locator('#username').focus();

    // Verify it has focus
    await expect(page.locator('#username')).toBeFocused();

    // Tab to password field
    await page.press('Tab');

    // Verify password has focus
    await expect(page.locator('#password')).toBeFocused();

    console.log('✅ Focus states verified');
  });

  test('should verify page URL', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Exact URL
    await expect(page).toHaveURL('https://practice.expandtesting.com/login');

    // With regex
    await expect(page).toHaveURL(/.*login$/);

    // Contains
    await expect(page).toHaveURL(/expandtesting/);

    console.log('✅ URL verified');
  });

  test('should verify page title', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Title contains
    await expect(page).toHaveTitle(/Practice/);

    // Exact title
    await expect(page).toHaveTitle('Practice Test Automation: Login Page');

    console.log('✅ Title verified');
  });

  test('should verify element count', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // Count elements
    const checkboxes = page.locator('input[type="checkbox"]');
    await expect(checkboxes).toHaveCount(2);

    // No elements
    const nonExistent = page.locator('.does-not-exist');
    await expect(nonExistent).toHaveCount(0);

    console.log('✅ Element counts verified');
  });

  test('should verify element attribute', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Verify attribute value
    await expect(page.locator('#username')).toHaveAttribute('type', 'text');
    await expect(page.locator('#password')).toHaveAttribute('type', 'password');

    // Verify attribute exists
    await expect(page.locator('button[type="submit"]')).toHaveAttribute('type');

    console.log('✅ Attributes verified');
  });

  test('should verify CSS class', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Verify element has class
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toHaveClass(/btn/);

    console.log('✅ CSS classes verified');
  });

  test('should use negation with not', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Negation - element is NOT hidden
    await expect(page.locator('#username')).not.toBeHidden();

    // Negation - element does NOT have text
    await expect(page.locator('h2')).not.toHaveText('Wrong Title');

    // Negation - input does NOT have value
    await expect(page.locator('#username')).not.toHaveValue('anything');

    console.log('✅ Negation assertions work');
  });

  test('should demonstrate auto-wait in assertions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    // Click start (triggers async loading)
    await page.click('#start button');

    // Assertion auto-waits for element to appear (up to 5s by default)
    await expect(page.locator('#finish')).toBeVisible();
    await expect(page.locator('#finish h4')).toHaveText('Hello World!');

    console.log('✅ Auto-wait in assertions works!');
  });

  test('should use custom timeout for assertions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.click('#start button');

    // Custom timeout (10 seconds)
    await expect(page.locator('#finish')).toBeVisible({ timeout: 10000 });

    console.log('✅ Custom timeout works');
  });

});

/**
 * Key Takeaways:
 *
 * 1. Element Assertions:
 *    - toBeVisible() / toBeHidden()
 *    - toHaveText() - Exact match
 *    - toContainText() - Partial match
 *    - toHaveValue() - Input value
 *    - toBeEnabled() / toBeDisabled()
 *    - toBeChecked() - Checkbox/radio
 *    - toBeFocused() - Element focus
 *
 * 2. Page Assertions:
 *    - toHaveURL() - Page URL
 *    - toHaveTitle() - Page title
 *
 * 3. Locator Assertions:
 *    - toHaveCount() - Element count
 *    - toHaveAttribute() - HTML attributes
 *    - toHaveClass() - CSS classes
 *
 * 4. Auto-Wait:
 *    - Assertions automatically wait (up to timeout)
 *    - No manual waits needed
 *    - Configurable timeout
 *
 * 5. Negation:
 *    - Use .not before assertion
 *    - not.toBeVisible(), not.toHaveText(), etc.
 *
 * Next: 02-advanced-assertions.spec.ts
 */
