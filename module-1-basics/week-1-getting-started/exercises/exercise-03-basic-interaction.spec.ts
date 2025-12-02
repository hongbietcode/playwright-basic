import { test, expect } from '@playwright/test';

/**
 * EXERCISE 03: Basic Interactions - Tương Tác Cơ Bản
 *
 * Mục tiêu:
 * - Tìm elements với locators
 * - Click buttons và links
 * - Fill form inputs
 * - Work với checkboxes
 * - Verify element states
 *
 * Instructions:
 * 1. Hoàn thành tất cả TODOs
 * 2. Chạy: yarn test week-1-getting-started/exercises/exercise-03
 * 3. All tests must PASS
 *
 * Thời gian dự kiến: 30-40 phút
 * Độ khó: ⭐⭐ Medium
 */

test.describe('Exercise 03: Basic Interactions', () => {

  /**
   * Test 1: Login flow hoàn chỉnh
   *
   * TODO:
   * - Navigate đến /login
   * - Fill username và password
   * - Click login button
   * - Verify login successful
   */
  test('should complete login flow', async ({ page }) => {
    // TODO: Navigate đến login page
    // Hint: https://practice.expandtesting.com/login


    // TODO: Fill username field với "practice"
    // Hint: page.fill('#username', '...')


    // TODO: Fill password field với "SuperSecretPassword!"


    // TODO: Click login button
    // Hint: button[type="submit"] hoặc text="Login"


    // TODO: Wait for URL change đến /secure
    // Hint: page.waitForURL('**/secure')


    // TODO: Verify success message visible
    // Hint: .alert-success element


    console.log('✅ Login successful!');
    console.log('📍 Current URL:', page.url());
  });

  /**
   * Test 2: Form validation - Invalid login
   *
   * TODO:
   * - Attempt login với wrong credentials
   * - Verify error message appears
   */
  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO: Fill với wrong credentials
    // Username: wrong_user, Password: wrong_pass


    // TODO: Click login button


    // TODO: Verify error message appears
    // Hint: .alert-danger hoặc text chứa "invalid"


    // TODO: Verify vẫn ở login page


    console.log('✅ Error message verified');
  });

  /**
   * Test 3: Work với checkboxes
   *
   * TODO:
   * - Navigate đến /checkboxes
   * - Check/uncheck checkboxes
   * - Verify states
   */
  test('should interact with checkboxes', async ({ page }) => {
    // TODO: Navigate đến checkbox page
    // Hint: https://practice.expandtesting.com/checkboxes


    // TODO: Locate checkbox 1
    // Hint: #checkbox1


    // TODO: Check if checkbox 1 is checked
    // Hint: checkbox1.isChecked()


    console.log('Checkbox 1 initial state:', isChecked1);

    // TODO: If not checked, check it
    // Hint: checkbox1.check()


    // TODO: Verify checkbox 1 is now checked
    // Hint: expect(checkbox1).toBeChecked()


    // TODO: Uncheck checkbox 1


    // TODO: Verify checkbox 1 is unchecked


    console.log('✅ Checkbox interactions completed');
  });

  /**
   * Test 4: Dropdown selection
   *
   * TODO:
   * - Navigate đến /dropdown
   * - Select different options
   * - Verify selected values
   */
  test('should select dropdown options', async ({ page }) => {
    // TODO: Navigate đến dropdown page


    // TODO: Locate dropdown element
    // Hint: #dropdown


    // TODO: Select option 1 by value
    // Hint: dropdown.selectOption('1')


    // TODO: Verify selected value = '1'
    // Hint: dropdown.inputValue()


    console.log('✅ Option 1 selected');

    // TODO: Select option 2 by value


    // TODO: Verify selected value = '2'


    console.log('✅ Option 2 selected');
  });

  /**
   * Test 5: Multiple locator strategies
   *
   * TODO:
   * - Tìm login button bằng nhiều cách khác nhau
   * - Verify tất cả locators đều tìm đúng element
   */
  test('should locate element using different strategies', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO: Locate login button bằng CSS selector
    // Hint: button[type="submit"]


    // TODO: Verify button visible


    // TODO: Locate bằng text
    // Hint: page.locator('text=Login')


    // TODO: Verify visible


    // TODO: Locate bằng role
    // Hint: page.getByRole('button', { name: /login/i })


    // TODO: Verify visible


    // TODO: Get button text
    // Hint: buttonByRole.textContent()


    console.log('✅ Button text:', buttonText);

    // TODO: Verify button text contains "Login"


    console.log('✅ All locator strategies work');
  });

  /**
   * Test 6: Dynamic content loading
   *
   * TODO:
   * - Navigate đến dynamic loading page
   * - Click start button
   * - Wait for content to appear
   * - Verify content text
   */
  test('should wait for dynamic content', async ({ page }) => {
    // TODO: Navigate đến dynamic loading page
    // Hint: https://practice.expandtesting.com/dynamic-loading/2


    // TODO: Click "Start" button
    // Hint: button:has-text("Start")


    // TODO: Locate finish element (initially hidden)
    // Hint: #finish


    // TODO: Wait for element to be visible
    // Hint: finishElement.waitFor({ state: 'visible' })


    // TODO: Verify text = "Hello World!"
    // Hint: expect(finishElement).toContainText('Hello World!')


    console.log('✅ Dynamic content loaded');
  });

  /**
   * Test 7: Verify element attributes
   *
   * TODO:
   * - Check various element attributes
   * - Verify classes, href, disabled state
   */
  test('should verify element attributes', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    const loginButton = page.locator('button[type="submit"]');

    // TODO: Verify button type attribute = "submit"
    // Hint: loginButton.getAttribute('type')


    // TODO: Verify button is enabled


    // TODO: Verify button has class "btn"
    // Hint: getAttribute('class') hoặc evaluate


    console.log('✅ Element attributes verified');

    // TODO: Locate home link
    // Hint: a[href="/"]


    // TODO: Verify href attribute
    // Hint: getAttribute('href')


    console.log('✅ Link href:', href);
  });

  /**
   * Test 8: Form submission và navigation
   *
   * TODO:
   * - Complete full form flow
   * - Submit form
   * - Verify navigation
   * - Verify result page
   */
  test('should submit form and verify result', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO: Fill form
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // TODO: Submit form và wait for navigation
    // Hint: Promise.all([page.waitForURL(), page.click()])
    await Promise.all([
      page.waitForURL('**/secure'),
      page.click('button[type="submit"]')
    ]);

    // TODO: Verify URL contains "secure"


    // TODO: Verify page content
    // Hint: Check for h2, success message, etc.
    const heading = page.locator('h2');


    // TODO: Verify logout button exists
    // Hint: text="Logout" hoặc a[href="/logout"]


    console.log('✅ Form submitted successfully');
  });

});

/**
 * Bonus Challenge - Thử Thách Thêm:
 *
 * Nếu hoàn thành tất cả tests trên, thử:
 *
 * 1. Test file upload (nếu có file upload form)
 * 2. Test hover interactions
 * 3. Test keyboard shortcuts (Enter to submit)
 * 4. Test form với multiple fields
 * 5. Screenshot tại mỗi step quan trọng
 */

/**
 * Common Mistakes - Lỗi Thường Gặp:
 *
 * ❌ Quên await
 *    await page.click('button'); // Đúng
 *    page.click('button');       // Sai!
 *
 * ❌ Selector sai
 *    page.locator('#button')     // Đúng (có #)
 *    page.locator('button')      // Sai (thiếu #)
 *
 * ❌ Fill vào wrong element
 *    page.fill('#password', 'abc')  // Đúng selector
 *    page.fill('password', 'abc')   // Sai (thiếu #)
 *
 * ❌ Không wait for navigation
 *    await page.click('a');         // Sai
 *    await Promise.all([            // Đúng
 *      page.waitForURL(...),
 *      page.click('a')
 *    ]);
 */

/**
 * Self-Check Questions:
 *
 * 1. ❓ click() và fill() có gì khác nhau?
 *    💡 click() = mouse click, fill() = type text
 *
 * 2. ❓ Tại sao cần wait for element visible?
 *    💡 Element có thể loading, hidden, hoặc chưa render
 *
 * 3. ❓ Locator nào tốt nhất?
 *    💡 getByRole() > getByLabel() > CSS selectors
 *
 * 4. ❓ isChecked() vs toBeChecked() khác nhau?
 *    💡 isChecked() = return boolean, toBeChecked() = assertion
 *
 * 5. ❓ Khi nào dùng Promise.all()?
 *    💡 Khi action trigger navigation/popup
 */

/**
 * Completion Checklist:
 * ✅ Test 1: Login flow
 * ✅ Test 2: Invalid login
 * ✅ Test 3: Checkboxes
 * ✅ Test 4: Dropdown
 * ✅ Test 5: Multiple locators
 * ✅ Test 6: Dynamic content
 * ✅ Test 7: Attributes
 * ✅ Test 8: Form submission
 * ✅ All tests PASS
 * ✅ No TODOs remaining
 *
 * Next Steps:
 * 👉 Compare với solutions/exercise-03-basic-interaction.spec.ts
 * 👉 Review tất cả concepts của Week 1
 * 👉 Sẵn sàng cho Week 2: Advanced Interactions! 🚀
 */
