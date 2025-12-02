import { test, expect } from '@playwright/test';

/**
 * Exercise 03: Keyboard & Mouse Actions Practice
 *
 * Thực hành:
 * - Keyboard shortcuts
 * - Tab navigation
 * - Mouse hover
 * - Drag and drop
 *
 * Run: yarn test exercises/exercise-03-keyboard-mouse.spec.ts
 */

test.describe('Exercise 03: Keyboard & Mouse', () => {

  test('Task 1: Tab navigation', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO 1.1: Focus on username field
    // Hint: await page.locator('#username').focus();

    // TODO 1.2: Press Tab key
    // Hint: await page.press('Tab');

    // TODO 1.3: Verify password field is focused
    // Hint: await expect(page.locator('#password')).toBeFocused();

    console.log('✅ Task 1 completed');
  });

  test('Task 2: Enter key to submit', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO 2.1: Fill username và password

    // TODO 2.2: Press Enter trên password field

    // TODO 2.3: Verify navigation to /secure

    console.log('✅ Task 2 completed');
  });

  test('Task 3: Keyboard shortcuts - Copy/Paste', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const usernameField = page.locator('#username');

    // TODO 3.1: Fill username với "practice"

    // TODO 3.2: Focus và select all (Ctrl+A)
    // Hint: await usernameField.focus();
    //       await page.keyboard.press('Control+A');

    // TODO 3.3: Copy (Ctrl+C)

    // TODO 3.4: Clear field

    // TODO 3.5: Paste (Ctrl+V)

    // TODO 3.6: Verify value = "practice"

    console.log('✅ Task 3 completed');
  });

  test('Task 4: Arrow keys', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');

    // TODO 4.1: Press ArrowUp
    // Hint: await page.press('ArrowUp');

    // TODO 4.2: Verify result contains "UP"
    // Hint: await expect(page.locator('#result')).toContainText('UP');

    // TODO 4.3: Press ArrowDown

    // TODO 4.4: Verify result contains "DOWN"

    console.log('✅ Task 4 completed');
  });

  test('Task 5: Mouse hover', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/hovers');

    // TODO 5.1: Hover over first figure
    // Hint: await page.locator('.figure').first().hover();

    // TODO 5.2: Verify caption visible
    // Hint: const caption = page.locator('.figcaption').first();
    //       await expect(caption).toBeVisible();

    // TODO 5.3: Get caption text và log ra

    console.log('✅ Task 5 completed');
  });

  test('Task 6: Hover all figures', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/hovers');

    // TODO 6.1: Get all figures

    // TODO 6.2: Loop qua từng figure

    // TODO 6.3: Hover từng figure và verify caption visible

    console.log('✅ Task 6 completed');
  });

  test('Task 7: Drag and drop', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/drag-and-drop');

    // TODO 7.1: Get column A và B
    const columnA = page.locator('#column-a');
    const columnB = page.locator('#column-b');

    // TODO 7.2: Get initial text của cả hai
    // Hint: const textA = await columnA.locator('header').textContent();

    // TODO 7.3: Drag column A to column B
    // Hint: await columnA.dragTo(columnB);

    // TODO 7.4: Get text sau khi drag

    // TODO 7.5: Verify đã swap (A text -> B, B text -> A)

    console.log('✅ Task 7 completed');
  });

  test('Task 8: pressSequentially for slow typing', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO 8.1: Use pressSequentially để type "practice" slowly
    // Hint: await page.locator('#username').pressSequentially('practice', { delay: 100 });

    // TODO 8.2: Verify value

    console.log('✅ Task 8 completed');
  });

  test('Challenge: Complete hover-then-click flow', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/hovers');

    // TODO: Hover over first figure
    // TODO: Wait for "View profile" link to appear
    // TODO: Click "View profile" link
    // TODO: Verify URL changed

    // Thêm code của bạn ở đây

    console.log('🎉 Challenge completed!');
  });

});

/**
 * Self-Check:
 *
 * 1. press() vs pressSequentially() - khác gì?
 *    → press() for single key, pressSequentially() for text
 *
 * 2. Làm sao detect platform cho shortcuts?
 *    → process.platform === 'darwin' ? 'Meta' : 'Control'
 *
 * 3. hover() có trigger click không?
 *    → No, hover chỉ move mouse, không click
 *
 * 4. dragTo() vs low-level mouse actions?
 *    → dragTo() preferred (simpler, auto-wait)
 *
 * Next: exercise-04-file-ops.spec.ts
 */
