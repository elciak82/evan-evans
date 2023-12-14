import { Page } from '@playwright/test';

export const PaymentConfirmedPage = (page: Page) => {
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
    return await orderedTourTitle.innerText();
  };

  const buttonIsVisible = async () => {
    await downloadTicketButton.isVisible();
  };

  const getConfirmationDetails = async () => {
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

  const getConfirmationSummaryDetails = async () => {
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
