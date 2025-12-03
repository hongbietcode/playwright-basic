# 📁 Project Structure Best Practices

## Giới Thiệu | Introduction

Một project structure tốt giúp:
- ✅ Dễ navigate và tìm files
- ✅ Dễ scale khi project lớn
- ✅ Team collaboration tốt hơn
- ✅ Maintenance dễ dàng

## Recommended Folder Structure

```
playwright-project/
├── tests/                      # All test files
│   ├── auth/                  # Feature-based organization
│   │   ├── login.spec.ts
│   │   └── logout.spec.ts
│   ├── cart/
│   │   ├── add-items.spec.ts
│   │   └── checkout.spec.ts
│   └── search/
│       └── product-search.spec.ts
├── pages/                      # Page Object Model classes
│   ├── LoginPage.ts
│   ├── CartPage.ts
│   └── BasePage.ts
├── fixtures/                   # Custom fixtures
│   └── auth.fixture.ts
├── helpers/                    # Utility functions
│   ├── data-generator.ts
│   └── api-helper.ts
├── test-data/                  # Test data files
│   ├── users.json
│   └── products.csv
├── playwright.config.ts        # Main configuration
├── package.json
└── tsconfig.json
```

## Organization Strategies

### 1. By Feature
```
tests/
├── auth/
├── cart/
├── checkout/
└── search/
```
**✅ Best for:** Most projects
**Pros:** Clear feature separation

### 2. By Test Type
```
tests/
├── smoke/
├── regression/
├── e2e/
└── integration/
```
**✅ Best for:** Large projects with many test types

### 3. Hybrid Approach
```
tests/
├── smoke/
│   └── critical-flows.spec.ts
├── features/
│   ├── auth/
│   └── cart/
└── integration/
    └── api-ui-integration.spec.ts
```

## Naming Conventions

### Test Files
```typescript
// ✅ GOOD
login.spec.ts
user-registration.spec.ts
product-search.spec.ts

// ❌ AVOID
test1.ts
loginTest.spec.ts
Login.spec.ts
```

### Test Suites
```typescript
// ✅ GOOD
test.describe('User Authentication', () => {})
test.describe('Shopping Cart Management', () => {})

// ❌ AVOID
test.describe('Tests', () => {})
test.describe('test_auth', () => {})
```

### Test Names
```typescript
// ✅ GOOD - Descriptive and clear
test('should login successfully with valid credentials', async ({ page }) => {})
test('should show error message when email format is invalid', async ({ page }) => {})

// ❌ AVOID - Vague
test('login', async ({ page }) => {})
test('test1', async ({ page }) => {})
```

## Configuration Management

### Environment-Specific Configs
```
configs/
├── dev.config.ts
├── staging.config.ts
└── prod.config.ts
```

### Using Different Configs
```bash
# Development
npx playwright test --config=configs/dev.config.ts

# Staging
npx playwright test --config=configs/staging.config.ts
```

## Best Practices

### 1. Separate Concerns
```typescript
// ✅ GOOD - Separate helper from test
// helpers/auth-helper.ts
export async function login(page, user, pass) { }

// tests/auth/login.spec.ts
import { login } from '../../helpers/auth-helper';
test('should login', async ({ page }) => {
  await login(page, 'user', 'pass');
});
```

### 2. Group Related Tests
```typescript
// ✅ GOOD
test.describe('Login Functionality', () => {
  test('valid login', () => {});
  test('invalid login', () => {});
  test('logout', () => {});
});
```

### 3. Use Consistent Naming
```typescript
// ✅ GOOD - Consistent pattern
tests/auth/login.spec.ts
tests/auth/logout.spec.ts
tests/auth/password-reset.spec.ts
```

## Key Takeaways

1. **Organize by feature** for most projects
2. **Clear naming conventions** improve readability
3. **Separate concerns** (tests, pages, helpers, data)
4. **Use consistent patterns** throughout project
5. **Scale-friendly structure** from day one
