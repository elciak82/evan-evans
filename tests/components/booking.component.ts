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
  const addStudent = page.locator(
    '//*[@for="STUDENT"]/..//*[@class="spinner__btn spinner__btn--plus"]',
  );
  const subtractStudent = page.locator(
    '//*[@for="STUDENT"]/..//*[@class="spinner__btn spinner__btn--minus"]',
  );
  const addFamily = page.locator(
    '//*[@for="FAMILY"]/..//*[@class="spinner__btn spinner__btn--plus"]',
  );
  const subtractFamily = page.locator(
    '//*[@for="FAMILY"]/..//*[@class="spinner__btn spinner__btn--minus"]',
  );
  const timeSlot = page.locator('.custom-radio__label');
  const addToBasketButton = page.locator('#add-to-basket-btn');
  const selectedDate = page.locator('[class*="event"][class*="selected"]');
  const currentMonth = page.locator('.clndr__month');
  const dates = page.$$('[class*="calendar-dow-"]');
  const bookingModal = page.locator('.modal-content');
  const numberAndPricePerAdult = page.locator(
    '//*[contains(text(),"Adult ")]/..//*[@class="booking-widget__basket-price"]',
  );
  const numberAndPricePerChildren = page.locator(
    '//*[contains(text(),"Child ")]/..//*[@class="booking-widget__basket-price"]',
  );
  const numberAndPricePerStudent = page.locator(
    '//*[contains(text(),"Student")]/..//*[@class="booking-widget__basket-price"]',
  );
  const numberAndPricePerFamily = page.locator(
    '//*[contains(text(),"Family")]/..//*[@class="booking-widget__basket-price"]',
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

  const adultBasketPrice = async () => {
    return await numberAndPricePerAdult.innerText();
  };

  const childBasketPrice = async () => {
    return await numberAndPricePerChildren.innerText();
  };

  const studentBasketPrice = async () => {
    return await numberAndPricePerStudent.innerText();
  };

  const familyBasketPrice = async () => {
    return await numberAndPricePerFamily.innerText();
  };

  const addAdultClick = async (): Promise<void> => {
    await addAdult.click();
  };

  const addChildClick = async (): Promise<void> => {
    await addChild.click();
  };

  const addStudentClick = async (): Promise<void> => {
    await addStudent.click();
  };

  const addFamilyClick = async (): Promise<void> => {
    await addFamily.click();
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
    persons: string[],
  ): Promise<void> => {
    await fillBookingModal();
    await addToBasketButtonClick();
  };

  const fillBookingModal = async (...persons: string[]) => {
    await page.waitForLoadState();
    for (let i = 0; i < persons.length; i++) {
      if (persons[i] === Persons.ADULT) {
        await addAdultClick();
      } else if (persons[i] === Persons.CHILD) {
        await addChildClick();
      } else if (persons[i] === Persons.STUDENT) {
        await addStudentClick();
      } else if (persons[i] === Persons.FAMILY) {
        await addFamilyClick();
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
    fillBookingModal,
    addToBasketButtonClick,
    getBookingDateAndTimeFromModal,
    getBookingTotalPriceFromModal,
    adultBasketPrice,
    childBasketPrice,
    studentBasketPrice,
    familyBasketPrice,
  };
};
