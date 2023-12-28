import { Page, expect } from '@playwright/test';
import { PromoCodes } from '../helpers/enums/promoCodes.enums';
import { BasketPageModel } from '../models/basketPage.model';

export const BasketPage = (page: Page): BasketPageModel => {
  const tourTitle = page.locator('[class*="card__title--slim"]');
  const basketDetails = page.locator('.card .basket-line');
  const basketSummary = page.locator('.col-lg-4 .basket-line');
  const removeButton = page.locator(
    '[class="btn btn--thin btn--alert-icon remove-btn"]',
  );
  const removeButtonModal = page.locator('[class*="remove-modal__remove-btn"]');
  const returnToBasketButtonModal = page.locator(
    '[class*="remove-modal__cancel-btn"]',
  );
  const removedItemAlert = page.locator('.alert__text');
  const promoCodeField = page.locator('#promocode');
  const applyButton = page.locator('[class*="basket-promo__apply"]');
  const totalPriceRed = page.locator('.basket-line__cost--red');
  const invalidPromoCodeAlert = page.locator('.invalid-feedback');

  const getTourTitle = async (): Promise<string> => {
    await page.waitForLoadState();
    return await tourTitle.innerText();
  };

  const removeButtonClick = async (): Promise<void> => {
    await removeButton.click();
  };

  const removeButtonModalClick = async (): Promise<void> => {
    await removeButtonModal.isVisible();
    await removeButtonModal.click();
  };

  const removeTourFromBasket = async (): Promise<void> => {
    await removeButtonClick();
    await removeButtonModalClick();
  };

  const getRemovedItemAlertText = async (): Promise<string> => {
    await removedItemAlert.isEnabled();
    return await removedItemAlert.innerText();
  };

  type BasketCardDetails = {
    date: string;
    persons: string[];
  };
  // https://bobbyhadz.com/blog/typescript-function-return-type-promise

  const getBasketCardDetails = async (): Promise<BasketCardDetails> => {
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

  type BasketSummaryDetails = {
    persons: string[];
    price: string;
  };

  const getBasketSummaryDetails = async (): Promise<BasketSummaryDetails> => {
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

  const applyPromoCode = async (promoCode: string): Promise<void> => {
    await promoCodeField.fill(promoCode);
    await applyButton.click();
    await totalPriceRed.isVisible();
  };

  const promoCodeIncluded = async (): Promise<boolean> => {
    //TODO
    return await totalPriceRed.isEnabled();
  };

  const getInvalidPromoCodeAlert = async (): Promise<string> => {
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
