import { Page } from 'playwright';

export type PaymentConfirmedPageModel = {
  getConfirmationCode(): Promise<string>;
  getOrderedTourTitle(): Promise<string>;
  getConfirmationDetails(): Promise<any>;
  getConfirmationSummaryDetails(): Promise<any>;
  buttonIsVisible(): Promise<void>; //TODO - refactor to boolean
};
