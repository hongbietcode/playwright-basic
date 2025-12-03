# Project 3: CI/CD Integration with GitHub Actions

## Objective

Set up continuous integration pipeline for automated test execution on every commit/PR.

## Requirements

### 1. GitHub Actions Workflow

Create `.github/workflows/playwright.yml`:
- Trigger on push and pull_request
- Install dependencies
- Install Playwright browsers
- Run tests
- Upload artifacts (screenshots, videos, reports)

### 2. CI-optimized Test Configuration

Create `playwright.config.ci.ts`:
- 1 worker for stability
- Retries enabled
- Artifacts on failure only
- Headless mode

### 3. CI-ready Tests

Write tests that:
- Are reliable in CI environment
- Handle timing issues
- Generate proper reports
- Upload artifacts on failure

## File Structure

```
project-03-ci-setup/
├── README.md
├── .github/
│   └── workflows/
│       └── playwright.yml
├── playwright.config.ci.ts
├── tests/
│   └── ci-ready.spec.ts
└── SOLUTION.md
```

## GitHub Actions Workflow Features

- ✅ Node.js setup
- ✅ Dependency caching
- ✅ Playwright browser installation
- ✅ Test execution
- ✅ HTML report upload
- ✅ Artifact retention

## Success Criteria

✅ Tests run automatically on push/PR
✅ CI uses optimized configuration
✅ Test reports uploaded as artifacts
✅ Failures include screenshots/videos
✅ Build status badge available

## Running Locally

```bash
# Simulate CI environment
CI=1 npx playwright test

# Use CI config
npx playwright test --config=playwright.config.ci.ts
```

---

See `SOLUTION.md` for complete GitHub Actions setup.
