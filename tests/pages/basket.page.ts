import { Page, expect } from '@playwright/test';
import { PromoCodes } from '../helpers/enums/promoCodes.enums';

export const BasketPage = (page: Page) => {
  const tourTitle = page.locator('[class*="card__title--slim"]');
  const basketDetails = page.locator('.card .basket-line');
  const basketSummary = page.locator('.col-lg-4 .basket-line');
  const removeButton = page.getByRole('button', { name: 'Remove' });
  const removeButtonModal = page.getByRole('button', { name: 'Yes, Remove' });
  const removedItemAlert = page.locator('.alert__text');
  const promoCodeField = page.locator('#promocode');
  const applyButton = page.getByRole('button', { name: 'Apply' });
  const totalPriceRed = page.locator('.basket-line__cost--red');
  const invalidPromoCodeAlert = page.locator('.invalid-feedback');

  const getTourTitle = async () => {
    await page.waitForLoadState();
    return await tourTitle.innerText();
  };

  const removeButtonClick = async () => {
    await removeButton.click();
  };

  const removeButtonModalClick = async () => {
    await removeButtonModal.isVisible();
    await removeButtonModal.click();
  };

  const removeTourFromBasket = async () => {
    await removeButtonClick();
    await removeButtonModalClick();
  };

  const getRemovedItemAlertText = async () => {
    await removedItemAlert.isEnabled();
    return await removedItemAlert.innerText();
  };

  const getBasketCardDetails = async () => {
    const detailCounter = await basketDetails.count();
    let details: {
      date: string;
      persons: string[];
    } = {
      date: '',
      persons: [],
    };

    if (detailCounter) {
      details.date = await basketDetails.nth(0).innerText();
      for (let i = 1; i < detailCounter; i++) {
        const tourDetail = await basketDetails.nth(i).innerText();
        details.persons.push(tourDetail);
      }
    }
    return details;
  };

  const getBasketSummaryDetails = async () => {
    const detailCounter = await basketSummary.count();
    let details: {
      persons: string[];
      price: string;
    } = {
      persons: [],
      price: '',
    };

    if (detailCounter) {
      details.price = await basketSummary.nth(detailCounter - 1).innerText();
      for (let i = 0; i < detailCounter - 1; i++) {
        const tourDetail = await basketSummary.nth(i).innerText();
        details.persons.push(tourDetail);
      }
    }
    return details;
  };

  const applyPromoCode = async (promoCode: string) => {
    await promoCodeField.fill(promoCode);
    await applyButton.click();
    await totalPriceRed.isVisible();
  };

  const promoCodeIncluded = async (): Promise<boolean> => {
    //TODO
    return await totalPriceRed.isEnabled();
  };

  const getInvalidPromoCodeAlert = async () => {
    return await invalidPromoCodeAlert.innerText();
  };

  return {
    getTourTitle,
    getBasketCardDetails,
    getBasketSummaryDetails,
    removeTourFromBasket,
    getRemovedItemAlertText,
    applyPromoCode,
    promoCodeIncluded,
    getInvalidPromoCodeAlert,
  };
};
