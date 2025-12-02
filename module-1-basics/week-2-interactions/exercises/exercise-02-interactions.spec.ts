import { test, expect } from '@playwright/test';

/**
 * Exercise 02: Element Interactions Practice
 *
 * Thực hành tương tác với elements:
 * - Click variations
 * - Fill, clear inputs
 * - Check/uncheck checkboxes
 * - Select dropdowns
 * - Form submission
 *
 * Run: yarn test exercises/exercise-02-interactions.spec.ts
 */

test.describe('Exercise 02: Element Interactions', () => {

  test('Task 1: Fill and clear text inputs', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO 1.1: Fill username với "testuser"
    // Hint: await page.locator('#username').fill('text');

    // TODO 1.2: Fill password với "testpass123"

    // TODO 1.3: Get giá trị username và verify = "testuser"
    // Hint: const value = await locator.inputValue();

    // TODO 1.4: Clear username field
    // Hint: await locator.clear();

    // TODO 1.5: Verify username đã empty
    // Hint: await expect(locator).toHaveValue('');

    console.log('✅ Task 1 completed');
  });

  test('Task 2: Click button variations', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO 2.1: Fill valid credentials
    // Username: 'practice', Password: 'SuperSecretPassword!'

    // TODO 2.2: Single click login button

    // TODO 2.3: Wait for navigation to /secure
    // Hint: await page.waitForURL('**/secure');

    // TODO 2.4: Verify success alert visible
    // Hint: await expect(page.locator('.alert-success')).toBeVisible();

    console.log('✅ Task 2 completed');
  });

  test('Task 3: Checkbox interactions', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // TODO 3.1: Get first checkbox (#checkbox1)
    const checkbox1 = null; // Replace

    // TODO 3.2: Check if it's checked
    // Hint: const isChecked = await checkbox1.isChecked();

    // TODO 3.3: If not checked, check it
    // Hint: if (!isChecked) await checkbox1.check();

    // TODO 3.4: Verify it's now checked
    // Hint: await expect(checkbox1).toBeChecked();

    // TODO 3.5: Uncheck it
    // Hint: await checkbox1.uncheck();

    // TODO 3.6: Verify it's unchecked
    // Hint: await expect(checkbox1).not.toBeChecked();

    console.log('✅ Task 3 completed');
  });

  test('Task 4: Select dropdown', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dropdown');

    const dropdown = page.locator('#dropdown');

    // TODO 4.1: Select "Option 1" by value
    // Hint: await dropdown.selectOption('1');

    // TODO 4.2: Verify selected value = '1'
    // Hint: expect(await dropdown.inputValue()).toBe('1');

    // TODO 4.3: Select "Option 2" by label
    // Hint: await dropdown.selectOption({ label: 'Option 2' });

    // TODO 4.4: Verify selected value = '2'

    console.log('✅ Task 4 completed');
  });

  test('Task 5: Form submission with Enter', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO 5.1: Fill username
    await page.locator('#username').fill('practice');

    // TODO 5.2: Fill password
    await page.locator('#password').fill('SuperSecretPassword!');

    // TODO 5.3: Press Enter on password field để submit
    // Hint: await page.locator('#password').press('Enter');

    // TODO 5.4: Verify navigation

    console.log('✅ Task 5 completed');
  });

  test('Task 6: Double click', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');

    // TODO 6.1: Locate "Add Element" button

    // TODO 6.2: Double click button
    // Hint: await button.dblclick();

    // TODO 6.3: Count delete buttons (should be 2 after dblclick)
    // Hint: const count = await page.locator('.added-manually').count();

    console.log('✅ Task 6 completed');
  });

  test('Task 7: Check all checkboxes', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // TODO 7.1: Get all checkboxes
    const checkboxes = null; // Replace

    // TODO 7.2: Get count

    // TODO 7.3: Loop và check tất cả
    // Hint: for (let i = 0; i < count; i++) { await checkboxes.nth(i).check(); }

    // TODO 7.4: Verify tất cả đã checked
    // Hint: Loop again và expect toBeChecked()

    console.log('✅ Task 7 completed');
  });

  test('Challenge: Complete multi-field form', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/form-validation');

    // TODO: Fill tất cả required fields
    // - Contact name: 'John'
    // - Last name: 'Doe'
    // - Email: 'john.doe@example.com'
    // - Phone: '1234567890'
    // - Address: '123 Main St'
    // - City: 'New York'
    // - State: Select 'NY'
    // - Zip: '10001'
    // - Website: 'http://example.com'
    // - Check terms checkbox

    // TODO: Submit form

    // Thêm code của bạn ở đây

    console.log('🎉 Challenge completed!');
  });

});

/**
 * Self-Check:
 *
 * 1. fill() vs pressSequentially() - nên dùng cái nào?
 *    → fill() (faster, recommended for most cases)
 *
 * 2. click() vs check() cho checkbox - khác gì?
 *    → click() toggles, check() is idempotent
 *
 * 3. Làm sao submit form không click button?
 *    → Press Enter in input field
 *
 * 4. selectOption() có mấy cách select?
 *    → 3 ways: by value, by label, by index
 *
 * Next: exercise-03-keyboard-mouse.spec.ts
 */
