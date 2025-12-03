# 🎨 Custom Fixtures

## Creating Custom Fixtures

```typescript
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type MyFixtures = {
  loginPage: LoginPage;
  authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('#user', 'test');
    await page.fill('#pass', 'pass');
    await page.click('#submit');
    await use(page);
    // Cleanup happens here
  },
});

export { expect } from '@playwright/test';
```

## Usage
```typescript
test('uses fixtures', async ({ loginPage, authenticatedPage }) => {
  // Use fixtures
});
```

## Best Practices
- One fixture per concern
- Clean up in fixture
- Export from central location
