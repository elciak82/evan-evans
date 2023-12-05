import { Page } from '@playwright/test';

export const BookingComponent = (page: Page) => {
  // const addAdult = page.getByRole('button', { name: '+' }).first();
  const addAdult = page.locator(
    '//*[@for="ADULT"]/..//*[@class="spinner__btn spinner__btn--plus"]',
  );
  const subtractAdult = page.locator(
    '//*[@for="ADULT"]/..//*[@class="spinner__btn spinner__btn--minus"]',
  );
  const addChild = page.getByRole('button', { name: '+' }).nth(1);
  const subtractChild = page.getByRole('button', { name: '-' }).nth(1);
  const timeSlot = page.locator('.custom-radio__label');
  const addToBasketButton = page.getByRole('button', { name: 'Add to basket' });
  const selectedDate = page.locator('[class*="selected"]');
  const currentMonth = page.locator('.clndr__month');
  const dates = page.$$('[class*="calendar-dow-"]');
  const bookingModal = page.locator('.modal-content');
  const totalPrice = page.locator(
    '//*[text()="Total"]/..//*[@class="booking-widget__basket-price"]',
  );

  const selectDate = async (date: string): Promise<void> => {
    for (const dt of await dates) {
      if ((await dt.textContent()) == date) {
        await dt.click();
        break;
      }
    }
  };

  // const checkPLUS = async (): Promise<void> => {
  //   await adult.click();
  // };

  const addAdultClick = async (): Promise<void> => {
    await page.waitForLoadState();
    await addAdult.click();
  };

  const addChildClick = async (): Promise<void> => {
    await addChild.click();
  };

  const selectTimeSlot = async (): Promise<void> => {
    await timeSlot.click();
  };

  const selectFirstAvailableDate = async (): Promise<void> => {
    await selectedDate.click();
  };

  const addToBasketButtonClick = async (): Promise<void> => {
    await addToBasketButton.click();
  };

  const bookTour = async (day: string): Promise<void> => {
    await addAdultClick();
    await selectDate(day);
    await selectTimeSlot();
    await addToBasketButtonClick();
  };

  const bookTourForFirstAvailableDate = async (): Promise<void> => {
    await fillBookingModal();
    await addToBasketButtonClick();
  };

  const fillBookingModal = async (): Promise<void> => {
    await addAdultClick();
    await selectFirstAvailableDate();
    await selectTimeSlot();
  };

  const getBookingDateAndTimeFromModal = async () => {
    const monthAndYear = await currentMonth.innerText();
    const day = await selectedDate.innerText();
    const time = await timeSlot.innerText();
    const bookingDate = day + ' ' + monthAndYear + ' ' + time;
    return bookingDate;
  };

  const getBookingTotalFromModal = async () => {
    const bookingPrice = await totalPrice.innerText();
    return bookingPrice;
  };

  return {
    bookTour,
    bookTourForFirstAvailableDate,
    fillBookingModal,
    addToBasketButtonClick,
    getBookingDateAndTimeFromModal,
    getBookingTotalFromModal,
    // checkPLUS,
  };
};
