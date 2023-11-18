import { Page } from '@playwright/test';

export class PulpitPage {
  constructor(private page: Page) {}

  userName = this.page.getByTestId('user-name');
  topUpReceiver = this.page.locator('#widget_1_topup_receiver');
  topUpAmount = this.page.locator('#widget_1_topup_amount');
  agreementCheckbox = this.page.locator('#uniform-widget_1_topup_agreement');
  topUpButton = this.page.getByRole('button', { name: 'doładuj telefon' });
  closeButton = this.page.getByTestId('close-button');
  message = this.page.locator('#show_messages');
  balance = this.page.locator('#money_value');
  transferReceiver = this.page.locator('#widget_1_transfer_receiver');
  transferAmount = this.page.locator('#widget_1_transfer_amount');
  transcerTitle = this.page.locator('#widget_1_transfer_title');
  performTransferButton = this.page.getByRole('button', { name: 'wykonaj' });

  async makeTransfer(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.transferReceiver.selectOption(receiverId);
    await this.transferAmount.fill(transferAmount);
    await this.transcerTitle.fill(transferTitle);

    await this.performTransferButton.click();
    await this.closeButton.click();
  }

  async makeMobileTopUp(receiverOption: string, amount: string):Promise<void> {
    await this.topUpReceiver.selectOption(receiverOption);
    await this.topUpAmount.fill(amount);
    await this.agreementCheckbox.click();
    await this.topUpButton.click();
    await this.closeButton.click();
  }
}
