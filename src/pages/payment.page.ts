import { Page } from '@playwright/test';

export const PaymentPage = (page: Page) => {
  const iframe = page.locator('[name="__uspapiLocator"]');
  const selectCountry = page
    .frameLocator('#cardPaymentForm')
    .locator('#payment-form-country'); //for now just GB

  const addressLine1 = page
    .frameLocator('#cardPaymentForm')
    .locator('#payment-form-address-line1');

  const selectCountryFromDropdown = async (country: string) => {
    await selectCountry.fill(country);
  };

  const setAddressLine1 = async (address: string) => {
    await addressLine1.fill(address);
  };

  return { selectCountryFromDropdown, setAddressLine1 };
};
