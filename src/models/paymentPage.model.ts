import { Page } from 'playwright';

export type PaymentPageModel = {
  fillPaymentForm(): Promise<void>;
  payButtonClick(): Promise<void>;
};
