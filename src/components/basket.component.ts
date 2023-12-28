import { Page } from '@playwright/test';
import { BasketComponentModel } from '../models/basketComponent.model';

export const BasketComponent = (page: Page): BasketComponentModel => {
  const basketAlert = page.locator('.basket-popup__alert');
  const basketPopup = page.locator('.basket-popup');
  const basketTourTitle = page.locator('.basket-popup__item-title');
  const viewBasketButton = page.locator('[class="btn basket-popup__button"]');
  const checkoutNowButton = page.locator(
    '[class="btn btn--alt basket-popup__button"]',
  );
  const closePopupButton = page.locator('[class*="basket-popup__close-btn"]');
  const basketDetails = page.locator('.basket-line');

  const getMessageText = async (): Promise<string> => {
    basketPopup.isEnabled();
    return await basketAlert.innerText();
  };

  const viewBasketButtonClick = async (): Promise<void> => {
    await viewBasketButton.click();
  };

  const checkoutNowButtonClick = async (): Promise<void> => {
    await checkoutNowButton.click();
  };

  const closeBasketPopupButtonClick = async (): Promise<void> => {
    await page.waitForLoadState();
    await basketPopup.isEnabled();
    await closePopupButton.click();
  };

  type BasketDetails = {
    date: string;
    persons: string[];
    price: string;
  };

  const getBasketDetails = async (): Promise<BasketDetails> => {
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

  const getTourTitle = async (): Promise<string> => {
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
