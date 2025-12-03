# 🏗️ Page Object Model (POM)

## What is Page Object Model?

POM là design pattern giúp:
- ✅ Tạo layer abstraction giữa tests và UI
- ✅ Tách biệt test logic và page interactions
- ✅ Reuse code across tests
- ✅ Easier maintenance khi UI changes

## Without POM (❌ BAD)

```typescript
test('login test 1', async ({ page }) => {
  await page.goto('https://example.com/login');
  await page.fill('#username', 'user');
  await page.fill('#password', 'pass');
  await page.click('#submit');
  await expect(page).toHaveURL(/dashboard/);
});

test('login test 2', async ({ page }) => {
  await page.goto('https://example.com/login');
  await page.fill('#username', 'user');
  await page.fill('#password', 'pass');
  await page.click('#submit');
  // duplicate login code!
});
```

**Problems:**
- Duplicate code
- Hard to maintain
- If selector changes, update many tests

## With POM (✅ GOOD)

```typescript
// LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  async login(username: string, password: string) {
    await this.page.goto('https://example.com/login');
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.click('#submit');
  }
}

// Tests
test('login test 1', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('user', 'pass');
  await expect(page).toHaveURL(/dashboard/);
});
```

**Benefits:**
- Single place to update selectors
- Reusable login method
- Cleaner tests

## POM Structure

```typescript
export class PageName {
  // Locators
  private usernameInput = this.page.locator('#username');
  private passwordInput = this.page.locator('#password');
  private submitButton = this.page.locator('#submit');

  constructor(private page: Page) {}

  // Actions
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  // Assertions
  async verifyErrorMessage(text: string) {
    await expect(this.page.locator('.error')).toHaveText(text);
  }
}
```

## Best Practices

1. **One page class per page**
2. **Keep locators private**
3. **Methods return actions, not locators**
4. **Use BasePage for common functionality**
5. **Name methods clearly** (login, fillForm, verifyTitle)

## Key Takeaways
- POM makes tests maintainable
- Centralizes page interactions
- Reduces code duplication
- Makes tests readable
