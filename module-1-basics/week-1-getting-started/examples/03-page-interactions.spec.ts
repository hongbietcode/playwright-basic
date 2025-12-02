import { test, expect } from '@playwright/test';

/**
 * Example 03: Page Interactions - Tương Tác Với Trang
 *
 * Bài học này giới thiệu các tương tác cơ bản với elements trên trang:
 * - click(): Click vào element
 * - fill(): Điền text vào input
 * - check(): Check checkbox
 * - selectOption(): Select dropdown option
 * - Locators cơ bản
 *
 * Học được gì:
 * - Tìm elements bằng locators
 * - Thực hiện basic actions
 * - Verify results với assertions
 */

test.describe('Page Interactions - Tương Tác Cơ Bản', () => {

  /**
   * Test 1: Click vào buttons và links
   */
  test('should click buttons and links', async ({ page }) => {
    // Navigate đến practice site
    await page.goto('https://practice.expandtesting.com');

    // Click vào link bằng text
    await page.click('text=Test Login Page');

    // Verify navigated đến login page
    await expect(page).toHaveURL(/.*login/);
    console.log('✅ Clicked link, navigated to:', page.url());

    // Click button bằng role
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeVisible();
    console.log('✅ Login button is visible');
  });

  /**
   * Test 2: Fill form inputs
   */
  test('should fill text inputs', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Fill username field
    await page.fill('#username', 'practice');
    console.log('✅ Filled username');

    // Fill password field
    await page.fill('#password', 'SuperSecretPassword!');
    console.log('✅ Filled password');

    // Verify input values
    const usernameValue = await page.inputValue('#username');
    expect(usernameValue).toBe('practice');

    const passwordValue = await page.inputValue('#password');
    expect(passwordValue).toBe('SuperSecretPassword!');

    console.log('✅ Verified input values');
  });

  /**
   * Test 3: Complete login flow
   */
  test('should complete login flow', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Fill credentials
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // Click login button
    await page.click('button[type="submit"]');

    // Wait for navigation hoặc success message
    await page.waitForURL('**/secure', { timeout: 10000 });

    // Verify success
    const successMessage = page.locator('.alert-success');
    await expect(successMessage).toBeVisible();

    console.log('✅ Login successful!');
  });

  /**
   * Test 4: Work với checkboxes
   */
  test('should interact with checkboxes', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // Locator cho checkbox 1
    const checkbox1 = page.locator('#checkbox1');

    // Check nếu chưa checked
    if (!(await checkbox1.isChecked())) {
      await checkbox1.check();
      console.log('✅ Checkbox 1 checked');
    }

    // Verify checked state
    await expect(checkbox1).toBeChecked();

    // Uncheck
    await checkbox1.uncheck();
    await expect(checkbox1).not.toBeChecked();
    console.log('✅ Checkbox 1 unchecked');
  });

  /**
   * Test 5: Work với dropdowns
   */
  test('should select dropdown options', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dropdown');

    const dropdown = page.locator('#dropdown');

    // Select by value
    await dropdown.selectOption('1');
    console.log('✅ Selected option 1');

    // Verify selected value
    const selectedValue = await dropdown.inputValue();
    expect(selectedValue).toBe('1');

    // Select by label text
    await dropdown.selectOption({ label: 'Option 2' });
    console.log('✅ Selected Option 2');
  });

  /**
   * Test 6: Multiple locator strategies
   */
  test('should use different locator strategies', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // 1. By ID
    const usernameById = page.locator('#username');
    await usernameById.fill('test1');
    console.log('✅ Located by ID');

    // 2. By CSS selector
    const usernameByCSS = page.locator('input[name="username"]');
    await usernameByCSS.fill('test2');
    console.log('✅ Located by CSS selector');

    // 3. By text
    const loginButton = page.locator('text=Login');
    await expect(loginButton).toBeVisible();
    console.log('✅ Located by text');

    // 4. By role (recommended)
    const usernameByRole = page.getByRole('textbox', { name: /username/i });
    await usernameByRole.fill('test3');
    console.log('✅ Located by role');

    // 5. By label
    const usernameByLabel = page.getByLabel('Username');
    await usernameByLabel.fill('test4');
    console.log('✅ Located by label');

    // 6. By placeholder
    const usernameByPlaceholder = page.getByPlaceholder('Username');
    await usernameByPlaceholder.fill('test5');
    console.log('✅ Located by placeholder');
  });

  /**
   * Test 7: Chờ elements xuất hiện
   */
  test('should wait for elements to appear', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dynamic-loading/2');

    // Click button để load dynamic content
    await page.click('button:has-text("Start")');

    // Wait for element to appear
    const dynamicText = page.locator('#finish');
    await dynamicText.waitFor({ state: 'visible' });

    // Verify text
    await expect(dynamicText).toContainText('Hello World!');
    console.log('✅ Dynamic content loaded');
  });

  /**
   * Test 8: Verify element states
   */
  test('should verify element states', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const loginButton = page.locator('button[type="submit"]');

    // Check if visible
    await expect(loginButton).toBeVisible();
    console.log('✅ Button is visible');

    // Check if enabled
    await expect(loginButton).toBeEnabled();
    console.log('✅ Button is enabled');

    // Get text content
    const buttonText = await loginButton.textContent();
    console.log(`✅ Button text: "${buttonText}"`);

    // Check attribute
    const buttonType = await loginButton.getAttribute('type');
    expect(buttonType).toBe('submit');
    console.log('✅ Button type verified');
  });

});

/**
 * Advanced: Chaining actions
 */
test.describe('Chained Interactions', () => {

  /**
   * Test 9: Chain multiple actions
   */
  test('should chain multiple actions', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Chain: fill → fill → click → wait
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/secure');

    console.log('✅ Chained actions completed');
  });

  /**
   * Test 10: Work với multiple elements
   */
  test('should interact with multiple elements', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Get all links
    const allLinks = page.locator('a');
    const linkCount = await allLinks.count();
    console.log(`📊 Total links on page: ${linkCount}`);

    // Click first link
    const firstLink = allLinks.first();
    const linkText = await firstLink.textContent();
    console.log(`🔗 First link text: "${linkText}"`);

    // Get specific link by index
    const thirdLink = allLinks.nth(2); // 0-indexed
    await expect(thirdLink).toBeVisible();
  });

});

/**
 * Key Takeaways - Điểm Quan Trọng:
 *
 * 1. Locators:
 *    - page.locator('#id') - By ID
 *    - page.locator('.class') - By class
 *    - page.getByRole('button') - By ARIA role (recommended)
 *    - page.getByLabel('Username') - By label
 *    - page.getByText('Login') - By text
 *
 * 2. Actions:
 *    - click() - Click element
 *    - fill() - Fill input
 *    - check() / uncheck() - Checkboxes
 *    - selectOption() - Dropdowns
 *
 * 3. Assertions:
 *    - toBeVisible() - Element hiển thị
 *    - toBeEnabled() - Element enabled
 *    - toHaveValue() - Input có value
 *    - toContainText() - Element chứa text
 *
 * 4. Auto-waiting:
 *    Playwright tự động chờ element:
 *    - Visible
 *    - Enabled
 *    - Stable (không di chuyển)
 *
 * Best Practices:
 * - Prefer getByRole() over CSS selectors
 * - Use meaningful test data
 * - Verify state after actions
 * - Use auto-waiting, tránh sleep()
 *
 * Next Example: 04-screenshots-videos.spec.ts
 */
