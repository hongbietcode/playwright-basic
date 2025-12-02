import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * Exercise 04: File Operations Practice
 *
 * Thực hành:
 * - Upload files
 * - Download files
 * - Upload from buffer
 * - Verify files
 *
 * Run: yarn test exercises/exercise-04-file-ops.spec.ts
 */

test.describe('Exercise 04: File Operations', () => {

  test('Task 1: Upload single file', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/upload');

    // TODO 1.1: Locate file input
    // Hint: const fileInput = page.locator('input[type="file"]');

    // TODO 1.2: Set file to upload (dùng sample-upload.txt)
    // Hint: await fileInput.setInputFiles('./module-1-basics/week-2-interactions/test-data/sample-upload.txt');

    // TODO 1.3: Click upload button (#file-submit)

    // TODO 1.4: Verify success heading
    // Hint: await expect(page.locator('h3')).toContainText('File Uploaded!');

    // TODO 1.5: Verify filename displayed
    // Hint: await expect(page.locator('#uploaded-files')).toContainText('sample-upload.txt');

    console.log('✅ Task 1 completed');
  });

  test('Task 2: Upload from buffer', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/upload');

    const fileInput = page.locator('input[type="file"]');

    // TODO 2.1: Create buffer với test content
    // Hint: const buffer = Buffer.from('Test content from exercise');

    // TODO 2.2: Upload file from buffer
    // Hint: await fileInput.setInputFiles({
    //   name: 'exercise-buffer.txt',
    //   mimeType: 'text/plain',
    //   buffer: buffer
    // });

    // TODO 2.3: Submit upload

    // TODO 2.4: Verify success

    console.log('✅ Task 2 completed');
  });

  test('Task 3: Clear file selection', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/upload');

    const fileInput = page.locator('input[type="file"]');

    // TODO 3.1: Upload a file first

    // TODO 3.2: Verify file count = 1
    // Hint: const count = await fileInput.evaluate((input: HTMLInputElement) => {
    //   return input.files?.length || 0;
    // });

    // TODO 3.3: Clear file selection
    // Hint: await fileInput.setInputFiles([]);

    // TODO 3.4: Verify file count = 0

    console.log('✅ Task 3 completed');
  });

  test('Task 4: Download file', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/download');

    // TODO 4.1: Start waiting for download BEFORE clicking
    // Hint: const downloadPromise = page.waitForEvent('download');

    // TODO 4.2: Click download link
    // Hint: await page.locator('a[href*="download"]').first().click();

    // TODO 4.3: Wait for download
    // Hint: const download = await downloadPromise;

    // TODO 4.4: Get filename
    // Hint: const fileName = download.suggestedFilename();

    // TODO 4.5: Log filename

    console.log('✅ Task 4 completed');
  });

  test('Task 5: Download and verify file', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/download');

    // TODO 5.1: Setup download promise

    // TODO 5.2: Click download

    // TODO 5.3: Get download

    // TODO 5.4: Save file to ./downloads/
    // Hint: Ensure directory exists first
    // if (!fs.existsSync('./downloads')) {
    //   fs.mkdirSync('./downloads', { recursive: true });
    // }

    // TODO 5.5: Save với download.saveAs()

    // TODO 5.6: Verify file exists
    // Hint: expect(fs.existsSync(path)).toBeTruthy();

    // TODO 5.7: Get file size
    // Hint: const stats = fs.statSync(path);

    // TODO 5.8: Verify size > 0

    // TODO 5.9: Cleanup (delete file)
    // Hint: fs.unlinkSync(path);

    console.log('✅ Task 5 completed');
  });

  test('Task 6: Upload JSON data', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/upload');

    // TODO 6.1: Create JSON object
    // const data = { test: true, exercise: 4, topics: ['upload', 'download'] };

    // TODO 6.2: Convert to buffer
    // const buffer = Buffer.from(JSON.stringify(data, null, 2));

    // TODO 6.3: Upload as file

    // TODO 6.4: Submit and verify

    console.log('✅ Task 6 completed');
  });

  test('Challenge: Complete upload-download flow', async ({ page }) => {
    // TODO: Upload sample-document.json
    // TODO: Verify upload success
    // TODO: Navigate to download page
    // TODO: Download a file
    // TODO: Save and verify downloaded file
    // TODO: Check file size > 0
    // TODO: Cleanup

    // Thêm code của bạn ở đây

    console.log('🎉 Challenge completed!');
  });

});

/**
 * Self-Check:
 *
 * 1. Khi nào dùng setInputFiles vs drag-drop?
 *    → Always use setInputFiles (even for drag-drop zones)
 *
 * 2. Tại sao phải wait for download BEFORE clicking?
 *    → To catch the download event (race condition)
 *
 * 3. Upload from buffer có lợi gì?
 *    → No physical file needed, dynamic content, faster
 *
 * 4. Có cần cleanup downloaded files không?
 *    → Yes! Avoid clutter, keep tests isolated
 *
 * 🎉 Week 2 Exercises Complete!
 * Next: Compare with solutions/
 */
