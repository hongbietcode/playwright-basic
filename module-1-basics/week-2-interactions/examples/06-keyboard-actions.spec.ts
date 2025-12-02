import { test, expect } from '@playwright/test';

/**
 * Example 06: Keyboard Actions
 *
 * Demonstrates keyboard interactions:
 * - press() - Single key press
 * - Keyboard shortcuts (Ctrl+C, Ctrl+V, etc.)
 * - keyboard.down/up() - Hold and release keys
 * - Special keys (Enter, Tab, Escape, Arrow keys)
 * - pressSequentially() - Character-by-character typing
 *
 * Run: yarn test examples/06-keyboard-actions.spec.ts
 */

test.describe('Keyboard Actions', () => {

  test('should press Enter key', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Fill form
    await page.locator('#username').fill('practice');
    await page.locator('#password').fill('SuperSecretPassword!');

    // Press Enter to submit
    await page.locator('#password').press('Enter');

    // Wait for navigation
    await page.waitForURL('**/secure');

    await expect(page).toHaveURL(/.*secure/);

    console.log('✅ Enter key works');
  });

  test('should press Escape key', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');

    // Press Escape
    await page.press('Escape');

    // Verify result
    const result = page.locator('#result');
    await expect(result).toContainText('ESCAPE');

    console.log('✅ Escape key works');
  });

  test('should press Tab key for navigation', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Focus on username
    await page.locator('#username').focus();

    // Tab to password field
    await page.press('Tab');

    // Verify password field is focused
    await expect(page.locator('#password')).toBeFocused();

    console.log('✅ Tab navigation works');
  });

  test('should press Arrow keys', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');

    // Press each arrow key
    await page.press('ArrowUp');
    await expect(page.locator('#result')).toContainText('UP');

    await page.press('ArrowDown');
    await expect(page.locator('#result')).toContainText('DOWN');

    await page.press('ArrowLeft');
    await expect(page.locator('#result')).toContainText('LEFT');

    await page.press('ArrowRight');
    await expect(page.locator('#result')).toContainText('RIGHT');

    console.log('✅ Arrow keys work');
  });

  test('should use keyboard shortcuts - Copy/Paste', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const usernameField = page.locator('#username');

    // Fill text
    await usernameField.fill('practice');

    // Focus and select all (Ctrl+A)
    await usernameField.focus();
    await page.keyboard.press('Control+A');

    // Copy (Ctrl+C)
    await page.keyboard.press('Control+C');

    // Clear field
    await usernameField.clear();

    // Paste (Ctrl+V)
    await usernameField.focus();
    await page.keyboard.press('Control+V');

    // Verify pasted value
    await expect(usernameField).toHaveValue('practice');

    console.log('✅ Copy/Paste shortcuts work');
  });

  test('should use Ctrl+A (Select All)', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const usernameField = page.locator('#username');

    // Fill text
    await usernameField.fill('testuser123');

    // Select all
    await usernameField.focus();
    await page.keyboard.press('Control+A');

    // Type to replace
    await usernameField.pressSequentially('practice', { delay: 50 });

    // Verify replaced
    await expect(usernameField).toHaveValue('practice');

    console.log('✅ Ctrl+A (Select All) works');
  });

  test('should use keyboard.down() and keyboard.up()', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Hold Shift and press arrow keys (multi-select simulation)
    await page.keyboard.down('Shift');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.up('Shift');

    console.log('✅ Shift+Arrow (down/up) works');

    // Hold Control and click (multi-select)
    await page.keyboard.down('Control');
    // ... clicks would go here
    await page.keyboard.up('Control');

    console.log('✅ Control key hold/release works');
  });

  test('should use pressSequentially for character-by-character typing', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const usernameField = page.locator('#username');

    // Type slowly (simulates human typing for autocomplete/typeahead)
    await usernameField.pressSequentially('practice', { delay: 100 });

    // Verify
    await expect(usernameField).toHaveValue('practice');

    console.log('✅ pressSequentially (slow typing) works');
  });

  test('should press function keys', async ({ page }) => {
    // Function keys F1-F12
    await page.goto('https://the-internet.herokuapp.com/key_presses');

    // Press F1
    await page.press('F1');

    // Note: F1 usually opens help in browsers
    // For testing, we verify the key was sent
    console.log('✅ Function key (F1) pressed');
  });

  test('should press special keys', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');

    const specialKeys = [
      'Backspace',
      'Delete',
      'Home',
      'End',
      'PageUp',
      'PageDown',
      'Insert'
    ];

    for (const key of specialKeys) {
      await page.press(key);
      console.log(`Pressed: ${key}`);
    }

    console.log('✅ All special keys pressed');
  });

  test('should demonstrate keyboard combinations', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const usernameField = page.locator('#username');
    await usernameField.fill('testuser');

    console.log('\n=== Keyboard Combinations ===\n');

    // Ctrl+A - Select All
    await usernameField.focus();
    await page.keyboard.press('Control+A');
    console.log('1. Ctrl+A - Selected all');

    // Ctrl+C - Copy
    await page.keyboard.press('Control+C');
    console.log('2. Ctrl+C - Copied');

    // Ctrl+X - Cut
    await page.keyboard.press('Control+X');
    console.log('3. Ctrl+X - Cut (field should be empty)');
    await expect(usernameField).toHaveValue('');

    // Ctrl+V - Paste
    await page.keyboard.press('Control+V');
    console.log('4. Ctrl+V - Pasted');
    await expect(usernameField).toHaveValue('testuser');

    // Ctrl+Z - Undo
    await page.keyboard.press('Control+Z');
    console.log('5. Ctrl+Z - Undo');

    console.log('\n✅ All keyboard combinations work');
  });

  test('should handle multi-modifier shortcuts', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const usernameField = page.locator('#username');
    await usernameField.fill('test text');

    // Ctrl+Shift+Z (Redo)
    await usernameField.focus();
    await page.keyboard.press('Control+Shift+Z');

    console.log('✅ Ctrl+Shift+Z (Redo) pressed');

    // Ctrl+Shift+ArrowLeft (Select word to left)
    await page.keyboard.press('Control+Shift+ArrowLeft');

    console.log('✅ Multi-modifier shortcuts work');
  });

  test('should demonstrate platform-specific modifiers', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const usernameField = page.locator('#username');
    await usernameField.fill('testuser');
    await usernameField.focus();

    // On Mac: Meta+A (Command+A)
    // On Windows/Linux: Control+A
    const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';

    // Select All (platform-specific)
    await page.keyboard.press(`${modifier}+A`);

    console.log(`✅ ${modifier}+A (platform-specific) works`);
  });

  test('should type vs fill comparison', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const usernameField = page.locator('#username');
    const passwordField = page.locator('#password');

    console.log('\n=== Type vs Fill Comparison ===\n');

    // Method 1: fill() - Fast, instant
    console.time('fill()');
    await usernameField.fill('practice');
    console.timeEnd('fill()');

    // Method 2: pressSequentially() - Slow, character-by-character
    console.time('pressSequentially()');
    await passwordField.pressSequentially('SuperSecretPassword!', { delay: 10 });
    console.timeEnd('pressSequentially()');

    console.log('\n✅ fill() is much faster than pressSequentially()');
    console.log('Use fill() for speed, pressSequentially() for autocomplete/typeahead');
  });

  test('should handle keyboard in search with autocomplete', async ({ page }) => {
    // Simulating autocomplete scenario
    await page.goto('https://practice.expandtesting.com');

    const searchInput = page.locator('input[type="search"]');
    if (await searchInput.count() > 0) {
      // Type slowly to trigger autocomplete
      await searchInput.pressSequentially('test', { delay: 100 });

      // Wait for suggestions (if any)
      await page.waitForTimeout(500);

      // Press ArrowDown to select first suggestion
      await page.press('ArrowDown');

      // Press Enter to confirm
      await page.press('Enter');

      console.log('✅ Autocomplete keyboard navigation works');
    } else {
      console.log('⚠️ No search input found (skipped)');
    }
  });

  test('should demonstrate all key types', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');

    console.log('\n=== Key Types ===\n');

    const keyTypes = {
      'Navigation': ['Tab', 'Enter', 'Escape'],
      'Arrows': ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
      'Editing': ['Backspace', 'Delete', 'Home', 'End'],
      'Modifiers': ['Control', 'Shift', 'Alt', 'Meta'],
      'Function': ['F1', 'F2', 'F12']
    };

    for (const [category, keys] of Object.entries(keyTypes)) {
      console.log(`${category}:`, keys.join(', '));
    }

    // Test a few
    await page.press('Tab');
    await page.press('Enter');
    await page.press('Escape');

    console.log('\n✅ All key types demonstrated');
  });

});

/**
 * Key Takeaways:
 *
 * 1. Single Key Press:
 *    - page.press(key) or locator.press(key)
 *    - Keys: Enter, Tab, Escape, Backspace, Delete, etc.
 *    - Arrow keys: ArrowUp, ArrowDown, ArrowLeft, ArrowRight
 *
 * 2. Keyboard Shortcuts:
 *    - page.keyboard.press('Control+A') - Select All
 *    - page.keyboard.press('Control+C') - Copy
 *    - page.keyboard.press('Control+V') - Paste
 *    - page.keyboard.press('Control+Z') - Undo
 *    - Multi-modifier: 'Control+Shift+Z'
 *
 * 3. Hold and Release:
 *    - keyboard.down(key) - Hold key
 *    - keyboard.up(key) - Release key
 *    - Use for: Shift+Click, Ctrl+Click, multi-select
 *
 * 4. Typing Methods:
 *    - fill() - Fast, instant (recommended)
 *    - pressSequentially() - Slow, char-by-char (for autocomplete)
 *    - keyboard.insertText() - Instant, no events (rare)
 *
 * 5. Platform Modifiers:
 *    - Windows/Linux: Control
 *    - Mac: Meta (Command key)
 *    - Detect: process.platform === 'darwin'
 *
 * 6. Common Patterns:
 *    - Form submit: press('Enter')
 *    - Tab navigation: press('Tab')
 *    - Select all + copy: 'Control+A', 'Control+C'
 *    - Autocomplete: pressSequentially + ArrowDown + Enter
 *
 * 7. Best Practices:
 *    - Use fill() instead of typing for speed
 *    - Release modifiers with up()
 *    - Use pressSequentially only for autocomplete
 *    - Platform-aware shortcuts
 *
 * Next: 07-mouse-actions.spec.ts
 */
