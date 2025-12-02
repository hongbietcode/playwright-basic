import { test, expect } from '@playwright/test';

/**
 * SOLUTION: Exercise 01 - Navigation Practice
 *
 * Đây là lời giải đầy đủ cho Exercise 01
 * So sánh code của bạn với solution này
 */

test.describe('Exercise 01: Navigation - SOLUTION', () => {

  test('should navigate to Expand Testing homepage', async ({ page }) => {
    // Navigate đến https://practice.expandtesting.com
    await page.goto('https://practice.expandtesting.com');

    // Verify URL chính xác
    await expect(page).toHaveURL('https://practice.expandtesting.com/');

    // Verify title chứa "Practice"
    await expect(page).toHaveTitle(/Practice/);

    console.log('✅ Test 1 completed');
  });

  test('should navigate through multiple pages', async ({ page }) => {
    // Navigate đến homepage
    await page.goto('https://practice.expandtesting.com');

    // Click vào "Test Login Page"
    await page.click('text=Test Login Page');

    // Verify URL chứa "/login"
    await expect(page).toHaveURL(/.*login/);

    // Click "Home" để quay về
    await page.click('a[href="/"]');

    // Verify về homepage
    await expect(page).toHaveURL('https://practice.expandtesting.com/');

    console.log('✅ Test 2 completed');
  });

  test('should use browser back and forward buttons', async ({ page }) => {
    // Navigate đến homepage
    await page.goto('https://practice.expandtesting.com');

    // Navigate đến /login
    await page.goto('https://practice.expandtesting.com/login');

    // Navigate đến /checkboxes
    await page.goto('https://practice.expandtesting.com/checkboxes');

    // Go back (về /login)
    await page.goBack();
    await expect(page).toHaveURL(/.*login/);

    // Go back (về homepage)
    await page.goBack();
    await expect(page).toHaveURL('https://practice.expandtesting.com/');

    // Go forward (đến /login)
    await page.goForward();
    await expect(page).toHaveURL(/.*login/);

    console.log('✅ Test 3 completed');
  });

  test('should wait for different load states', async ({ page }) => {
    // Navigate với domcontentloaded
    await page.goto('https://practice.expandtesting.com', {
      waitUntil: 'domcontentloaded'
    });
    console.log('📄 DOM Content Loaded');

    // Wait for load
    await page.waitForLoadState('load');
    console.log('📄 Page Fully Loaded');

    // Wait for networkidle (optional)
    // await page.waitForLoadState('networkidle');
    console.log('📄 Network Idle');

    // Verify title
    await expect(page).toHaveTitle(/Practice/);

    console.log('✅ Test 4 completed');
  });

  test('should navigate and capture screenshot', async ({ page }) => {
    // Navigate đến login
    await page.goto('https://practice.expandtesting.com/login');

    // Capture screenshot
    await page.screenshot({
      path: 'test-results/screenshots/exercise-01-login.png'
    });
    console.log('📸 Screenshot captured');

    // Verify đang ở login page
    await expect(page).toHaveURL(/.*login/);

    console.log('✅ Test 5 completed');
  });

});

/**
 * Key Points - Điểm Chính:
 *
 * 1. goto() - Navigate trực tiếp đến URL
 * 2. click() - Click link để navigate
 * 3. goBack()/goForward() - Browser navigation
 * 4. waitForLoadState() - Wait for page load
 * 5. toHaveURL() - Verify URL với regex hoặc string
 * 6. screenshot() - Capture màn hình
 */
