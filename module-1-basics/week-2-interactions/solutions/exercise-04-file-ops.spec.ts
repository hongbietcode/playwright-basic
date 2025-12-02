import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * Solution 04: File Operations Practice
 */

test.describe('Solution 04: File Operations', () => {

  test('Task 1: Upload single file', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/upload');

    // ✅ Solution 1.1: Locate file input
    const fileInput = page.locator('input[type="file"]');

    // ✅ Solution 1.2: Set file
    await fileInput.setInputFiles('./module-1-basics/week-2-interactions/test-data/sample-upload.txt');

    // ✅ Solution 1.3: Click upload
    await page.locator('#file-submit').click();

    // ✅ Solution 1.4: Verify success
    await expect(page.locator('h3')).toContainText('File Uploaded!');

    // ✅ Solution 1.5: Verify filename
    await expect(page.locator('#uploaded-files')).toContainText('sample-upload.txt');

    console.log('✅ Task 1 completed');
  });

  test('Task 2: Upload from buffer', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/upload');

    const fileInput = page.locator('input[type="file"]');

    // ✅ Solution 2.1: Create buffer
    const buffer = Buffer.from('Test content from exercise');

    // ✅ Solution 2.2: Upload from buffer
    await fileInput.setInputFiles({
      name: 'exercise-buffer.txt',
      mimeType: 'text/plain',
      buffer: buffer
    });

    // ✅ Solution 2.3: Submit
    await page.locator('#file-submit').click();

    // ✅ Solution 2.4: Verify
    await expect(page.locator('h3')).toContainText('File Uploaded!');
    await expect(page.locator('#uploaded-files')).toContainText('exercise-buffer.txt');

    console.log('✅ Task 2 completed');
  });

  test('Task 3: Clear file selection', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/upload');

    const fileInput = page.locator('input[type="file"]');

    // ✅ Solution 3.1: Upload file
    await fileInput.setInputFiles('./module-1-basics/week-2-interactions/test-data/sample-upload.txt');

    // ✅ Solution 3.2: Verify count = 1
    let count = await fileInput.evaluate((input: HTMLInputElement) => {
      return input.files?.length || 0;
    });
    expect(count).toBe(1);

    // ✅ Solution 3.3: Clear
    await fileInput.setInputFiles([]);

    // ✅ Solution 3.4: Verify count = 0
    count = await fileInput.evaluate((input: HTMLInputElement) => {
      return input.files?.length || 0;
    });
    expect(count).toBe(0);

    console.log('✅ Task 3 completed');
  });

  test('Task 4: Download file', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/download');

    // ✅ Solution 4.1: Wait for download
    const downloadPromise = page.waitForEvent('download');

    // ✅ Solution 4.2: Click download
    await page.locator('a[href*="download"]').first().click();

    // ✅ Solution 4.3: Get download
    const download = await downloadPromise;

    // ✅ Solution 4.4: Get filename
    const fileName = download.suggestedFilename();

    // ✅ Solution 4.5: Log
    console.log('Downloaded:', fileName);

    console.log('✅ Task 4 completed');
  });

  test('Task 5: Download and verify file', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/download');

    // ✅ Solution 5.1-5.3: Download setup
    const downloadPromise = page.waitForEvent('download');
    await page.locator('a[href*="download"]').first().click();
    const download = await downloadPromise;

    // ✅ Solution 5.4: Ensure directory exists
    if (!fs.existsSync('./downloads')) {
      fs.mkdirSync('./downloads', { recursive: true });
    }

    // ✅ Solution 5.5: Save file
    const fileName = download.suggestedFilename();
    const downloadPath = path.join('./downloads', fileName);
    await download.saveAs(downloadPath);

    // ✅ Solution 5.6: Verify exists
    expect(fs.existsSync(downloadPath)).toBeTruthy();

    // ✅ Solution 5.7: Get size
    const stats = fs.statSync(downloadPath);

    // ✅ Solution 5.8: Verify size > 0
    expect(stats.size).toBeGreaterThan(0);
    console.log('File size:', stats.size, 'bytes');

    // ✅ Solution 5.9: Cleanup
    fs.unlinkSync(downloadPath);

    console.log('✅ Task 5 completed');
  });

  test('Task 6: Upload JSON data', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/upload');

    // ✅ Solution 6.1: Create JSON
    const data = { test: true, exercise: 4, topics: ['upload', 'download'] };

    // ✅ Solution 6.2: Convert to buffer
    const buffer = Buffer.from(JSON.stringify(data, null, 2));

    // ✅ Solution 6.3: Upload
    await page.locator('input[type="file"]').setInputFiles({
      name: 'exercise-data.json',
      mimeType: 'application/json',
      buffer: buffer
    });

    // ✅ Solution 6.4: Submit and verify
    await page.locator('#file-submit').click();
    await expect(page.locator('h3')).toContainText('File Uploaded!');

    console.log('✅ Task 6 completed');
  });

  test('Challenge: Complete upload-download flow', async ({ page }) => {
    console.log('\n=== Upload-Download Flow ===\n');

    // ✅ UPLOAD
    await page.goto('https://practice.expandtesting.com/upload');
    await page.locator('input[type="file"]').setInputFiles(
      './module-1-basics/week-2-interactions/test-data/sample-document.json'
    );
    await page.locator('#file-submit').click();
    await expect(page.locator('h3')).toContainText('File Uploaded!');
    console.log('1. Upload successful');

    // ✅ DOWNLOAD
    await page.goto('https://practice.expandtesting.com/download');
    const downloadPromise = page.waitForEvent('download');
    await page.locator('a[href*="download"]').first().click();
    const download = await downloadPromise;
    console.log('2. Download initiated');

    // ✅ SAVE
    if (!fs.existsSync('./downloads')) {
      fs.mkdirSync('./downloads', { recursive: true });
    }
    const fileName = download.suggestedFilename();
    const downloadPath = path.join('./downloads', fileName);
    await download.saveAs(downloadPath);
    console.log('3. File saved');

    // ✅ VERIFY
    expect(fs.existsSync(downloadPath)).toBeTruthy();
    const stats = fs.statSync(downloadPath);
    expect(stats.size).toBeGreaterThan(0);
    console.log('4. File verified:', stats.size, 'bytes');

    // ✅ CLEANUP
    fs.unlinkSync(downloadPath);
    console.log('5. Cleanup complete\n');

    console.log('🎉 Challenge completed!');
  });

});
