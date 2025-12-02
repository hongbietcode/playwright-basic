import { test, expect } from '@playwright/test';

/**
 * Solution 03: Keyboard & Mouse Actions Practice
 */

test.describe('Solution 03: Keyboard & Mouse', () => {

  test('Task 1: Tab navigation', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // ✅ Solution 1.1: Focus username
    await page.locator('#username').focus();

    // ✅ Solution 1.2: Press Tab
    await page.press('Tab');

    // ✅ Solution 1.3: Verify password focused
    await expect(page.locator('#password')).toBeFocused();

    console.log('✅ Task 1 completed');
  });

  test('Task 2: Enter key to submit', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // ✅ Solution 2.1: Fill fields
    await page.locator('#username').fill('practice');
    await page.locator('#password').fill('SuperSecretPassword!');

    // ✅ Solution 2.2: Press Enter
    await page.locator('#password').press('Enter');

    // ✅ Solution 2.3: Verify navigation
    await page.waitForURL('**/secure');
    await expect(page).toHaveURL(/.*secure/);

    console.log('✅ Task 2 completed');
  });

  test('Task 3: Keyboard shortcuts - Copy/Paste', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const usernameField = page.locator('#username');

    // ✅ Solution 3.1: Fill
    await usernameField.fill('practice');

    // ✅ Solution 3.2: Select all
    await usernameField.focus();
    await page.keyboard.press('Control+A');

    // ✅ Solution 3.3: Copy
    await page.keyboard.press('Control+C');

    // ✅ Solution 3.4: Clear
    await usernameField.clear();

    // ✅ Solution 3.5: Paste
    await usernameField.focus();
    await page.keyboard.press('Control+V');

    // ✅ Solution 3.6: Verify
    await expect(usernameField).toHaveValue('practice');

    console.log('✅ Task 3 completed');
  });

  test('Task 4: Arrow keys', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');

    // ✅ Solution 4.1: Press ArrowUp
    await page.press('ArrowUp');

    // ✅ Solution 4.2: Verify
    await expect(page.locator('#result')).toContainText('UP');

    // ✅ Solution 4.3: Press ArrowDown
    await page.press('ArrowDown');

    // ✅ Solution 4.4: Verify
    await expect(page.locator('#result')).toContainText('DOWN');

    console.log('✅ Task 4 completed');
  });

  test('Task 5: Mouse hover', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/hovers');

    // ✅ Solution 5.1: Hover
    await page.locator('.figure').first().hover();

    // ✅ Solution 5.2: Verify caption visible
    const caption = page.locator('.figcaption').first();
    await expect(caption).toBeVisible();

    // ✅ Solution 5.3: Get and log text
    const text = await caption.textContent();
    console.log('Caption:', text);

    console.log('✅ Task 5 completed');
  });

  test('Task 6: Hover all figures', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/hovers');

    // ✅ Solution 6.1: Get all figures
    const figures = page.locator('.figure');

    // ✅ Solution 6.2-6.3: Loop and hover
    const count = await figures.count();
    for (let i = 0; i < count; i++) {
      await figures.nth(i).hover();
      const caption = figures.nth(i).locator('.figcaption');
      await expect(caption).toBeVisible();
      console.log(`Figure ${i + 1}: Caption visible`);
    }

    console.log('✅ Task 6 completed');
  });

  test('Task 7: Drag and drop', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/drag-and-drop');

    // ✅ Solution 7.1: Get columns
    const columnA = page.locator('#column-a');
    const columnB = page.locator('#column-b');

    // ✅ Solution 7.2: Get initial text
    const initialA = await columnA.locator('header').textContent();
    const initialB = await columnB.locator('header').textContent();

    // ✅ Solution 7.3: Drag
    await columnA.dragTo(columnB);

    // ✅ Solution 7.4: Get text after drag
    const afterA = await columnA.locator('header').textContent();
    const afterB = await columnB.locator('header').textContent();

    // ✅ Solution 7.5: Verify swap
    expect(afterA).toBe(initialB);
    expect(afterB).toBe(initialA);

    console.log('✅ Task 7 completed');
  });

  test('Task 8: pressSequentially for slow typing', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // ✅ Solution 8.1: Type slowly
    await page.locator('#username').pressSequentially('practice', { delay: 100 });

    // ✅ Solution 8.2: Verify
    await expect(page.locator('#username')).toHaveValue('practice');

    console.log('✅ Task 8 completed');
  });

  test('Challenge: Complete hover-then-click flow', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/hovers');

    // ✅ Hover
    await page.locator('.figure').first().hover();

    // ✅ Wait for link
    const viewProfileLink = page.locator('.figcaption a').first();
    await expect(viewProfileLink).toBeVisible();

    // ✅ Click link
    await viewProfileLink.click();

    // ✅ Verify URL changed
    await expect(page).toHaveURL(/users/);

    console.log('🎉 Challenge completed!');
  });

});
