import { Page } from '@playwright/test';
import { userData } from '../test-data/userData.data';

export const UserDetailsPage = (page: Page) => {
  const firstNameInput = page.locator('#first-name-input');
  const lastNameInput = page.locator('#last-name-input');
  const yourEmailInput = page.locator('#email-input');
  const yourPhoneNumberInput = page.locator('#phone-number-input');
  const countryDropdown = page.locator('#country-select');
  const orEnterCountryInput = page.locator('#country-input');
  const termsAndConditionsCheckbox = page.locator(
    '[class*="default-checkbox--terms"] .form-check-label',
  );
  const continueToPaymentButton = page.getByRole('button', {
    name: 'Continue to payment',
  });
  const invalidFirstNameAlert = page.locator('#first-name-input-error');
  const invalidLastNameAlert = page.locator('#last-name-input-error');
  const invalidEmailAlert = page.locator('#email-input-error');
  const invalidPhoneNumberAlert = page.locator('#phone-number-input-error');
  const invalidCountryAlert = page.locator('#country-input-error');
  const termsAndConditionsUncheckedAlert = page.locator('#AcceptTerms-error');

  const fillYourDetailsForm = async (): Promise<void> => {
    await firstNameInput.fill(userData.firstName);
    await lastNameInput.fill(userData.lastName);
    await yourEmailInput.fill(userData.yourEmail);
    await yourPhoneNumberInput.fill(userData.yourPhoneNumber);
    await orEnterCountryInput.fill(userData.yourCountry);
    await termsAndConditionsCheckbox.click();
  };

  const continueToPaymentButtonClick = async () => {
    await continueToPaymentButton.click();
    await page.waitForLoadState();
  };

  const fillAndConfirmDetailsForm = async () => {
    await fillAndConfirmDetailsForm();
    await continueToPaymentButtonClick();
  };

  const getInvalidFirstNameAlert = async () => {
    return await invalidFirstNameAlert.innerText();
  };

  const getInvalidLastNameAlert = async () => {
    return await invalidLastNameAlert.innerText();
  };

  const getInvalidEmailAlert = async () => {
    return await invalidEmailAlert.innerText();
  };

  const getInvalidPhoneNumberAlert = async () => {
    return await invalidPhoneNumberAlert.innerText();
  };

  const getInvalidCountryAlert = async () => {
    return await invalidCountryAlert.innerText();
  };

  const getTermsAndConditionsUncheckedAlert = async () => {
    return await termsAndConditionsUncheckedAlert.innerText();
  };

  return {
    fillYourDetailsForm,
    continueToPaymentButtonClick,
    getInvalidFirstNameAlert,
    getInvalidLastNameAlert,
    getInvalidEmailAlert,
    getInvalidPhoneNumberAlert,
    getInvalidCountryAlert,
    getTermsAndConditionsUncheckedAlert,
  };
};
