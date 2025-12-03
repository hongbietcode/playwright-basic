# Project 1 Solution: Refactor to Page Object Model

## Solution Overview

This project demonstrates professional Page Object Model implementation with fixtures.

## Architecture

```
BasePage (common functionality)
    ├── LoginPage (login-specific methods)
    └── DashboardPage (dashboard-specific methods)

Fixtures provide dependency injection
```

## Key Implementation Details

### 1. BasePage - Foundation

```typescript
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  // Common methods shared by all pages
}
```

**Why:**
- DRY principle - common functionality in one place
- Protected `page` property accessible to child classes
- Extensible base for all page objects

### 2. LoginPage - Encapsulated Login Logic

```typescript
export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;

  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSubmit();
  }
}
```

**Why:**
- Private locators (not accessible outside class)
- High-level methods (`login()`) for common flows
- Single responsibility - only login page logic

### 3. DashboardPage - Dashboard Interactions

```typescript
export class DashboardPage extends BasePage {
  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  isOnDashboard(): boolean {
    return this.getURL().includes('secure');
  }
}
```

**Why:**
- Encapsulates dashboard-specific logic
- Boolean helpers for assertions
- Clear separation from login logic

### 4. Fixtures - Dependency Injection

```typescript
export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('practice', 'SuperSecretPassword!');

    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
});
```

**Why:**
- Automatic page object creation
- `authenticatedPage` provides pre-logged-in state
- Tests don't need to create page objects manually

### 5. Tests - Clean and Readable

```typescript
test('should login successfully', async ({ loginPage, dashboardPage }) => {
  await loginPage.goto();
  await loginPage.login('practice', 'SuperSecretPassword!');

  expect(dashboardPage.isOnDashboard()).toBeTruthy();
});
```

**Why:**
- Reads like user actions
- No technical implementation details
- Easy to understand and maintain

## Benefits Demonstrated

### ✅ Maintainability
- Change `#username` locator? Update once in `LoginPage.ts`
- All tests automatically use new locator

### ✅ Readability
```typescript
// ❌ WITHOUT POM
await page.fill('#username', 'practice');
await page.fill('#password', 'SuperSecretPassword!');
await page.click('button[type="submit"]');

// ✅ WITH POM
await loginPage.login('practice', 'SuperSecretPassword!');
```

### ✅ Reusability
```typescript
// login() method used in multiple tests
test('test 1', async ({ loginPage }) => {
  await loginPage.login('user', 'pass');
});

test('test 2', async ({ loginPage }) => {
  await loginPage.login('user', 'pass');
});
```

### ✅ Testability
```typescript
// Mock or stub page objects for unit testing
const mockLoginPage = {
  login: jest.fn(),
  goto: jest.fn(),
};
```

## Common Patterns

### 1. Getters for State
```typescript
isOnLoginPage(): boolean {
  return this.getURL().includes('login');
}
```

### 2. High-level Methods
```typescript
async login(username: string, password: string): Promise<void> {
  await this.fillUsername(username);
  await this.fillPassword(password);
  await this.clickSubmit();
}
```

### 3. Boolean Helpers
```typescript
async hasErrorMessage(): Promise<boolean> {
  return await this.errorMessage.isVisible();
}
```

### 4. Fixtures for Setup
```typescript
authenticatedPage: async ({ page }, use) => {
  // Setup: login
  await loginPage.login('user', 'pass');

  // Provide to test
  await use(dashboardPage);

  // Teardown (optional)
}
```

## Running the Solution

```bash
# Run all POM tests
npx playwright test project-01-refactor-to-pom/tests/

# Run with tag
npx playwright test --grep @pom

# Run specific test
npx playwright test project-01-refactor-to-pom/tests/login-pom.spec.ts
```

## Key Takeaways

1. **BasePage** - Common functionality for all pages
2. **Page Classes** - Encapsulate page-specific logic
3. **Private Locators** - Hide implementation details
4. **High-level Methods** - Combine actions into flows
5. **Fixtures** - Dependency injection for page objects
6. **Separation of Concerns** - Page logic ≠ Test logic
7. **Inheritance** - Reuse common functionality
8. **Type Safety** - TypeScript ensures correct usage

## Next Steps

- Practice creating page objects for other pages
- Add more complex workflows (multi-step forms)
- Implement page object chaining (method returns next page)
- Try page object composition (page contains other pages)

---

**Congratulations!** You've successfully implemented Page Object Model with fixtures. This pattern is industry-standard for maintainable test automation.
