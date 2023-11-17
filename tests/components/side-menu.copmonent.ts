import { Page } from '@playwright/test';

export class SideMenuComponent {
  constructor(private page: Page) {}

  menuTransferTab = this.page.getByRole('link', { name: 'płatności' });
}
