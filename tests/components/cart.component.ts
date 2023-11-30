import { Page } from '@playwright/test';

export const BasketComponent = (page: Page) => {
  const message = page.getByText('Item Added!');
  const basketPopup = page.locator('.basket-popup');

  const getMessageText = async () => {
    basketPopup.isEnabled();
    console.log(await message.innerText());
    return await message.innerText();
  };

  return { getMessageText };
};
