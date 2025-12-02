import { test, expect } from '@playwright/test';

/**
 * Example 04: Form Interactions
 *
 * Demonstrates form-related interactions:
 * - fill() - Fill text inputs
 * - clear() - Clear inputs
 * - selectOption() - Select dropdowns
 * - check/uncheck() - Checkboxes
 * - Form submission
 * - Input validation
 *
 * Run: yarn test examples/04-form-interactions.spec.ts
 */

test.describe('Form Interactions', () => {

  test('should fill text inputs', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // fill() method - Fast and efficient
    await page.locator('#username').fill('practice');
    await page.locator('#password').fill('SuperSecretPassword!');

    // Verify values
    await expect(page.locator('#username')).toHaveValue('practice');
    await expect(page.locator('#password')).toHaveValue('SuperSecretPassword!');

    console.log('✅ fill() works');
  });

  test('should clear input fields', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Fill first
    await page.locator('#username').fill('initial_value');

    // Verify filled
    await expect(page.locator('#username')).toHaveValue('initial_value');

    // Clear method 1: clear()
    await page.locator('#username').clear();
    await expect(page.locator('#username')).toHaveValue('');

    // Clear method 2: fill with empty string
    await page.locator('#username').fill('another_value');
    await page.locator('#username').fill('');
    await expect(page.locator('#username')).toHaveValue('');

    console.log('✅ clear() works');
  });

  test('should get input values', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Fill inputs
    await page.locator('#username').fill('testuser');
    await page.locator('#password').fill('testpass123');

    // Get values
    const username = await page.locator('#username').inputValue();
    const password = await page.locator('#password').inputValue();

    console.log('Username:', username);
    console.log('Password:', password);

    // Verify
    expect(username).toBe('testuser');
    expect(password).toBe('testpass123');

    console.log('✅ inputValue() works');
  });

  test('should select dropdown options', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dropdown');

    const dropdown = page.locator('#dropdown');

    // Select by value
    await dropdown.selectOption('1');
    expect(await dropdown.inputValue()).toBe('1');

    // Select by label
    await dropdown.selectOption({ label: 'Option 2' });
    expect(await dropdown.inputValue()).toBe('2');

    // Select by index
    await dropdown.selectOption({ index: 1 }); // Option 1 (index starts at 0)
    expect(await dropdown.inputValue()).toBe('1');

    console.log('✅ selectOption() works');
  });

  test('should handle multiple select', async ({ page }) => {
    // Note: Creating a test page with multiple select
    await page.goto('data:text/html,<!DOCTYPE html><html><body><select id="multi" multiple><option value="1">One</option><option value="2">Two</option><option value="3">Three</option></select></body></html>');

    const multiSelect = page.locator('#multi');

    // Select multiple options
    await multiSelect.selectOption(['1', '2']);

    // Verify selection (checking via DOM)
    const selectedValues = await multiSelect.evaluate((select: HTMLSelectElement) => {
      return Array.from(select.selectedOptions).map(option => option.value);
    });

    expect(selectedValues).toEqual(['1', '2']);

    console.log('Selected values:', selectedValues);
    console.log('✅ Multiple select works');
  });

  test('should submit form with Enter key', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    await page.locator('#username').fill('practice');
    await page.locator('#password').fill('SuperSecretPassword!');

    // Press Enter to submit
    await page.locator('#password').press('Enter');

    // Wait for navigation
    await page.waitForURL('**/secure');

    // Verify success
    await expect(page).toHaveURL(/.*secure/);

    console.log('✅ Form submission with Enter works');
  });

  test('should submit form with button click', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    await page.locator('#username').fill('practice');
    await page.locator('#password').fill('SuperSecretPassword!');

    // Click submit button
    await page.locator('button[type="submit"]').click();

    await page.waitForURL('**/secure');

    await expect(page).toHaveURL(/.*secure/);

    console.log('✅ Form submission with button click works');
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/form-validation');

    // Try to submit without filling
    await page.locator('button[type="submit"]').click();

    // Check HTML5 validation message (via :invalid pseudo-class)
    const contactNameInput = page.locator('#validationCustom01');

    const isInvalid = await contactNameInput.evaluate((input: HTMLInputElement) => {
      return !input.validity.valid;
    });

    console.log('Input is invalid (required field empty):', isInvalid);
    expect(isInvalid).toBeTruthy();

    console.log('✅ Required field validation works');
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/form-validation');

    // Fill with invalid email
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill('invalid-email');

    // Trigger validation (blur)
    await emailInput.blur();

    // Check validity
    const isValid = await emailInput.evaluate((input: HTMLInputElement) => {
      return input.validity.valid;
    });

    console.log('Email is valid:', isValid);
    expect(isValid).toBeFalsy();

    // Fix with valid email
    await emailInput.fill('valid@example.com');
    await emailInput.blur();

    const isValidNow = await emailInput.evaluate((input: HTMLInputElement) => {
      return input.validity.valid;
    });

    console.log('Email is valid now:', isValidNow);
    expect(isValidNow).toBeTruthy();

    console.log('✅ Email validation works');
  });

  test('should handle date inputs', async ({ page }) => {
    // Create test page with date input
    await page.goto('data:text/html,<!DOCTYPE html><html><body><input type="date" id="birthday"></body></html>');

    const dateInput = page.locator('#birthday');

    // Set date (YYYY-MM-DD format)
    await dateInput.fill('1990-12-25');

    // Get value
    const dateValue = await dateInput.inputValue();
    expect(dateValue).toBe('1990-12-25');

    console.log('Date value:', dateValue);
    console.log('✅ Date input works');
  });

  test('should handle number inputs', async ({ page }) => {
    // Create test page with number input
    await page.goto('data:text/html,<!DOCTYPE html><html><body><input type="number" id="age" min="0" max="120"></body></html>');

    const numberInput = page.locator('#age');

    // Fill number
    await numberInput.fill('25');

    // Get value
    const ageValue = await numberInput.inputValue();
    expect(ageValue).toBe('25');

    // Verify number
    expect(Number(ageValue)).toBe(25);

    console.log('✅ Number input works');
  });

  test('should handle range slider', async ({ page }) => {
    // Create test page with range input
    await page.goto('data:text/html,<!DOCTYPE html><html><body><input type="range" id="volume" min="0" max="100" value="50"></body></html>');

    const slider = page.locator('#volume');

    // Set slider value
    await slider.fill('75');

    // Get value
    const volume = await slider.inputValue();
    expect(volume).toBe('75');

    console.log('Volume:', volume);
    console.log('✅ Range slider works');
  });

  test('should complete multi-field form', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/form-validation');

    // Fill all required fields
    await page.locator('#validationCustom01').fill('John'); // Contact name
    await page.locator('#validationCustom02').fill('Doe'); // Last name
    await page.locator('#validationCustom03').fill('john.doe@example.com'); // Email
    await page.locator('#validationCustom04').fill('1234567890'); // Phone
    await page.locator('#validationCustom05').fill('123 Main St'); // Address
    await page.locator('#validationCustom06').fill('New York'); // City
    await page.locator('#validationCustom07').selectOption('NY'); // State
    await page.locator('#validationCustom08').fill('10001'); // Zip
    await page.locator('#validationCustom09').fill('http://example.com'); // Website
    await page.locator('#validationCustom10').check(); // Terms

    // Submit
    await page.locator('button[type="submit"]').click();

    // Check for success (may vary by site)
    console.log('✅ Multi-field form completed');
  });

  test('should demonstrate all form interactions', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    console.log('\n=== Form Interaction Methods ===\n');

    // 1. fill() - Fast fill
    const username = page.locator('#username');
    await username.fill('testuser');
    console.log('1. fill() - Filled username');

    // 2. clear() - Clear input
    await username.clear();
    console.log('2. clear() - Cleared username');

    // 3. fill again
    await username.fill('practice');
    console.log('3. fill() - Re-filled username');

    // 4. inputValue() - Get value
    const value = await username.inputValue();
    console.log('4. inputValue() - Got value:', value);

    // 5. fill password
    await page.locator('#password').fill('SuperSecretPassword!');
    console.log('5. fill() - Filled password');

    // 6. press() - Submit with Enter
    await page.locator('#password').press('Enter');
    console.log('6. press() - Submitted with Enter\n');

    await page.waitForURL('**/secure');

    console.log('✅ All form methods demonstrated');
  });

});

/**
 * Key Takeaways:
 *
 * 1. Text Input Methods:
 *    - fill(text) - Fast, clears first, triggers events
 *    - clear() - Clear input
 *    - inputValue() - Get current value
 *    - press(key) - Press key (e.g., 'Enter')
 *
 * 2. Select Dropdown:
 *    - selectOption(value) - By value attribute
 *    - selectOption({ label }) - By visible text
 *    - selectOption({ index }) - By position
 *    - selectOption([...]) - Multiple values
 *
 * 3. Special Inputs:
 *    - type="date" - Use fill('YYYY-MM-DD')
 *    - type="number" - Use fill('123')
 *    - type="range" - Use fill('50')
 *    - type="email" - HTML5 validation
 *
 * 4. Form Submission:
 *    - Press Enter in input field
 *    - Click submit button
 *    - form.submit() (via evaluate)
 *
 * 5. Validation:
 *    - HTML5 validation (required, email, etc.)
 *    - input.validity.valid
 *    - :invalid pseudo-class
 *
 * 6. Best Practices:
 *    - Use fill() for speed
 *    - Trust auto-wait
 *    - Verify values after fill
 *    - Handle validation errors
 *
 * Next: 05-checkbox-radio.spec.ts
 */
