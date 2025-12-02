# Test Data Files

This folder contains sample files for testing file upload/download functionality in Week 2.

## Files Included:

### 1. sample-upload.txt
- **Type**: Plain text file
- **Size**: ~350 bytes
- **Use**: Test single file upload, text validation

### 2. sample-document.json
- **Type**: JSON file
- **Size**: ~500 bytes
- **Use**: Test JSON file upload, content parsing

### 3. README.md (this file)
- **Type**: Markdown documentation
- **Use**: Reference and documentation

## Note on Image Files:

For image upload testing (sample-image.png, sample-document.pdf), you have two options:

### Option A: Create manually
Download or create your own test images/PDFs and place them here:
- `sample-image.png` - Any PNG image (recommended: 100x100px, <50KB)
- `sample-document.pdf` - Any PDF file (recommended: 1-2 pages, <500KB)

### Option B: Generate programmatically
Use Node.js to generate test files in your tests:

```typescript
import fs from 'fs';
import path from 'path';

// Generate dummy image buffer
const imageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
fs.writeFileSync(path.join(__dirname, 'sample-image.png'), imageBuffer);

// Generate dummy PDF (minimal PDF structure)
const pdfBuffer = Buffer.from('%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Count 0>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF');
fs.writeFileSync(path.join(__dirname, 'sample-document.pdf'), pdfBuffer);
```

## Usage in Tests:

```typescript
// Upload text file
await page.locator('input[type="file"]').setInputFiles('./test-data/sample-upload.txt');

// Upload JSON
await page.locator('#upload').setInputFiles('./test-data/sample-document.json');

// Upload multiple files
await page.locator('#files').setInputFiles([
  './test-data/sample-upload.txt',
  './test-data/sample-document.json'
]);
```

## Best Practices:

1. ✅ Use relative paths from project root
2. ✅ Keep test files small (<1MB)
3. ✅ Use meaningful file names
4. ✅ Document file purpose
5. ✅ Clean up downloaded files after tests
