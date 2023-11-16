import { Page } from '@playwright/test';

export class MenuComponent {
  constructor(private page: Page) {}

  menuTransferTab = this.page.getByRole('link', { name: 'płatności' });
}
