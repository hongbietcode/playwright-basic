import { test, expect } from '@playwright/test';

/**
 * Solution 02: Element Interactions Practice
 */

test.describe('Solution 02: Element Interactions', () => {

  test('Task 1: Fill and clear text inputs', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // ✅ Solution 1.1: Fill username
    await page.locator('#username').fill('testuser');

    // ✅ Solution 1.2: Fill password
    await page.locator('#password').fill('testpass123');

    // ✅ Solution 1.3: Get and verify value
    const username = await page.locator('#username').inputValue();
    expect(username).toBe('testuser');

    // ✅ Solution 1.4: Clear username
    await page.locator('#username').clear();

    // ✅ Solution 1.5: Verify empty
    await expect(page.locator('#username')).toHaveValue('');

    console.log('✅ Task 1 completed');
  });

  test('Task 2: Click button variations', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // ✅ Solution 2.1: Fill credentials
    await page.locator('#username').fill('practice');
    await page.locator('#password').fill('SuperSecretPassword!');

    // ✅ Solution 2.2: Click button
    await page.locator('button[type="submit"]').click();

    // ✅ Solution 2.3: Wait for navigation
    await page.waitForURL('**/secure');

    // ✅ Solution 2.4: Verify success alert
    await expect(page.locator('.alert-success')).toBeVisible();

    console.log('✅ Task 2 completed');
  });

  test('Task 3: Checkbox interactions', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // ✅ Solution 3.1: Get checkbox
    const checkbox1 = page.locator('#checkbox1');

    // ✅ Solution 3.2: Check if checked
    const isChecked = await checkbox1.isChecked();

    // ✅ Solution 3.3: Check if not checked
    if (!isChecked) {
      await checkbox1.check();
    }

    // ✅ Solution 3.4: Verify checked
    await expect(checkbox1).toBeChecked();

    // ✅ Solution 3.5: Uncheck
    await checkbox1.uncheck();

    // ✅ Solution 3.6: Verify unchecked
    await expect(checkbox1).not.toBeChecked();

    console.log('✅ Task 3 completed');
  });

  test('Task 4: Select dropdown', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dropdown');

    const dropdown = page.locator('#dropdown');

    // ✅ Solution 4.1: Select by value
    await dropdown.selectOption('1');

    // ✅ Solution 4.2: Verify
    expect(await dropdown.inputValue()).toBe('1');

    // ✅ Solution 4.3: Select by label
    await dropdown.selectOption({ label: 'Option 2' });

    // ✅ Solution 4.4: Verify
    expect(await dropdown.inputValue()).toBe('2');

    console.log('✅ Task 4 completed');
  });

  test('Task 5: Form submission with Enter', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // ✅ Solution 5.1-5.2: Fill fields
    await page.locator('#username').fill('practice');
    await page.locator('#password').fill('SuperSecretPassword!');

    // ✅ Solution 5.3: Press Enter
    await page.locator('#password').press('Enter');

    // ✅ Solution 5.4: Verify navigation
    await page.waitForURL('**/secure');
    await expect(page).toHaveURL(/.*secure/);

    console.log('✅ Task 5 completed');
  });

  test('Task 6: Double click', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');

    // ✅ Solution 6.1: Locate button
    const addButton = page.locator('button:has-text("Add Element")');

    // ✅ Solution 6.2: Double click
    await addButton.dblclick();

    // ✅ Solution 6.3: Count delete buttons
    const count = await page.locator('.added-manually').count();
    console.log(`Delete buttons: ${count}`);
    expect(count).toBeGreaterThanOrEqual(1);

    console.log('✅ Task 6 completed');
  });

  test('Task 7: Check all checkboxes', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // ✅ Solution 7.1: Get all checkboxes
    const checkboxes = page.locator('input[type="checkbox"]');

    // ✅ Solution 7.2: Get count
    const count = await checkboxes.count();

    // ✅ Solution 7.3: Loop and check all
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).check();
    }

    // ✅ Solution 7.4: Verify all checked
    for (let i = 0; i < count; i++) {
      await expect(checkboxes.nth(i)).toBeChecked();
    }

    console.log('✅ Task 7 completed');
  });

  test('Challenge: Complete multi-field form', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/form-validation');

    // ✅ Fill all fields
    await page.locator('#validationCustom01').fill('John');
    await page.locator('#validationCustom02').fill('Doe');
    await page.locator('#validationCustom03').fill('john.doe@example.com');
    await page.locator('#validationCustom04').fill('1234567890');
    await page.locator('#validationCustom05').fill('123 Main St');
    await page.locator('#validationCustom06').fill('New York');
    await page.locator('#validationCustom07').selectOption('NY');
    await page.locator('#validationCustom08').fill('10001');
    await page.locator('#validationCustom09').fill('http://example.com');
    await page.locator('#validationCustom10').check();

    // ✅ Submit
    await page.locator('button[type="submit"]').click();

    console.log('🎉 Challenge completed!');
  });

});
