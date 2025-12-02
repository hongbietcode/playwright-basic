import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * Example 08: File Upload & Download
 *
 * Demonstrates file operations:
 * - setInputFiles() - Upload files
 * - Upload single/multiple files
 * - Upload from buffer (in-memory)
 * - waitForEvent('download') - Download files
 * - Verify downloaded files
 *
 * Run: yarn test examples/08-file-upload.spec.ts
 */

test.describe('File Upload & Download', () => {

  test('should upload single file', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/upload');

    // Locate file input
    const fileInput = page.locator('input[type="file"]');

    // Upload file
    await fileInput.setInputFiles('./module-1-basics/week-2-interactions/test-data/sample-upload.txt');

    // Click upload button
    await page.locator('#file-submit').click();

    // Verify upload success
    await expect(page.locator('h3')).toContainText('File Uploaded!');

    // Verify filename displayed
    const uploadedFiles = page.locator('#uploaded-files');
    await expect(uploadedFiles).toContainText('sample-upload.txt');

    console.log('✅ Single file upload works');
  });

  test('should upload multiple files', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/upload');

    const fileInput = page.locator('input[type="file"]');

    // Upload multiple files (if supported)
    // Note: This site may not support multiple, but demonstrating the API
    await fileInput.setInputFiles([
      './module-1-basics/week-2-interactions/test-data/sample-upload.txt',
      './module-1-basics/week-2-interactions/test-data/sample-document.json'
    ]);

    // Check how many files selected
    const fileCount = await fileInput.evaluate((input: HTMLInputElement) => {
      return input.files?.length || 0;
    });

    console.log(`Files selected: ${fileCount}`);

    console.log('✅ Multiple file upload API demonstrated');
  });

  test('should upload file from buffer', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/upload');

    const fileInput = page.locator('input[type="file"]');

    // Create file from buffer (in-memory)
    await fileInput.setInputFiles({
      name: 'test-buffer.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('This is test content from buffer')
    });

    // Click upload
    await page.locator('#file-submit').click();

    // Verify
    await expect(page.locator('h3')).toContainText('File Uploaded!');
    await expect(page.locator('#uploaded-files')).toContainText('test-buffer.txt');

    console.log('✅ Upload from buffer works');
  });

  test('should upload JSON data as file', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/upload');

    const fileInput = page.locator('input[type="file"]');

    // Create JSON file
    const jsonData = {
      name: 'Test User',
      age: 30,
      skills: ['JavaScript', 'TypeScript', 'Playwright']
    };

    await fileInput.setInputFiles({
      name: 'user-data.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(jsonData, null, 2))
    });

    await page.locator('#file-submit').click();

    await expect(page.locator('h3')).toContainText('File Uploaded!');
    await expect(page.locator('#uploaded-files')).toContainText('user-data.json');

    console.log('✅ JSON file upload works');
  });

  test('should clear file selection', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/upload');

    const fileInput = page.locator('input[type="file"]');

    // Upload file
    await fileInput.setInputFiles('./module-1-basics/week-2-interactions/test-data/sample-upload.txt');

    // Verify file selected
    let fileCount = await fileInput.evaluate((input: HTMLInputElement) => {
      return input.files?.length || 0;
    });
    expect(fileCount).toBe(1);

    // Clear selection (method 1: empty array)
    await fileInput.setInputFiles([]);

    fileCount = await fileInput.evaluate((input: HTMLInputElement) => {
      return input.files?.length || 0;
    });
    expect(fileCount).toBe(0);

    // Select again
    await fileInput.setInputFiles('./module-1-basics/week-2-interactions/test-data/sample-upload.txt');

    // Clear selection (method 2: null)
    await fileInput.setInputFiles(null as any);

    fileCount = await fileInput.evaluate((input: HTMLInputElement) => {
      return input.files?.length || 0;
    });
    expect(fileCount).toBe(0);

    console.log('✅ Clear file selection works');
  });

  test('should download file', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/download');

    // Start waiting for download BEFORE clicking
    const downloadPromise = page.waitForEvent('download');

    // Click download link
    await page.locator('a[href*="download"]').first().click();

    // Wait for download
    const download = await downloadPromise;

    // Get filename
    const fileName = download.suggestedFilename();
    console.log('Downloaded file:', fileName);

    // Save to disk
    const downloadPath = path.join('./downloads', fileName);

    // Ensure downloads directory exists
    if (!fs.existsSync('./downloads')) {
      fs.mkdirSync('./downloads', { recursive: true });
    }

    await download.saveAs(downloadPath);

    // Verify file exists
    expect(fs.existsSync(downloadPath)).toBeTruthy();

    console.log('✅ File download works');

    // Cleanup
    if (fs.existsSync(downloadPath)) {
      fs.unlinkSync(downloadPath);
    }
  });

  test('should verify downloaded file size', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/download');

    const downloadPromise = page.waitForEvent('download');
    await page.locator('a[href*="download"]').first().click();
    const download = await downloadPromise;

    const fileName = download.suggestedFilename();
    const downloadPath = path.join('./downloads', fileName);

    if (!fs.existsSync('./downloads')) {
      fs.mkdirSync('./downloads', { recursive: true });
    }

    await download.saveAs(downloadPath);

    // Check file size
    const stats = fs.statSync(downloadPath);
    console.log('File size:', stats.size, 'bytes');

    expect(stats.size).toBeGreaterThan(0);

    console.log('✅ Downloaded file size verified');

    // Cleanup
    if (fs.existsSync(downloadPath)) {
      fs.unlinkSync(downloadPath);
    }
  });

  test('should get download URL', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/download');

    const downloadPromise = page.waitForEvent('download');
    await page.locator('a[href*="download"]').first().click();
    const download = await downloadPromise;

    // Get download URL
    const url = download.url();
    console.log('Download URL:', url);

    expect(url).toBeTruthy();
    expect(url).toContain('http');

    console.log('✅ Download URL retrieved');
  });

  test('should handle upload with drag-drop simulation', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/upload');

    // Even for drag-drop zones, use setInputFiles on the file input
    const fileInput = page.locator('input[type="file"]');

    await fileInput.setInputFiles('./module-1-basics/week-2-interactions/test-data/sample-upload.txt');

    await page.locator('#file-submit').click();

    await expect(page.locator('h3')).toContainText('File Uploaded!');

    console.log('✅ Upload (drag-drop zone) works with setInputFiles');
  });

  test('should verify file input accepts attribute', async ({ page }) => {
    // Create test page with accept attribute
    await page.goto(`data:text/html,<!DOCTYPE html>
      <html>
        <body>
          <input type="file" id="imageOnly" accept="image/*">
          <input type="file" id="pdfOnly" accept=".pdf">
          <input type="file" id="multiple" accept=".jpg,.png,.gif" multiple>
        </body>
      </html>
    `);

    // Get accept attribute
    const imageInput = page.locator('#imageOnly');
    const accept = await imageInput.getAttribute('accept');

    console.log('Accept attribute:', accept);
    expect(accept).toBe('image/*');

    // Note: Playwright bypasses file type validation
    // The accept attribute is for UI/UX, browser validation
    // Playwright can upload any file type

    console.log('✅ Accept attribute verified');
  });

  test('should demonstrate complete upload-download flow', async ({ page }) => {
    console.log('\n=== Upload-Download Flow ===\n');

    // UPLOAD
    await page.goto('https://practice.expandtesting.com/upload');

    const fileInput = page.locator('input[type="file"]');
    const testFilePath = './module-1-basics/week-2-interactions/test-data/sample-upload.txt';

    await fileInput.setInputFiles(testFilePath);
    await page.locator('#file-submit').click();

    await expect(page.locator('h3')).toContainText('File Uploaded!');
    console.log('1. Upload successful');

    // DOWNLOAD
    await page.goto('https://practice.expandtesting.com/download');

    const downloadPromise = page.waitForEvent('download');
    await page.locator('a[href*="download"]').first().click();
    const download = await downloadPromise;

    const fileName = download.suggestedFilename();
    const downloadPath = path.join('./downloads', fileName);

    if (!fs.existsSync('./downloads')) {
      fs.mkdirSync('./downloads', { recursive: true });
    }

    await download.saveAs(downloadPath);
    console.log('2. Download successful');

    // VERIFY
    expect(fs.existsSync(downloadPath)).toBeTruthy();
    const stats = fs.statSync(downloadPath);
    expect(stats.size).toBeGreaterThan(0);
    console.log('3. File verified:', stats.size, 'bytes\n');

    // Cleanup
    if (fs.existsSync(downloadPath)) {
      fs.unlinkSync(downloadPath);
    }

    console.log('✅ Complete flow works');
  });

  test('should demonstrate all file operations', async ({ page }) => {
    console.log('\n=== File Operations Summary ===\n');

    console.log('Upload Methods:');
    console.log('- setInputFiles(path) - Upload from file path');
    console.log('- setInputFiles([paths]) - Upload multiple files');
    console.log('- setInputFiles({ name, mimeType, buffer }) - Upload from memory');
    console.log('- setInputFiles([]) or setInputFiles(null) - Clear selection');

    console.log('\nDownload Methods:');
    console.log('- page.waitForEvent("download") - Wait for download');
    console.log('- download.suggestedFilename() - Get filename');
    console.log('- download.url() - Get download URL');
    console.log('- download.saveAs(path) - Save to disk');

    console.log('\nBest Practices:');
    console.log('- Wait for download BEFORE clicking download link');
    console.log('- Use relative paths from project root');
    console.log('- Verify file exists and has content after download');
    console.log('- Clean up downloaded files after test\n');

    console.log('✅ All operations documented');
  });

  test('should handle file upload error gracefully', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/upload');

    // Try to upload without selecting file
    await page.locator('#file-submit').click();

    // Site may show validation error or just do nothing
    // This demonstrates error handling

    console.log('✅ Error handling demonstrated');
  });

});

/**
 * Key Takeaways:
 *
 * 1. Upload Single File:
 *    - fileInput.setInputFiles('./path/to/file.txt')
 *    - Use relative paths from project root
 *    - Works with any file type
 *
 * 2. Upload Multiple Files:
 *    - fileInput.setInputFiles([path1, path2, path3])
 *    - Requires multiple attribute on input
 *
 * 3. Upload from Buffer:
 *    - setInputFiles({ name, mimeType, buffer })
 *    - Good for dynamic/generated content
 *    - No physical file needed
 *
 * 4. Clear File Selection:
 *    - setInputFiles([])
 *    - setInputFiles(null)
 *
 * 5. Download Files:
 *    - const downloadPromise = page.waitForEvent('download')
 *    - BEFORE clicking download link!
 *    - await download.saveAs(path)
 *
 * 6. Download Verification:
 *    - download.suggestedFilename() - Get filename
 *    - download.url() - Get download URL
 *    - fs.statSync(path).size - Verify size
 *    - fs.existsSync(path) - Verify exists
 *
 * 7. Best Practices:
 *    - Use relative paths (portable)
 *    - Wait for download before click
 *    - Verify downloaded files
 *    - Clean up after tests
 *    - Use buffer for dynamic content
 *
 * 8. Common Patterns:
 *    - Upload: setInputFiles + click submit + verify
 *    - Download: waitForEvent + click + saveAs + verify
 *    - Dynamic upload: Create buffer + setInputFiles
 *
 * 9. File Structure:
 *    - test-data/ - Store test files
 *    - downloads/ - Temporary download location
 *    - Cleanup downloads after tests
 *
 * 10. Error Handling:
 *     - Check file exists before upload
 *     - Verify upload success message
 *     - Handle download failures
 *     - Clean up even on failure
 *
 * Week 2 Examples Complete! 🎉
 * Next: Exercises with TODO comments
 */
