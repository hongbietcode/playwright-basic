import { test, expect } from '@playwright/test';

/**
 * Example 05: Auto-Waits
 *
 * Demonstrates Playwright's auto-wait mechanism:
 * - Auto-wait in actions
 * - Auto-wait in assertions
 * - Actionability checks
 * - No manual waits needed
 *
 * Run: yarn test examples/05-auto-waits.spec.ts
 */

test.describe('Auto-Wait Examples', () => {

  test('should auto-wait for element to be visible', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    // Click button (auto-waits for button to be actionable)
    await page.click('#start button');

    // Assertion auto-waits for element to become visible
    await expect(page.locator('#finish')).toBeVisible();
    await expect(page.locator('#finish h4')).toHaveText('Hello World!');

    console.log('✅ Auto-wait for visibility works');
  });

  test('should auto-wait for element to be clickable', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // fill() auto-waits for input to be:
    // - Attached, Visible, Stable, Enabled
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // click() auto-waits for button to be:
    // - Attached, Visible, Stable, Enabled, Not covered
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*secure/);

    console.log('✅ Auto-wait for actionability works');
  });

  test('should auto-wait for text to appear', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    await page.click('#start button');

    // Auto-waits for text to become visible
    await expect(page.locator('#finish h4')).toHaveText('Hello World!');

    console.log('✅ Auto-wait for text works');
  });

  test('should auto-wait for element to be enabled', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

    // Click to enable input
    await page.click('button:has-text("Enable")');

    // Wait for button text to change (indicating process complete)
    await expect(page.locator('button:has-text("Disable")')).toBeVisible();

    // Input should now be enabled (auto-wait handles this)
    const input = page.locator('input[type="text"]');
    await input.fill('test text');

    await expect(input).toHaveValue('test text');

    console.log('✅ Auto-wait for enabled state works');
  });

  test('should auto-wait for navigation', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Click link (auto-waits for navigation to complete)
    await page.click('a:has-text("Login")');

    // Already navigated - no manual wait needed
    await expect(page).toHaveURL(/.*login/);

    console.log('✅ Auto-wait for navigation works');
  });

  test('should auto-wait for element to be stable', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // If element is animating, click() will wait for it to be stable
    const button = page.locator('button[type="submit"]');

    // Auto-waits for animation to finish before clicking
    await button.click();

    console.log('✅ Auto-wait for stability works');
  });

  test('should demonstrate no manual waits needed', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // ❌ DON'T DO THIS:
    // await page.waitForTimeout(2000);

    // ✅ DO THIS:
    // Just perform the action - auto-wait handles it
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*secure/);

    console.log('✅ No manual waits needed!');
  });

  test('should auto-retry assertions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.click('#start button');

    // This assertion will retry until:
    // 1. Element becomes visible, OR
    // 2. Timeout is reached (default 5s)
    await expect(page.locator('#finish')).toBeVisible();

    console.log('✅ Assertion auto-retry works');
  });

  test('should wait for element to disappear', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    // Initially, element is visible
    await expect(page.locator('#loading')).toBeVisible();

    await page.click('#start button');

    // Auto-waits for loading spinner to disappear
    await expect(page.locator('#loading')).toBeHidden();

    // Then result appears
    await expect(page.locator('#finish')).toBeVisible();

    console.log('✅ Auto-wait for disappearance works');
  });

  test('should handle slow-loading content', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/slow');

    // Content loads slowly, but assertions auto-wait
    await expect(page.locator('h1')).toBeVisible();

    console.log('✅ Slow content handled automatically');
  });

  test('should auto-wait for checkbox to be checkable', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // check() auto-waits for element to be:
    // - Attached, Visible, Stable, Enabled
    await page.check('#checkbox1');

    await expect(page.locator('#checkbox1')).toBeChecked();

    console.log('✅ Auto-wait for checkable state works');
  });

  test('should auto-wait for select to be interactive', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dropdown');

    // selectOption() auto-waits
    await page.selectOption('#dropdown', '1');

    await expect(page.locator('#dropdown')).toHaveValue('1');

    console.log('✅ Auto-wait for select works');
  });

  test('should demonstrate actionability checks', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Before clicking, Playwright checks:
    // 1. ✅ Element is attached to DOM
    // 2. ✅ Element is visible
    // 3. ✅ Element is stable (not animating)
    // 4. ✅ Element is enabled
    // 5. ✅ Element receives events (not covered)

    await page.click('button[type="submit"]');

    console.log('✅ All actionability checks passed');
  });

  test('should auto-wait with custom timeout', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.click('#start button');

    // Custom timeout (10 seconds instead of default 5)
    await expect(page.locator('#finish')).toBeVisible({ timeout: 10000 });

    console.log('✅ Custom timeout works');
  });

  test('should compare auto-wait vs manual wait', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    // ❌ BAD - Manual wait (hardcoded time)
    // await page.click('#start button');
    // await page.waitForTimeout(5000); // Always waits 5s
    // const text = await page.locator('#finish h4').textContent();

    // ✅ GOOD - Auto-wait (waits only as needed)
    await page.click('#start button');
    // Auto-waits for text to appear (might be < 5s or > 5s)
    await expect(page.locator('#finish h4')).toHaveText('Hello World!');

    console.log('✅ Auto-wait is better than manual wait');
  });

});

/**
 * Key Takeaways:
 *
 * 1. Auto-Wait Actions:
 *    - click(), fill(), check(), selectOption() all auto-wait
 *    - Wait for: attached, visible, stable, enabled
 *    - No manual waits needed!
 *
 * 2. Auto-Wait Assertions:
 *    - expect().toBeVisible() - Waits until visible
 *    - expect().toHaveText() - Waits until text matches
 *    - expect().toBeHidden() - Waits until hidden
 *    - All assertions auto-retry
 *
 * 3. Actionability Checks:
 *    Before action, Playwright checks:
 *    - Attached to DOM
 *    - Visible (not display:none)
 *    - Stable (not animating)
 *    - Enabled (not disabled)
 *    - Receives events (not covered)
 *
 * 4. Default Timeout:
 *    - Actions: 30s (configurable)
 *    - Assertions: 5s (configurable)
 *    - Navigation: 30s (configurable)
 *
 * 5. Best Practices:
 *    - ✅ Trust auto-wait (95% of cases)
 *    - ❌ Avoid page.waitForTimeout()
 *    - ✅ Use assertions for waiting
 *    - ✅ Configure timeout when needed
 *
 * 6. When Auto-Wait Is Enough:
 *    - Element visibility
 *    - Text appearance
 *    - Element state changes
 *    - Navigation completion
 *    - Standard interactions
 *
 * 7. When Explicit Wait Needed:
 *    - Custom conditions
 *    - Complex async logic
 *    - Network requests
 *    - See next example: 06-explicit-waits.spec.ts
 *
 * Next: 06-explicit-waits.spec.ts
 */
