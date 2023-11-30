import { Page } from '@playwright/test';

export const BookingComponent = (page: Page) => {
  const addAdult = page.getByRole('button', { name: '+' }).first();
  const substractAdult = page.getByRole('button', { name: '-' }).first();
  const addChild = page.getByRole('button', { name: '+' }).nth(1);
  const substractChild = page.getByRole('button', { name: '-' }).nth(1);
  const timeSlot = page.getByText('09:');
  const addToBasketButton = page.getByRole('button', { name: 'Add to basket' });
  const day =  page.getByRole('button', { name: '2', exact: true })

  const addAdultClick = async (): Promise<void> => {
    await addAdult.click();
  };

  const addChildClick = async (): Promise<void> => {
    await addChild.click();
  };

  const selectTimeSlot = async (): Promise<void> => {
    await timeSlot.click();
  }

  const selectDay = async (): Promise<void> => {
    await day.click();
  }

  const addToBasketButtonClick = async (): Promise<void> => {
    await addToBasketButton.click();
  }

  const bookingTour = async (): Promise<void> => {
    await addAdultClick();
    await selectDay();
    await selectTimeSlot();
    await addToBasketButtonClick();
  }

  return { bookTour: bookingTour };
};
