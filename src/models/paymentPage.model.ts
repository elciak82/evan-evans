export type PaymentPageModel = {
  fillPaymentForm(): Promise<void>;
  payButtonClick(): Promise<void>;
};
