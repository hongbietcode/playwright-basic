import { test, expect } from '@playwright/test';

/**
 * Example 02: Text & Role-Based Locators
 *
 * Demonstrates Playwright's built-in locators:
 * - getByRole() - Accessibility roles
 * - getByText() - Text content
 * - getByLabel() - Form labels
 * - getByPlaceholder() - Input placeholders
 * - getByAltText() - Image alt text
 * - getByTestId() - Test IDs
 *
 * Run: yarn test examples/02-text-locators.spec.ts
 */

test.describe('Text & Role-Based Locators', () => {

  test('should use getByRole() for buttons', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Find button by role and name
    const loginButton = page.getByRole('button', { name: /login/i });
    await expect(loginButton).toBeVisible();

    // Exact name match
    const exactButton = page.getByRole('button', { name: 'Login', exact: true });
    await expect(exactButton).toBeVisible();

    // Click using role locator
    await page.locator('#username').fill('practice');
    await page.locator('#password').fill('SuperSecretPassword!');
    await loginButton.click();

    // Wait for navigation
    await page.waitForURL('**/secure');

    console.log('✅ getByRole() for buttons works');
  });

  test('should use getByRole() for textboxes', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Find textbox by accessible name
    const usernameBox = page.getByRole('textbox', { name: /username/i });
    const passwordBox = page.getByRole('textbox', { name: /password/i });

    // Fill textboxes
    await usernameBox.fill('practice');
    await passwordBox.fill('SuperSecretPassword!');

    // Verify values
    await expect(usernameBox).toHaveValue('practice');
    await expect(passwordBox).toHaveValue('SuperSecretPassword!');

    console.log('✅ getByRole() for textboxes works');
  });

  test('should use getByRole() for links', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Find link by text
    const loginLink = page.getByRole('link', { name: /login/i });
    await expect(loginLink).toBeVisible();

    // Click link
    await loginLink.click();

    // Verify navigation
    await expect(page).toHaveURL(/.*login/);

    console.log('✅ getByRole() for links works');
  });

  test('should use getByRole() for headings', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Find heading by level and name
    const mainHeading = page.getByRole('heading', { name: /login page/i });
    await expect(mainHeading).toBeVisible();

    // Get heading text
    const headingText = await mainHeading.textContent();
    console.log('Heading:', headingText);

    console.log('✅ getByRole() for headings works');
  });

  test('should use getByText() for exact match', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Exact text match
    const loginText = page.getByText('Login', { exact: true });
    await expect(loginText).toBeVisible();

    // Partial text match (default)
    const pageText = page.getByText('Login Page');
    await expect(pageText).toBeVisible();

    console.log('✅ getByText() exact match works');
  });

  test('should use getByText() with regex', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Case-insensitive regex
    const formLink = page.getByText(/form validation/i);
    await expect(formLink).toBeVisible();

    // Pattern matching
    const downloadLink = page.getByText(/download/i);
    await expect(downloadLink).toBeVisible();

    console.log('✅ getByText() with regex works');
  });

  test('should use getByLabel() for form inputs', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Find input by label text
    const usernameInput = page.getByLabel(/username/i);
    const passwordInput = page.getByLabel(/password/i);

    // Fill using label locators
    await usernameInput.fill('practice');
    await passwordInput.fill('SuperSecretPassword!');

    // Verify
    await expect(usernameInput).toHaveValue('practice');
    await expect(passwordInput).toHaveValue('SuperSecretPassword!');

    console.log('✅ getByLabel() works');
  });

  test('should use getByPlaceholder()', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Find by placeholder text
    const usernameInput = page.getByPlaceholder(/username/i);
    const passwordInput = page.getByPlaceholder(/password/i);

    // Fill
    await usernameInput.fill('testuser');
    await passwordInput.fill('testpass');

    // Verify placeholder still visible when empty
    await usernameInput.clear();
    await expect(usernameInput).toHaveAttribute('placeholder', /username/i);

    console.log('✅ getByPlaceholder() works');
  });

  test('should use getByAltText() for images', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Note: This site may not have images with alt text
    // Demonstrating the concept
    await page.goto('https://playwright.dev');

    // Find image by alt text
    const logo = page.getByAltText(/playwright/i);
    if (await logo.count() > 0) {
      await expect(logo.first()).toBeVisible();
      console.log('✅ getByAltText() works');
    } else {
      console.log('⚠️ No images with alt text found (expected for this demo)');
    }
  });

  test('should use getByTestId()', async ({ page }) => {
    // Note: Test site may not have data-testid attributes
    // This demonstrates the concept
    await page.goto('https://practice.expandtesting.com/login');

    // If elements had data-testid:
    // <button data-testid="login-btn">Login</button>

    // Would use:
    // const loginBtn = page.getByTestId('login-btn');
    // await loginBtn.click();

    // For this demo, we'll check if any exist
    const elementsWithTestId = page.locator('[data-testid]');
    const count = await elementsWithTestId.count();
    console.log(`Elements with data-testid: ${count}`);

    console.log('✅ getByTestId() concept demonstrated');
  });

  test('should combine locators with filter()', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Find all links
    const allLinks = page.getByRole('link');

    // Filter links containing "Form"
    const formLinks = allLinks.filter({ hasText: /form/i });
    const formCount = await formLinks.count();
    console.log(`Links with "form": ${formCount}`);

    // Click first form-related link
    if (formCount > 0) {
      await formLinks.first().click();
      console.log('✅ Clicked filtered link');
    }
  });

  test('should use locator chaining', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Chain locators for specificity
    const form = page.locator('form');
    const submitButton = form.getByRole('button', { name: /login/i });

    await expect(submitButton).toBeVisible();

    // More complex chaining
    const usernameInForm = form.getByLabel(/username/i);
    await usernameInForm.fill('practice');

    console.log('✅ Locator chaining works');
  });

  test('should demonstrate locator priority', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Priority order (from best to worst):
    console.log('Testing locator priority...\n');

    // 1️⃣ Role-based (Best - Accessibility-friendly)
    const roleButton = page.getByRole('button', { name: /login/i });
    console.log('1. getByRole:', await roleButton.count(), 'matches ✅');

    // 2️⃣ Label (Good - Form semantic)
    const labelInput = page.getByLabel(/username/i);
    console.log('2. getByLabel:', await labelInput.count(), 'matches ✅');

    // 3️⃣ Placeholder (OK - But text may change)
    const placeholderInput = page.getByPlaceholder(/username/i);
    console.log('3. getByPlaceholder:', await placeholderInput.count(), 'matches ⚠️');

    // 4️⃣ Text (OK - But fragile if text changes)
    const textElement = page.getByText(/login/i);
    console.log('4. getByText:', await textElement.count(), 'matches ⚠️');

    // 5️⃣ TestID (Fallback - Requires dev cooperation)
    const testIdElement = page.getByTestId('login-btn');
    console.log('5. getByTestId:', await testIdElement.count(), 'matches (not found) ❌');

    // 6️⃣ CSS/XPath (Last resort)
    const cssElement = page.locator('#username');
    console.log('6. CSS Selector:', await cssElement.count(), 'matches ⚠️');

    console.log('\n✅ Locator priority demonstrated');
  });

  test('should use regex for flexible matching', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Case-insensitive matching
    const checkboxLink = page.getByRole('link', { name: /checkboxes/i });
    await expect(checkboxLink).toBeVisible();

    // Pattern matching (starts with, ends with, contains)
    const formLink = page.getByText(/Form.*Validation/i);
    if (await formLink.count() > 0) {
      await expect(formLink).toBeVisible();
    }

    // Multiple patterns
    const dynamicLink = page.getByText(/(dynamic|loading)/i);
    console.log('Dynamic links found:', await dynamicLink.count());

    console.log('✅ Regex matching works');
  });

  test('should compare all locator methods', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    console.log('\n=== Locator Method Comparison ===\n');

    // Different ways to find the same button
    const methods = [
      { name: 'getByRole', locator: page.getByRole('button', { name: /login/i }) },
      { name: 'getByText', locator: page.getByText('Login') },
      { name: 'CSS class', locator: page.locator('.btn-primary') },
      { name: 'CSS type', locator: page.locator('button[type="submit"]') }
    ];

    for (const method of methods) {
      const count = await method.locator.count();
      const visible = count > 0 && await method.locator.first().isVisible();
      console.log(`${method.name}: ${count} found, visible: ${visible}`);
    }

    console.log('\n✅ All methods compared');
  });

});

/**
 * Key Takeaways:
 *
 * 1. Built-in Locators Priority:
 *    1️⃣ getByRole() - Accessibility-first (Best)
 *    2️⃣ getByLabel() - Form inputs
 *    3️⃣ getByPlaceholder() - Input hints
 *    4️⃣ getByText() - Visible text
 *    5️⃣ getByAltText() - Images
 *    6️⃣ getByTestId() - Test-specific IDs
 *
 * 2. Common Roles:
 *    - button, link, textbox, checkbox, radio
 *    - heading, img, table, row, cell
 *    - dialog, menu, menuitem
 *
 * 3. Regex Support:
 *    - Case-insensitive: /login/i
 *    - Pattern matching: /Form.*Validation/
 *    - Flexible matching: /(option1|option2)/
 *
 * 4. Filtering & Chaining:
 *    - .filter({ hasText: 'text' })
 *    - .filter({ has: locator })
 *    - parent.locator(child)
 *
 * 5. Best Practices:
 *    - Prefer user-facing locators (role, label, text)
 *    - Use regex for flexibility
 *    - Chain locators for specificity
 *    - Avoid implementation details
 *
 * Next: 03-click-interactions.spec.ts
 */
