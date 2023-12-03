import { Page } from '@playwright/test';

export const BookingComponent = (page: Page) => {
  const addAdult = page.getByRole('button', { name: '+' }).first();
  const subtractAdult = page.getByRole('button', { name: '-' }).first();
  const addChild = page.getByRole('button', { name: '+' }).nth(1);
  const subtractChild = page.getByRole('button', { name: '-' }).nth(1);
  const timeSlot = page.getByText('09:');
  const addToBasketButton = page.getByRole('button', { name: 'Add to basket' });
  const firstAvailableDate = page.locator('[class*="selected"]');
  const currentMonth = page.locator('.clndr__month');
  const dates = page.$$('[class*="calendar-dow-"]');
  const bookingModal = page.locator('.modal-content');

  const selectDate = async (date: string): Promise<void> => {
    for (const dt of await dates) {
      if ((await dt.textContent()) == date) {
        await dt.click();
        break;
      }
    }
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
    await firstAvailableDate.click();
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
    await addAdultClick();
    await selectFirstAvailableDate();
    await selectTimeSlot();
    await addToBasketButtonClick();
  };

  return { bookTour, bookTourForFirstAvailableDate };
};
