# 📝 Naming Conventions

## File Naming

### Test Files
```
// ✅ GOOD - kebab-case
login.spec.ts
user-registration.spec.ts
shopping-cart.spec.ts
password-reset.spec.ts

// ❌ AVOID
Login.spec.ts               // PascalCase
loginTest.spec.ts          // camelCase with Test suffix
test_login.spec.ts         // snake_case
```

### Page Object Files
```
// ✅ GOOD - PascalCase
LoginPage.ts
ShoppingCartPage.ts
UserProfilePage.ts

// ❌ AVOID
loginPage.ts
login_page.ts
login-page.ts
```

### Helper Files
```
// ✅ GOOD - kebab-case
auth-helper.ts
data-generator.ts
api-client.ts
```

## Test Naming

### Test Suites (describe)
```typescript
// ✅ GOOD - Clear, descriptive
test.describe('User Authentication', () => {})
test.describe('Shopping Cart Management', () => {})
test.describe('Product Search Functionality', () => {})

// ❌ AVOID
test.describe('Tests', () => {})
test.describe('auth', () => {})
```

### Individual Tests
```typescript
// ✅ GOOD - should/must pattern
test('should login successfully with valid credentials', async () => {})
test('should display error message when email is invalid', async () => {})
test('must redirect to dashboard after successful login', async () => {})

// ✅ GOOD - Given-When-Then
test('given valid user, when logging in, then should see dashboard', async () => {})

// ❌ AVOID
test('login', async () => {})
test('test1', async () => {})
test('check if user can login', async () => {})
```

## Variable Naming

### Constants
```typescript
// ✅ GOOD - UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const DEFAULT_TIMEOUT = 30000;
const BASE_URL = 'https://example.com';
```

### Variables
```typescript
// ✅ GOOD - camelCase
const userName = 'testuser';
const loginButton = page.locator('#login');
const isLoggedIn = await checkLoginStatus();
```

### Functions
```typescript
// ✅ GOOD - camelCase, verb-based
async function login() {}
async function verifyUserProfile() {}
async function calculateTotal() {}
```

### Classes
```typescript
// ✅ GOOD - PascalCase
class LoginPage {}
class UserManager {}
class ApiClient {}
```

## Folder Naming

```
// ✅ GOOD - kebab-case
tests/
├── user-auth/
├── shopping-cart/
└── product-search/

// ❌ AVOID
tests/
├── UserAuth/
├── shopping_cart/
└── productSearch/
```

## Tags and Annotations

```typescript
// ✅ GOOD - lowercase with hyphens
test('test name @smoke', async () => {})
test('test name @regression @high-priority', async () => {})

// Common tags
@smoke          // Critical paths
@regression     // Full regression suite
@flaky          // Known flaky tests
@slow           // Slow-running tests
@api            // API tests
@ui             // UI tests
```

## Best Practices Summary

1. **Files**: kebab-case for tests, PascalCase for classes
2. **Tests**: Descriptive, behavior-focused
3. **Variables**: camelCase
4. **Constants**: UPPER_SNAKE_CASE
5. **Functions**: Verb-based, camelCase
6. **Be consistent** throughout the project
