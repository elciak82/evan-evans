import { Page } from '@playwright/test';

export const BasketPage = (page: Page) => {
  const tourTitle = page.locator('[class*="card__title--slim"]');

  const getTourTitle = async () => {
    await page.waitForLoadState();
    // console.log(await tourTitle.innerText());
    return await tourTitle.innerText();
  };

  return { getTourTitle };
};
