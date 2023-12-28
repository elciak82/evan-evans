import { Page } from '@playwright/test';
import { TourPageModel } from '../models/tourPage.model';

export const TourPage = (page: Page): TourPageModel => {
  const bookButton = page.getByRole('button', { name: 'Book now' }); //TODO

  const bookButtonClick = async (): Promise<void> => {
    await page.waitForLoadState();
    await bookButton.click();
  };

  return { bookButtonClick };
};
