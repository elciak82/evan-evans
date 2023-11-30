import { Page } from '@playwright/test';

export const BasketComponent = (page: Page) => {
  const alert = page.locator('.basket-popup__alert')
  const basketPopup = page.locator('.basket-popup');

  const getMessageText = async () => {
    basketPopup.isEnabled();
    console.log(await alert.innerText());
    return await alert.innerText();
  };

  return { getMessageText };
};
