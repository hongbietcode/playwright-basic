import { Page } from '@playwright/test';

export async function fillForm(page: Page, data: any): Promise<void> {
  if (data.name) await page.fill('#name', data.name);
  if (data.email) await page.fill('#email', data.email);
  if (data.phone) await page.fill('#phone', data.phone);
  if (data.password) await page.fill('#password', data.password);
}

export async function submitForm(page: Page): Promise<void> {
  await page.click('button[type="submit"]');
}

export async function getValidationMessage(page: Page, fieldId: string): Promise<string> {
  const field = page.locator(fieldId);
  return await field.evaluate((el: HTMLInputElement) => el.validationMessage);
}

export async function clearForm(page: Page): Promise<void> {
  await page.click('button[type="reset"]');
}
