import { test, expect } from '@playwright/test';

/**
 * Example 01: CSS Selectors
 *
 * Demonstrates various CSS selector strategies:
 * - ID selectors
 * - Class selectors
 * - Attribute selectors
 * - Combinators (descendant, child, sibling)
 * - Pseudo-classes
 *
 * Run: yarn test examples/01-css-selectors.spec.ts
 */

test.describe('CSS Selectors Examples', () => {

  test('should use ID selectors', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // #id selector - Most specific
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');

    // Verify elements exist
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    // Fill using ID selectors
    await usernameInput.fill('practice');
    await passwordInput.fill('SuperSecretPassword!');

    console.log('✅ ID selectors work perfectly');
  });

  test('should use class selectors', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // .class selector
    const submitButton = page.locator('.btn-primary');
    await expect(submitButton).toBeVisible();

    // Multiple classes (elements with BOTH classes)
    const buttons = page.locator('.btn.btn-primary');
    const count = await buttons.count();
    console.log(`Found ${count} buttons with both classes`);

    // Class contains (any element with class containing 'btn')
    const allButtons = page.locator('[class*="btn"]');
    const allCount = await allButtons.count();
    console.log(`Found ${allCount} elements with 'btn' in class`);

    console.log('✅ Class selectors work');
  });

  test('should use attribute selectors', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // [attribute] - Has attribute
    const submitButton = page.locator('[type="submit"]');
    await expect(submitButton).toBeVisible();

    // [attribute="value"] - Exact match
    const usernameField = page.locator('[name="username"]');
    await usernameField.fill('practice');

    // [attribute*="value"] - Contains
    const inputsWithUser = page.locator('[name*="user"]');
    await expect(inputsWithUser).toHaveCount(1);

    // [attribute^="value"] - Starts with
    const inputsStartingWithU = page.locator('[name^="u"]');
    console.log('Inputs starting with "u":', await inputsStartingWithU.count());

    // [attribute$="value"] - Ends with
    const inputsEndingWithName = page.locator('[name$="name"]');
    console.log('Inputs ending with "name":', await inputsEndingWithName.count());

    console.log('✅ Attribute selectors work');
  });

  test('should use descendant combinator (space)', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Descendant selector: ancestor descendant
    // Selects ALL descendants (children, grandchildren, etc.)
    const formButton = page.locator('form button');
    await expect(formButton).toBeVisible();

    // More specific descendant
    const formInput = page.locator('form input[type="text"]');
    await expect(formInput).toBeVisible();

    console.log('✅ Descendant combinator works');
  });

  test('should use child combinator (>)', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Child selector: parent > child
    // Selects only DIRECT children
    const formDirectChildren = page.locator('form > input');
    const count = await formDirectChildren.count();
    console.log(`Direct input children of form: ${count}`);

    console.log('✅ Child combinator works');
  });

  test('should use pseudo-classes', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // :first-child
    const firstCheckbox = page.locator('input[type="checkbox"]:first-child');
    console.log('First checkbox exists:', await firstCheckbox.count() > 0);

    // :last-child
    const lastCheckbox = page.locator('input[type="checkbox"]:last-child');
    console.log('Last checkbox exists:', await lastCheckbox.count() > 0);

    // :nth-child(n)
    const secondCheckbox = page.locator('input[type="checkbox"]:nth-child(2)');
    console.log('Second checkbox exists:', await secondCheckbox.count() > 0);

    // :has-text() - Playwright-specific
    const checkboxWithText = page.locator('label:has-text("checkbox")');
    console.log('Labels with "checkbox":', await checkboxWithText.count());

    console.log('✅ Pseudo-classes work');
  });

  test('should combine multiple selectors', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Combine ID + attribute
    const usernameInput = page.locator('#username[type="text"]');
    await expect(usernameInput).toBeVisible();

    // Combine class + attribute
    const primaryButton = page.locator('button.btn-primary[type="submit"]');
    await expect(primaryButton).toBeVisible();

    // Complex combination
    const specificInput = page.locator('form input#username[name="username"][type="text"]');
    await expect(specificInput).toBeVisible();

    console.log('✅ Combined selectors work');
  });

  test('should use :has-text() for filtering', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Find button containing specific text
    const loginButton = page.locator('a:has-text("Login")');
    await expect(loginButton).toBeVisible();

    // Case-insensitive text matching
    const formValidation = page.locator('a:has-text("Form Validation")');
    await expect(formValidation).toBeVisible();

    console.log('✅ :has-text() works');
  });

  test('should demonstrate selector specificity', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // From least to most specific
    const strategies = [
      { name: 'Element type', selector: 'button', },
      { name: 'Class', selector: '.btn-primary' },
      { name: 'Attribute', selector: '[type="submit"]' },
      { name: 'ID', selector: '#login-button' }, // May not exist
      { name: 'Combined', selector: 'button.btn-primary[type="submit"]' }
    ];

    for (const strategy of strategies) {
      const count = await page.locator(strategy.selector).count();
      console.log(`${strategy.name}: ${count} matches`);
    }

    console.log('✅ Selector specificity demonstrated');
  });

  test('should use nth() for indexing', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Get all links
    const links = page.locator('a');
    const totalLinks = await links.count();
    console.log(`Total links: ${totalLinks}`);

    // Get first link (index 0)
    const firstLink = links.nth(0);
    const firstText = await firstLink.textContent();
    console.log('First link:', firstText);

    // Get last link
    const lastLink = links.nth(totalLinks - 1);
    const lastText = await lastLink.textContent();
    console.log('Last link:', lastText);

    // Or use first() / last()
    const firstAlternative = links.first();
    const lastAlternative = links.last();

    await expect(firstAlternative).toHaveText(firstText || '');
    await expect(lastAlternative).toHaveText(lastText || '');

    console.log('✅ nth() indexing works');
  });

});

/**
 * Key Takeaways:
 *
 * 1. CSS Selector Types:
 *    - #id - Most specific, fastest
 *    - .class - Common, reusable
 *    - [attribute] - Flexible, semantic
 *    - element - Least specific
 *
 * 2. Combinators:
 *    - space (descendant) - Any level deep
 *    - > (child) - Direct children only
 *    - + (adjacent sibling) - Next sibling
 *    - ~ (general sibling) - All siblings
 *
 * 3. Pseudo-classes:
 *    - :first-child, :last-child
 *    - :nth-child(n)
 *    - :has-text() (Playwright-specific)
 *
 * 4. Best Practices:
 *    - Prefer semantic selectors (role, label)
 *    - Use ID when available
 *    - Avoid overly specific selectors
 *    - Keep selectors readable
 *
 * 5. Playwright Helpers:
 *    - .nth(index) - Get by index
 *    - .first() - Get first match
 *    - .last() - Get last match
 *    - .count() - Count matches
 *
 * Next: 02-text-locators.spec.ts
 */
