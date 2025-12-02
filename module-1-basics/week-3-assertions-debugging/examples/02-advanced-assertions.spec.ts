import { test, expect } from '@playwright/test';

/**
 * Example 02: Advanced Assertions
 *
 * Demonstrates advanced assertion patterns:
 * - Value comparisons (toBe, toEqual, toContain)
 * - Number comparisons (toBeGreaterThan, toBeLessThan)
 * - Array/Object assertions
 * - Custom matchers (toPass)
 * - Soft assertions
 *
 * Run: yarn test examples/02-advanced-assertions.spec.ts
 */

test.describe('Advanced Assertions Examples', () => {

  test('should compare values with toBe (strict equality)', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // Get count
    const count = await page.locator('input[type="checkbox"]').count();
    expect(count).toBe(2);

    // Boolean
    const isVisible = await page.locator('h1').isVisible();
    expect(isVisible).toBe(true);

    // String
    const title = await page.title();
    expect(title).toBe('Practice Test Automation: Checkboxes');

    console.log('✅ toBe assertions work');
  });

  test('should compare objects with toEqual (deep equality)', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Get multiple values
    const data = {
      title: await page.title(),
      url: page.url(),
    };

    // Deep equality
    expect(data).toEqual({
      title: expect.stringContaining('Practice'),
      url: expect.stringContaining('expandtesting')
    });

    // Array equality
    const texts = await page.locator('h2').allTextContents();
    expect(texts.length).toBeGreaterThan(0);

    console.log('✅ toEqual assertions work');
  });

  test('should check array/string contains', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // String contains
    const title = await page.title();
    expect(title).toContain('Practice');

    // Get all link texts
    const linkTexts = await page.locator('a').allTextContents();

    // Array contains
    if (linkTexts.length > 0) {
      expect(linkTexts).toContain(expect.stringContaining(''));
    }

    console.log('✅ toContain assertions work');
  });

  test('should use number comparisons', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Get element count
    const linkCount = await page.locator('a').count();

    // Greater than
    expect(linkCount).toBeGreaterThan(5);

    // Greater than or equal
    expect(linkCount).toBeGreaterThanOrEqual(5);

    // Less than
    expect(linkCount).toBeLessThan(100);

    // Less than or equal
    expect(linkCount).toBeLessThanOrEqual(100);

    console.log('✅ Number comparisons work');
  });

  test('should verify truthy/falsy values', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Truthy
    const username = await page.locator('#username').inputValue();
    // Empty string is falsy
    expect(username).toBeFalsy();

    // Fill it
    await page.fill('#username', 'test');
    const value = await page.locator('#username').inputValue();
    expect(value).toBeTruthy();

    console.log('✅ Truthy/falsy assertions work');
  });

  test('should use regex matching', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const title = await page.title();

    // Regex match
    expect(title).toMatch(/Practice.*Login/);
    expect(title).toMatch(/^Practice/);

    // Email validation pattern
    const email = 'test@example.com';
    expect(email).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    console.log('✅ Regex matching works');
  });

  test('should verify defined/undefined/null', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Defined
    const element = page.locator('h1');
    expect(element).toBeDefined();

    // Check page object
    expect(page).toBeDefined();
    expect(page.url()).toBeDefined();

    // Undefined (for demo)
    let undefinedVar;
    expect(undefinedVar).toBeUndefined();

    // Null (for demo)
    const nullVar = null;
    expect(nullVar).toBeNull();

    console.log('✅ Defined/undefined/null assertions work');
  });

  test('should use expect.stringContaining', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const title = await page.title();

    // Flexible matching
    expect(title).toEqual(expect.stringContaining('Practice'));
    expect(title).toEqual(expect.stringContaining('Login'));

    console.log('✅ expect.stringContaining works');
  });

  test('should use expect.arrayContaining', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    const linkTexts = await page.locator('a').allTextContents();

    // Array contains subset
    expect(linkTexts).toEqual(expect.arrayContaining([expect.any(String)]));

    console.log('✅ expect.arrayContaining works');
  });

  test('should use toPass for retry logic', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    // Click to trigger async load
    await page.click('#start button');

    // Retry until condition passes
    await expect(async () => {
      const text = await page.locator('#finish h4').textContent();
      expect(text).toBe('Hello World!');
    }).toPass({
      timeout: 10000,
      intervals: [1000, 2000, 3000]
    });

    console.log('✅ toPass with retry works');
  });

  test('should use soft assertions (continue on failure)', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Soft assertions - test continues even if they fail
    await expect.soft(page.locator('h2')).toHaveText('Test login');
    await expect.soft(page.locator('#username')).toBeVisible();
    await expect.soft(page.locator('#password')).toBeVisible();

    // All soft assertions are reported at the end
    console.log('✅ Soft assertions completed');
  });

  test('should combine multiple assertions', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const usernameInput = page.locator('#username');

    // Multiple assertions on same element
    await expect(usernameInput).toBeVisible();
    await expect(usernameInput).toBeEnabled();
    await expect(usernameInput).toBeEditable();
    await expect(usernameInput).toHaveAttribute('type', 'text');
    await expect(usernameInput).toHaveValue('');

    console.log('✅ Multiple assertions work');
  });

  test('should verify element has specific CSS', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // CSS property assertions
    const heading = page.locator('h2');

    // Note: CSS values may vary by browser
    await expect(heading).toHaveCSS('display', 'block');

    console.log('✅ CSS assertions work');
  });

  test('should assert on multiple elements', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    const checkboxes = page.locator('input[type="checkbox"]');

    // Get all checkboxes
    const count = await checkboxes.count();

    // Assert on each
    for (let i = 0; i < count; i++) {
      const checkbox = checkboxes.nth(i);
      await expect(checkbox).toBeVisible();
      await expect(checkbox).toBeEnabled();
    }

    console.log(`✅ Asserted on ${count} elements`);
  });

  test('should use custom error messages', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const count = await page.locator('input').count();

    // With custom message
    expect(count, 'Should have at least 2 input fields').toBeGreaterThanOrEqual(2);

    console.log('✅ Custom error messages work');
  });

});

/**
 * Key Takeaways:
 *
 * 1. Value Comparisons:
 *    - toBe() - Strict equality (===)
 *    - toEqual() - Deep equality (objects/arrays)
 *    - toContain() - Array/string contains
 *    - toMatch() - Regex matching
 *
 * 2. Number Comparisons:
 *    - toBeGreaterThan()
 *    - toBeGreaterThanOrEqual()
 *    - toBeLessThan()
 *    - toBeLessThanOrEqual()
 *
 * 3. Type Checks:
 *    - toBeTruthy() / toBeFalsy()
 *    - toBeDefined() / toBeUndefined()
 *    - toBeNull()
 *
 * 4. Advanced Matchers:
 *    - expect.stringContaining()
 *    - expect.arrayContaining()
 *    - expect.any()
 *
 * 5. Special Assertions:
 *    - toPass() - Retry until pass
 *    - expect.soft() - Continue on failure
 *
 * Next: 03-debug-modes.spec.ts
 */
