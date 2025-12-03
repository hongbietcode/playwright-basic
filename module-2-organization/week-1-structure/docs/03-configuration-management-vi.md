# ⚙️ Configuration Management

## playwright.config.ts Deep Dive

### Basic Structure
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://example.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

## Configuration Options

### 1. Test Directory
```typescript
testDir: './tests'              // Where test files are located
testMatch: '**/*.spec.ts'       // Which files are tests
testIgnore: '**/*.skip.spec.ts' // Which files to ignore
```

### 2. Timeouts
```typescript
timeout: 30000,                 // Test timeout (30s)
expect: { timeout: 5000 },      // Assertion timeout (5s)
use: {
  actionTimeout: 10000,         // Action timeout (10s)
  navigationTimeout: 30000,     // Navigation timeout (30s)
}
```

### 3. Retries
```typescript
retries: 2,                     // Retry failed tests 2 times
retries: process.env.CI ? 2 : 0 // Retry only on CI
```

### 4. Parallel Execution
```typescript
workers: 4,                     // Run 4 tests in parallel
fullyParallel: true,            // All tests run in parallel
```

### 5. Reporters
```typescript
reporter: [
  ['html'],                     // HTML report
  ['list'],                     // Console list
  ['junit', { outputFile: 'results.xml' }],
  ['json', { outputFile: 'results.json' }],
]
```

### 6. Base URL
```typescript
use: {
  baseURL: 'https://example.com',
}

// In tests
await page.goto('/login');      // Goes to https://example.com/login
```

### 7. Screenshot & Video
```typescript
use: {
  screenshot: 'only-on-failure', // 'on', 'off', 'only-on-failure'
  video: 'retain-on-failure',    // 'on', 'off', 'retain-on-failure'
  trace: 'on-first-retry',       // 'on', 'off', 'on-first-retry'
}
```

## Environment-Specific Configs

### configs/dev.config.ts
```typescript
import { defineConfig } from '@playwright/test';
import base from '../playwright.config';

export default defineConfig(base, {
  use: {
    baseURL: 'https://dev.example.com',
  },
});
```

### configs/staging.config.ts
```typescript
export default defineConfig(base, {
  use: {
    baseURL: 'https://staging.example.com',
  },
});
```

### Usage
```bash
npx playwright test --config=configs/dev.config.ts
npx playwright test --config=configs/staging.config.ts
```

## Projects Feature

### Multi-Browser Testing
```typescript
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
]
```

### Mobile Testing
```typescript
projects: [
  {
    name: 'Mobile Chrome',
    use: { ...devices['Pixel 5'] },
  },
  {
    name: 'Mobile Safari',
    use: { ...devices['iPhone 12'] },
  },
]
```

## Environment Variables

### Using .env Files
```typescript
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
  },
});
```

### .env
```env
BASE_URL=https://example.com
USERNAME=testuser
PASSWORD=testpass
```

## Best Practices

1. **Separate configs** for different environments
2. **Use environment variables** for secrets
3. **Configure retries** for CI/CD
4. **Enable trace on failures** for debugging
5. **Set reasonable timeouts**

## Key Takeaways
- Master playwright.config.ts options
- Use environment-specific configs
- Configure for CI/CD
- Use projects for multi-browser
