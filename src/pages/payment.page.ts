import { Page } from '@playwright/test';
import { Countries } from '../helpers/enums/countries.enums';
import { userData } from '../test-data/userData.data';

export const PaymentPage = (page: Page) => {
  const selectCountry = page
    .frameLocator('#cardPaymentForm')
    .locator('#payment-form-country');

  const addressLine1Input = page
    .frameLocator('#cardPaymentForm')
    .locator('#payment-form-address-line1');

  const addressLine2Input = page
    .frameLocator('#cardPaymentForm')
    .locator('#payment-form-address-line2');

  const cityInput = page
    .frameLocator('#cardPaymentForm')
    .locator('#payment-form-address-city');

  const zipInput = page
    .frameLocator('#cardPaymentForm')
    .locator('#payment-form-postcode');

  const cardNumberInput = page
    .frameLocator('#cardPaymentForm')
    .locator('#payment-card-number');

  const selectExpiryMonth = page
    .frameLocator('#cardPaymentForm')
    .locator('#expiry-month-card-number');

  const selectExpiryYear = page
    .frameLocator('#cardPaymentForm')
    .locator('#expiry-year-card-number');

  const cardCvvInput = page
    .frameLocator('#cardPaymentForm')
    .locator('#cvv-card-number');

  const termsAndConditionsCheckbox = page
    .frameLocator('#cardPaymentForm')
    .locator('#payment-form-terms');

  const payButton = page.frameLocator('#cardPaymentForm').locator('#pay');

  const selectCountryFromDropdown = async (country: Countries) => {
    await selectCountry.fill(country);
  };

  const setAddressLine1 = async (address: string) => {
    await page.waitForSelector('#cardPaymentForm');
    await addressLine1Input.fill(address);
  };

  const setAddressLine2 = async (address: string) => {
    await addressLine2Input.fill(address);
  };

  const setCity = async (city: string) => {
    await cityInput.fill(city);
  };

  const setZip = async (zip: string) => {
    await zipInput.fill(zip);
  };

  //const selectRegionFromDropdown TODO

  const setCardNumber = async (card: string) => {
    await cardNumberInput.fill(card);
  };

  const selectExpiryMonthFromDropdown = async (month: string) => {
    await selectExpiryMonth.selectOption(month);
  };

  const selectExpiryYearFromDropdown = async (year: string) => {
    await selectExpiryYear.selectOption(year);
  };

  const setCvvNumber = async (cvv: string) => {
    await cardCvvInput.fill(cvv);
  };

  const checkTermsAndConditionCheckbox = async () => {
    await termsAndConditionsCheckbox.setChecked(true);
  };

  const payButtonClick = async () => {
    await payButton.click();
  };

  const fillPaymentForm = async () => {
    await setAddressLine1(userData.addressLine1);
    await setAddressLine2(userData.addressLine2);
    await setCity(userData.city);
    await setZip(userData.zipCode);
    await setCardNumber(userData.cardNumber);
    await setCvvNumber(userData.cvv);
    await selectExpiryMonthFromDropdown(userData.expiryMonth);
    await selectExpiryYearFromDropdown(userData.expiryYear);
    await checkTermsAndConditionCheckbox();
  };

  return { setAddressLine1, fillPaymentForm, payButtonClick };
};
