import { test, expect } from '@playwright/test';
import { fillForm, submitForm, getValidationMessage } from './validation-helpers';
import validData from '../test-data/valid-data.json';
import invalidData from '../test-data/invalid-data.json';

/**
 * PROJECT 3: Form Validation Testing
 * Run: yarn test tests/form-validation.spec.ts
 */

test.describe('Form Validation Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/form');
  });

  test('should submit valid form @smoke', async ({ page }) => {
    const user = validData.validUsers[0];
    await fillForm(page, user);
    await submitForm(page);
    await expect(page.locator('.success')).toBeVisible();
  });

  test('should require name field @validation', async ({ page }) => {
    const message = await getValidationMessage(page, '#name');
    expect(message).toBeTruthy();
  });

  test('should validate email format @validation', async ({ page }) => {
    await page.fill('#email', invalidData.invalidEmails[0]);
    await submitForm(page);
    const message = await getValidationMessage(page, '#email');
    expect(message).toContain('valid');
  });

  test.skip('should validate phone format @validation', async ({ page }) => {
    await page.fill('#phone', invalidData.invalidPhones[0]);
    await submitForm(page);
    const error = page.locator('.error');
    await expect(error).toBeVisible();
  });

  test.skip('should reset form @ui', async ({ page }) => {
    await fillForm(page, validData.validUsers[0]);
    await page.click('button[type="reset"]');
    await expect(page.locator('#name')).toHaveValue('');
  });
});
