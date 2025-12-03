import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  private logoutButton: Locator;
  private successMessage: Locator;
  private pageHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutButton = page.locator('a:has-text("Logout")');
    this.successMessage = page.locator('.alert-success');
    this.pageHeading = page.locator('h2');
  }

  async logout() {
    await this.logoutButton.click();
  }

  async isOnDashboard(): Promise<boolean> {
    return this.page.url().includes('secure');
  }

  async getHeadingText(): Promise<string> {
    return await this.pageHeading.textContent() || '';
  }
}
