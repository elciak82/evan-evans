import { Page } from '@playwright/test';

export const BasketComponent = (page: Page) => {
  const basketAlert = page.locator('.basket-popup__alert')
  const basketPopup = page.locator('.basket-popup');
  const basketTourTitle = page.locator('.basket-popup__item-title');

  const getMessageText = async () => {
    basketPopup.isEnabled();
    console.log(await basketAlert.innerText());
    return await basketAlert.innerText();
  };

  return { getMessageText };
};
