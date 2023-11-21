import { Page } from '@playwright/test';

export const TourPage = (page: Page) => {
  const tourTitle = page.locator(
    '.card__title card__title--large card__title--slim',
  );

  const getTourTitle = async () => {
   return await tourTitle.textContent();
  };

  return {getTourTitle};
};
