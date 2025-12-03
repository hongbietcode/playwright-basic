# Project 3 Solution: CI/CD Integration

## Solution Overview

Complete GitHub Actions workflow for automated Playwright test execution.

## GitHub Actions Workflow Explained

### 1. Trigger Events

```yaml
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
```

**When it runs:**
- Every push to main/master
- Every pull request targeting main/master
- Ensures tests run before merging code

### 2. Setup Steps

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: 18
    cache: 'npm'
```

**What it does:**
- Installs Node.js 18
- Caches npm dependencies for faster builds
- Reduces build time from minutes to seconds

### 3. Playwright Installation

```yaml
- name: Install Playwright Browsers
  run: npx playwright install --with-deps
```

**Critical:**
- Installs Chromium, Firefox, WebKit
- `--with-deps` installs OS dependencies
- Required for headless browser testing

### 4. Test Execution

```yaml
- name: Run Playwright tests
  run: npx playwright test
```

**Uses:**
- Default `playwright.config.ts` or CI config
- Runs all tests
- Exits with error code if tests fail

### 5. Artifact Upload

```yaml
- name: Upload Playwright Report
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 30
```

**Artifacts:**
- HTML report
- Screenshots (on failure)
- Videos (on failure)
- Test results JSON/JUnit

## CI Configuration

### playwright.config.ci.ts

```typescript
{
  fullyParallel: false,  // Sequential for stability
  retries: 2,            // More retries in CI
  workers: 1,            // Single worker
  forbidOnly: true,      // Prevent test.only()
}
```

**Why:**
- **Sequential**: More reliable in CI
- **Retries**: Handle flaky network issues
- **1 Worker**: Prevent resource contention
- **forbidOnly**: Catch developer mistakes

## CI-ready Tests

### Best Practices

```typescript
test('should wait properly', async ({ page }) => {
  // ✅ GOOD: Explicit timeout
  await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

  // ❌ BAD: No timeout
  await expect(page.locator('h1')).toBeVisible();
});
```

### Idempotent Tests

```typescript
test('should be idempotent', async ({ page }) => {
  // Test can run multiple times
  await page.goto('/');
  const title = await page.title();

  // Same result every time
  expect(title).toBeTruthy();
});
```

### Proper Logging

```typescript
test('should log', async ({ page }, testInfo) => {
  console.log(`Test: ${testInfo.title}`);
  console.log(`Project: ${testInfo.project.name}`);

  // CI captures these logs
});
```

## Viewing Results

### GitHub Actions UI

1. Go to repository → Actions tab
2. Click on workflow run
3. View test results
4. Download artifacts

### Artifacts

```
playwright-report/
├── index.html          # HTML report
├── data/
│   └── *.json         # Test data
└── trace/
    └── *.zip          # Playwright traces

test-results/
├── results.json       # JSON results
├── junit.xml          # JUnit XML
└── screenshots/       # Failure screenshots
```

## Adding Status Badge

Add to README.md:

```markdown
![Playwright Tests](https://github.com/USERNAME/REPO/actions/workflows/playwright.yml/badge.svg)
```

Shows build status on repository page.

## Advanced CI Patterns

### Matrix Testing

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    node: [16, 18, 20]
runs-on: ${{ matrix.os }}
```

Tests on multiple OS and Node versions.

### Sharding

```yaml
- name: Run Playwright tests
  run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
strategy:
  matrix:
    shardIndex: [1, 2, 3, 4]
    shardTotal: [4]
```

Splits tests across 4 parallel jobs.

### Environment Secrets

```yaml
env:
  TEST_USERNAME: ${{ secrets.TEST_USERNAME }}
  TEST_PASSWORD: ${{ secrets.TEST_PASSWORD }}
```

Use GitHub Secrets for sensitive data.

## Troubleshooting CI Failures

### Issue 1: Flaky Tests

```typescript
// ❌ PROBLEM
await page.click('#button');

// ✅ SOLUTION
await page.click('#button', { timeout: 10000 });
await page.waitForLoadState('networkidle');
```

### Issue 2: Browser Installation

```yaml
# ❌ PROBLEM
- run: npx playwright test

# ✅ SOLUTION
- run: npx playwright install --with-deps
- run: npx playwright test
```

### Issue 3: Permission Errors

```yaml
# Add permissions
permissions:
  contents: read
  checks: write
```

## Key Takeaways

1. **GitHub Actions** - Automate test execution
2. **Artifact Upload** - Preserve reports and screenshots
3. **CI Config** - Optimized for stability
4. **Idempotent Tests** - Reliable in CI
5. **Proper Timeouts** - Handle CI latency
6. **Status Badge** - Show build health
7. **Matrix Testing** - Test across platforms

---

**Success!** Your tests now run automatically on every commit with full reporting.
