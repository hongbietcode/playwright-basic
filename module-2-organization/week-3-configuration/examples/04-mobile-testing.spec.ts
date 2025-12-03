/**
 * Example: Mobile and Device Emulation
 * Demonstrates testing on mobile devices and tablets
 */

import { test, expect, devices } from '@playwright/test';

test.describe('Mobile Device Testing', () => {
  test('test on iPhone 13', async ({ page }) => {
    test.use({ ...devices['iPhone 13'] });

    console.log('📱 Testing on iPhone 13');

    await page.goto('https://practice.expandtesting.com/');

    // Get viewport size
    const viewport = page.viewportSize();
    console.log(`Viewport: ${viewport?.width}x${viewport?.height}`);

    await expect(page.locator('h1')).toBeVisible();
  });

  test('test on Android Pixel 5', async ({ page }) => {
    test.use({ ...devices['Pixel 5'] });

    console.log('📱 Testing on Pixel 5');

    await page.goto('https://practice.expandtesting.com/');
    await expect(page).toHaveTitle(/Test Automation/);
  });

  test('test on iPad Pro', async ({ page }) => {
    test.use({ ...devices['iPad Pro'] });

    console.log('📱 Testing on iPad Pro');

    await page.goto('https://practice.expandtesting.com/');

    const viewport = page.viewportSize();
    console.log(`Tablet viewport: ${viewport?.width}x${viewport?.height}`);
  });
});

test.describe('Touch Interactions', () => {
  test.use({ ...devices['iPhone 13'] });

  test('tap vs click', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/');

    // On mobile, use tap() for touch events
    await page.tap('a:has-text("Login")');

    await expect(page).toHaveURL(/login/);
    console.log('✅ Tap navigation successful');
  });

  test('mobile form interactions', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Fill form on mobile
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    // Tap submit button
    await page.tap('button[type="submit"]');

    await expect(page).toHaveURL(/secure/);
    console.log('✅ Mobile login successful');
  });

  test('scrolling on mobile', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/');

    // Scroll down
    await page.mouse.wheel(0, 500);

    // Or scroll to element
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();

    await expect(footer).toBeInViewport();
    console.log('✅ Mobile scrolling works');
  });
});

test.describe('Responsive Design Testing', () => {
  const viewports = [
    { name: 'Mobile Small', width: 320, height: 568 },
    { name: 'Mobile Medium', width: 375, height: 667 },
    { name: 'Mobile Large', width: 414, height: 896 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 },
  ];

  for (const viewport of viewports) {
    test(`responsive on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      console.log(`📐 Testing ${viewport.name}: ${viewport.width}x${viewport.height}`);

      await page.goto('https://practice.expandtesting.com/');

      // Take screenshot for each size
      await page.screenshot({
        path: `screenshots/responsive-${viewport.name.replace(' ', '-')}.png`,
        fullPage: true,
      });

      await expect(page.locator('h1')).toBeVisible();
      console.log(`✅ ${viewport.name} test passed`);
    });
  }
});

test.describe('Orientation Testing', () => {
  test('portrait mode', async ({ page }) => {
    // iPhone 13 portrait
    await page.setViewportSize({ width: 390, height: 844 });

    console.log('📱 Portrait mode: 390x844');

    await page.goto('https://practice.expandtesting.com/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('landscape mode', async ({ page }) => {
    // iPhone 13 landscape
    await page.setViewportSize({ width: 844, height: 390 });

    console.log('📱 Landscape mode: 844x390');

    await page.goto('https://practice.expandtesting.com/');
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('Mobile-specific Features', () => {
  test.use({ ...devices['iPhone 13'] });

  test('mobile menu navigation', async ({ page, isMobile }) => {
    console.log(`Is mobile: ${isMobile}`);

    await page.goto('https://practice.expandtesting.com/');

    // On mobile, look for hamburger menu
    if (isMobile) {
      const hamburger = page.locator('#hamburger, .menu-toggle, button[aria-label*="menu"]');

      if (await hamburger.isVisible()) {
        await hamburger.tap();
        console.log('✅ Hamburger menu clicked');
      }
    }
  });

  test('geolocation on mobile', async ({ page, context }) => {
    // Set geolocation (Ho Chi Minh City)
    await context.setGeolocation({
      latitude: 10.762622,
      longitude: 106.660172,
    });

    await context.grantPermissions(['geolocation']);

    console.log('📍 Geolocation set to Ho Chi Minh City');

    await page.goto('https://practice.expandtesting.com/geolocation');

    // Website can now access geolocation
    // Note: practice.expandtesting.com might not have geolocation feature
  });

  test('mobile user agent', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/');

    const userAgent = await page.evaluate(() => navigator.userAgent);
    console.log(`User Agent: ${userAgent}`);

    // Verify it's a mobile user agent
    expect(userAgent).toContain('iPhone');
  });
});

test.describe('Device Capabilities', () => {
  test('detect touch capability', async ({ page, hasTouch }) => {
    console.log(`Touch enabled: ${hasTouch}`);

    await page.goto('https://practice.expandtesting.com/');

    if (hasTouch) {
      // Use touch interactions
      await page.tap('a:has-text("Login")');
      console.log('✅ Used touch interaction');
    } else {
      // Use mouse interactions
      await page.click('a:has-text("Login")');
      console.log('✅ Used mouse interaction');
    }

    await expect(page).toHaveURL(/login/);
  });

  test('detect device scale factor', async ({ page }) => {
    test.use({ ...devices['iPhone 13'] });

    await page.goto('https://practice.expandtesting.com/');

    const devicePixelRatio = await page.evaluate(() => window.devicePixelRatio);
    console.log(`Device pixel ratio: ${devicePixelRatio}`);

    // iPhone 13 has 3x retina display
    expect(devicePixelRatio).toBe(3);
  });

  test('screen size detection', async ({ page, viewport }) => {
    await page.goto('https://practice.expandtesting.com/');

    console.log(`Screen size: ${viewport?.width}x${viewport?.height}`);

    // Check if layout adapts to screen size
    if (viewport && viewport.width < 768) {
      console.log('Mobile layout');
    } else if (viewport && viewport.width >= 768 && viewport.width < 1024) {
      console.log('Tablet layout');
    } else {
      console.log('Desktop layout');
    }
  });
});

test.describe('Mobile Performance', () => {
  test.use({ ...devices['iPhone 13'] });

  test('measure mobile load time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('https://practice.expandtesting.com/');

    const loadTime = Date.now() - startTime;
    console.log(`📱 Mobile load time: ${loadTime}ms`);

    // Mobile should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('check mobile performance metrics', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/');

    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded:
          navigation.domContentLoadedEventEnd - navigation.fetchStart,
        loadComplete: navigation.loadEventEnd - navigation.fetchStart,
      };
    });

    console.log('Mobile Performance Metrics:', metrics);

    // Assert mobile performance thresholds
    expect(metrics.domContentLoaded).toBeLessThan(3000); // < 3s
    expect(metrics.loadComplete).toBeLessThan(5000); // < 5s
  });
});

test.describe('Visual Testing Across Devices', () => {
  const testDevices = ['iPhone 13', 'Pixel 5', 'iPad Pro', 'Desktop Chrome'];

  for (const deviceName of testDevices) {
    test(`visual test on ${deviceName}`, async ({ page }) => {
      test.use({ ...devices[deviceName] });

      await page.goto('https://practice.expandtesting.com/');

      // Visual regression test per device
      await expect(page).toHaveScreenshot(`homepage-${deviceName}.png`, {
        fullPage: true,
        maxDiffPixels: 100,
      });

      console.log(`📸 Screenshot captured for ${deviceName}`);
    });
  }
});

test.describe('Mobile Input Types', () => {
  test.use({ ...devices['iPhone 13'] });

  test('mobile keyboard types', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');

    // Email input triggers email keyboard on mobile
    const emailInput = page.locator('input[type="email"]');
    if (await emailInput.isVisible()) {
      await emailInput.tap();
      console.log('📧 Email keyboard triggered');
    }

    // Number input triggers numeric keyboard
    const numberInput = page.locator('input[type="number"], input[type="tel"]');
    if (await numberInput.isVisible()) {
      await numberInput.tap();
      console.log('🔢 Numeric keyboard triggered');
    }
  });
});

/*
KEY TAKEAWAYS:
1. Playwright provides 100+ device presets via devices object
2. Use tap() instead of click() for touch interactions
3. Test multiple viewport sizes for responsive design
4. Test both portrait and landscape orientations
5. Mobile devices have touch capability (hasTouch fixture)
6. Geolocation can be mocked for mobile testing
7. User agents differ between mobile and desktop
8. Mobile performance should be monitored separately
9. Visual regression testing across devices is important
10. Device pixel ratio affects rendering quality

TO TEST ON SPECIFIC DEVICES:
- test.use({ ...devices['iPhone 13'] })
- test.use({ ...devices['Pixel 5'] })
- test.use({ ...devices['iPad Pro'] })

OR configure in playwright.config.ts:
projects: [
  { name: 'mobile', use: { ...devices['iPhone 13'] } },
  { name: 'tablet', use: { ...devices['iPad Pro'] } },
]
*/
