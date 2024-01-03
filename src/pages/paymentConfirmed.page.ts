import { Page } from '@playwright/test';
import { PaymentConfirmedPageModel } from '../models/paymentConfirmedPage.model';

export const PaymentConfirmedPage = (page: Page): PaymentConfirmedPageModel => {
  const confirmationCode = page.locator('[class="confirmation__code"] strong');
  const orderedTourTitle = page.locator('.card__title--slim');
  const confirmationDetails = page.locator('.card .basket-line');
  const confirmationSummary = page.locator('.col-md-4 .basket-line');
  const downloadTicketButton = page.locator(
    '[class="btn confirmation__download-btn"]',
  );

  const getConfirmationCode = async (): Promise<string> => {
    await page.waitForLoadState();
    return await confirmationCode.innerText();
  };

  const getOrderedTourTitle = async (): Promise<string> => {
    await page.waitForLoadState();
    await orderedTourTitle.isEnabled();
    return await orderedTourTitle.innerText();
  };

  const buttonIsVisible = async (): Promise<void> => {
    await downloadTicketButton.isVisible(); //TODO - return boolean
  };

  type ConfirmationDetails = {
    date: string;
    persons: string[];
  };

  const getConfirmationDetails = async (): Promise<ConfirmationDetails> => {
    const detailCounter = await confirmationDetails.count();
    let details: {
      date: string;
      persons: string[];
    } = {
      date: '',
      persons: [],
    };

    if (detailCounter) {
      details.date = await confirmationDetails.nth(0).innerText();
      for (let i = 1; i < detailCounter; i++) {
        const tourDetail = await confirmationDetails.nth(i).innerText();
        details.persons.push(tourDetail);
      }
    }
    return details;
  };

  type ConfirmationSummaryDetails = {
    persons: string[];
    price: string;
  };

  const getConfirmationSummaryDetails =
    async (): Promise<ConfirmationSummaryDetails> => {
      const detailCounter = await confirmationSummary.count();
      let details: {
        persons: string[];
        price: string;
      } = {
        persons: [],
        price: '',
      };

      if (detailCounter) {
        details.price = await confirmationSummary
          .nth(detailCounter - 1)
          .innerText();
        for (let i = 0; i < detailCounter - 1; i++) {
          const tourDetail = await confirmationSummary.nth(i).innerText();
          details.persons.push(tourDetail);
        }
      }
      return details;
    };

  return {
    getConfirmationCode,
    getOrderedTourTitle,
    getConfirmationDetails,
    getConfirmationSummaryDetails,
    buttonIsVisible,
  };
};
