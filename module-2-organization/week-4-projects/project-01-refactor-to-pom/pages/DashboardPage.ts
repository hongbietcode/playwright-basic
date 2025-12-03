/**
 * DashboardPage - Page object for dashboard/secure area
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  private readonly logoutButton: Locator;
  private readonly successMessage: Locator;
  private readonly pageHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutButton = page.locator('a:has-text("Logout")');
    this.successMessage = page.locator('.alert-success');
    this.pageHeading = page.locator('h2');
  }

  /**
   * Navigate to dashboard
   */
  async goto(): Promise<void> {
    await this.navigate('https://practice.expandtesting.com/secure');
  }

  /**
   * Click logout button
   */
  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  /**
   * Get welcome message
   */
  async getWelcomeMessage(): Promise<string> {
    return (await this.pageHeading.textContent()) || '';
  }

  /**
   * Get success message
   */
  async getSuccessMessage(): Promise<string> {
    return (await this.successMessage.textContent()) || '';
  }

  /**
   * Check if on dashboard
   */
  isOnDashboard(): boolean {
    return this.getURL().includes('secure');
  }

  /**
   * Check if logout button is visible
   */
  async hasLogoutButton(): Promise<boolean> {
    return await this.logoutButton.isVisible();
  }

  /**
   * Check if success message is visible
   */
  async hasSuccessMessage(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }
}
