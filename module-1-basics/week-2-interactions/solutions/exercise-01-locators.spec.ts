import { test, expect } from '@playwright/test';

/**
 * Solution 01: Locators Practice
 *
 * Complete working solution for exercise-01-locators.spec.ts
 */

test.describe('Solution 01: Locators Practice', () => {

  test('Task 1: Use CSS selectors - ID, class, attribute', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // ✅ Solution 1.1: ID selector
    const usernameInput = page.locator('#username');

    // ✅ Solution 1.2: Attribute selector
    const passwordInput = page.locator('[name="password"]');

    // ✅ Solution 1.3: Class selector
    const submitButton = page.locator('.btn-primary');

    // Verification
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();

    console.log('✅ Task 1 completed');
  });

  test('Task 2: Use role-based locators', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // ✅ Solution 2.1: getByRole for textbox
    const usernameBox = page.getByRole('textbox', { name: /username/i });

    // ✅ Solution 2.2: getByRole for button
    const loginButton = page.getByRole('button', { name: 'Login' });

    // ✅ Solution 2.3: Fill form
    await usernameBox.fill('practice');
    await page.getByRole('textbox', { name: /password/i }).fill('SuperSecretPassword!');
    await loginButton.click();

    // ✅ Solution 2.4: Verify navigation
    await page.waitForURL('**/secure');
    await expect(page).toHaveURL(/.*secure/);

    console.log('✅ Task 2 completed');
  });

  test('Task 3: Use text-based locators', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // ✅ Solution 3.1: getByText
    const loginLink = page.getByText(/login/i);

    // ✅ Solution 3.2: getByRole with name
    const checkboxLink = page.getByRole('link', { name: 'Checkboxes' });

    // ✅ Solution 3.3: Click and verify
    await loginLink.click();
    await expect(page).toHaveURL(/.*login/);

    console.log('✅ Task 3 completed');
  });

  test('Task 4: Use getByLabel for form inputs', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // ✅ Solution 4.1: getByLabel for username
    const usernameInput = page.getByLabel(/username/i);

    // ✅ Solution 4.2: getByLabel for password
    const passwordInput = page.getByLabel(/password/i);

    // ✅ Solution 4.3: Fill both fields
    await usernameInput.fill('practice');
    await passwordInput.fill('SuperSecretPassword!');

    // ✅ Solution 4.4: Verify values
    await expect(usernameInput).toHaveValue('practice');
    await expect(passwordInput).toHaveValue('SuperSecretPassword!');

    console.log('✅ Task 4 completed');
  });

  test('Task 5: Chain locators for specificity', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // ✅ Solution 5.1: Button inside form
    const formButton = page.locator('form').locator('button');

    // ✅ Solution 5.2: Input inside form
    const formInput = page.locator('form').locator('input[type="text"]');

    // ✅ Solution 5.3: Verify visible
    await expect(formButton).toBeVisible();
    await expect(formInput).toBeVisible();

    console.log('✅ Task 5 completed');
  });

  test('Task 6: Use filtering to narrow down results', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // ✅ Solution 6.1: Get all links
    const allLinks = page.getByRole('link');

    // ✅ Solution 6.2: Filter by text
    const formLinks = allLinks.filter({ hasText: /form/i });

    // ✅ Solution 6.3: Count and log
    const count = await formLinks.count();
    console.log(`Found ${count} links with "form"`);

    // ✅ Solution 6.4: Click first
    await formLinks.first().click();

    console.log('✅ Task 6 completed');
  });

  test('Task 7: Use nth() and first()/last()', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // ✅ Solution 7.1: Get all checkboxes
    const checkboxes = page.locator('input[type="checkbox"]');

    // ✅ Solution 7.2: first()
    const firstCheckbox = checkboxes.first();

    // ✅ Solution 7.3: last()
    const lastCheckbox = checkboxes.last();

    // ✅ Solution 7.4: nth(1) - second checkbox
    const secondCheckbox = checkboxes.nth(1);

    // ✅ Solution 7.5: Check first and last
    await firstCheckbox.check();
    await lastCheckbox.check();

    // ✅ Solution 7.6: Verify checked
    await expect(firstCheckbox).toBeChecked();
    await expect(lastCheckbox).toBeChecked();

    console.log('✅ Task 7 completed');
  });

  test('Task 8: Combine multiple selector strategies', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // ✅ Solution 8.1: Combined ID + attribute
    const specificInput = page.locator('#username[type="text"]');

    // ✅ Solution 8.2: Combined class + attribute
    const specificButton = page.locator('button.btn-primary[type="submit"]');

    // ✅ Solution 8.3: Verify visible
    await expect(specificInput).toBeVisible();
    await expect(specificButton).toBeVisible();

    console.log('✅ Task 8 completed');
  });

  test('Challenge: Complete login flow with best locators', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // ✅ Using only role-based and label locators
    await page.getByLabel(/username/i).fill('practice');
    await page.getByLabel(/password/i).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();

    // ✅ Verify navigation
    await page.waitForURL('**/secure');
    await expect(page).toHaveURL(/.*secure/);

    // ✅ Verify success message
    await expect(page.locator('.alert-success')).toBeVisible();

    console.log('🎉 Challenge completed!');
  });

});
