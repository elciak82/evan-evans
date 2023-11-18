import { Page } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}
  transferReceiverInput = this.page.getByTestId('transfer_receiver');
  accountInput = this.page.getByTestId('form_account_to');
  amuntInput = this.page.getByTestId('form_amount');
  makeTransferButton = this.page.getByRole('button', {
    name: 'wykonaj przelew',
  });
  closeButton = this.page.getByTestId('close-button');
  correctPaymentMessage = this.page.locator('#show_messages');

  async makeTransfer(
    transferReceiver: string,
    transferAccount: string,
    transferAmount: string,
  ): Promise<void> {
    await this.transferReceiverInput.fill(transferReceiver);
    await this.accountInput.fill(transferAccount);
    await this.amuntInput.fill(transferAmount);

    await this.makeTransferButton.click();
    await this.closeButton.click();
  }
}
