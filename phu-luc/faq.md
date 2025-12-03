# FAQ - Câu Hỏi Thường Gặp

## ❓ General Questions

### Q: Tôi cần kiến thức gì trước khi bắt đầu?
**A:** Chỉ cần:
- ✅ Biết cơ bản về lập trình (bất kỳ ngôn ngữ nào)
- ✅ Hiểu HTML/CSS cơ bản
- ✅ Biết cài đặt phần mềm trên máy tính

JavaScript/TypeScript sẽ được học trong quá trình!

### Q: Tôi nên học bao lâu mỗi ngày?
**A:** Khuyến nghị:
- **Tối thiểu:** 30-60 phút/ngày
- **Lý tưởng:** 1-2 giờ/ngày
- **Tổng thời gian:** ~12 tuần (3 tháng)

Quan trọng là học **đều đặn** hơn là học nhiều!

### Q: Tôi nên làm gì nếu bị stuck?
**A:**
1. Đọc lại lý thuyết
2. Xem lại ví dụ
3. Google error message
4. Hỏi trên Stack Overflow
5. Xem solution (nhưng cố tự làm trước!)

## 🔧 Technical Questions

### Q: Tại sao chọn Playwright thay vì Selenium?
**A:** Playwright có nhiều ưu điểm:
- ✅ **Nhanh hơn** - Auto-waiting, parallel execution
- ✅ **Ổn định hơn** - Ít flaky tests
- ✅ **API hiện đại** - Promise-based, TypeScript support
- ✅ **Multi-browser** - Chromium, Firefox, WebKit
- ✅ **API testing** - Built-in APIRequestContext

### Q: TypeScript hay JavaScript?
**A:** Roadmap này dùng **TypeScript** vì:
- ✅ Type safety (ít bugs)
- ✅ Better IDE support (autocomplete)
- ✅ Easier refactoring
- ✅ Industry standard

Nhưng bạn vẫn có thể dùng JavaScript nếu muốn!

### Q: Làm sao để test được website yêu cầu login?
**A:** Có 3 cách:
1. **UI Login** - Fill form and click (chậm)
2. **API Login** - Get token via API (nhanh)
3. **Storage State** - Save login state and reuse

Xem Week 6 (Fixtures) và Week 11 (UI + API Integration)!

### Q: Test có chạy được trên CI/CD không?
**A:** Có! Week 8 Project 6 hướng dẫn setup GitHub Actions.

Playwright chạy tốt trên:
- ✅ GitHub Actions
- ✅ GitLab CI
- ✅ Jenkins
- ✅ CircleCI
- ✅ Azure Pipelines

## 📚 Learning Questions

### Q: Tôi nên bắt đầu từ đâu?
**A:** Theo thứ tự:
1. **Week 1** - Getting Started
2. **Week 2** - Locators & Interactions
3. **Week 3** - Assertions
4. **Week 4** - Projects (consolidate)

**KHÔNG ĐƯỢC SKIP** các tuần trước!

### Q: Exercises có bắt buộc không?
**A:**
- **Strongly recommended!** - Exercises giúp bạn practice
- Tự làm trước khi xem solutions
- Làm lại nếu không hiểu
- Thử modify để học sâu hơn

### Q: Solutions có thể khác code của tôi không?
**A:** Có thể! Nhiều cách để giải một bài toán.

**Quan trọng:**
- Code của bạn có work không?
- Code có readable không?
- Code có maintainable không?

Nếu YES cho cả 3 → Code của bạn tốt!

## 🐛 Troubleshooting

### Q: Test chạy ở local OK nhưng fail trên CI?
**A:** Common issues:
- Timeout too short → Increase timeout
- Missing `await` → Add await
- Race conditions → Use proper waits
- Browser not installed → Use `playwright install`

### Q: Làm sao debug khi test fail?
**A:** Tools:
1. **Headed mode** - `--headed` để xem browser
2. **Debug mode** - `--debug` để step through
3. **Trace Viewer** - Xem recording của test
4. **Screenshots** - Chụp ảnh khi fail
5. **Videos** - Record video test

### Q: Test chạy chậm, làm sao tăng tốc?
**A:**
- ✅ Run parallel (`fullyParallel: true`)
- ✅ Use API cho setup data
- ✅ Skip UI login (use storage state)
- ✅ Use `--workers` flag
- ✅ Optimize locators

## 💼 Career Questions

### Q: Sau khóa này tôi có thể làm gì?
**A:** Bạn có thể apply cho:
- **QA Automation Engineer**
- **SDET (Software Development Engineer in Test)**
- **Test Automation Developer**
- **Backend Developer** (nếu học thêm backend)

### Q: Playwright có phổ biến không?
**A:** RẤT phổ biến!
- Microsoft official tool
- Used by: VS Code, GitHub, Netflix, Adobe
- Growing faster than Selenium
- Modern & actively developed

### Q: Tôi cần certificate không?
**A:**
- **Không bắt buộc** - Employers quan tâm skills hơn
- **GitHub portfolio** quan trọng hơn certificate
- **Làm projects** và showcase code

## 🚀 Next Steps

### Q: Sau khi học xong 12 tuần, học gì tiếp?
**A:**
1. **Advanced Playwright**:
   - Component testing
   - Visual regression testing
   - Accessibility testing

2. **CI/CD**:
   - Jenkins, GitLab CI
   - Docker containers
   - Kubernetes

3. **Programming**:
   - Advanced TypeScript
   - Node.js backend
   - React/Vue frontend

4. **Other Tools**:
   - Cypress (alternative)
   - Jest (unit testing)
   - Postman (API testing)

### Q: Roadmap có update không?
**A:**
- Playwright update liên tục
- Roadmap được thiết kế với fundamentals → Always relevant
- Specific versions có thể thay đổi nhưng concepts giữ nguyên

---

**Không tìm thấy câu trả lời?**
- Stack Overflow: [Playwright tag](https://stackoverflow.com/questions/tagged/playwright)
- Playwright Discord: [Join community](https://aka.ms/playwright/discord)

**Good luck with your learning journey!** 🎉
