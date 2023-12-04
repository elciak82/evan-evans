import { Page } from '@playwright/test';

export const BasketComponent = (page: Page) => {
  const basketAlert = page.locator('.basket-popup__alert');
  const basketPopup = page.locator('.basket-popup');
  const basketTourTitle = page.locator('.basket-popup__item-title');
  const viewBasketButton = page.getByRole('link', { name: 'View Basket' });
  const basketDetails = page.locator('.basket-line');

  const getMessageText = async () => {
    basketPopup.isEnabled();
    console.log(await basketAlert.innerText());
    return await basketAlert.innerText();
  };

  const viewBasketButtonClick = async () => {
    viewBasketButton.click();
  };

  const getBasketDetails = async (detailNumber: number) => {
    const detailCounter = await basketDetails.count();
    const details: string[] = [];
    if (detailCounter) {
      for (let i = 0; i < detailCounter; i++) {
        // console.log(i);
        // console.log(await basketDetails.nth(i).innerText());
        const tourDetail = await basketDetails.nth(i).innerText();

        details.push(tourDetail);
        console.log(details[i]);
        console.log('---------------');
      }
    }
    return details[detailNumber];
  };

  const getTourTitle = async () => {
    return basketTourTitle.innerText();
  };

  return {
    getMessageText,
    viewBasketButtonClick,
    getTourTitle,
    getBasketDetails,
  };
};
