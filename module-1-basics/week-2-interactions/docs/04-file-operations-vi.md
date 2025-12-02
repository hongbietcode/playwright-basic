# 📁 File Operations
## Upload & Download Files - Thao Tác Với Files

> Tài liệu này hướng dẫn cách upload files, download files, và xử lý file inputs trong Playwright.

---

## 📌 File Operations Là Gì?

Trong web testing, file operations bao gồm:
- 📤 **File Uploads** - Upload files từ local machine
- 📥 **File Downloads** - Download files và verify content
- 📂 **File Input Handling** - Interact với `<input type="file">`
- 🖼️ **Image Uploads** - Upload images (avatars, photos)
- 📄 **Multiple Files** - Upload nhiều files cùng lúc

---

## 📤 File Uploads

### 1. setInputFiles() - Upload Single File

```typescript
// Upload single file
await page.locator('input[type="file"]').setInputFiles('path/to/file.pdf');

// Upload from relative path
await page.locator('#upload').setInputFiles('./test-data/sample.pdf');

// Upload from absolute path
await page.locator('#upload').setInputFiles('/Users/user/Documents/file.pdf');
```

---

### 2. Upload Multiple Files

```typescript
// Upload multiple files
await page.locator('input[type="file"][multiple]').setInputFiles([
  './test-data/file1.pdf',
  './test-data/file2.pdf',
  './test-data/file3.pdf'
]);
```

**HTML Example**:
```html
<input type="file" id="files" multiple>
```

---

### 3. Upload from Buffer (In-Memory)

```typescript
// Create file from buffer
await page.locator('#upload').setInputFiles({
  name: 'test.txt',
  mimeType: 'text/plain',
  buffer: Buffer.from('This is test file content')
});

// Upload JSON data as file
const jsonData = { name: 'John', age: 30 };
await page.locator('#upload').setInputFiles({
  name: 'data.json',
  mimeType: 'application/json',
  buffer: Buffer.from(JSON.stringify(jsonData))
});
```

**When to use?**
- Generate test files dynamically
- Test with specific file content
- Avoid creating physical files

---

### 4. Clear File Input

```typescript
// Clear file selection
await page.locator('input[type="file"]').setInputFiles([]);

// Or use null
await page.locator('#upload').setInputFiles(null);
```

---

### 5. Real-World Upload Example

```typescript
test('should upload profile picture', async ({ page }) => {
  await page.goto('https://example.com/profile');

  // Locate file input
  const fileInput = page.locator('input[type="file"]#avatar');

  // Upload image
  await fileInput.setInputFiles('./test-data/profile-photo.jpg');

  // Click upload button
  await page.locator('button:has-text("Upload")').click();

  // Wait for success message
  await expect(page.locator('.success-message')).toBeVisible();
  await expect(page.locator('.success-message')).toContainText('Upload successful');

  // Verify image displayed
  const uploadedImage = page.locator('img.profile-picture');
  await expect(uploadedImage).toBeVisible();
});
```

---

## 📥 File Downloads

### 1. waitForEvent('download') - Handle Downloads

```typescript
test('should download file', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/download');

  // Start waiting for download before clicking
  const downloadPromise = page.waitForEvent('download');

  // Click download link
  await page.locator('a:has-text("Download")').click();

  // Wait for download to complete
  const download = await downloadPromise;

  // Get file name
  const fileName = download.suggestedFilename();
  console.log('Downloaded:', fileName);

  // Save to specific path
  await download.saveAs(`./downloads/${fileName}`);

  console.log('✅ File saved successfully');
});
```

---

### 2. Verify Downloaded File Content

```typescript
import fs from 'fs';
import path from 'path';

test('should download and verify PDF', async ({ page }) => {
  await page.goto('https://example.com/documents');

  // Wait for download
  const downloadPromise = page.waitForEvent('download');
  await page.locator('a[href$=".pdf"]').click();
  const download = await downloadPromise;

  // Save file
  const filePath = path.join('./downloads', download.suggestedFilename());
  await download.saveAs(filePath);

  // Verify file exists
  expect(fs.existsSync(filePath)).toBeTruthy();

  // Verify file size
  const stats = fs.statSync(filePath);
  expect(stats.size).toBeGreaterThan(0);
  console.log('File size:', stats.size, 'bytes');

  // Read file content (for text files)
  if (filePath.endsWith('.txt')) {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Expected text');
  }

  // Cleanup
  fs.unlinkSync(filePath);
});
```

---

### 3. Download from API Response

```typescript
test('should download generated report', async ({ page }) => {
  await page.goto('https://example.com/reports');

  // Fill report parameters
  await page.locator('#startDate').fill('2024-01-01');
  await page.locator('#endDate').fill('2024-12-31');

  // Generate and download
  const downloadPromise = page.waitForEvent('download');
  await page.locator('button:has-text("Download Report")').click();
  const download = await downloadPromise;

  // Verify filename
  expect(download.suggestedFilename()).toMatch(/report.*\.pdf/);

  // Save
  await download.saveAs('./downloads/report.pdf');
});
```

---

### 4. Download Methods Summary

```typescript
// Get download object
const download = await page.waitForEvent('download');

// Get suggested filename
const fileName = download.suggestedFilename();

// Get download URL
const url = download.url();

// Save to path
await download.saveAs('./downloads/file.pdf');

// Get file as buffer (read content)
const buffer = await download.createReadStream();

// Delete downloaded file
await download.delete();

// Get download failure reason (if failed)
const error = await download.failure();
```

---

## 🖼️ Image Upload Scenarios

### Scenario 1: Profile Picture Upload

```typescript
test('upload profile picture with preview', async ({ page }) => {
  await page.goto('https://example.com/profile/edit');

  // Upload image
  await page.locator('#profilePicture').setInputFiles('./test-data/avatar.jpg');

  // Wait for preview
  const preview = page.locator('img.preview');
  await expect(preview).toBeVisible();

  // Verify preview src changed
  const previewSrc = await preview.getAttribute('src');
  expect(previewSrc).toBeTruthy();

  // Save changes
  await page.locator('button:has-text("Save")').click();

  // Verify success
  await expect(page.locator('.success')).toContainText('Profile updated');
});
```

---

### Scenario 2: Multiple Image Gallery Upload

```typescript
test('upload multiple images to gallery', async ({ page }) => {
  await page.goto('https://example.com/gallery/upload');

  // Upload 3 images
  await page.locator('input[type="file"][multiple]').setInputFiles([
    './test-data/image1.jpg',
    './test-data/image2.jpg',
    './test-data/image3.jpg'
  ]);

  // Verify thumbnail count
  const thumbnails = page.locator('.thumbnail');
  await expect(thumbnails).toHaveCount(3);

  // Click upload button
  await page.locator('button#uploadAll').click();

  // Wait for upload completion
  await expect(page.locator('.upload-complete')).toBeVisible();
});
```

---

## 📝 File Input Interactions

### 1. Detect File Input Changes

```typescript
test('should trigger onChange handler', async ({ page }) => {
  await page.goto('https://example.com/upload');

  // Listen for file input change
  const fileInput = page.locator('input[type="file"]');

  // Attach listener before upload
  await page.evaluate(() => {
    document.querySelector('input[type="file"]')?.addEventListener('change', () => {
      console.log('File selected!');
    });
  });

  // Upload file
  await fileInput.setInputFiles('./test-data/sample.txt');

  // Verify change detected
  const selectedFile = await fileInput.evaluate((input: HTMLInputElement) => {
    return input.files?.[0]?.name;
  });

  expect(selectedFile).toBe('sample.txt');
});
```

---

### 2. Validate File Type

```typescript
test('should reject invalid file types', async ({ page }) => {
  await page.goto('https://example.com/upload');

  // Try upload invalid file type
  await page.locator('input[type="file"][accept="image/*"]').setInputFiles('./test-data/document.pdf');

  // Click upload
  await page.locator('button:has-text("Upload")').click();

  // Verify error message
  await expect(page.locator('.error')).toBeVisible();
  await expect(page.locator('.error')).toContainText('Only image files allowed');
});
```

---

### 3. File Size Validation

```typescript
test('should reject large files', async ({ page }) => {
  await page.goto('https://example.com/upload');

  // Create large file (> 5MB)
  const largeBuffer = Buffer.alloc(6 * 1024 * 1024); // 6MB

  await page.locator('input[type="file"]').setInputFiles({
    name: 'large-file.bin',
    mimeType: 'application/octet-stream',
    buffer: largeBuffer
  });

  // Click upload
  await page.locator('button:has-text("Upload")').click();

  // Verify size error
  await expect(page.locator('.error')).toContainText('File too large');
});
```

---

## 🎯 File Upload Patterns

### Pattern 1: Drag-and-Drop Upload

```typescript
test('upload via drag and drop', async ({ page }) => {
  await page.goto('https://example.com/upload');

  // Simulate drag-drop (using dataTransfer)
  const dataTransfer = await page.evaluateHandle(() => new DataTransfer());

  await page.locator('input[type="file"]').setInputFiles('./test-data/file.pdf');

  // Alternative: Trigger drop event on dropzone
  await page.locator('.dropzone').dispatchEvent('drop', { dataTransfer });
});
```

---

### Pattern 2: Upload with Progress Bar

```typescript
test('monitor upload progress', async ({ page }) => {
  await page.goto('https://example.com/upload');

  // Upload file
  await page.locator('input[type="file"]').setInputFiles('./test-data/large-file.zip');

  // Click upload
  await page.locator('button:has-text("Upload")').click();

  // Wait for progress bar
  const progressBar = page.locator('.progress-bar');
  await expect(progressBar).toBeVisible();

  // Wait for 100% (or completion message)
  await expect(page.locator('.upload-complete')).toBeVisible({ timeout: 30000 });

  console.log('✅ Upload completed');
});
```

---

### Pattern 3: Batch File Processing

```typescript
test('upload and process multiple files', async ({ page }) => {
  await page.goto('https://example.com/batch-upload');

  const files = [
    './test-data/file1.pdf',
    './test-data/file2.pdf',
    './test-data/file3.pdf'
  ];

  // Upload all files
  await page.locator('input[type="file"][multiple]').setInputFiles(files);

  // Start processing
  await page.locator('button:has-text("Process All")').click();

  // Wait for all files processed
  for (let i = 0; i < files.length; i++) {
    const statusLocator = page.locator(`.file-status[data-index="${i}"]`);
    await expect(statusLocator).toContainText('Completed');
  }

  console.log('✅ All files processed');
});
```

---

## 📊 File Operations Flowchart

```mermaid
flowchart TD
    A[File Operation] --> B{Type?}

    B -->|Upload| C[Locate input[type=file]]
    B -->|Download| D[Wait for download event]

    C --> E{Single or Multiple?}
    E -->|Single| F[setInputFiles path]
    E -->|Multiple| G[setInputFiles array]
    F --> H[Verify upload success]
    G --> H

    D --> I[Click download trigger]
    I --> J[await downloadPromise]
    J --> K[save/verify file]
    K --> L[Cleanup]

    style H fill:#90EE90
    style L fill:#90EE90
```

---

## 🎯 Best Practices

### ✅ DO - Nên làm:

```typescript
// 1️⃣ Use relative paths from project root
await page.locator('#upload').setInputFiles('./test-data/sample.pdf');

// 2️⃣ Wait for download before clicking
const downloadPromise = page.waitForEvent('download');
await page.locator('a.download').click();
const download = await downloadPromise;

// 3️⃣ Verify file after upload
await page.locator('#upload').setInputFiles('./file.pdf');
await expect(page.locator('.file-name')).toContainText('file.pdf');

// 4️⃣ Clean up downloaded files after test
await download.saveAs('./downloads/file.pdf');
// ... verify file ...
fs.unlinkSync('./downloads/file.pdf'); // Cleanup

// 5️⃣ Use buffer for dynamic content
await page.locator('#upload').setInputFiles({
  name: 'dynamic-data.json',
  mimeType: 'application/json',
  buffer: Buffer.from(JSON.stringify(testData))
});
```

---

### ❌ DON'T - Tránh:

```typescript
// ❌ Hardcode absolute paths (not portable)
await page.locator('#upload').setInputFiles('C:\\Users\\John\\file.pdf');

// ❌ Click download without waiting
await page.locator('a.download').click();
// Missing: await page.waitForEvent('download');

// ❌ Forget to save download
const download = await page.waitForEvent('download');
// Missing: await download.saveAs(path);

// ❌ Don't verify upload success
await page.locator('#upload').setInputFiles('./file.pdf');
// Missing: verification!

// ❌ Leave downloaded files (clutter)
await download.saveAs('./file.pdf');
// Missing: cleanup after test
```

---

## 🧪 Complete Example - Upload & Download

```typescript
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('File Operations E2E', () => {

  test('should upload file and download receipt', async ({ page }) => {
    // ===== SETUP =====
    const uploadFilePath = './test-data/document.pdf';
    const downloadDir = './downloads';

    // Ensure upload file exists
    expect(fs.existsSync(uploadFilePath)).toBeTruthy();

    // ===== UPLOAD =====
    await page.goto('https://practice.expandtesting.com/upload');

    // Upload file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(uploadFilePath);

    // Click upload button
    await page.locator('button#file-submit').click();

    // Verify upload success
    await expect(page.locator('h3')).toContainText('File Uploaded!');

    const uploadedFileName = await page.locator('#uploaded-files').textContent();
    expect(uploadedFileName).toContain('document.pdf');

    console.log('✅ Upload successful');

    // ===== DOWNLOAD =====
    // Wait for download
    const downloadPromise = page.waitForEvent('download');

    // Click download link
    await page.locator('a:has-text("Download")').click();

    // Get download
    const download = await downloadPromise;

    // Verify filename
    const downloadedFileName = download.suggestedFilename();
    expect(downloadedFileName).toMatch(/.*\.pdf$/);

    // Save file
    const savePath = path.join(downloadDir, downloadedFileName);
    await download.saveAs(savePath);

    // Verify file exists and has content
    expect(fs.existsSync(savePath)).toBeTruthy();
    const stats = fs.statSync(savePath);
    expect(stats.size).toBeGreaterThan(0);

    console.log('✅ Download successful:', stats.size, 'bytes');

    // ===== CLEANUP =====
    fs.unlinkSync(savePath);
    console.log('✅ Cleanup completed');
  });

});
```

---

## 🎓 Bài Tập Tự Kiểm Tra

### Câu 1: Upload Multiple Files
```html
<input type="file" id="files" multiple>
```

**Hỏi**: Làm sao upload 3 files?

**Đáp án**:
```typescript
await page.locator('#files').setInputFiles([
  './file1.pdf',
  './file2.pdf',
  './file3.pdf'
]);
```

---

### Câu 2: Clear File Selection
**Hỏi**: Làm sao clear file đã chọn?

A. `setInputFiles('')`
B. `setInputFiles(null)`
C. `setInputFiles([])`
D. Both B and C

**Đáp án**: **D** - Both `null` and `[]` clear file selection.

---

### Câu 3: Download Waiting
```typescript
await page.locator('a.download').click();
const download = await page.waitForEvent('download');
```

**Hỏi**: Code này có đúng không? Tại sao?

**Đáp án**: **Sai** - Phải `waitForEvent()` **TRƯỚC** khi `click()`:
```typescript
const downloadPromise = page.waitForEvent('download');
await page.locator('a.download').click();
const download = await downloadPromise;
```

---

## 📚 Thuật Ngữ Quan Trọng | Key Terms

| Tiếng Anh | Tiếng Việt | Giải thích |
|-----------|------------|------------|
| **Upload** | Tải lên | Upload file từ local lên server |
| **Download** | Tải xuống | Download file từ server về local |
| **File Input** | Input file | `<input type="file">` element |
| **Buffer** | Bộ đệm | In-memory file data |
| **MIME Type** | Loại MIME | File type (text/plain, image/jpeg) |
| **Suggested Filename** | Tên file gợi ý | Filename từ server |
| **Multiple** | Nhiều file | Upload multiple files |

---

## 🔗 Tài Liệu Tham Khảo | References

- [Playwright File Upload](https://playwright.dev/docs/input#upload-files)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [File Input API](https://developer.mozilla.org/en-US/docs/Web/API/File)
- [LambdaTest File Operations](https://www.lambdatest.com/learning-hub/playwright-file-upload-download)

---

## ➡️ Tiếp Theo | Next Steps

Sau khi hoàn thành Week 2 theory docs, tiếp tục với:

👉 **Examples** - 8 file examples về locators, interactions, keyboard/mouse, file ops

👉 **Exercises** - 4 bài tập thực hành với TODO comments

---

**Chúc mừng bạn đã hoàn thành Week 2 Theory Docs! 🎉**

> **Ghi nhớ**: Always wait for download **before** clicking download link!
