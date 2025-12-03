# Week 7: Multi-browser Testing & Environment Management

## Tổng Quan (Overview)

Tuần này tập trung vào **cross-browser testing (kiểm thử đa trình duyệt)** và **environment management (quản lý môi trường)**. Bạn sẽ học cách chạy tests trên nhiều browsers, cấu hình projects trong Playwright, quản lý nhiều environments (dev/staging/prod), và test trên mobile devices.

## Mục Tiêu Học Tập (Learning Objectives)

Sau khi hoàn thành tuần này, bạn sẽ có khả năng:

- ✅ Chạy tests trên nhiều browsers (Chromium, Firefox, WebKit)
- ✅ Cấu hình Playwright projects cho các test suites khác nhau
- ✅ Quản lý nhiều environments với configurations riêng biệt
- ✅ Test trên mobile và tablet devices với device emulation
- ✅ Thiết lập test dependencies và execution order
- ✅ Tối ưu hóa test execution cho CI/CD pipelines

## Cấu Trúc Nội Dung (Content Structure)

```
week-3-configuration/
├── README.md                           # File này
├── docs/                               # Tài liệu lý thuyết
│   ├── 01-multi-browser-testing-vi.md  # Cross-browser testing
│   ├── 02-playwright-projects-vi.md    # Projects feature
│   ├── 03-environment-management-vi.md # Environment configs
│   ├── 04-device-emulation-vi.md       # Mobile testing
│   └── 05-test-dependencies-vi.md      # Test dependencies
├── examples/                           # Code examples
│   ├── 01-multi-browser.spec.ts        # Multi-browser example
│   ├── 02-projects-config.spec.ts      # Projects configuration
│   ├── 03-environments.spec.ts         # Environment switching
│   ├── 04-mobile-testing.spec.ts       # Device emulation
│   ├── 05-test-dependencies.spec.ts    # Dependent tests
│   └── configs/                        # Configuration files
│       ├── playwright.config.dev.ts
│       ├── playwright.config.staging.ts
│       └── playwright.config.prod.ts
├── exercises/                          # Bài tập thực hành
│   ├── exercise-01-cross-browser.spec.ts
│   └── exercise-02-environments.spec.ts
└── solutions/                          # Lời giải
    ├── exercise-01-cross-browser.spec.ts
    └── exercise-02-environments.spec.ts
```

## Lộ Trình Học (Learning Path)

### 1. Theory (Lý Thuyết) - 5 docs
Đọc các tài liệu theo thứ tự:
1. **Multi-browser Testing** - Cross-browser fundamentals
2. **Playwright Projects** - Projects configuration
3. **Environment Management** - Dev/staging/prod setup
4. **Device Emulation** - Mobile & tablet testing
5. **Test Dependencies** - Execution order control

### 2. Examples (Ví Dụ Thực Hành) - 5 examples
Chạy và phân tích code:
```bash
# Multi-browser testing
npx playwright test examples/01-multi-browser.spec.ts --project=chromium
npx playwright test examples/01-multi-browser.spec.ts --project=firefox
npx playwright test examples/01-multi-browser.spec.ts --project=webkit

# Projects configuration
npx playwright test examples/02-projects-config.spec.ts

# Environment-specific tests
npx playwright test examples/03-environments.spec.ts

# Mobile testing
npx playwright test examples/04-mobile-testing.spec.ts --project=mobile

# Test dependencies
npx playwright test examples/05-test-dependencies.spec.ts
```

### 3. Exercises (Bài Tập) - 2 exercises
Làm các bài tập và so sánh với solutions:
- **Exercise 01**: Cross-browser test suite
- **Exercise 02**: Multi-environment configuration

## Công Nghệ Sử Dụng (Technologies)

- **Playwright Test**: @playwright/test v1.48.0
- **TypeScript**: Strict mode
- **Browsers**: Chromium, Firefox, WebKit
- **Device Emulation**: iPhone 13, iPad, Samsung Galaxy
- **CI/CD**: GitHub Actions ready

## Test Sites

- **UI Testing**: practice.expandtesting.com
- **E-commerce**: saucedemo.com
- **Multi-page**: the-internet.herokuapp.com

## Key Concepts

### Multi-browser Testing
```typescript
// playwright.config.ts
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

### Environment Management
```typescript
// Different base URLs per environment
const baseURL = process.env.TEST_ENV === 'prod'
  ? 'https://prod.example.com'
  : 'https://staging.example.com';
```

### Device Emulation
```typescript
// Mobile testing
{ name: 'mobile', use: { ...devices['iPhone 13'] } }
```

## Lưu Ý Quan Trọng (Important Notes)

1. **Browser Differences**: Mỗi browser có rendering engine khác nhau (Blink, Gecko, WebKit)
2. **Parallel Execution**: Projects chạy parallel by default
3. **Environment Variables**: Sử dụng .env files cho sensitive data
4. **CI/CD Optimization**: Shard tests across multiple workers
5. **Mobile Testing**: Test both portrait and landscape orientations

## Kết Quả Mong Đợi (Expected Outcomes)

Sau tuần này, bạn sẽ có:
- ✅ Test suite chạy trên 3+ browsers
- ✅ Configuration cho dev/staging/prod environments
- ✅ Mobile test coverage
- ✅ CI/CD-ready test setup
- ✅ Hiểu rõ browser compatibility testing

## Thời Gian Học (Study Time)

- **Đọc lý thuyết**: 3-4 giờ
- **Chạy examples**: 2-3 giờ
- **Làm exercises**: 3-4 giờ
- **Tổng**: ~10 giờ

---

**Happy Testing!** 🚀

Hãy bắt đầu với `docs/01-multi-browser-testing-vi.md` để tìm hiểu về cross-browser testing fundamentals.
