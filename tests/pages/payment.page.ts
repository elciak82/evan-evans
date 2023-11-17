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
}
