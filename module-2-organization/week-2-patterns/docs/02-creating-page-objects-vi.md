# 📝 Creating Page Objects

## Step-by-Step Guide

### 1. Create Page Class
```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;

  // Locators
  private usernameInput: Locator;
  private passwordInput: Locator;
  private submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button[type="submit"]');
  }

  // Actions
  async navigate() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  // Helpers
  get url() {
    return this.page.url();
  }
}
```

### 2. BasePage Pattern
```typescript
export class BasePage {
  constructor(protected page: Page) {}

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async getTitle() {
    return await this.page.title();
  }
}

export class LoginPage extends BasePage {
  async login(user: string, pass: string) {
    // Login implementation
  }
}
```

### 3. Using in Tests
```typescript
test('should login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('user', 'pass');
  expect(loginPage.url).toContain('dashboard');
});
```

## Best Practices
- Keep methods focused
- Return page objects for chaining
- Use private locators
- Inherit from BasePage
