import { test, expect } from '@playwright/test';

/**
 * Example 03: Click Interactions
 *
 * Demonstrates various click actions:
 * - Single click
 * - Double click
 * - Right click (context menu)
 * - Click with modifiers (Ctrl, Shift)
 * - Click at specific position
 * - Force click
 *
 * Run: yarn test examples/03-click-interactions.spec.ts
 */

test.describe('Click Interactions', () => {

  test('should perform single click', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Basic click
    await page.locator('#username').fill('practice');
    await page.locator('#password').fill('SuperSecretPassword!');

    // Click submit button
    await page.locator('button[type="submit"]').click();

    // Wait for navigation
    await page.waitForURL('**/secure');

    // Verify success
    await expect(page.locator('.alert-success')).toBeVisible();

    console.log('✅ Single click works');
  });

  test('should perform double click', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');

    // Add element first
    await page.locator('button:has-text("Add Element")').click();

    // Note: Most sites don't require double-click
    // This demonstrates the API
    const addButton = page.locator('button:has-text("Add Element")');

    // Double click
    await addButton.dblclick();

    // In this case, dblclick() triggers 2 add actions
    const deleteButtons = page.locator('.added-manually');
    const count = await deleteButtons.count();

    console.log(`Elements after dblclick: ${count}`);
    console.log('✅ Double click works');
  });

  test('should perform right click', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/context_menu');

    // Right click on the box
    const contextMenu = page.locator('#hot-spot');

    // Listen for alert dialog
    page.on('dialog', async dialog => {
      console.log('Alert message:', dialog.message());
      await dialog.accept();
    });

    // Right click
    await contextMenu.click({ button: 'right' });

    console.log('✅ Right click works');
  });

  test('should click with keyboard modifiers', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Ctrl+Click (opens in new tab - but we'll just test the modifier)
    const link = page.getByRole('link', { name: /login/i });

    // Click with Control modifier
    // Note: In headless mode, this won't actually open new tab
    // But the modifier is sent correctly
    await link.click({ modifiers: ['Control'] });

    console.log('✅ Click with Control modifier works');

    // Alternative: Shift+Click, Alt+Click, Meta+Click
    await page.goto('https://practice.expandtesting.com');
    const checkboxLink = page.getByRole('link', { name: /checkboxes/i });
    await checkboxLink.click({ modifiers: ['Shift'] });

    console.log('✅ Click with Shift modifier works');
  });

  test('should click at specific position', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Click at specific coordinates within element
    const loginButton = page.locator('button[type="submit"]');

    // Click at position (x:10, y:10) within the button
    await loginButton.click({ position: { x: 10, y: 10 } });

    // Note: This still triggers validation, so we should fill fields first
    await page.goto('https://practice.expandtesting.com/login');
    await page.locator('#username').fill('practice');
    await page.locator('#password').fill('SuperSecretPassword!');

    // Now click at position
    await loginButton.click({ position: { x: 5, y: 5 } });
    await page.waitForURL('**/secure');

    console.log('✅ Click at position works');
  });

  test('should click with delay', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    await page.locator('#username').fill('practice');
    await page.locator('#password').fill('SuperSecretPassword!');

    // Click with delay between mousedown and mouseup
    const loginButton = page.locator('button[type="submit"]');
    await loginButton.click({ delay: 100 });

    await page.waitForURL('**/secure');

    console.log('✅ Click with delay works');
  });

  test('should force click (bypass actionability checks)', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Fill form
    await page.locator('#username').fill('practice');
    await page.locator('#password').fill('SuperSecretPassword!');

    // Force click (bypasses: visible, enabled, stable checks)
    // ⚠️ Use only when necessary!
    await page.locator('button[type="submit"]').click({ force: true });

    await page.waitForURL('**/secure');

    console.log('✅ Force click works (but use carefully!)');
  });

  test('should click and wait for navigation', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Click link and wait for navigation
    const loginLink = page.getByRole('link', { name: /login/i });

    // Using Promise.all to wait for navigation
    await Promise.all([
      page.waitForURL('**/login'),
      loginLink.click()
    ]);

    // Verify new page
    await expect(page).toHaveURL(/.*login/);
    await expect(page.getByRole('heading', { name: /login page/i })).toBeVisible();

    console.log('✅ Click with navigation works');
  });

  test('should handle click that triggers alert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    // Setup dialog handler BEFORE clicking
    page.once('dialog', async dialog => {
      console.log('Dialog type:', dialog.type());
      console.log('Dialog message:', dialog.message());
      await dialog.accept();
    });

    // Click button that triggers alert
    await page.locator('button:has-text("Click for JS Alert")').click();

    // Verify result
    const result = page.locator('#result');
    await expect(result).toHaveText('You successfully clicked an alert');

    console.log('✅ Click with alert handling works');
  });

  test('should handle click on disabled button', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Try to click without filling form (button may be enabled anyway)
    // Better example: create disabled button test

    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

    // Find disabled input
    const inputField = page.locator('input[type="text"]');

    // Verify disabled
    const isDisabled = await inputField.isDisabled();
    console.log('Input is disabled:', isDisabled);

    // Click "Enable" button
    await page.locator('button:has-text("Enable")').click();

    // Wait for enabled
    await inputField.waitFor({ state: 'attached' });
    await page.waitForTimeout(1000); // Wait for animation

    // Now input should be enabled
    await inputField.fill('Test text');

    console.log('✅ Handling disabled elements works');
  });

  test('should click multiple elements in sequence', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // Get all checkboxes
    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();

    console.log(`Found ${count} checkboxes`);

    // Click each checkbox
    for (let i = 0; i < count; i++) {
      const checkbox = checkboxes.nth(i);
      const isChecked = await checkbox.isChecked();

      console.log(`Checkbox ${i + 1} - Before: ${isChecked ? 'checked' : 'unchecked'}`);

      if (!isChecked) {
        await checkbox.click();
      }

      const afterClick = await checkbox.isChecked();
      console.log(`Checkbox ${i + 1} - After: ${afterClick ? 'checked' : 'unchecked'}`);
    }

    console.log('✅ Sequential clicks work');
  });

  test('should demonstrate click options', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    await page.locator('#username').fill('practice');
    await page.locator('#password').fill('SuperSecretPassword!');

    const loginButton = page.locator('button[type="submit"]');

    // All click options
    await loginButton.click({
      button: 'left',         // 'left' | 'right' | 'middle'
      clickCount: 1,          // Number of clicks
      delay: 0,               // ms between mousedown and mouseup
      position: undefined,    // { x: number, y: number }
      modifiers: undefined,   // ['Alt', 'Control', 'Meta', 'Shift']
      force: false,           // Skip actionability checks
      noWaitAfter: false,     // Don't wait for navigation
      timeout: 30000,         // Max wait time
      trial: false            // Dry run (don't actually click)
    });

    await page.waitForURL('**/secure');

    console.log('✅ All click options demonstrated');
  });

});

/**
 * Key Takeaways:
 *
 * 1. Click Methods:
 *    - click() - Single click (most common)
 *    - dblclick() - Double click
 *    - click({ button: 'right' }) - Right click
 *
 * 2. Click Options:
 *    - button: 'left' | 'right' | 'middle'
 *    - modifiers: ['Control', 'Shift', 'Alt', 'Meta']
 *    - position: { x, y } - Click at specific coords
 *    - delay: ms - Delay between down/up
 *    - force: true - Bypass actionability checks
 *
 * 3. Auto-Wait:
 *    - Playwright auto-waits for element to be:
 *      * Attached to DOM
 *      * Visible
 *      * Stable (not animating)
 *      * Enabled
 *      * Not covered by other elements
 *
 * 4. Best Practices:
 *    - Trust auto-wait (no manual waits needed)
 *    - Use force: true only when necessary
 *    - Handle dialogs before clicking
 *    - Use Promise.all for navigation clicks
 *
 * 5. Common Patterns:
 *    - Click + wait: Promise.all([waitForNavigation, click()])
 *    - Click + dialog: Setup dialog handler first
 *    - Sequential clicks: Use for loop with nth()
 *
 * Next: 04-form-interactions.spec.ts
 */
