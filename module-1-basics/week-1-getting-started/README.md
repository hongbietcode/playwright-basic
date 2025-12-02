# 📅 Week 1: Getting Started - Bắt Đầu Với Playwright

> **Thời lượng**: 5-7 giờ
> **Mục tiêu**: Hiểu Playwright là gì, cài đặt thành công, và chạy được test đầu tiên

---

## 🎯 Mục Tiêu Tuần Này | This Week's Objectives

Sau tuần 1, bạn sẽ:

- ✅ Hiểu Playwright là gì và tại sao nên dùng
- ✅ Phân biệt Browser, Browser Context, và Page
- ✅ Cài đặt và cấu hình Playwright
- ✅ Viết và chạy test đầu tiên
- ✅ Sử dụng basic navigation: `goto()`, `waitForLoadState()`
- ✅ Capture screenshots và videos

---

## 📖 Nội Dung Lý Thuyết | Theory Content

### 📄 Docs - Tài liệu học (đọc theo thứ tự):

1. **[01-playwright-introduction-vi.md](docs/01-playwright-introduction-vi.md)**
   - Playwright là gì? (What is Playwright?)
   - Kiến trúc (Architecture)
   - So sánh với Selenium, Cypress
   - Lợi ích (Benefits)
   - ⏱️ 45-60 phút

2. **[02-installation-setup-vi.md](docs/02-installation-setup-vi.md)**
   - Yêu cầu hệ thống (System requirements)
   - Cài đặt với yarn
   - Cấu hình playwright.config.ts
   - Cài đặt browsers
   - ⏱️ 30-45 phút

3. **[03-first-test-vi.md](docs/03-first-test-vi.md)**
   - Cấu trúc test file
   - `test()`, `describe()`, `expect()`
   - Chạy tests (CLI, UI mode)
   - Xem test results
   - ⏱️ 45-60 phút

4. **[04-browser-context-vi.md](docs/04-browser-context-vi.md)**
   - Browser vs Context vs Page
   - Isolation (cô lập)
   - Storage state (cookies, localStorage)
   - Multiple contexts
   - ⏱️ 30-45 phút

**Tổng thời gian lý thuyết**: ~3 giờ

---

## 💻 Code Examples - Ví Dụ Code

Chạy từng example để hiểu cách hoạt động:

### 1. [01-basic-navigation.spec.ts](examples/01-basic-navigation.spec.ts)
**Nội dung**: Navigation cơ bản - `goto()`, `goBack()`, `reload()`
```bash
yarn test week-1-getting-started/examples/01-basic-navigation.spec.ts
```

### 2. [02-multiple-browsers.spec.ts](examples/02-multiple-browsers.spec.ts)
**Nội dung**: Chạy test trên Chromium, Firefox, WebKit
```bash
yarn test week-1-getting-started/examples/02-multiple-browsers.spec.ts
```

### 3. [03-page-interactions.spec.ts](examples/03-page-interactions.spec.ts)
**Nội dung**: Click, fill, basic assertions
```bash
yarn test week-1-getting-started/examples/03-page-interactions.spec.ts
```

### 4. [04-screenshots-videos.spec.ts](examples/04-screenshots-videos.spec.ts)
**Nội dung**: Capture screenshots, record videos
```bash
yarn test week-1-getting-started/examples/04-screenshots-videos.spec.ts
```

**Tổng thời gian examples**: ~1 giờ

---

## ✏️ Exercises - Bài Tập Thực Hành

Làm bài tập để củng cố kiến thức:

### Exercise 1: [exercise-01-navigation.spec.ts](exercises/exercise-01-navigation.spec.ts)
**Yêu cầu**: Navigate giữa các pages, verify URLs
**Độ khó**: ⭐ Easy
**Thời gian**: 20-30 phút

### Exercise 2: [exercise-02-browser-setup.spec.ts](exercises/exercise-02-browser-setup.spec.ts)
**Yêu cầu**: Setup browser contexts với viewport khác nhau
**Độ khó**: ⭐⭐ Medium
**Thời gian**: 30-40 phút

### Exercise 3: [exercise-03-basic-interaction.spec.ts](exercises/exercise-03-basic-interaction.spec.ts)
**Yêu cầu**: Tương tác với buttons, inputs, verify results
**Độ khó**: ⭐⭐ Medium
**Thời gian**: 30-40 phút

**Tổng thời gian exercises**: ~2 giờ

💡 **Lời khuyên**: Tự làm trước, sau đó xem solutions trong `/solutions/`

---

## 📅 Kế Hoạch 7 Ngày | 7-Day Plan

### 📖 Day 1-2: Theory (Lý thuyết)
- **Day 1**: Đọc docs 01 và 02
  - Hiểu Playwright là gì
  - Cài đặt trên máy của bạn
- **Day 2**: Đọc docs 03 và 04
  - Viết test đầu tiên
  - Hiểu Browser Context

### 💻 Day 3-4: Examples (Ví dụ)
- **Day 3**: Chạy examples 01 và 02
  - Navigation
  - Multiple browsers
- **Day 4**: Chạy examples 03 và 04
  - Page interactions
  - Screenshots & videos

### ✏️ Day 5-7: Exercises (Thực hành)
- **Day 5**: Exercise 01
- **Day 6**: Exercise 02
- **Day 7**: Exercise 03 + Review toàn bộ tuần

---

## 🔑 Khái Niệm Quan Trọng | Key Concepts

### 1. Browser (Trình duyệt)
Instance của browser engine (Chromium, Firefox, WebKit)

### 2. Browser Context (Ngữ cảnh trình duyệt)
Isolated session - giống như "Incognito window"
- Có cookies, localStorage riêng
- Không chia sẻ data giữa contexts

### 3. Page (Trang)
Tab hoặc popup trong browser context
- Nơi bạn navigate đến URLs
- Nơi thực hiện actions

```
Browser
  └── Context 1 (Isolated)
      ├── Page 1 (Tab 1)
      └── Page 2 (Tab 2)
  └── Context 2 (Isolated)
      └── Page 3 (Tab 1)
```

---

## ❌ Lỗi Thường Gặp | Common Errors

### 1. **"Executable doesn't exist"**
**Nguyên nhân**: Chưa cài browsers
**Giải pháp**:
```bash
yarn run install:browsers
```

### 2. **"Test timeout"**
**Nguyên nhân**: Page load chậm, selector sai
**Giải pháp**: Tăng timeout trong config hoặc check selector

### 3. **"Cannot find module"**
**Nguyên nhân**: Chưa install dependencies
**Giải pháp**:
```bash
yarn install
```

---

## 🎯 Checkpoint Questions - Tự Kiểm Tra

Trả lời các câu hỏi sau để đảm bảo bạn hiểu:

1. ❓ Playwright khác Selenium như thế nào?
2. ❓ Browser Context có tác dụng gì?
3. ❓ Làm sao để chạy test trên Firefox?
4. ❓ `goto()` và `waitForLoadState()` khác nhau thế nào?
5. ❓ Làm sao capture screenshot?

**Đáp án**: Xem lại docs nếu chưa trả lời được!

---

## 📚 Tài Liệu Tham Khảo | References

- [Playwright Introduction](https://playwright.dev/docs/intro)
- [Writing Tests](https://playwright.dev/docs/writing-tests)
- [Browser Contexts](https://playwright.dev/docs/browser-contexts)
- [LambdaTest Guide](https://www.lambdatest.com/learning-hub/playwright-javascript)

---

## ✅ Completion Checklist

Đánh dấu khi hoàn thành:

- [ ] Đọc xong 4 docs
- [ ] Chạy thành công 4 examples
- [ ] Hoàn thành 3 exercises
- [ ] Trả lời được 5 checkpoint questions
- [ ] Cài đặt Playwright trên máy
- [ ] Chạy được test trên 3 browsers

---

## 🚀 Next Steps

Sau khi hoàn thành Week 1 👉 Chuyển sang [**Week 2: Element Interactions**](../week-2-interactions/)

---

**Happy Learning! Chúc bạn học tốt! 📚**
