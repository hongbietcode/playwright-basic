import { test, expect } from '@playwright/test';

/**
 * Example 06: Explicit Waits
 *
 * Demonstrates when and how to use explicit waits:
 * - waitForSelector() for elements
 * - waitForLoadState() for page load
 * - waitForURL() for navigation
 * - waitForFunction() for custom conditions
 * - waitForEvent() for events
 * - waitForResponse() for network
 *
 * Run: yarn test examples/06-explicit-waits.spec.ts
 */

test.describe('Explicit Waits Examples', () => {

  test('should use waitForSelector for element', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.click('#start button');

    // Wait for element to appear
    await page.waitForSelector('#finish', {
      state: 'visible',
      timeout: 10000
    });

    await expect(page.locator('#finish')).toBeVisible();

    console.log('✅ waitForSelector works');
  });

  test('should use different selector states', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    // Initially hidden (but attached to DOM)
    await page.waitForSelector('#finish', { state: 'attached' });
    console.log('Element is attached');

    await page.click('#start button');

    // Wait for visible
    await page.waitForSelector('#finish', { state: 'visible' });
    console.log('Element is visible');

    console.log('✅ Different selector states work');
  });

  test('should wait for element to disappear', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    // Loading spinner is initially visible
    await page.waitForSelector('#loading', { state: 'visible' });

    await page.click('#start button');

    // Wait for loading spinner to disappear
    await page.waitForSelector('#loading', { state: 'hidden' });

    // Or use detached state
    // await page.waitForSelector('#loading', { state: 'detached' });

    console.log('✅ Wait for disappearance works');
  });

  test('should use waitForLoadState', async ({ page }) => {
    // Navigate to page
    await page.goto('https://practice.expandtesting.com');

    // Wait for different load states
    await page.waitForLoadState('load');
    console.log('✓ Page loaded (load event fired)');

    await page.waitForLoadState('domcontentloaded');
    console.log('✓ DOM content loaded');

    await page.waitForLoadState('networkidle');
    console.log('✓ Network idle (no requests for 500ms)');

    console.log('✅ waitForLoadState works');
  });

  test('should use waitForURL', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Click login link
    await page.click('a:has-text("Login")');

    // Wait for URL to change
    await page.waitForURL('**/login');

    // Or with regex
    await page.waitForURL(/.*login$/);

    console.log('Current URL:', page.url());
    expect(page.url()).toContain('login');

    console.log('✅ waitForURL works');
  });

  test('should use waitForFunction for custom condition', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Wait for custom JavaScript condition
    await page.waitForFunction(() => {
      return document.querySelectorAll('a').length > 10;
    });

    const linkCount = await page.locator('a').count();
    console.log(`Found ${linkCount} links`);
    expect(linkCount).toBeGreaterThan(10);

    console.log('✅ waitForFunction works');
  });

  test('should wait for element count', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // Wait for at least 2 checkboxes
    await page.waitForFunction(() => {
      return document.querySelectorAll('input[type="checkbox"]').length >= 2;
    });

    const count = await page.locator('input[type="checkbox"]').count();
    expect(count).toBeGreaterThanOrEqual(2);

    console.log('✅ Wait for element count works');
  });

  test('should wait for text to change', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.click('#start button');

    // Wait for specific text to appear
    await page.waitForFunction(() => {
      const element = document.querySelector('#finish h4');
      return element?.textContent === 'Hello World!';
    });

    await expect(page.locator('#finish h4')).toHaveText('Hello World!');

    console.log('✅ Wait for text change works');
  });

  test('should use waitForFunction with arguments', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Pass arguments to browser function
    const minLinks = 5;
    await page.waitForFunction((min) => {
      return document.querySelectorAll('a').length >= min;
    }, minLinks);

    console.log('✅ waitForFunction with arguments works');
  });

  test('should wait for network response', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Start waiting for response BEFORE triggering request
    const responsePromise = page.waitForResponse('**/login');

    // Click to navigate (triggers request)
    await page.click('a:has-text("Login")');

    // Wait for response
    const response = await responsePromise;
    console.log('Response status:', response.status());
    expect(response.ok()).toBeTruthy();

    console.log('✅ waitForResponse works');
  });

  test('should wait for specific API response', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Wait for form submission response
    const responsePromise = page.waitForResponse(
      response => response.url().includes('authenticate') && response.status() === 200
    );

    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    const response = await responsePromise;
    console.log('API response received:', response.status());

    console.log('✅ Conditional waitForResponse works');
  });

  test('should use waitForEvent', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    // Wait for popup event
    const popupPromise = page.waitForEvent('popup');

    // Trigger action that opens popup (if available)
    // await page.click('button:has-text("Open Popup")');

    // For demo, we'll wait with timeout
    // const popup = await popupPromise;

    console.log('✅ waitForEvent pattern demonstrated');
  });

  test('should wait for console message', async ({ page }) => {
    // Listen for console message
    const messagePromise = page.waitForEvent('console', msg => {
      return msg.type() === 'log' && msg.text().includes('Hello');
    });

    await page.goto('https://practice.expandtesting.com');

    // Trigger console log
    await page.evaluate(() => {
      console.log('Hello from browser');
    });

    const message = await messagePromise;
    console.log('Caught console message:', message.text());

    console.log('✅ Wait for console works');
  });

  test('should combine multiple waits', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Wait for form to be ready
    await page.waitForSelector('#username', { state: 'visible' });

    // Fill form
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // Wait for response and URL change
    const [response] = await Promise.all([
      page.waitForResponse('**/authenticate'),
      page.click('button[type="submit"]')
    ]);

    console.log('Response status:', response.status());

    // Wait for navigation
    await page.waitForURL('**/secure');

    console.log('✅ Combined waits work');
  });

  test('should use timeout option', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.click('#start button');

    // Custom timeout (10 seconds)
    await page.waitForSelector('#finish', {
      state: 'visible',
      timeout: 10000
    });

    console.log('✅ Custom timeout works');
  });

  test('should handle wait timeout gracefully', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');

    try {
      // This will timeout (element doesn't exist)
      await page.waitForSelector('#non-existent-element', {
        timeout: 2000
      });
    } catch (error) {
      console.log('⚠️ Timeout occurred as expected');
      expect(error).toBeDefined();
    }

    console.log('✅ Timeout handling works');
  });

  test('should wait for file download', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');

    // Start waiting for download BEFORE clicking
    const downloadPromise = page.waitForEvent('download');

    // Click first download link
    const links = page.locator('a');
    const firstLink = links.first();
    await firstLink.click();

    // Wait for download to start
    const download = await downloadPromise;
    console.log('Download started:', await download.suggestedFilename());

    // Save download
    await download.saveAs('test-results/downloads/' + await download.suggestedFilename());

    console.log('✅ File download wait works');
  });

  test('should demonstrate when to use explicit vs auto-wait', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    // ✅ CASE 1: Use auto-wait (most common)
    // Actions like click() already auto-wait
    await page.click('#start button');

    // Assertions already auto-wait
    await expect(page.locator('#finish')).toBeVisible();

    console.log('✅ Auto-wait is sufficient for most cases');

    // ✅ CASE 2: Use explicit wait (when needed)
    // - Custom conditions
    // - Network responses
    // - Complex async logic
    // - Events
    // See previous examples for these cases

    console.log('✅ Know when to use explicit waits');
  });

});

/**
 * Key Takeaways:
 *
 * 1. waitForSelector():
 *    - Wait for element to be in specific state
 *    - States: 'attached', 'detached', 'visible', 'hidden'
 *    - Use when: Need explicit control over element state
 *
 * 2. waitForLoadState():
 *    - Wait for page load events
 *    - States: 'load', 'domcontentloaded', 'networkidle'
 *    - Use when: Need to ensure page fully loaded
 *
 * 3. waitForURL():
 *    - Wait for URL to match pattern
 *    - Supports string, regex
 *    - Use when: Waiting for navigation
 *
 * 4. waitForFunction():
 *    - Wait for custom JavaScript condition
 *    - Most flexible wait method
 *    - Use when: Complex conditions not covered by other waits
 *
 * 5. waitForResponse():
 *    - Wait for network response
 *    - Can filter by URL or condition
 *    - Use when: Need to verify API calls
 *
 * 6. waitForEvent():
 *    - Wait for page events
 *    - Events: 'popup', 'console', 'download', 'request', etc.
 *    - Use when: Waiting for specific browser events
 *
 * 7. When to Use Explicit Waits:
 *    ✅ Custom conditions
 *    ✅ Network requests/responses
 *    ✅ File downloads
 *    ✅ Popup windows
 *    ✅ Complex async logic
 *    ❌ Simple element visibility (use auto-wait)
 *    ❌ Standard interactions (use auto-wait)
 *
 * 8. Best Practices:
 *    - Trust auto-wait for 95% of cases
 *    - Use explicit waits for custom conditions
 *    - Always set reasonable timeouts
 *    - Start waiting BEFORE triggering action (responses, events)
 *    - Handle timeouts gracefully with try-catch
 *
 * 9. Common Patterns:
 *    - Promise.all() for parallel waits
 *    - waitForResponse before triggering request
 *    - waitForEvent before triggering event
 *    - Custom timeout for slow operations
 *
 * Next: 07-test-hooks.spec.ts
 */
