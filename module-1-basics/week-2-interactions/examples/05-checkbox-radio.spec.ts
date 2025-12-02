import { test, expect } from '@playwright/test';

/**
 * Example 05: Checkbox & Radio Button Interactions
 *
 * Demonstrates:
 * - check() / uncheck() - Checkbox interactions
 * - setChecked() - Set checkbox state
 * - isChecked() - Get checkbox state
 * - Radio button selection
 * - Multiple checkbox handling
 *
 * Run: yarn test examples/05-checkbox-radio.spec.ts
 */

test.describe('Checkbox & Radio Interactions', () => {

  test('should check checkboxes', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // Locate checkboxes
    const checkbox1 = page.locator('#checkbox1');
    const checkbox2 = page.locator('#checkbox2');

    // Check checkbox 1
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();

    // Check checkbox 2
    await checkbox2.check();
    await expect(checkbox2).toBeChecked();

    console.log('✅ check() works');
  });

  test('should uncheck checkboxes', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    const checkbox1 = page.locator('#checkbox1');
    const checkbox2 = page.locator('#checkbox2');

    // Checkbox 2 may be checked by default
    // Uncheck it
    await checkbox2.uncheck();
    await expect(checkbox2).not.toBeChecked();

    // Check then uncheck checkbox 1
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();

    await checkbox1.uncheck();
    await expect(checkbox1).not.toBeChecked();

    console.log('✅ uncheck() works');
  });

  test('should use setChecked for dynamic state', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    const checkbox1 = page.locator('#checkbox1');

    // Set to checked
    await checkbox1.setChecked(true);
    await expect(checkbox1).toBeChecked();

    // Set to unchecked
    await checkbox1.setChecked(false);
    await expect(checkbox1).not.toBeChecked();

    // Dynamic state based on variable
    const shouldCheck = true;
    await checkbox1.setChecked(shouldCheck);
    await expect(checkbox1).toBeChecked();

    console.log('✅ setChecked() works');
  });

  test('should get checkbox state', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    const checkbox1 = page.locator('#checkbox1');
    const checkbox2 = page.locator('#checkbox2');

    // Get current state
    const isChecked1 = await checkbox1.isChecked();
    const isChecked2 = await checkbox2.isChecked();

    console.log('Checkbox 1 initial state:', isChecked1);
    console.log('Checkbox 2 initial state:', isChecked2);

    // Check only if not already checked
    if (!isChecked1) {
      await checkbox1.check();
    }

    if (!isChecked2) {
      await checkbox2.check();
    }

    // Verify both checked
    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).toBeChecked();

    console.log('✅ isChecked() works');
  });

  test('should check is idempotent', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    const checkbox1 = page.locator('#checkbox1');

    // Check multiple times
    await checkbox1.check();
    await checkbox1.check();
    await checkbox1.check();

    // Still checked (not toggled)
    await expect(checkbox1).toBeChecked();

    console.log('✅ check() is idempotent');
  });

  test('should handle radio buttons', async ({ page }) => {
    // Create test page with radio buttons
    await page.goto(`data:text/html,<!DOCTYPE html>
      <html>
        <body>
          <form>
            <label><input type="radio" name="gender" value="male"> Male</label>
            <label><input type="radio" name="gender" value="female"> Female</label>
            <label><input type="radio" name="gender" value="other"> Other</label>
          </form>
        </body>
      </html>
    `);

    // Select radio button
    const maleRadio = page.locator('input[value="male"]');
    const femaleRadio = page.locator('input[value="female"]');

    // Check male radio
    await maleRadio.check();
    await expect(maleRadio).toBeChecked();
    await expect(femaleRadio).not.toBeChecked();

    // Check female radio (male will be automatically unchecked)
    await femaleRadio.check();
    await expect(femaleRadio).toBeChecked();
    await expect(maleRadio).not.toBeChecked();

    console.log('✅ Radio button selection works');
  });

  test('should handle radio button groups', async ({ page }) => {
    await page.goto(`data:text/html,<!DOCTYPE html>
      <html>
        <body>
          <form>
            <fieldset>
              <legend>Gender:</legend>
              <input type="radio" id="male" name="gender" value="male">
              <label for="male">Male</label><br>
              <input type="radio" id="female" name="gender" value="female">
              <label for="female">Female</label><br>
            </fieldset>
            <fieldset>
              <legend>Age Group:</legend>
              <input type="radio" id="young" name="age" value="18-30">
              <label for="young">18-30</label><br>
              <input type="radio" id="middle" name="age" value="31-50">
              <label for="middle">31-50</label><br>
            </fieldset>
          </form>
        </body>
      </html>
    `);

    // Select from different groups
    await page.locator('#male').check();
    await page.locator('#middle').check();

    // Both can be checked (different groups)
    await expect(page.locator('#male')).toBeChecked();
    await expect(page.locator('#middle')).toBeChecked();

    console.log('✅ Multiple radio groups work');
  });

  test('should check all checkboxes', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // Get all checkboxes
    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();

    console.log(`Found ${count} checkboxes`);

    // Check all
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).check();
    }

    // Verify all checked
    for (let i = 0; i < count; i++) {
      await expect(checkboxes.nth(i)).toBeChecked();
    }

    console.log('✅ Checked all checkboxes');
  });

  test('should toggle checkbox state', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    const checkbox1 = page.locator('#checkbox1');

    // Get initial state
    const initialState = await checkbox1.isChecked();
    console.log('Initial state:', initialState);

    // Toggle: check if unchecked, uncheck if checked
    if (initialState) {
      await checkbox1.uncheck();
    } else {
      await checkbox1.check();
    }

    // Verify toggled
    const newState = await checkbox1.isChecked();
    expect(newState).toBe(!initialState);

    console.log('New state:', newState);
    console.log('✅ Checkbox toggled');
  });

  test('should use click() vs check()', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    const checkbox1 = page.locator('#checkbox1');

    // Ensure unchecked first
    await checkbox1.uncheck();

    // click() TOGGLES state
    await checkbox1.click();
    await expect(checkbox1).toBeChecked();

    await checkbox1.click();
    await expect(checkbox1).not.toBeChecked();

    // check() is IDEMPOTENT (always checks, doesn't toggle)
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();

    await checkbox1.check(); // Still checked
    await expect(checkbox1).toBeChecked();

    console.log('✅ click() vs check() difference demonstrated');
  });

  test('should verify checkbox attributes', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    const checkbox1 = page.locator('#checkbox1');

    // Check attributes
    const id = await checkbox1.getAttribute('id');
    const type = await checkbox1.getAttribute('type');

    console.log('ID:', id);
    console.log('Type:', type);

    expect(id).toBe('checkbox1');
    expect(type).toBe('checkbox');

    // Check if enabled
    const isEnabled = await checkbox1.isEnabled();
    console.log('Enabled:', isEnabled);
    expect(isEnabled).toBeTruthy();

    console.log('✅ Checkbox attributes verified');
  });

  test('should handle custom styled checkboxes', async ({ page }) => {
    // Many modern sites use custom styled checkboxes (hidden input + label)
    await page.goto(`data:text/html,<!DOCTYPE html>
      <html>
        <head>
          <style>
            input[type="checkbox"] { display: none; }
            .custom-checkbox {
              width: 20px;
              height: 20px;
              border: 2px solid #333;
              display: inline-block;
              cursor: pointer;
            }
            input:checked + .custom-checkbox {
              background: #333;
            }
          </style>
        </head>
        <body>
          <label>
            <input type="checkbox" id="custom">
            <span class="custom-checkbox"></span>
            Accept Terms
          </label>
        </body>
      </html>
    `);

    // Even though checkbox is hidden, Playwright can interact with it
    const customCheckbox = page.locator('#custom');
    await customCheckbox.check({ force: true }); // force because it's display:none

    await expect(customCheckbox).toBeChecked();

    console.log('✅ Custom styled checkbox works');
  });

  test('should demonstrate checkbox patterns', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    const checkbox1 = page.locator('#checkbox1');
    const checkbox2 = page.locator('#checkbox2');

    console.log('\n=== Checkbox Interaction Patterns ===\n');

    // Pattern 1: Check only if not checked
    if (!(await checkbox1.isChecked())) {
      await checkbox1.check();
      console.log('1. Conditional check - Checked checkbox1');
    }

    // Pattern 2: Set specific state
    await checkbox2.setChecked(true);
    console.log('2. Set state - Set checkbox2 to true');

    // Pattern 3: Toggle state
    const currentState = await checkbox1.isChecked();
    await checkbox1.setChecked(!currentState);
    console.log('3. Toggle - Toggled checkbox1');

    // Pattern 4: Uncheck all
    await checkbox1.uncheck();
    await checkbox2.uncheck();
    console.log('4. Uncheck all - Unchecked both\n');

    console.log('✅ All patterns demonstrated');
  });

});

/**
 * Key Takeaways:
 *
 * 1. Checkbox Methods:
 *    - check() - Check checkbox (idempotent)
 *    - uncheck() - Uncheck checkbox (idempotent)
 *    - setChecked(boolean) - Set to specific state
 *    - isChecked() - Get current state
 *    - click() - Toggle state (not recommended)
 *
 * 2. Radio Buttons:
 *    - Use check() to select
 *    - Cannot uncheck (only select another in group)
 *    - Only one selected per group (name attribute)
 *
 * 3. Idempotency:
 *    - check() multiple times = still checked
 *    - uncheck() multiple times = still unchecked
 *    - click() toggles every time
 *
 * 4. Best Practices:
 *    - Use check()/uncheck() instead of click()
 *    - Use setChecked() for dynamic state
 *    - Verify with toBeChecked() assertion
 *    - Check state before conditional actions
 *
 * 5. Common Patterns:
 *    - Conditional check: if (!isChecked) check()
 *    - Set state: setChecked(true/false)
 *    - Toggle: setChecked(!currentState)
 *    - Check all: loop with check()
 *
 * 6. Custom Checkboxes:
 *    - May need force: true if hidden
 *    - Playwright handles custom styling
 *    - Use actual <input> not the label
 *
 * Next: 06-keyboard-actions.spec.ts
 */
