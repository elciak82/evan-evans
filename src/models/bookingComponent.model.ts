export type BookingComponentModel = {
  fillBookingModal(...persons: string[]): Promise<void>;
  addToBasketButtonClick(): Promise<void>;
  getBookingDateAndTimeFromModal(): Promise<string>;
  getBookingTotalPriceFromModal(): Promise<string>;
  adultBasketPrice(): Promise<string>;
  childBasketPrice(): Promise<string>;
  studentBasketPrice(): Promise<string>;
  familyBasketPrice(): Promise<string>;
};
