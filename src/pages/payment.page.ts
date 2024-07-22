import { Page } from '@playwright/test';
import { Countries } from '../helpers/enums/countries.enums';
import { userData } from '../test-data/userData.data';
import { PaymentPageModel } from '../models/paymentPage.model';

export const PaymentPage = (page: Page): PaymentPageModel => {
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

    const emailInput = page
    .frameLocator('#cardPaymentForm')
    .locator('#payment-form-email');

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

  const selectCountryFromDropdown = async (country: Countries): Promise<void> => {
    await selectCountry.fill(country);
  };

  const setAddressLine1 = async (address: string): Promise<void> => {
    await page.waitForSelector('#cardPaymentForm');
    await addressLine1Input.fill(address);
  };

  const setAddressLine2 = async (address: string): Promise<void> => {
    await addressLine2Input.fill(address);
  };

  const setCity = async (city: string): Promise<void> => {
    await cityInput.fill(city);
  };

  const setZip = async (zip: string): Promise<void> => {
    await zipInput.fill(zip);
  };

  const setEmail = async (email: string): Promise<void> => {
    await emailInput.fill(email);
  };

  //const selectRegionFromDropdown TODO

  const setCardNumber = async (card: string): Promise<void> => {
    await cardNumberInput.fill(card);
  };

  const selectExpiryMonthFromDropdown = async (month: string): Promise<void> => {
    await selectExpiryMonth.selectOption(month);
  };

  const selectExpiryYearFromDropdown = async (year: string): Promise<void> => {
    await selectExpiryYear.selectOption(year);
  };

  const setCvvNumber = async (cvv: string): Promise<void> => {
    await cardCvvInput.fill(cvv);
  };

  const checkTermsAndConditionCheckbox = async (): Promise<void> => {
    await termsAndConditionsCheckbox.setChecked(true);
  };

  const payButtonClick = async (): Promise<void> => {
    await payButton.click();
  };

  const fillPaymentForm = async (): Promise<void> => {
    await setAddressLine1(userData.addressLine1);
    await page.waitForTimeout(500);
    await setAddressLine2(userData.addressLine2);
    await page.waitForTimeout(500);
    await setCity(userData.city);
    await page.waitForTimeout(500);
    await setZip(userData.zipCode);
    await page.waitForTimeout(500);
    await setEmail(userData.yourEmail);
    await page.waitForTimeout(500);
    await setCardNumber(userData.cardNumber);
    await page.waitForTimeout(500);
    await selectExpiryMonthFromDropdown(userData.expiryMonth);
    await page.waitForTimeout(500);
    await selectExpiryYearFromDropdown(userData.expiryYear);
    await page.waitForTimeout(500);
    await setCvvNumber(userData.cvv);
    await page.waitForTimeout(500);
    await checkTermsAndConditionCheckbox();
  };

  return { fillPaymentForm, payButtonClick };
};
