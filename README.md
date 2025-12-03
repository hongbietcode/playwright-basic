# 🎭 Lộ Trình Học Playwright JavaScript
## Comprehensive Playwright JavaScript Learning Roadmap

[![Playwright](https://img.shields.io/badge/Playwright-v1.48-45ba4b?logo=playwright)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Lộ trình học 12 tuần** dành cho QC chuyên nghiệp muốn chuyển sang Automation Testing với Playwright JavaScript

---

## 📚 Giới Thiệu | About

Đây là lộ trình học **hoàn toàn thực chiến** (hands-on) giúp bạn thành thạo Playwright từ cơ bản đến nâng cao. Lộ trình bao gồm:

- ✅ **3 Modules chuyên sâu** (12 tuần học)
- ✅ **50+ ví dụ code** chạy được ngay
- ✅ **27 bài tập thực hành** có lời giải
- ✅ **9 dự án thực chiến** (hands-on projects)
- ✅ **Tài liệu song ngữ Việt-Anh** cho thuật ngữ chuyên ngành
- ✅ **Cấu trúc code chuẩn** TypeScript Strict Mode

---

## 🎯 Mục Tiêu Học Tập | Learning Objectives

Sau khi hoàn thành lộ trình này, bạn sẽ có khả năng:

1. ✨ Viết **UI test tự động** (automated UI tests) cho web applications
2. 🏗️ Tổ chức **test projects** theo chuẩn chuyên nghiệp với **Page Object Model (POM)**
3. 🔌 Thực hiện **API Testing** và **Integration Testing**
4. 🌐 Test trên **nhiều browsers** (Chromium, Firefox, WebKit)
5. 🔧 Cấu hình **CI/CD pipelines** cho automation testing
6. 🐛 Debug và troubleshoot tests hiệu quả
7. 💼 Tự tin apply cho vị trí **Automation QC/Tester**

---

## 📋 Yêu Cầu Trước Khi Học | Prerequisites

### Kiến thức bắt buộc:
- ✅ **JavaScript cơ bản**: variables, functions, async/await
- ✅ **HTML/CSS cơ bản**: selectors, DOM structure
- ✅ **Testing concepts**: test cases, expected results

### Công cụ cần cài đặt:
- ✅ **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- ✅ **Yarn** package manager ([Install guide](https://yarnpkg.com/getting-started/install))
- ✅ **VS Code** hoặc IDE bất kỳ
- ✅ **Git** (optional, cho version control)

### Kiểm tra phiên bản:
```bash
node --version  # v18.0.0 trở lên
yarn --version  # 1.22.0 trở lên
```

---

## 🌐 Xem Online | View Online

**Live Documentation:** [https://playwright-basic.vercel.app](https://playwright-basic.vercel.app)

Roadmap này được deploy như một **interactive GitBook** trên Vercel với:
- ✅ Navigation dễ dàng
- ✅ Search functionality
- ✅ Mobile-friendly
- ✅ Copy code buttons
- ✅ Syntax highlighting

## ⚙️ Cài Đặt | Installation

### Bước 1: Clone/Download project
```bash
cd playwright-basic
```

### Bước 2: Cài đặt dependencies
```bash
yarn install
# hoặc
npm install
```

### Bước 3: Cài đặt browsers (để chạy tests)
```bash
yarn run install:browsers
```

### Bước 4: Xem documentation locally
```bash
# Development server (GitBook)
yarn dev
# Mở http://localhost:4000

# Build static site
yarn build
# Output trong _book/
```

### Bước 5: Chạy test mẫu
```bash
# Chạy tất cả tests
yarn test

# Chạy với UI Mode (khuyến nghị cho người mới)
yarn test:ui

# Chạy test và xem browser
yarn test:headed
```

### Bước 6: Xem báo cáo (test report)
```bash
yarn report
```

---

## 🗺️ Lộ Trình Học 12 Tuần | 12-Week Learning Path

```
┌─────────────────────────────────────────────────────────────────┐
│  Module 1: Playwright Basics (Tuần 1-4)                        │
│  ├─ Week 1: Getting Started & Browser Automation               │
│  ├─ Week 2: Locators & Element Interactions                    │
│  ├─ Week 3: Assertions & Debugging                             │
│  └─ Week 4: Projects (Login, E-commerce, Forms)                │
├─────────────────────────────────────────────────────────────────┤
│  Module 2: Organization & Patterns (Tuần 5-8)                  │
│  ├─ Week 5: Project Structure & Configuration                  │
│  ├─ Week 6: Page Object Model & Fixtures                       │
│  ├─ Week 7: Multi-browser & Environments                       │
│  └─ Week 8: Projects (Refactor to POM, Multi-browser, CI/CD)   │
├─────────────────────────────────────────────────────────────────┤
│  Module 3: API Testing (Tuần 9-12)                             │
│  ├─ Week 9: API Fundamentals & HTTP Methods                    │
│  ├─ Week 10: CRUD Operations & Authentication                  │
│  ├─ Week 11: Response Validation & Integration                 │
│  └─ Week 12: Projects (REST API Suite, Booking, Integration)   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📖 Module 1: Playwright Basics (Tuần 1-4)

> **Mục tiêu**: Nắm vững kiến thức nền tảng về Playwright và viết được UI tests cơ bản

### 📅 Week 1: Getting Started (5-7 giờ)
**Nội dung học:**
- Playwright là gì? Kiến trúc (architecture) và so sánh với các tools khác
- Cài đặt và cấu hình (installation & configuration)
- Browser, Context, Page - các khái niệm cốt lõi
- Viết và chạy test đầu tiên

**Thực hành:**
- ✏️ 4 ví dụ code (examples)
- ✏️ 3 bài tập (exercises)

📂 [`module-1-basics/week-1-getting-started/`](module-1-basics/week-1-getting-started/)

---

### 📅 Week 2: Element Interactions (8-10 giờ)
**Nội dung học:**
- **Locators (Bộ định vị)**: CSS, text, role-based, attributes
- **Actions (Hành động)**: click, type, select, check/uncheck
- **Keyboard & Mouse**: press, hover, drag-drop
- File upload/download

**Thực hành:**
- ✏️ 8 ví dụ code
- ✏️ 4 bài tập

📂 [`module-1-basics/week-2-interactions/`](module-1-basics/week-2-interactions/)

---

### 📅 Week 3: Assertions & Debugging (8-10 giờ)
**Nội dung học:**
- **Auto-wait mechanism** - cơ chế tự động chờ
- **Assertions (Xác nhận)**: expect(), soft assertions
- **Debugging tools**: Inspector, Trace Viewer, VS Code
- **Test Reports (Báo cáo)**: HTML, JSON, screenshots

**Thực hành:**
- ✏️ 6 ví dụ code
- ✏️ 3 bài tập

📂 [`module-1-basics/week-3-assertions-debugging/`](module-1-basics/week-3-assertions-debugging/)

---

### 📅 Week 4: Hands-on Projects (10-15 giờ)

**🎯 Project 1: Login Flow Testing**
- Test authentication với valid/invalid credentials
- Error messages validation
- Session management
- 📂 [`module-1-basics/week-4-projects/project-01-login-flow/`](module-1-basics/week-4-projects/project-01-login-flow/)

**🎯 Project 2: E-commerce Cart Testing**
- Test shopping cart functionality
- Add/remove products
- Price calculation validation
- 📂 [`module-1-basics/week-4-projects/project-02-ecommerce-cart/`](module-1-basics/week-4-projects/project-02-ecommerce-cart/)

**🎯 Project 3: Form Validation Testing**
- Test form inputs validation
- Required fields, format validation
- Error handling
- 📂 [`module-1-basics/week-4-projects/project-03-form-validation/`](module-1-basics/week-4-projects/project-03-form-validation/)

---

## 📖 Module 2: Organization & Patterns (Tuần 5-8)

> **Mục tiêu**: Tổ chức test projects chuyên nghiệp với design patterns

### 📅 Week 5: Project Structure (6-8 giờ)
**Nội dung học:**
- Best practices cho cấu trúc project
- Naming conventions (quy ước đặt tên)
- Test organization với `describe()` và hooks
- Configuration management

📂 [`module-2-organization/week-1-structure/`](module-2-organization/week-1-structure/)

---

### 📅 Week 6: Patterns & Data (10-12 giờ)
**Nội dung học:**
- **Page Object Model (POM)** - pattern quan trọng nhất
- **Fixtures (Đồ gá test)** - custom fixtures
- **Test Data Management**: JSON, CSV, dynamic data
- Helper utilities

📂 [`module-2-organization/week-2-patterns/`](module-2-organization/week-2-patterns/)

---

### 📅 Week 7: Configuration Advanced (8-10 giờ)
**Nội dung học:**
- Multi-browser testing (Chromium, Firefox, WebKit)
- Environment management (dev, staging, production)
- **Playwright Projects** feature
- Device emulation (mobile, tablet)
- Test dependencies

📂 [`module-2-organization/week-3-configuration/`](module-2-organization/week-3-configuration/)

---

### 📅 Week 8: Advanced Projects (12-15 giờ)

**🎯 Project 4: Refactor to Page Object Model**
- Chuyển đổi tests từ Module 1 sang POM pattern
- Tạo reusable page classes
- 📂 [`module-2-organization/week-4-projects/project-01-refactor-to-pom/`](module-2-organization/week-4-projects/project-01-refactor-to-pom/)

**🎯 Project 5: Multi-browser Test Suite**
- Cấu hình cross-browser testing
- Environment configuration
- Parallel execution
- 📂 [`module-2-organization/week-4-projects/project-02-multi-browser-suite/`](module-2-organization/week-4-projects/project-02-multi-browser-suite/)

**🎯 Project 6: CI/CD Integration**
- GitHub Actions workflow setup
- Automated test execution
- Test reports publishing
- 📂 [`module-2-organization/week-4-projects/project-03-ci-setup/`](module-2-organization/week-4-projects/project-03-ci-setup/)

---

## 📖 Module 3: API Testing (Tuần 9-12)

> **Mục tiêu**: Thành thạo API testing và integration testing với Playwright

### 📅 Week 9: API Fundamentals (6-8 giờ)
**Nội dung học:**
- API Testing introduction
- **HTTP Methods**: GET, POST, PUT, PATCH, DELETE
- **APIRequestContext** - công cụ test API của Playwright
- Headers, body, query parameters

📂 [`module-3-api-testing/week-1-fundamentals/`](module-3-api-testing/week-1-fundamentals/)

---

### 📅 Week 10: CRUD & Authentication (8-10 giờ)
**Nội dung học:**
- **CRUD operations** - Create, Read, Update, Delete
- **Authentication**: Bearer Token, Basic Auth, API Key
- Request/Response handling
- Error handling

📂 [`module-3-api-testing/week-2-crud-auth/`](module-3-api-testing/week-2-crud-auth/)

---

### 📅 Week 11: Validation & Integration (8-10 giờ)
**Nội dung học:**
- Status code validation
- **JSON Schema Validation**
- Response time testing
- **UI + API Integration** - kết hợp test UI và API
- Data setup/teardown

📂 [`module-3-api-testing/week-3-validation/`](module-3-api-testing/week-3-validation/)

---

### 📅 Week 12: API Projects (12-15 giờ)

**🎯 Project 7: REST API Test Suite**
- Full CRUD testing cho REST API
- Multiple endpoints testing
- 📂 [`module-3-api-testing/week-4-projects/project-01-rest-api-suite/`](module-3-api-testing/week-4-projects/project-01-rest-api-suite/)

**🎯 Project 8: Booking API Testing**
- Real-world booking system
- Authentication flow
- Business logic validation
- 📂 [`module-3-api-testing/week-4-projects/project-02-booking-api/`](module-3-api-testing/week-4-projects/project-02-booking-api/)

**🎯 Project 9: Integration Testing**
- Setup data via API
- Test UI functionality
- Verify via API
- Cleanup
- 📂 [`module-3-api-testing/week-4-projects/project-03-integration-tests/`](module-3-api-testing/week-4-projects/project-03-integration-tests/)

---

## 🛠️ Scripts Hữu Ích | Useful Scripts

```bash
# Chạy tests
yarn test                    # Tất cả tests
yarn test:ui                 # UI mode (interactive)
yarn test:headed             # Xem browser trong quá trình test
yarn test:debug              # Debug mode

# Chạy theo module
yarn test:module1            # Module 1 tests
yarn test:module2            # Module 2 tests
yarn test:module3            # Module 3 tests

# Chạy theo loại
yarn test:examples           # Chỉ chạy examples
yarn test:exercises          # Chỉ chạy exercises

# Chạy theo browser
yarn test:chromium           # Chỉ Chromium
yarn test:firefox            # Chỉ Firefox
yarn test:webkit             # Chỉ WebKit/Safari
yarn test:all-browsers       # Tất cả browsers

# Xem báo cáo
yarn report                  # Mở HTML report

# Code quality
yarn typecheck               # Check TypeScript
yarn lint                    # Check linting
yarn format                  # Format code
```

---

## 🌐 Websites & APIs Để Practice

### UI Testing Sites:
- **Expand Testing**: https://practice.expandtesting.com
  - Login, forms, tables, alerts, dynamic content
- **SauceDemo**: https://www.saucedemo.com
  - E-commerce site với shopping cart
- **TodoMVC**: https://demo.playwright.dev/todomvc
  - Simple CRUD app

### API Testing Endpoints:
- **JSONPlaceholder**: https://jsonplaceholder.typicode.com
  - `/posts`, `/comments`, `/users` - không cần authentication
- **ReqRes**: https://reqres.in
  - User CRUD với authentication
- **DummyJSON**: https://dummyjson.com
  - Products, carts, realistic data
- **Restful Booker**: https://restful-booker.herokuapp.com
  - Booking system với authentication

---

## 📚 Tài Liệu Tham Khảo | Resources

### Official Documentation:
- 📖 [Playwright Docs](https://playwright.dev/docs/intro)
- 📖 [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- 📖 [Best Practices](https://playwright.dev/docs/best-practices)

### Learning Resources:
- 📖 [LambdaTest Learning Hub](https://www.lambdatest.com/learning-hub/playwright-javascript)
- 📖 [Playwright Projects Guide](https://www.lambdatest.com/learning-hub/playwright-projects)
- 📖 [API Testing Guide](https://www.lambdatest.com/learning-hub/playwright-api-testing)

### Community:
- 💬 [Playwright Discord](https://discord.gg/playwright)
- 💬 [Stack Overflow](https://stackoverflow.com/questions/tagged/playwright)
- 💬 [GitHub Discussions](https://github.com/microsoft/playwright/discussions)

### Vietnamese Resources:
- 📂 [`docs/troubleshooting-vi.md`](docs/troubleshooting-vi.md) - Lỗi thường gặp
- 📂 [`docs/resources.md`](docs/resources.md) - Tài liệu bổ sung

---

## 🎓 Hướng Dẫn Sử Dụng Lộ Trình | How to Use This Roadmap

### 1️⃣ Học Tuần Tự (Sequential Learning)
- Bắt đầu từ **Module 1 → Week 1**
- Hoàn thành tất cả tuần theo thứ tự
- Không skip weeks

### 2️⃣ Mỗi Tuần Làm Gì?

**Ngày 1-2: Đọc Lý Thuyết** 📖
- Đọc tất cả files trong `/docs/`
- Ghi chú các khái niệm quan trọng
- Xem links tham khảo

**Ngày 3-4: Chạy Examples** 💻
- Chạy từng file trong `/examples/`
- Đọc code và comments
- Thử modify code để hiểu rõ hơn

**Ngày 5-7: Làm Exercises** ✏️
- Làm từng bài trong `/exercises/`
- Tự làm trước khi xem solutions
- So sánh code của bạn với solutions

**Tuần 4, 8, 12: Làm Projects** 🎯
- Đọc requirements kỹ
- Làm từ starter template
- Hoàn thành tất cả acceptance criteria
- Xem solution sau khi hoàn thành

### 3️⃣ Checklist Hoàn Thành Module

#### ✅ Module 1 Completion:
- [ ] Week 1-3 hoàn thành 100%
- [ ] 3 projects đã pass tất cả tests
- [ ] Hiểu rõ: locators, interactions, assertions
- [ ] Tự tin viết UI tests cơ bản

#### ✅ Module 2 Completion:
- [ ] Refactor được tests sang POM
- [ ] Cấu hình được multi-browser
- [ ] Setup được CI/CD cơ bản
- [ ] Hiểu project organization

#### ✅ Module 3 Completion:
- [ ] Test được REST APIs
- [ ] Xử lý authentication
- [ ] Kết hợp UI + API testing
- [ ] 9/9 projects hoàn thành

---

## 🤝 Đóng Góp | Contributing

Nếu bạn tìm thấy lỗi hoặc muốn cải thiện nội dung:
1. Fork repository này
2. Tạo branch mới
3. Commit changes
4. Push và tạo Pull Request

---

## 📧 Liên Hệ & Hỗ Trợ | Contact & Support

- ❓ **Câu hỏi**: Tạo issue trong GitHub repository
- 🐛 **Báo lỗi**: Tạo bug report
- 💡 **Ý tưởng**: Tạo feature request

---

## 📄 License

Dự án này được phát hành dưới [MIT License](LICENSE).

---

## 🎉 Chúc Bạn Học Tốt!

> **"The best way to learn is by doing"** - Cách học tốt nhất là thực hành!

Bắt đầu ngay với [Module 1 - Week 1](module-1-basics/week-1-getting-started/) 🚀

---

**Made with ❤️ for Vietnamese QC Professionals**
