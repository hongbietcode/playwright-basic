import { Page } from '@playwright/test';

/**
 * BasePage - Base class for all page objects
 * Contains common methods used across all pages
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getURL(): Promise<string> {
    return this.page.url();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}
