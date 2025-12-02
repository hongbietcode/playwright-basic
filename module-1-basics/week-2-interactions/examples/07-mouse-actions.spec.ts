import { test, expect } from '@playwright/test';

/**
 * Example 07: Mouse Actions
 *
 * Demonstrates mouse interactions:
 * - hover() - Mouse hover
 * - dragTo() - Drag and drop
 * - mouse.move() - Move mouse to coordinates
 * - mouse.down/up() - Mouse button press/release
 * - mouse.wheel() - Scroll with mouse wheel
 *
 * Run: yarn test examples/07-mouse-actions.spec.ts
 */

test.describe('Mouse Actions', () => {

  test('should hover over element', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/hovers');

    // Hover over first user figure
    const firstFigure = page.locator('.figure').first();
    await firstFigure.hover();

    // Verify caption becomes visible
    const caption = firstFigure.locator('.figcaption');
    await expect(caption).toBeVisible();

    // Get caption text
    const captionText = await caption.textContent();
    console.log('Caption text:', captionText);

    console.log('✅ hover() works');
  });

  test('should hover to show tooltip', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/hovers');

    // Hover over each figure
    const figures = page.locator('.figure');
    const count = await figures.count();

    for (let i = 0; i < count; i++) {
      const figure = figures.nth(i);
      await figure.hover();

      // Verify caption visible
      const caption = figure.locator('.figcaption');
      await expect(caption).toBeVisible();

      console.log(`Figure ${i + 1}: Caption visible`);
    }

    console.log('✅ Multiple hover interactions work');
  });

  test('should drag and drop', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/drag-and-drop');

    // Get initial positions
    const columnA = page.locator('#column-a');
    const columnB = page.locator('#column-b');

    const initialAText = await columnA.locator('header').textContent();
    const initialBText = await columnB.locator('header').textContent();

    console.log('Before drag - A:', initialAText, 'B:', initialBText);

    // Drag column A to column B
    await columnA.dragTo(columnB);

    // Verify swapped
    const afterAText = await columnA.locator('header').textContent();
    const afterBText = await columnB.locator('header').textContent();

    console.log('After drag - A:', afterAText, 'B:', afterBText);

    expect(afterAText).toBe(initialBText);
    expect(afterBText).toBe(initialAText);

    console.log('✅ dragTo() works');
  });

  test('should drag with specific position', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/drag-and-drop');

    const columnA = page.locator('#column-a');
    const columnB = page.locator('#column-b');

    // Drag from specific source position to specific target position
    await columnA.dragTo(columnB, {
      sourcePosition: { x: 50, y: 10 },
      targetPosition: { x: 50, y: 10 }
    });

    console.log('✅ Drag with position options works');
  });

  test('should use low-level mouse actions for drag', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/drag-and-drop');

    const source = page.locator('#column-a');
    const target = page.locator('#column-b');

    // Get bounding boxes
    const sourceBox = await source.boundingBox();
    const targetBox = await target.boundingBox();

    if (sourceBox && targetBox) {
      // Calculate centers
      const sourceCenterX = sourceBox.x + sourceBox.width / 2;
      const sourceCenterY = sourceBox.y + sourceBox.height / 2;
      const targetCenterX = targetBox.x + targetBox.width / 2;
      const targetCenterY = targetBox.y + targetBox.height / 2;

      // Perform drag with low-level mouse
      await page.mouse.move(sourceCenterX, sourceCenterY);
      await page.mouse.down();
      await page.mouse.move(targetCenterX, targetCenterY);
      await page.mouse.up();

      console.log('✅ Low-level mouse drag works');
    }
  });

  test('should move mouse to specific coordinates', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Move mouse to specific position
    await page.mouse.move(100, 200);
    console.log('Mouse moved to (100, 200)');

    // Move to another position
    await page.mouse.move(300, 400);
    console.log('Mouse moved to (300, 400)');

    console.log('✅ mouse.move() works');
  });

  test('should click at specific coordinates', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/hovers');

    // Get first figure position
    const figure = page.locator('.figure').first();
    const box = await figure.boundingBox();

    if (box) {
      // Click at center
      const centerX = box.x + box.width / 2;
      const centerY = box.y + box.height / 2;

      await page.mouse.click(centerX, centerY);

      console.log(`Clicked at (${centerX}, ${centerY})`);
      console.log('✅ mouse.click() at coordinates works');
    }
  });

  test('should scroll with mouse wheel', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Scroll down 300 pixels
    await page.mouse.wheel(0, 300);
    console.log('Scrolled down 300px');

    await page.waitForTimeout(500);

    // Scroll up 150 pixels
    await page.mouse.wheel(0, -150);
    console.log('Scrolled up 150px');

    console.log('✅ mouse.wheel() works');
  });

  test('should perform double click with mouse', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/hovers');

    const figure = page.locator('.figure').first();
    const box = await figure.boundingBox();

    if (box) {
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;

      // Double click
      await page.mouse.dblclick(x, y);

      console.log('✅ mouse.dblclick() works');
    }
  });

  test('should right click with mouse', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Right click at position
    await page.mouse.click(200, 200, { button: 'right' });

    console.log('✅ Right click with mouse works');
  });

  test('should hover then click pattern', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/hovers');

    const firstFigure = page.locator('.figure').first();

    // Hover to reveal content
    await firstFigure.hover();

    // Wait for caption to appear
    const viewProfileLink = firstFigure.locator('a:has-text("View profile")');
    await expect(viewProfileLink).toBeVisible();

    // Click revealed link
    await viewProfileLink.click();

    console.log('✅ Hover then click pattern works');
  });

  test('should handle mouse down and up separately', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Press mouse button
    await page.mouse.down();
    console.log('Mouse button down');

    await page.waitForTimeout(100);

    // Release mouse button
    await page.mouse.up();
    console.log('Mouse button up');

    console.log('✅ mouse.down() and mouse.up() work');
  });

  test('should simulate drawing on canvas', async ({ page }) => {
    // Create simple canvas page
    await page.goto(`data:text/html,<!DOCTYPE html>
      <html>
        <head>
          <style>
            canvas { border: 1px solid black; }
          </style>
        </head>
        <body>
          <canvas id="canvas" width="400" height="300"></canvas>
          <script>
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            let drawing = false;
            let lastX = 0;
            let lastY = 0;

            canvas.addEventListener('mousedown', (e) => {
              drawing = true;
              lastX = e.offsetX;
              lastY = e.offsetY;
            });

            canvas.addEventListener('mousemove', (e) => {
              if (drawing) {
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
                lastX = e.offsetX;
                lastY = e.offsetY;
              }
            });

            canvas.addEventListener('mouseup', () => {
              drawing = false;
            });
          </script>
        </body>
      </html>
    `);

    const canvas = page.locator('#canvas');
    const box = await canvas.boundingBox();

    if (box) {
      // Draw a square
      const startX = box.x + 50;
      const startY = box.y + 50;

      await page.mouse.move(startX, startY);
      await page.mouse.down();

      // Draw line to right
      await page.mouse.move(startX + 100, startY);

      // Draw line down
      await page.mouse.move(startX + 100, startY + 100);

      // Draw line to left
      await page.mouse.move(startX, startY + 100);

      // Draw line up (close square)
      await page.mouse.move(startX, startY);

      await page.mouse.up();

      console.log('✅ Drawing on canvas works');
    }
  });

  test('should demonstrate hover vs click difference', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/hovers');

    const figure = page.locator('.figure').first();

    console.log('\n=== Hover vs Click ===\n');

    // Hover - Just moves mouse over element
    await figure.hover();
    console.log('1. Hover - Mouse over element, caption visible');

    const caption = figure.locator('.figcaption');
    await expect(caption).toBeVisible();

    // Move away
    await page.mouse.move(0, 0);
    await expect(caption).toBeHidden();
    console.log('2. Moved away - Caption hidden');

    // Click - Actually clicks the element
    await figure.click();
    console.log('3. Click - Element clicked\n');

    console.log('✅ Hover vs Click difference demonstrated');
  });

  test('should demonstrate all mouse methods', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    console.log('\n=== Mouse Methods Summary ===\n');

    // High-level methods
    console.log('High-level (recommended):');
    console.log('- locator.hover() - Hover over element');
    console.log('- locator.click() - Click element');
    console.log('- locator.dblclick() - Double click');
    console.log('- source.dragTo(target) - Drag and drop');

    // Low-level methods
    console.log('\nLow-level (advanced):');
    console.log('- mouse.move(x, y) - Move to coordinates');
    console.log('- mouse.down() - Press button');
    console.log('- mouse.up() - Release button');
    console.log('- mouse.click(x, y) - Click at coords');
    console.log('- mouse.dblclick(x, y) - Double click');
    console.log('- mouse.wheel(deltaX, deltaY) - Scroll\n');

    console.log('✅ All methods documented');
  });

});

/**
 * Key Takeaways:
 *
 * 1. High-Level Mouse Actions (Recommended):
 *    - locator.hover() - Hover over element
 *    - locator.click() - Click element
 *    - locator.dblclick() - Double click
 *    - source.dragTo(target) - Drag and drop
 *
 * 2. Low-Level Mouse Actions:
 *    - mouse.move(x, y) - Move to coordinates
 *    - mouse.down() - Press mouse button
 *    - mouse.up() - Release mouse button
 *    - mouse.click(x, y) - Click at position
 *    - mouse.dblclick(x, y) - Double click at position
 *    - mouse.wheel(deltaX, deltaY) - Scroll
 *
 * 3. Drag and Drop:
 *    - High-level: source.dragTo(target)
 *    - Low-level: move + down + move + up
 *    - Options: sourcePosition, targetPosition
 *
 * 4. Hover Patterns:
 *    - Hover to show tooltip/dropdown
 *    - Hover then click revealed element
 *    - Hover multiple elements in sequence
 *
 * 5. When to Use Low-Level:
 *    - Custom drawing/painting apps
 *    - Game testing
 *    - Canvas interactions
 *    - Complex mouse gestures
 *
 * 6. Best Practices:
 *    - Prefer high-level methods (hover, click, dragTo)
 *    - Use low-level only when necessary
 *    - Calculate element centers for precision
 *    - Trust auto-wait for high-level methods
 *
 * 7. Common Patterns:
 *    - Hover + click: hover() then click()
 *    - Drag drop: dragTo()
 *    - Tooltip: hover() then expect visible
 *    - Drawing: move + down + moves + up
 *
 * Next: 08-file-upload.spec.ts
 */
