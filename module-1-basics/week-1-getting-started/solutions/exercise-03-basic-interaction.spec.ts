import { test, expect } from '@playwright/test';

/**
 * SOLUTION: Exercise 03 - Basic Interactions
 *
 * Lời giải đầy đủ cho Exercise 03
 */

test.describe('Exercise 03: Basic Interactions - SOLUTION', () => {

  test('should complete login flow', async ({ page }) => {
    // Navigate
    await page.goto('https://practice.expandtesting.com/login');

    // Fill credentials
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // Click login
    await page.click('button[type="submit"]');

    // Wait for navigation
    await page.waitForURL('**/secure', { timeout: 10000 });

    // Verify success
    const successMessage = page.locator('.alert-success');
    await expect(successMessage).toBeVisible();

    console.log('✅ Login successful!');
    console.log('📍 Current URL:', page.url());
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Wrong credentials
    await page.fill('#username', 'wrong_user');
    await page.fill('#password', 'wrong_pass');

    // Click login
    await page.click('button[type="submit"]');

    // Verify error
    const errorMessage = page.locator('.alert-danger');
    await expect(errorMessage).toBeVisible();

    // Still on login page
    await expect(page).toHaveURL(/.*login/);

    console.log('✅ Error message verified');
  });

  test('should interact with checkboxes', async ({ page }) => {
    // Navigate
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // Locate checkbox
    const checkbox1 = page.locator('#checkbox1');

    // Check initial state
    const isChecked1 = await checkbox1.isChecked();
    console.log('Checkbox 1 initial state:', isChecked1);

    // Check if not checked
    if (!isChecked1) {
      await checkbox1.check();
    }

    // Verify checked
    await expect(checkbox1).toBeChecked();

    // Uncheck
    await checkbox1.uncheck();

    // Verify unchecked
    await expect(checkbox1).not.toBeChecked();

    console.log('✅ Checkbox interactions completed');
  });

  test('should select dropdown options', async ({ page }) => {
    // Navigate
    await page.goto('https://practice.expandtesting.com/dropdown');

    // Locate dropdown
    const dropdown = page.locator('#dropdown');

    // Select option 1
    await dropdown.selectOption('1');

    // Verify
    let value = await dropdown.inputValue();
    expect(value).toBe('1');
    console.log('✅ Option 1 selected');

    // Select option 2
    await dropdown.selectOption('2');

    // Verify
    value = await dropdown.inputValue();
    expect(value).toBe('2');
    console.log('✅ Option 2 selected');
  });

  test('should locate element using different strategies', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // By CSS
    const buttonByCSS = page.locator('button[type="submit"]');
    await expect(buttonByCSS).toBeVisible();

    // By text
    const buttonByText = page.locator('text=Login');
    await expect(buttonByText).toBeVisible();

    // By role
    const buttonByRole = page.getByRole('button', { name: /login/i });
    await expect(buttonByRole).toBeVisible();

    // Get text
    const buttonText = await buttonByRole.textContent();
    console.log('✅ Button text:', buttonText);

    // Verify
    expect(buttonText).toContain('Login');

    console.log('✅ All locator strategies work');
  });

  test('should wait for dynamic content', async ({ page }) => {
    // Navigate
    await page.goto('https://practice.expandtesting.com/dynamic-loading/2');

    // Click start
    await page.click('button:has-text("Start")');

    // Locate finish element
    const finishElement = page.locator('#finish');

    // Wait for visible
    await finishElement.waitFor({ state: 'visible', timeout: 10000 });

    // Verify text
    await expect(finishElement).toContainText('Hello World!');

    console.log('✅ Dynamic content loaded');
  });

  test('should verify element attributes', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const loginButton = page.locator('button[type="submit"]');

    // Verify type
    const buttonType = await loginButton.getAttribute('type');
    expect(buttonType).toBe('submit');

    // Verify enabled
    await expect(loginButton).toBeEnabled();

    // Verify class
    const buttonClass = await loginButton.getAttribute('class');
    expect(buttonClass).toContain('btn');

    console.log('✅ Element attributes verified');

    // Check home link
    const homeLink = page.locator('a[href="/"]');
    const href = await homeLink.getAttribute('href');
    expect(href).toBe('/');

    console.log('✅ Link href:', href);
  });

  test('should submit form and verify result', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Fill form
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // Submit và wait for navigation
    await Promise.all([
      page.waitForURL('**/secure', { timeout: 10000 }),
      page.click('button[type="submit"]')
    ]);

    // Verify URL
    await expect(page).toHaveURL(/.*secure/);

    // Verify heading
    const heading = page.locator('h2');
    await expect(heading).toBeVisible();

    // Verify logout button
    const logoutButton = page.locator('a[href*="logout"]');
    await expect(logoutButton).toBeVisible();

    console.log('✅ Form submitted successfully');
  });

});

/**
 * Solution Summary:
 *
 * 1. Locators:
 *    - CSS: page.locator('#id')
 *    - Text: page.locator('text=...')
 *    - Role: page.getByRole('button')
 *
 * 2. Actions:
 *    - fill() - Type text
 *    - click() - Click element
 *    - check()/uncheck() - Checkboxes
 *    - selectOption() - Dropdowns
 *
 * 3. Assertions:
 *    - toBeVisible() - Element hiển thị
 *    - toBeChecked() - Checkbox checked
 *    - toHaveURL() - URL matching
 *    - toContainText() - Text matching
 *
 * 4. Waiting:
 *    - waitForURL() - Navigation
 *    - waitFor() - Element state
 *    - Promise.all() - Concurrent actions
 *
 * Tips:
 * - Always await async operations
 * - Use semantic selectors (role, label)
 * - Verify after actions
 * - Handle dynamic content với waitFor()
 */
