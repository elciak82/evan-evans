import { Page } from '@playwright/test';

export const PaymentPage = (page: Page) => {
  const iframe = page.locator('[name="__uspapiLocator"]');
  const selectCountry = page
    .frameLocator('#cardPaymentForm')
    .locator('#payment-form-country'); //for now just GB

  const addressLine1 = page
    .frameLocator('#cardPaymentForm')
    .locator('#payment-form-address-line1');

  // const selectCountryFromDropdown = async (country: string) => {
  //   //FIX THIS
  //   // await page.waitForSelector('#payment-form-country');
  //   await selectCountry(country);
  // };

  const setAddressLine1 = async (address: string) => {
    // await page.waitForSelector('#payment-form-address-line1');
    // await page.waitForLoadState();
    await addressLine1.fill(address);
  };

  return { setAddressLine1 };
};
