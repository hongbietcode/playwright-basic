# Project 2: Multi-browser Test Suite

## Objective

Build a comprehensive test suite that runs on Chromium, Firefox, and WebKit with environment-specific configurations.

## Requirements

### 1. Multi-browser Configuration

Create `playwright.config.ts` with:
- 3 browser projects (Chromium, Firefox, WebKit)
- Different timeouts per browser
- Screenshot/video settings
- Parallel execution

### 2. Environment Configurations

Create separate configs:
- `configs/dev.config.ts` - Development environment
- `configs/staging.config.ts` - Staging environment
- `configs/prod.config.ts` - Production environment

### 3. Cross-browser Tests

Write tests that:
- Run on all 3 browsers
- Handle browser-specific differences
- Take screenshots per browser
- Measure performance per browser

## Test Cases

1. **Cross-browser Login** - Login works on all browsers
2. **Browser Detection** - Log browser name and version
3. **Performance Test** - Measure load time per browser
4. **Visual Test** - Screenshot comparison across browsers
5. **Browser-specific Feature** - Test Chromium-only CDP

## Test Site

**URL:** https://practice.expandtesting.com

## File Structure

```
project-02-multi-browser-suite/
├── README.md
├── playwright.config.ts         # Main config
├── configs/
│   ├── dev.config.ts
│   ├── staging.config.ts
│   └── prod.config.ts
├── tests/
│   └── cross-browser.spec.ts
└── SOLUTION.md
```

## Success Criteria

✅ Tests run on 3 browsers in parallel
✅ Environment-specific configurations work
✅ Browser-specific logic handled correctly
✅ Performance metrics collected per browser
✅ Screenshots saved with browser name

## Running Tests

```bash
# All browsers
npx playwright test

# Specific browser
npx playwright test --project=chromium

# Specific environment
npx playwright test --config=configs/dev.config.ts
```

---

See `SOLUTION.md` for complete implementation.
