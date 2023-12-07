import { Page } from '@playwright/test';

export const BasketComponent = (page: Page) => {
  const basketAlert = page.locator('.basket-popup__alert');
  const basketPopup = page.locator('.basket-popup');
  const basketTourTitle = page.locator('.basket-popup__item-title');
  const viewBasketButton = page.locator('[class="btn basket-popup__button"]');
  const checkoutNowButton = page.locator('[class="btn btn--alt basket-popup__button"]');
  const closePopupButton = page.locator('[class*="basket-popup__close-btn"]');
  const basketDetails = page.locator('.basket-line');

  const getMessageText = async () => {
    basketPopup.isEnabled();
    return await basketAlert.innerText();
  };

  const viewBasketButtonClick = async () => {
    await viewBasketButton.click();
  };

  const checkoutNowButtonClick = async () => {
    await checkoutNowButton.click();
  };

  const closeBasketPopupButtonClick = async () => {
    await page.waitForLoadState();
    await basketPopup.isEnabled();
    await closePopupButton.click();
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
        const tourDetail = await basketDetails.nth(i).innerText();
        details.persons.push(tourDetail);
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
    closeBasketPopupButtonClick,
    checkoutNowButtonClick,
  };
};
