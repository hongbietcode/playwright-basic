# 🎯 Test Organization với Describe & Hooks

## test.describe() - Grouping Tests

### Basic Usage
```typescript
test.describe('User Authentication', () => {
  test('should login with valid credentials', async ({ page }) => {});
  test('should show error with invalid password', async ({ page }) => {});
});
```

### Nested Describes
```typescript
test.describe('Shopping Cart', () => {
  test.describe('Add Items', () => {
    test('should add single item', async ({ page }) => {});
    test('should add multiple items', async ({ page }) => {});
  });

  test.describe('Remove Items', () => {
    test('should remove item', async ({ page }) => {});
  });
});
```

## Hooks - Setup & Teardown

### beforeEach / afterEach
```typescript
test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com/login');
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test('test 1', async ({ page }) => {
    // page already on login page
  });
});
```

### beforeAll / afterAll
```typescript
test.describe('API Tests', () => {
  let authToken: string;

  test.beforeAll(async ({ request }) => {
    const response = await request.post('/api/login');
    authToken = await response.json().then(data => data.token);
  });

  test('test with auth', async ({ request }) => {
    // use authToken
  });
});
```

## Hook Execution Order
```typescript
test.describe('Outer', () => {
  test.beforeAll(() => console.log('1. Outer beforeAll'));
  test.beforeEach(() => console.log('2. Outer beforeEach'));

  test.describe('Inner', () => {
    test.beforeAll(() => console.log('3. Inner beforeAll'));
    test.beforeEach(() => console.log('4. Inner beforeEach'));

    test('Test', () => {
      console.log('5. Test runs');
    });

    test.afterEach(() => console.log('6. Inner afterEach'));
    test.afterAll(() => console.log('7. Inner afterAll'));
  });

  test.afterEach(() => console.log('8. Outer afterEach'));
  test.afterAll(() => console.log('9. Outer afterAll'));
});
```

## Test Isolation
Each test gets fresh:
- Browser context
- Page
- Storage state
- Cookies

## Best Practices

### 1. Use beforeEach for Setup
```typescript
// ✅ GOOD
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// ❌ BAD - Repeating in each test
test('test 1', async ({ page }) => {
  await page.goto('/');
});
```

### 2. Clean Up in afterEach
```typescript
test.afterEach(async ({ page }) => {
  await page.context().clearCookies();
  // Clean up test data
});
```

### 3. Share Setup Logic
```typescript
async function setupAuthenticatedSession(page) {
  await page.goto('/login');
  await page.fill('#username', 'test');
  await page.fill('#password', 'pass');
  await page.click('#submit');
}

test.beforeEach(async ({ page }) => {
  await setupAuthenticatedSession(page);
});
```

## Key Takeaways
- Use describe() to group related tests
- Use beforeEach() for common setup
- Each test is isolated
- Clean up in afterEach() if needed
