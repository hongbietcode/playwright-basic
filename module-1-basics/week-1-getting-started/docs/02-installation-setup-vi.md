# ⚙️ Cài Đặt và Cấu Hình Playwright
## Installation and Setup Guide

> Hướng dẫn chi tiết cài đặt Playwright từ đầu cho người mới bắt đầu

---

## 📋 Yêu Cầu Hệ Thống | System Requirements

### Phần cứng tối thiểu:
- **RAM**: 4GB (khuyến nghị 8GB+)
- **Disk Space**: 2GB trống (cho browsers)
- **CPU**: Dual-core processor

### Hệ điều hành hỗ trợ:
- ✅ **Windows** 10/11 (64-bit)
- ✅ **macOS** 11+ (Big Sur trở lên)
- ✅ **Linux** (Ubuntu 20.04+, Debian, Fedora)

### Phần mềm cần thiết:

#### 1. Node.js (Bắt buộc)
**Version**: >= 18.0.0

**Kiểm tra version hiện tại**:
```bash
node --version
# Kết quả mong đợi: v18.0.0 hoặc cao hơn
```

**Cài đặt Node.js**:
- Download từ: https://nodejs.org/
- Chọn **LTS version** (Long Term Support)
- Cài đặt theo hướng dẫn

#### 2. Yarn (Khuyến nghị)
**Version**: >= 1.22.0

**Cài đặt Yarn**:
```bash
# Dùng npm (đi kèm với Node.js)
npm install -g yarn

# Kiểm tra version
yarn --version
```

**Tại sao dùng Yarn thay vì npm?**
- ⚡ Nhanh hơn npm
- 🔒 Lock file tốt hơn (yarn.lock)
- 📦 Quản lý dependencies tốt hơn

#### 3. IDE/Text Editor (Tùy chọn nhưng khuyến nghị)
- **VS Code** (khuyến nghị) - https://code.visualstudio.com/
- WebStorm
- Sublime Text
- Bất kỳ editor nào hỗ trợ JavaScript/TypeScript

---

## 🚀 Cài Đặt Playwright | Installation Steps

### Phương Pháp 1: Tạo Project Mới (Khuyến nghị cho người mới)

#### Bước 1: Tạo thư mục project
```bash
# Tạo thư mục mới
mkdir my-playwright-project
cd my-playwright-project
```

#### Bước 2: Khởi tạo Node.js project
```bash
# Tạo package.json
yarn init -y
```

**Giải thích**:
- `yarn init`: Khởi tạo project
- `-y`: Accept tất cả defaults (không hỏi từng câu)

#### Bước 3: Cài đặt Playwright
```bash
# Cài Playwright và browsers
yarn create playwright

# Hoặc dùng npm
npm init playwright@latest
```

**Quá trình cài đặt sẽ hỏi**:
```
? Do you want to use TypeScript or JavaScript?
  › TypeScript (khuyến nghị)

? Where to put your end-to-end tests?
  › tests (hoặc e2e, tests-examples)

? Add a GitHub Actions workflow?
  › true (nếu dùng GitHub)

? Install Playwright browsers?
  › true (Chọn Yes!)
```

#### Bước 4: Xác nhận cài đặt thành công
```bash
# Check Playwright version
npx playwright --version

# Kết quả mong đợi:
# Version 1.48.0
```

---

### Phương Pháp 2: Thêm vào Project Có Sẵn

Nếu bạn đã có project Node.js:

```bash
# Cài Playwright
yarn add -D @playwright/test

# Cài browsers
npx playwright install
```

---

## 🌐 Cài Đặt Browsers | Installing Browsers

Playwright cần download browsers để chạy tests:

### Cài tất cả browsers (Chromium, Firefox, WebKit):
```bash
npx playwright install
```

### Cài từng browser riêng:
```bash
# Chỉ Chromium
npx playwright install chromium

# Chỉ Firefox
npx playwright install firefox

# Chỉ WebKit (Safari engine)
npx playwright install webkit
```

### Cài system dependencies (Linux):
```bash
# Cài các thư viện hệ thống cần thiết
npx playwright install-deps
```

**Dung lượng browsers**:
- Chromium: ~300MB
- Firefox: ~80MB
- WebKit: ~70MB
- **Tổng**: ~450MB

**Vị trí lưu browsers**:
- **Windows**: `%USERPROFILE%\AppData\Local\ms-playwright`
- **macOS**: `~/Library/Caches/ms-playwright`
- **Linux**: `~/.cache/ms-playwright`

---

## ⚙️ Cấu Hình Playwright | Configuration

### File `playwright.config.ts`

Sau khi cài đặt, bạn sẽ có file `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Thư mục chứa tests
  testDir: './tests',

  // Timeout cho mỗi test (30 giây)
  timeout: 30 * 1000,

  // Chạy tests song song
  fullyParallel: true,

  // Số lần retry khi test fail
  retries: process.env.CI ? 2 : 0,

  // Số workers (processes chạy song song)
  workers: process.env.CI ? 1 : undefined,

  // Reporter - định dạng báo cáo
  reporter: 'html',

  // Cấu hình chung
  use: {
    // Base URL cho navigation
    baseURL: 'http://localhost:3000',

    // Trace khi test fail
    trace: 'on-first-retry',

    // Screenshot khi fail
    screenshot: 'only-on-failure',
  },

  // Projects - cấu hình cho từng browser
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
  ],
});
```

### Giải thích các options quan trọng:

#### 1. `testDir`
Thư mục chứa test files
```typescript
testDir: './tests',  // hoặc './e2e', './specs'
```

#### 2. `timeout`
Timeout cho mỗi test (milliseconds)
```typescript
timeout: 30 * 1000,  // 30 giây
```

#### 3. `fullyParallel`
Chạy tất cả tests song song
```typescript
fullyParallel: true,  // Nhanh hơn
```

#### 4. `retries`
Số lần retry khi test fail
```typescript
retries: 2,  // Chạy lại tối đa 2 lần
```

#### 5. `reporter`
Định dạng báo cáo test
```typescript
reporter: [
  ['html'],            // HTML report
  ['json', { outputFile: 'results.json' }],
  ['junit', { outputFile: 'junit.xml' }],
]
```

#### 6. `use.baseURL`
URL mặc định cho `goto('/path')`
```typescript
use: {
  baseURL: 'https://example.com',
}

// Trong test:
await page.goto('/login');  // → https://example.com/login
```

#### 7. `projects`
Cấu hình multi-browser
```typescript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
]
```

---

## 📁 Cấu Trúc Project | Project Structure

Sau khi cài đặt, project của bạn sẽ có cấu trúc:

```
my-playwright-project/
├── node_modules/           # Dependencies
├── tests/                  # Test files
│   └── example.spec.ts
├── playwright.config.ts    # Playwright configuration
├── package.json           # Project dependencies
└── yarn.lock             # Lock file
```

### Cấu trúc project lớn (khuyến nghị):

```
project/
├── tests/
│   ├── auth/              # Tests về authentication
│   ├── e2e/               # End-to-end tests
│   ├── api/               # API tests
│   └── visual/            # Visual regression tests
├── pages/                 # Page Object Models
├── fixtures/              # Custom fixtures
├── utils/                 # Helper functions
├── test-data/            # Test data (JSON, CSV)
├── playwright.config.ts
└── package.json
```

---

## 🔧 File `package.json`

Sau khi cài đặt, `package.json` sẽ có:

```json
{
  "name": "my-playwright-project",
  "version": "1.0.0",
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "report": "playwright show-report"
  },
  "devDependencies": {
    "@playwright/test": "^1.48.0",
    "@types/node": "^22.0.0"
  }
}
```

### Thêm scripts hữu ích:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:chromium": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "test:webkit": "playwright test --project=webkit",
    "report": "playwright show-report",
    "codegen": "playwright codegen"
  }
}
```

---

## ✅ Kiểm Tra Cài Đặt | Verify Installation

### Test 1: Chạy example test

```bash
# Chạy test mẫu
yarn test

# Hoặc
npx playwright test
```

**Kết quả mong đợi**:
```
Running 3 tests using 3 workers

  ✓  [chromium] › example.spec.ts:3:1 › basic test (1s)
  ✓  [firefox] › example.spec.ts:3:1 › basic test (2s)
  ✓  [webkit] › example.spec.ts:3:1 › basic test (1s)

  3 passed (4s)
```

### Test 2: Mở UI Mode

```bash
yarn test:ui
```

**Kết quả**: Mở browser với Playwright UI Mode

### Test 3: Xem HTML Report

```bash
yarn report
```

**Kết quả**: Mở HTML report trong browser

---

## 🛠️ VS Code Extension (Khuyến nghị)

### Cài đặt Playwright Extension:

1. Mở VS Code
2. Vào **Extensions** (Ctrl+Shift+X)
3. Tìm "Playwright Test for VSCode"
4. Click **Install**

### Tính năng extension:

- ✅ Run/Debug tests từ editor
- ✅ Show test results inline
- ✅ Pick locators (Ctrl+Shift+P → "Playwright: Pick Locator")
- ✅ Record new tests
- ✅ Syntax highlighting

---

## ⚠️ Lỗi Thường Gặp | Common Issues

### Lỗi 1: "Executable doesn't exist"

**Nguyên nhân**: Chưa cài browsers

**Giải pháp**:
```bash
npx playwright install
```

---

### Lỗi 2: "Cannot find module '@playwright/test'"

**Nguyên nhân**: Chưa install dependencies

**Giải pháp**:
```bash
yarn install
# hoặc
npm install
```

---

### Lỗi 3: "ENOSPC: System limit for number of file watchers reached"

**Nguyên nhân**: (Linux only) System limit thấp

**Giải pháp**:
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

### Lỗi 4: Browser crashes on Linux

**Nguyên nhân**: Thiếu system dependencies

**Giải pháp**:
```bash
npx playwright install-deps
```

---

## 🔐 Environment Variables

Tạo file `.env` để lưu biến môi trường:

```bash
# .env
BASE_URL=https://example.com
USERNAME=testuser
PASSWORD=testpass123
HEADLESS=true
```

Cài đặt `dotenv`:
```bash
yarn add -D dotenv
```

Sử dụng trong `playwright.config.ts`:
```typescript
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
  },
});
```

**Lưu ý**: Thêm `.env` vào `.gitignore`!

---

## 📚 Các Commands Hữu Ích | Useful Commands

```bash
# Chạy tests
npx playwright test                 # Tất cả tests
npx playwright test example.spec.ts # Test cụ thể
npx playwright test --headed        # Xem browser
npx playwright test --debug         # Debug mode
npx playwright test --ui            # UI mode

# Chạy theo browser
npx playwright test --project=chromium
npx playwright test --project=firefox

# Chạy theo grep pattern
npx playwright test -g "login"      # Tests có "login" trong tên

# Generate tests
npx playwright codegen example.com  # Record actions

# Show report
npx playwright show-report

# Update browsers
npx playwright install --force      # Cập nhật browsers
```

---

## 🎯 Checklist Hoàn Thành | Completion Checklist

Đảm bảo bạn đã:

- [ ] Cài đặt Node.js >= 18.0.0
- [ ] Cài đặt Yarn
- [ ] Tạo project mới
- [ ] Cài Playwright: `yarn create playwright`
- [ ] Cài browsers: `npx playwright install`
- [ ] Chạy thành công example test
- [ ] Mở được UI Mode
- [ ] Xem được HTML Report
- [ ] (Optional) Cài VS Code Extension

---

## ➡️ Tiếp Theo | Next Steps

Sau khi cài đặt thành công, tiếp tục với:

👉 **[03-first-test-vi.md](03-first-test-vi.md)** - Viết test đầu tiên

---

**Chúc mừng! Bạn đã cài đặt Playwright thành công! 🎉**
