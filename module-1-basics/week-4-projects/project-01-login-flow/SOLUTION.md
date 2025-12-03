# 📖 SOLUTION: Login Flow Testing Project

## Tổng Quan | Overview

Đây là hướng dẫn chi tiết từng bước để hoàn thành Project 1: Login Flow Testing.

---

## Bước 1: Setup Environment

### 1.1 Copy Environment Variables
```bash
cp .env.example .env
```

### 1.2 Verify Configuration
File `.env` nên chứa:
```env
BASE_URL=https://practice.expandtesting.com
VALID_USERNAME=practice
VALID_PASSWORD=SuperSecretPassword!
```

---

## Bước 2: Create Helper Functions

### 2.1 File: `tests/auth-helpers.ts`

**Key Functions:**
1. `login()` - Thực hiện login action
2. `loginAndWait()` - Login và đợi navigation
3. `logout()` - Thực hiện logout
4. `verifyLoggedIn()` - Verify đã login
5. `getErrorMessage()` - Lấy error message text

**Implementation Pattern:**
```typescript
export async function login(page: Page, username: string, password: string): Promise<void> {
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');
}
```

**Lý do tạo helpers:**
- ✅ Reusability - Tái sử dụng code
- ✅ Readability - Code dễ đọc hơn
- ✅ Maintainability - Dễ maintain
- ✅ DRY Principle - Don't Repeat Yourself

---

## Bước 3: Implement Main Test Suite

### 3.1 File: `tests/login.spec.ts`

### 3.2 Test Structure
```typescript
test.describe('Login Flow Testing', () => {

  test.beforeEach(async ({ page }) => {
    // Setup - chạy trước mỗi test
    await navigateToLogin(page);
  });

  test('Test name', async ({ page }) => {
    // Test implementation
  });
});
```

### 3.3 Test Implementation Patterns

#### Pattern 1: Valid Login Test
```typescript
test('should login successfully with valid credentials', async ({ page }) => {
  // Arrange
  const validUsername = 'practice';
  const validPassword = 'SuperSecretPassword!';

  // Act
  await loginAndWait(page, validUsername, validPassword);

  // Assert
  await verifyLoggedIn(page);
  const successMessage = await getSuccessMessage(page);
  expect(successMessage).toContain('secure area');
});
```

**Key Points:**
- ✅ AAA Pattern (Arrange-Act-Assert)
- ✅ Use helper functions
- ✅ Clear variable names
- ✅ Meaningful assertions

#### Pattern 2: Negative Test (Invalid Credentials)
```typescript
test('should show error with invalid username', async ({ page }) => {
  // Arrange
  const invalidUsername = 'invaliduser';
  const validPassword = 'SuperSecretPassword!';

  // Act
  await login(page, invalidUsername, validPassword);

  // Assert
  const errorMessage = await getErrorMessage(page);
  expect(errorMessage).toContain('username is invalid');
  await expect(page).toHaveURL(/.*login/);
});
```

**Key Points:**
- ✅ Test error scenarios
- ✅ Verify error messages
- ✅ Verify stays on same page

#### Pattern 3: Validation Test
```typescript
test('should require username and password fields', async ({ page }) => {
  // Check HTML5 required attributes
  const usernameRequired = await page.locator('#username').getAttribute('required');
  const passwordRequired = await page.locator('#password').getAttribute('required');

  expect(usernameRequired).not.toBeNull();
  expect(passwordRequired).not.toBeNull();
});
```

#### Pattern 4: Flow Test (Login → Logout)
```typescript
test('should logout successfully', async ({ page }) => {
  // Arrange - First login
  await loginAndWait(page, 'practice', 'SuperSecretPassword!');
  await verifyLoggedIn(page);

  // Act - Logout
  await logout(page);

  // Assert
  await verifyLoggedOut(page);
});
```

---

## Bước 4: Running Tests

### 4.1 Run All Tests
```bash
yarn test tests/login.spec.ts
```

### 4.2 Run with UI Mode (Recommended)
```bash
yarn test:ui tests/login.spec.ts
```

### 4.3 Run Specific Test
```bash
yarn test tests/login.spec.ts -g "should login successfully"
```

### 4.4 Run Tagged Tests
```bash
# Run only smoke tests
yarn test tests/login.spec.ts --grep @smoke

# Run only negative tests
yarn test tests/login.spec.ts --grep @negative
```

---

## Bước 5: Debugging

### 5.1 Debug Mode
```bash
yarn test tests/login.spec.ts --debug
```

### 5.2 Headed Mode (See Browser)
```bash
yarn test tests/login.spec.ts --headed
```

### 5.3 Trace On Failure
```bash
yarn test tests/login.spec.ts --trace on
```

---

## Key Concepts Applied

### 1. Locator Strategies
```typescript
// ✅ GOOD - ID selector
await page.locator('#username')

// ✅ GOOD - Role-based
await page.getByRole('button', { name: /submit/i })

// ✅ GOOD - Text-based
await page.click('a:has-text("Logout")')

// ❌ AVOID - Complex CSS
await page.locator('form > div:nth-child(2) > input')
```

### 2. Assertions
```typescript
// ✅ URL assertion
await expect(page).toHaveURL(/.*secure/);

// ✅ Text assertion
await expect(element).toHaveText('Expected Text');

// ✅ Visibility assertion
await expect(element).toBeVisible();

// ✅ Attribute assertion
await expect(input).toHaveAttribute('type', 'password');
```

### 3. Auto-Wait
```typescript
// ✅ GOOD - Trust auto-wait
await page.click('button[type="submit"]');
await expect(page.locator('.alert')).toBeVisible();

// ❌ BAD - Manual wait
await page.click('button[type="submit"]');
await page.waitForTimeout(2000); // Don't do this!
```

### 4. Test Organization
```typescript
// ✅ GOOD - Use describe blocks
test.describe('Login Flow Testing', () => {
  test.beforeEach(async ({ page }) => {
    // Setup
  });

  test('Test 1', async ({ page }) => { });
  test('Test 2', async ({ page }) => { });
});

// ✅ GOOD - Use tags
test('should login @smoke @critical', async ({ page }) => { });
```

---

## Common Mistakes & Fixes

### Mistake 1: Wrong Selectors
```typescript
// ❌ WRONG
await page.locator('.username-input') // Class might change

// ✅ CORRECT
await page.locator('#username') // ID is stable
```

### Mistake 2: Not Waiting for Navigation
```typescript
// ❌ WRONG
await page.click('button[type="submit"]');
await expect(page.locator('.success')).toBeVisible(); // Might fail

// ✅ CORRECT
await page.click('button[type="submit"]');
await page.waitForURL('**/secure'); // Wait for navigation
await expect(page.locator('.success')).toBeVisible();
```

### Mistake 3: Hard-coded Waits
```typescript
// ❌ WRONG
await page.click('#button');
await page.waitForTimeout(3000); // Always waits 3s

// ✅ CORRECT
await page.click('#button');
await expect(page.locator('#result')).toBeVisible(); // Waits only as needed
```

### Mistake 4: Repeating Code
```typescript
// ❌ WRONG - Duplicate login code in every test
test('Test 1', async ({ page }) => {
  await page.fill('#username', 'practice');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button');
  // ... test logic
});

// ✅ CORRECT - Use helper
test('Test 1', async ({ page }) => {
  await loginAndWait(page, 'practice', 'SuperSecretPassword!');
  // ... test logic
});
```

---

## Expected Test Results

All 15 tests should pass:

```
✓ should login successfully with valid credentials @smoke
✓ should show error message with invalid username @negative
✓ should show error message with invalid password @negative
✓ should show error with both invalid credentials @negative
✓ should require username and password fields @validation
✓ should validate empty username @validation
✓ should logout successfully @smoke
✓ should maintain session after page refresh @smoke
✓ should allow login after logout @smoke
✓ should display all login form elements @ui
✓ should mask password input @security
✓ should handle username case sensitivity @edge-case
✓ should handle multiple failed login attempts @security
✓ should submit form using Enter key @accessibility
✓ should complete login within reasonable time @performance

15 passed (30s)
```

---

## Verification Checklist

Before considering project complete, verify:

- ✅ All 15 tests pass
- ✅ No hard-coded waits (`waitForTimeout`)
- ✅ Helper functions are used
- ✅ Clear test names
- ✅ Good locator strategies
- ✅ Proper assertions
- ✅ Tests are independent (can run in any order)
- ✅ No test pollution (each test cleans up after itself)

---

## What You Learned

After completing this project, you have practiced:

1. **Test Organization**
   - describe blocks
   - beforeEach hooks
   - Test grouping

2. **Locators & Interactions**
   - Element selection
   - Form filling
   - Button clicks
   - Navigation

3. **Assertions**
   - URL assertions
   - Text assertions
   - Visibility assertions
   - Attribute assertions

4. **Helper Functions**
   - Code reusability
   - Abstraction
   - Maintainability

5. **Test Coverage**
   - Positive scenarios
   - Negative scenarios
   - Edge cases
   - Validation
   - Security
   - Performance

6. **Best Practices**
   - AAA pattern
   - DRY principle
   - Clear naming
   - Trust auto-wait

---

## Next Steps

1. ✅ Compare your implementation with the provided `tests/login.spec.ts`
2. ✅ Refactor your code if needed
3. ✅ Add more test cases if you think of any
4. ✅ Move to **Project 2: E-commerce Cart Testing**

**Congratulations on completing Project 1!** 🎉
