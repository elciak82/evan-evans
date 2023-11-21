import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  closeButton = this.page
    .getByTestId('region-redirect__modal-header-close')
    .locator('path');
  cookiePolicy = this.page.getByTestId('cookie-policy').getByTestId('btn');

  async closeModal(): Promise<void> {
    // await this.closeButton.click();
    await this.cookiePolicy.click();
  }
}
