# Best Practices - Thực Hành Tốt Nhất

## 🎯 Test Writing Best Practices

### 1. Use Descriptive Test Names

```typescript
// ❌ BAD
test('test 1', async ({ page }) => { });

// ✅ GOOD
test('should login with valid credentials and redirect to dashboard', async ({ page }) => { });
```

### 2. Follow AAA Pattern

```typescript
test('user can add product to cart', async ({ page }) => {
  // ARRANGE - Setup
  await page.goto('/products');

  // ACT - Perform action
  await page.click('[data-testid="add-to-cart"]');

  // ASSERT - Verify
  await expect(page.locator('.cart-badge')).toHaveText('1');
});
```

### 3. One Assertion Per Concept

```typescript
// ❌ BAD - Testing multiple things
test('login and profile', async ({ page }) => {
  await loginPage.login('user', 'pass');
  await expect(page).toHaveURL('/dashboard');
  await page.click('#profile');
  await expect(page.locator('#name')).toHaveText('User');
});

// ✅ GOOD - Separate tests
test('should login successfully', async ({ page }) => {
  await loginPage.login('user', 'pass');
  await expect(page).toHaveURL('/dashboard');
});

test('should display user profile', async ({ page }) => {
  await loginPage.login('user', 'pass');
  await page.click('#profile');
  await expect(page.locator('#name')).toHaveText('User');
});
```

## 🔍 Locator Best Practices

### 1. Prefer User-Facing Selectors

```typescript
// ❌ AVOID - Implementation details
page.locator('#username-input-field-123');

// ✅ GOOD - User-facing
page.getByRole('textbox', { name: 'Username' });
page.getByLabel('Username');
page.getByPlaceholder('Enter username');
```

### 2. Use data-testid for Dynamic Content

```typescript
// ✅ GOOD - Stable selector
<button data-testid="submit-button">Submit</button>
page.getByTestId('submit-button');
```

### 3. Avoid XPath Unless Necessary

```typescript
// ❌ AVOID
page.locator('//div[@class="container"]/button[1]');

// ✅ PREFER
page.locator('.container >> button').first();
page.locator('.container button:nth-child(1)');
```

## ⚡ Performance Best Practices

### 1. Run Tests in Parallel

```typescript
// playwright.config.ts
export default defineConfig({
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,
});
```

### 2. Use API for Test Data Setup

```typescript
// ❌ SLOW - UI setup
test('test with data', async ({ page }) => {
  await page.goto('/admin');
  await page.click('#create-user');
  await page.fill('#name', 'Test User');
  await page.click('#save');
});

// ✅ FAST - API setup
test('test with data', async ({ page, request }) => {
  await request.post('/api/users', { data: { name: 'Test User' } });
  await page.goto('/users');
});
```

### 3. Reuse Authentication State

```typescript
// auth.setup.ts
import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#username', 'user');
  await page.fill('#password', 'pass');
  await page.click('#submit');
  await page.context().storageState({ path: 'auth.json' });
});

// playwright.config.ts
use: {
  storageState: 'auth.json',
}
```

## 🧪 Test Maintenance Best Practices

### 1. Use Page Object Model

```typescript
// ✅ GOOD - Page Object
export class LoginPage {
  private usernameInput = this.page.locator('#username');
  private passwordInput = this.page.locator('#password');
  private submitButton = this.page.locator('#submit');

  constructor(private page: Page) {}

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

// Usage
const loginPage = new LoginPage(page);
await loginPage.login('user', 'pass');
```

### 2. Avoid Hard-coded Values

```typescript
// ❌ BAD
await page.fill('#username', 'testuser@example.com');

// ✅ GOOD
const TEST_USER = {
  email: 'testuser@example.com',
  password: 'TestPass123!',
};
await page.fill('#username', TEST_USER.email);
```

### 3. Use Custom Fixtures

```typescript
// fixtures.ts
export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('#username', 'user');
    await page.fill('#password', 'pass');
    await page.click('#submit');
    await use(page);
  },
});

// Usage
test('test with auth', async ({ authenticatedPage }) => {
  // Already logged in!
});
```

## 🛡️ Reliability Best Practices

### 1. Use Auto-waiting

```typescript
// ❌ AVOID - Manual waits
await page.waitForTimeout(1000);
await page.click('#button');

// ✅ GOOD - Auto-waiting
await page.click('#button'); // Waits automatically
```

### 2. Use Soft Assertions for Multiple Checks

```typescript
test('check multiple items', async ({ page }) => {
  await page.goto('/dashboard');

  // Continue even if assertions fail
  await expect.soft(page.locator('#header')).toBeVisible();
  await expect.soft(page.locator('#sidebar')).toBeVisible();
  await expect.soft(page.locator('#footer')).toBeVisible();

  // All assertions reported at end
});
```

### 3. Handle Flaky Tests

```typescript
// ❌ BAD - Race condition
await page.click('#load-data');
await expect(page.locator('#result')).toHaveText('Done');

// ✅ GOOD - Wait for stable state
await page.click('#load-data');
await page.waitForLoadState('networkidle');
await expect(page.locator('#result')).toHaveText('Done');
```

## 📊 Debugging Best Practices

### 1. Use Trace Viewer

```typescript
// playwright.config.ts
use: {
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
}
```

### 2. Add Logging

```typescript
test('complex flow', async ({ page }) => {
  console.log('Step 1: Navigate to login');
  await page.goto('/login');

  console.log('Step 2: Fill credentials');
  await page.fill('#username', 'user');

  console.log('Step 3: Submit form');
  await page.click('#submit');
});
```

### 3. Use Page.pause() for Debugging

```typescript
test('debug test', async ({ page }) => {
  await page.goto('/');
  await page.pause(); // Inspector opens
  await page.click('#button');
});
```

## 🔐 Security Best Practices

### 1. Never Commit Secrets

```typescript
// ❌ BAD
const API_KEY = 'sk_live_123456789';

// ✅ GOOD
const API_KEY = process.env.API_KEY;
```

### 2. Use .env Files

```bash
# .env
TEST_USERNAME=testuser@example.com
TEST_PASSWORD=SecurePass123!
API_KEY=your_api_key

# .gitignore
.env
.env.local
```

### 3. Sanitize Test Data

```typescript
// Don't use real production data in tests
const TEST_DATA = {
  creditCard: '4111111111111111', // Test card
  ssn: '123-45-6789', // Fake SSN
  email: 'test@example.com', // Test email
};
```

## 📝 Code Organization Best Practices

### 1. Folder Structure

```
tests/
├── e2e/
│   ├── auth/
│   │   ├── login.spec.ts
│   │   └── logout.spec.ts
│   └── cart/
│       └── checkout.spec.ts
├── api/
│   └── users.spec.ts
├── fixtures/
│   └── auth.fixture.ts
└── pages/
    ├── LoginPage.ts
    └── DashboardPage.ts
```

### 2. Use Consistent Naming

```typescript
// Files
login.spec.ts       // Tests
LoginPage.ts        // Page objects
auth.fixture.ts     // Fixtures
login-helpers.ts    // Helpers

// Variables
const userName = 'user';        // camelCase
const API_URL = 'https://...';  // UPPER_SNAKE for constants
class LoginPage {}              // PascalCase for classes
```

## 🚀 CI/CD Best Practices

### 1. Retry Failed Tests

```typescript
// playwright.config.ts
retries: process.env.CI ? 2 : 0,
```

### 2. Run Critical Tests First

```typescript
// Tag critical tests
test('login @smoke', async ({ page }) => {});

// Run smoke tests first
npx playwright test --grep @smoke
```

### 3. Collect Artifacts

```yaml
# GitHub Actions
- uses: actions/upload-artifact@v3
  if: always()
  with:
    name: playwright-report
    path: playwright-report/
```

## ✅ Code Review Checklist

- [ ] Test names are descriptive
- [ ] No hard-coded values
- [ ] Using Page Object Model
- [ ] No manual waits (sleep/timeout)
- [ ] Proper error handling
- [ ] Tests are independent
- [ ] Cleanup after tests
- [ ] No sensitive data in code
- [ ] Comments explain "why" not "what"
- [ ] Tests run in parallel

---

**Follow these practices for maintainable, reliable tests!** 🎯
