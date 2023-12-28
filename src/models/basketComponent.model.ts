export type BasketComponentModel = {
  getMessageText(): Promise<string>;
  viewBasketButtonClick(): Promise<void>;
  getTourTitle(): Promise<string>;
  getBasketDetails(): Promise<any>; //any is correct?
  closeBasketPopupButtonClick(): Promise<void>;
  checkoutNowButtonClick(): Promise<void>;
};
