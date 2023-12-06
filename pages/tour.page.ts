import { Page } from '@playwright/test';

export const TourPage = (page: Page) => {
  const bookButton = page.getByRole('button', { name: 'Book now' });

  const bookButtonClick = async (): Promise<void> => {
    await page.waitForLoadState();
    await bookButton.click();
  };

  return { bookButtonClick };
};
