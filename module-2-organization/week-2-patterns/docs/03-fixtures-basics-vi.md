# 🔧 Fixtures Basics

## What are Fixtures?

Fixtures provide setup/teardown và dependencies cho tests.

## Built-in Fixtures

```typescript
test('use page fixture', async ({ page }) => {
  // 'page' is a built-in fixture
  await page.goto('/');
});

test('use multiple fixtures', async ({ page, context, browser }) => {
  // page, context, browser are all fixtures
});
```

## Benefits
- Automatic setup/cleanup
- Dependency injection
- Test isolation
- Reusable

## Custom Fixtures
```typescript
import { test as base } from '@playwright/test';

const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('#user', 'test');
    await page.fill('#pass', 'pass');
    await page.click('#submit');
    await use(page);
  },
});

test('uses authenticated page', async ({ authenticatedPage }) => {
  // Already logged in!
});
```
