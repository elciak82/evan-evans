import { Page } from '@playwright/test';

export class PulpitPage {
  constructor(private page: Page) {}

  userName = this.page.getByTestId('user-name');
  topUpReceiver = this.page.locator('#widget_1_topup_receiver');
  topUpAmount = this.page.locator('#widget_1_topup_amount');
  agreementCheckbox = this.page.locator('#uniform-widget_1_topup_agreement');
  topUpButton = this.page.getByRole('button', { name: 'doładuj telefon' });
  closeButton = this.page.getByTestId('close-button');
  correctTopUpMessage = this.page.locator('#show_messages');
  balance = this.page.locator('#money_value');
}
