import { test, expect } from '@playwright/test';

/**
 * Exercise 01: Locators Practice
 *
 * Thực hành các loại locators:
 * - CSS selectors (ID, class, attribute)
 * - Role-based locators
 * - Text locators
 * - Chaining & filtering
 *
 * Instructions:
 * 1. Đọc kỹ TODO comments
 * 2. Hoàn thành code theo yêu cầu
 * 3. Run: yarn test exercises/exercise-01-locators.spec.ts
 * 4. Tất cả tests phải PASS
 * 5. So sánh với solution sau khi hoàn thành
 */

test.describe('Exercise 01: Locators Practice', () => {

  test('Task 1: Use CSS selectors - ID, class, attribute', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO 1.1: Locate username input bằng ID selector (#username)
    // Hint: Dùng page.locator('#id')
    const usernameInput = null; // Thay null bằng locator của bạn

    // TODO 1.2: Locate password input bằng attribute selector ([name="password"])
    // Hint: Dùng page.locator('[attribute="value"]')
    const passwordInput = null; // Thay null bằng locator của bạn

    // TODO 1.3: Locate submit button bằng class selector (.btn-primary)
    // Hint: Dùng page.locator('.class')
    const submitButton = null; // Thay null bằng locator của bạn

    // ===== Verification (Không sửa phần này) =====
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();

    console.log('✅ Task 1 completed');
  });

  test('Task 2: Use role-based locators', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO 2.1: Locate username textbox bằng getByRole với name chứa "username"
    // Hint: page.getByRole('textbox', { name: /regex/i })
    const usernameBox = null; // Thay null

    // TODO 2.2: Locate login button bằng getByRole với name là "Login"
    // Hint: page.getByRole('button', { name: 'text' })
    const loginButton = null; // Thay null

    // TODO 2.3: Fill form và click button
    // Hint: Dùng fill() và click()
    // await usernameBox.fill(...);
    // await ...

    // TODO 2.4: Verify navigation đến /secure page
    // Hint: await page.waitForURL('**/secure');
    // TODO: Thêm code verify ở đây

    // Self-check: Có thấy success message không?
    console.log('✅ Task 2 completed - Check if you see success message!');
  });

  test('Task 3: Use text-based locators', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // TODO 3.1: Find link với text "Login" bằng getByText
    // Hint: page.getByText(/regex/i)
    const loginLink = null; // Thay null

    // TODO 3.2: Find link với text "Checkboxes" bằng getByRole + name
    // Hint: page.getByRole('link', { name: 'text' })
    const checkboxLink = null; // Thay null

    // TODO 3.3: Click login link và verify URL chứa "login"
    // Hint: await loginLink.click(); await expect(page).toHaveURL(/pattern/);
    // TODO: Thêm code ở đây

    console.log('✅ Task 3 completed');
  });

  test('Task 4: Use getByLabel for form inputs', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO 4.1: Find username input bằng getByLabel với label text
    // Hint: page.getByLabel(/username/i)
    const usernameInput = null; // Thay null

    // TODO 4.2: Find password input bằng getByLabel
    const passwordInput = null; // Thay null

    // TODO 4.3: Fill cả hai fields
    // Username: 'practice', Password: 'SuperSecretPassword!'
    // TODO: Thêm code fill ở đây

    // TODO 4.4: Verify giá trị đã fill
    // Hint: await expect(usernameInput).toHaveValue('expected');
    // TODO: Thêm code verify ở đây

    console.log('✅ Task 4 completed');
  });

  test('Task 5: Chain locators for specificity', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO 5.1: Find button INSIDE form
    // Hint: page.locator('form').locator('button')
    const formButton = null; // Thay null

    // TODO 5.2: Find input với type="text" INSIDE form
    // Hint: Chain .locator() với 'form' và 'input[type="text"]'
    const formInput = null; // Thay null

    // TODO 5.3: Verify cả hai elements visible
    // TODO: Thêm code verify ở đây

    console.log('✅ Task 5 completed');
  });

  test('Task 6: Use filtering to narrow down results', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // TODO 6.1: Get all links trên page
    // Hint: page.getByRole('link')
    const allLinks = null; // Thay null

    // TODO 6.2: Filter links chứa text "Form"
    // Hint: allLinks.filter({ hasText: /form/i })
    const formLinks = null; // Thay null

    // TODO 6.3: Count form links và log ra console
    // Hint: await formLinks.count()
    // TODO: Thêm code ở đây

    // TODO 6.4: Click first form link
    // Hint: await formLinks.first().click()
    // TODO: Thêm code ở đây

    console.log('✅ Task 6 completed');
  });

  test('Task 7: Use nth() and first()/last()', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // TODO 7.1: Get all checkboxes
    // Hint: page.locator('input[type="checkbox"]')
    const checkboxes = null; // Thay null

    // TODO 7.2: Get first checkbox bằng .first()
    const firstCheckbox = null; // Thay null

    // TODO 7.3: Get last checkbox bằng .last()
    const lastCheckbox = null; // Thay null

    // TODO 7.4: Get checkbox thứ 2 bằng .nth(1)
    // Hint: .nth() starts from index 0
    const secondCheckbox = null; // Thay null

    // TODO 7.5: Check first và last checkbox
    // TODO: Thêm code ở đây

    // TODO 7.6: Verify cả hai đã checked
    // Hint: await expect(checkbox).toBeChecked()
    // TODO: Thêm code ở đây

    console.log('✅ Task 7 completed');
  });

  test('Task 8: Combine multiple selector strategies', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // TODO 8.1: Find input có ID "username" VÀ type "text"
    // Hint: Combine selectors: '#username[type="text"]'
    const specificInput = null; // Thay null

    // TODO 8.2: Find button có class "btn-primary" VÀ type "submit"
    // Hint: 'button.btn-primary[type="submit"]'
    const specificButton = null; // Thay null

    // TODO 8.3: Verify cả hai visible
    // TODO: Thêm code ở đây

    console.log('✅ Task 8 completed');
  });

  test('Challenge: Complete login flow with best locators', async ({ page }) => {
    // Challenge: Hoàn thành login flow chỉ dùng role-based và label locators
    // Không được dùng CSS selectors!

    await page.goto('https://practice.expandtesting.com/login');

    // TODO: Find và fill username field (dùng getByLabel hoặc getByRole)
    // TODO: Find và fill password field
    // TODO: Find và click login button (dùng getByRole)
    // TODO: Verify navigation đến /secure
    // TODO: Verify success message visible

    // Thêm code của bạn ở đây

    console.log('🎉 Challenge completed!');
  });

});

/**
 * Self-Check Questions:
 *
 * 1. Locator nào tốt nhất: CSS selector hay Role-based?
 *    → Đáp án: Role-based (accessibility-friendly, user-facing)
 *
 * 2. Khi nào dùng .filter()?
 *    → Đáp án: Khi cần narrow down results (nhiều matches, chỉ cần 1)
 *
 * 3. Sự khác biệt giữa .first() và .nth(0)?
 *    → Đáp án: Giống nhau! .first() là alias của .nth(0)
 *
 * 4. Khi nào dùng chaining locators?
 *    → Đáp án: Khi cần tìm element INSIDE parent (tăng specificity)
 *
 * 5. getByLabel vs getByPlaceholder - nên dùng cái nào?
 *    → Đáp án: getByLabel (labels stable hơn placeholder)
 *
 * Next Steps:
 * - Hoàn thành tất cả TODOs
 * - Run tests: yarn test exercises/exercise-01-locators.spec.ts
 * - So sánh với solutions/exercise-01-locators.spec.ts
 * - Review docs/01-locators-fundamentals-vi.md nếu cần
 */
