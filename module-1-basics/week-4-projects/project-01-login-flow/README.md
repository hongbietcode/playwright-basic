# 🎯 Project 1: Login Flow Testing

## Mục Tiêu Dự Án | Project Objectives

Dự án này giúp bạn thực hành **toàn bộ kiến thức** từ Week 1-3 để xây dựng một test suite hoàn chỉnh cho chức năng đăng nhập (login flow).

**Kỹ năng thực hành:**
- ✅ Locators và element interactions
- ✅ Form handling (input, submit)
- ✅ Assertions và validation
- ✅ Error handling
- ✅ Session management
- ✅ Test organization

---

## 📋 Yêu Cầu | Requirements

### Test Site
**URL:** https://practice.expandtesting.com/login

**Valid Credentials:**
- Username: `practice`
- Password: `SuperSecretPassword!`

### Test Scenarios

#### ✅ Scenario 1: Valid Login
- Navigate to login page
- Fill valid username and password
- Click submit button
- Verify successful login (redirect to /secure)
- Verify success message is displayed

#### ❌ Scenario 2: Invalid Username
- Navigate to login page
- Fill invalid username
- Fill valid password
- Click submit
- Verify error message: "Your username is invalid!"

#### ❌ Scenario 3: Invalid Password
- Navigate to login page
- Fill valid username
- Fill invalid password
- Click submit
- Verify error message: "Your password is invalid!"

#### ❌ Scenario 4: Empty Credentials
- Navigate to login page
- Leave username and password empty
- Click submit
- Verify validation (HTML5 or custom)

#### ✅ Scenario 5: Logout Flow
- Login successfully
- Click logout button
- Verify redirect to login page
- Verify logout success message

#### ✅ Scenario 6: Session Persistence
- Login successfully
- Refresh the page
- Verify still logged in (on /secure page)

---

## 📂 Cấu Trúc Dự Án | Project Structure

```
project-01-login-flow/
├── README.md                    # This file
├── .env.example                 # Environment variables template
├── tests/
│   ├── login.spec.ts           # Main test suite
│   └── auth-helpers.ts         # Helper functions
└── SOLUTION.md                  # Complete solution guide
```

---

## 🚀 Hướng Dẫn Thực Hiện | Implementation Guide

### Bước 1: Setup
```bash
cd module-1-basics/week-4-projects/project-01-login-flow
```

### Bước 2: Tạo File Test
Tạo file `tests/login.spec.ts` với structure:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Login Flow Testing', () => {

  test.beforeEach(async ({ page }) => {
    // TODO: Navigate to login page
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // TODO: Implement
  });

  test('should show error with invalid username', async ({ page }) => {
    // TODO: Implement
  });

  // ... more tests
});
```

### Bước 3: Implement Tests
- Sử dụng locators từ Week 2
- Sử dụng assertions từ Week 3
- Organize với hooks từ Week 3

### Bước 4: Create Helper Functions
Tạo `tests/auth-helpers.ts`:

```typescript
import { Page } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
  // TODO: Implement reusable login function
}

export async function logout(page: Page) {
  // TODO: Implement logout function
}
```

### Bước 5: Run Tests
```bash
# Run all tests
yarn test tests/login.spec.ts

# Run with UI mode
yarn test:ui tests/login.spec.ts

# Run headed mode
yarn test tests/login.spec.ts --headed
```

---

## ✅ Acceptance Criteria

Your project is complete when:

1. **All 6 scenarios pass** ✅
2. **Tests are well-organized** (describe blocks, hooks)
3. **Reusable helpers** are created and used
4. **Good locator strategies** (prefer role, text over CSS)
5. **Clear assertions** with meaningful error messages
6. **No hard-coded waits** (trust auto-wait)
7. **Clean code** with comments

---

## 🎓 Học Từ Dự Án Này | Learning Outcomes

Sau khi hoàn thành project này, bạn sẽ:

1. ✨ Hiểu cách **test authentication flows**
2. 🔍 Biết cách **validate error messages**
3. 🏗️ Tổ chức tests một cách **chuyên nghiệp**
4. 🛠️ Tạo **reusable helper functions**
5. 🧪 Viết tests **dễ maintain và scale**

---

## 💡 Tips & Best Practices

### Locator Strategy
```typescript
// ✅ GOOD - Role-based
await page.getByRole('textbox', { name: 'username' });
await page.getByRole('button', { name: /submit/i });

// ✅ GOOD - ID
await page.locator('#username');

// ❌ AVOID - Complex CSS
await page.locator('form > div:nth-child(2) > input');
```

### Assertions
```typescript
// ✅ GOOD - Clear and specific
await expect(page.locator('.alert-danger'))
  .toHaveText('Your username is invalid!');

// ✅ GOOD - URL assertion
await expect(page).toHaveURL(/.*secure/);

// ❌ AVOID - Vague assertions
await expect(page.locator('.alert')).toBeVisible();
```

### Test Organization
```typescript
// ✅ GOOD - Use beforeEach
test.beforeEach(async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/login');
});

// ✅ GOOD - Use helpers
await loginHelper(page, 'practice', 'SuperSecretPassword!');

// ❌ AVOID - Duplicate code
// Repeating same login code in every test
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Test Flakiness
**Problem:** Tests sometimes pass, sometimes fail

**Solution:**
- Trust auto-wait mechanism
- Use proper assertions (`toBeVisible()` not `isVisible()`)
- Wait for navigation: `await page.waitForURL('**/secure')`

### Issue 2: Wrong Locators
**Problem:** Element not found

**Solution:**
- Use Playwright Inspector: `yarn test --debug`
- Use UI Mode to inspect: `yarn test:ui`
- Verify selectors with browser DevTools

### Issue 3: Error Messages Not Showing
**Problem:** Can't find error message element

**Solution:**
- Wait for error to appear: `await expect(error).toBeVisible()`
- Check correct selector
- Verify error actually appears in UI

---

## 📚 Reference

**Relevant Docs:**
- Week 1: Browser, Context, Page basics
- Week 2: Locators and interactions
- Week 3: Assertions and debugging

**Test Site:**
- https://practice.expandtesting.com/login
- Valid creds: practice / SuperSecretPassword!

---

## 🎯 Next Steps

After completing this project:
1. Compare your solution with `SOLUTION.md`
2. Refactor if needed
3. Move to Project 2: E-commerce Cart Testing
4. Learn about Page Object Model in Module 2

---

## ⏱️ Estimated Time

- **Beginner**: 3-4 hours
- **Intermediate**: 2-3 hours
- **Advanced**: 1-2 hours

**Good luck!** 🚀
