import { Page } from 'playwright';

export type BasketPageModel = {
  getTourTitle(): Promise<string>;
  getBasketCardDetails(): Promise<any>;
  getBasketSummaryDetails(): Promise<any>;
  removeTourFromBasket(): Promise<void>;
  getRemovedItemAlertText(): Promise<string>;
  applyPromoCode(promoCode: string): Promise<void>;
  promoCodeIncluded(): Promise<boolean>;
  getInvalidPromoCodeAlert(): Promise<string>;
};
