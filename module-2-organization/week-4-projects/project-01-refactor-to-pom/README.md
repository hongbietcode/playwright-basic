# Project 1: Refactor to Page Object Model

## Objective

Refactor procedural login and dashboard tests into clean Page Object Model architecture.

## Requirements

### 1. Create Page Objects

Create the following page classes:

- **BasePage** - Base class with common functionality
  - `navigate(url)` - Navigate to URL
  - `getTitle()` - Get page title
  - `getURL()` - Get current URL

- **LoginPage** - Login page interactions
  - `goto()` - Navigate to login page
  - `fillUsername(username)` - Fill username field
  - `fillPassword(password)` - Fill password field
  - `clickSubmit()` - Click submit button
  - `login(username, password)` - Complete login flow
  - `getErrorMessage()` - Get error message text

- **DashboardPage** - Dashboard page interactions
  - `isOnDashboard()` - Check if on dashboard
  - `getWelcomeMessage()` - Get welcome message
  - `logout()` - Click logout button

### 2. Create Fixtures

Create custom fixtures in `fixtures/pages.fixture.ts`:

- `loginPage` - Provides LoginPage instance
- `dashboardPage` - Provides DashboardPage instance
- `authenticatedPage` - Provides logged-in DashboardPage

### 3. Write Tests

Create tests using the page objects:

- Test valid login
- Test invalid credentials
- Test empty fields
- Test logout
- Test session persistence

## Test Site

**URL:** https://practice.expandtesting.com/login

**Credentials:**
- Username: `practice`
- Password: `SuperSecretPassword!`

## File Structure

```
project-01-refactor-to-pom/
├── README.md                    # This file
├── pages/
│   ├── BasePage.ts              # Base page class
│   ├── LoginPage.ts             # Login page object
│   └── DashboardPage.ts         # Dashboard page object
├── fixtures/
│   └── pages.fixture.ts         # Custom fixtures
├── tests/
│   └── login-pom.spec.ts        # Tests using POM
└── SOLUTION.md                  # Complete solution guide
```

## Expected Outcomes

After completing this project, you should have:

✅ Clean page object classes with encapsulated logic
✅ Reusable fixtures for page objects
✅ Tests that are readable and maintainable
✅ Clear separation of concerns (test logic vs page logic)

## Getting Started

1. Create `pages/BasePage.ts`
2. Create `pages/LoginPage.ts` extending BasePage
3. Create `pages/DashboardPage.ts` extending BasePage
4. Create `fixtures/pages.fixture.ts`
5. Write tests in `tests/login-pom.spec.ts`

## Success Criteria

Your implementation should:
- Use inheritance (BasePage → LoginPage/DashboardPage)
- Encapsulate all page interactions in page classes
- Use fixtures for dependency injection
- Have no direct locators or actions in test files
- Be easily maintainable and extensible

---

**Good luck!** See `SOLUTION.md` when you're ready to compare your implementation.
