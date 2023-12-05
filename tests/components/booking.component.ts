import { Page } from '@playwright/test';
import { Persons } from '../helpers/enums/persons.enums';

export const BookingComponent = (page: Page) => {
  // const addAdult = page.getByRole('button', { name: '+' }).first();
  const addAdult = page.locator(
    '//*[@for="ADULT"]/..//*[@class="spinner__btn spinner__btn--plus"]',
  );
  const subtractAdult = page.locator(
    '//*[@for="ADULT"]/..//*[@class="spinner__btn spinner__btn--minus"]',
  );
  const addChild = page.locator(
    '//*[@for="CHILD"]/..//*[@class="spinner__btn spinner__btn--plus"]',
  );
  const subtractChild = page.locator(
    '//*[@for="CHILD"]/..//*[@class="spinner__btn spinner__btn--minus"]',
  );
  const timeSlot = page.locator('.custom-radio__label');
  const addToBasketButton = page.getByRole('button', { name: 'Add to basket' });
  const selectedDate = page.locator('[class*="selected"]');
  const currentMonth = page.locator('.clndr__month');
  const dates = page.$$('[class*="calendar-dow-"]');
  const bookingModal = page.locator('.modal-content');
  const numberAndPricePerAdult = page.locator(
    '//*[contains(text(),"Adult ")]/..//*[@class="booking-widget__basket-price"]',
  );
  const numberAndPricePerChildren = page.locator(
    '//*[contains(text(),"Child ")]/..//*[@class="booking-widget__basket-price"]',
  );
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

  const adultBasketPrice = async () => {
    return await numberAndPricePerAdult.innerText();
  };

  const childBasketPrice = async () => {
    return await numberAndPricePerChildren.innerText();
  };

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

  const bookTourForFirstAvailableDate = async (
    persons: Persons,
  ): Promise<void> => {
    await fillBookingModal(persons);
    await addToBasketButtonClick();
  };

  const fillBookingModal = async (...persons: string[]) => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i] === Persons.ADULT) {
        await addAdult.click();
      } else if (persons[i] === Persons.CHILD) {
        await addChild.click();
      }
    }
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

  const getBookingTotalPriceFromModal = async () => {
    const bookingPrice = await totalPrice.innerText();
    return bookingPrice;
  };

  const getBookingPriceRerPersonFromModal = async () => {
    const bookingPrice = await totalPrice.innerText();
    return bookingPrice;
  };

  return {
    bookTour,
    bookTourForFirstAvailableDate,
    fillBookingModal,
    addToBasketButtonClick,
    getBookingDateAndTimeFromModal,
    getBookingTotalFromModal: getBookingTotalPriceFromModal,
    adultBasketPrice,
    childBasketPrice,
  };
};
