import { Page } from '@playwright/test';

export const HeaderComponent = (page: Page) => {
  const basket = page.locator('.basket-link');

  const openBasket = async (): Promise<void> => {
    await basket.click();
    await page.waitForLoadState();
  };

  return { openBasket };
};
