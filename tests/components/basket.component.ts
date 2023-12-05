import { Page } from '@playwright/test';

export const BasketComponent = (page: Page) => {
  const basketAlert = page.locator('.basket-popup__alert');
  const basketPopup = page.locator('.basket-popup');
  const basketTourTitle = page.locator('.basket-popup__item-title');
  const viewBasketButton = page.getByRole('link', { name: 'View Basket' });
  const basketDetails = page.locator('.basket-line');

  const getMessageText = async () => {
    basketPopup.isEnabled();
    // console.log(await basketAlert.innerText());
    return await basketAlert.innerText();
  };

  const viewBasketButtonClick = async () => {
    viewBasketButton.click();
  };

  const getBasketDetails = async () => {
    const detailCounter = await basketDetails.count();
    let details: {
      date: string;
      persons: string[];
      price: string;
    } = {
      date: '',
      persons: [],
      price: '',
    };

    if (detailCounter) {
      details.date = await basketDetails.nth(0).innerText();
      details.price = await basketDetails.nth(detailCounter - 1).innerText();
      for (let i = 1; i < detailCounter - 1; i++) {
        // console.log(i);
        // console.log(await basketDetails.nth(i).innerText());
        const tourDetail = await basketDetails.nth(i).innerText();

        details.persons.push(tourDetail);
        // console.log(details.price);
        // console.log(details.persons[i-1]);
        // console.log('---------------');
      }
    }
    return details;
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
