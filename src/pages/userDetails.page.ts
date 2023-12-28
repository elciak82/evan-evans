import { Page } from '@playwright/test';
import { userData } from '../test-data/userData.data';
import { UserDetailsPageModel } from '../models/userDetailsPage.model';

export const UserDetailsPage = (page: Page): UserDetailsPageModel => {
  const firstNameInput = page.locator('#first-name-input');
  const lastNameInput = page.locator('#last-name-input');
  const yourEmailInput = page.locator('#email-input');
  // const yourEmailInput1 = page.locator<HTMLInputElement>('td:nth-child(2) p').val();
  const yourPhoneNumberInput = page.locator('#phone-number-input');
  const countryDropdown = page.locator('#country-select');
  const orEnterCountryInput = page.locator('#country-input');
  const termsAndConditionsCheckbox = page.locator(
    '[class*="default-checkbox--terms"] .form-check-label',
  );
  const signToEvanEvansNewsletterCheckbox = page.locator(
    '[for="evanevans-checkbox"]',
  );
  const signToTreadRightNewsletterCheckbox = page.locator(
    '[for="treadright-checkbox"]',
  );
  const continueToPaymentButton = page.getByRole('button', {
    name: 'Continue to payment',
  });
  const invalidFirstNameAlert = page.locator('#first-name-input-error');
  const invalidFirstNameAlertIsVisible = page.locator(
    '[aria-describedby="first-name-input-error"][aria-invalid="true"]',
  );
  const invalidLastNameAlert = page.locator('#last-name-input-error');
  const invalidLastNameAlertIsVisible = page.locator(
    '[aria-describedby="last-name-input-error"][aria-invalid="true"]',
  );
  const invalidEmailAlert = page.locator('#email-input-error');
  const invalidEmailAlertIsVisible = page.locator(
    '[aria-describedby="email-input-error"][aria-invalid="true"]',
  );
  const invalidPhoneNumberAlert = page.locator('#phone-number-input-error');
  const invalidCountryAlert = page.locator('#country-input-error');
  const termsAndConditionsUncheckedAlert = page.locator('#AcceptTerms-error');

  const setFirstName = async (firstName: string): Promise<void> => {
    await firstNameInput.fill(firstName);
  };

  const setLastName = async (lastName: string): Promise<void> => {
    await lastNameInput.fill(lastName);
  };

  const setYourEmail = async (email: string): Promise<void> => {
    await yourEmailInput.fill(email);
  };

  const setPhoneNumber = async (phone: string): Promise<void> => {
    await yourPhoneNumberInput.fill(phone);
  };

  const setCountry = async (country: string): Promise<void> => {
    await orEnterCountryInput.fill(country);
  };

  const fillYourDetailsForm = async (): Promise<void> => {
    await setFirstName(userData.firstName);
    await setLastName(userData.lastName);
    await setYourEmail(userData.yourEmail);
    await setPhoneNumber(userData.yourPhoneNumber);
    await setCountry(userData.yourCountry);
    await termsAndConditionsCheckbox.setChecked(true);
  };

  const clipboardTextFromInput = async (): Promise<any> => {
    await page.evaluate(() => navigator.userAgent);
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Control+C');
    const clipboardText = await page.evaluate('navigator.clipboard.readText()');
    return clipboardText;
  }; //https://playwrightsolutions.com/how-do-i-check-the-value-inside-an-input-field-with-playwright/

  const getFirstName = async (): Promise<string> => {
    await firstNameInput.click();
    return await clipboardTextFromInput();
  };

  const getLastName = async (): Promise<string> => {
    await lastNameInput.click();
    return clipboardTextFromInput();
  };

  const getYourEmail = async (): Promise<string> => {
    await yourEmailInput.click();
    return clipboardTextFromInput();
  };

  const getPhoneNumber = async (): Promise<string> => {
    await yourPhoneNumberInput.click();
    return clipboardTextFromInput();
  };

  const getCountry = async (): Promise<string> => {
    await orEnterCountryInput.click();
    return clipboardTextFromInput();
  };

  const getTermsAndConditionsCheckbox = async (): Promise<boolean> => {
    return await termsAndConditionsCheckbox.isChecked();
  };

  const getSignToEvanEvansNewsletterCheckbox = async (): Promise<boolean> => {
    return await signToEvanEvansNewsletterCheckbox.isChecked();
  };

  const getSignToTreadRightNewsletterCheckbox = async (): Promise<boolean> => {
    return await signToTreadRightNewsletterCheckbox.isChecked();
  };

  const checkSignToEvanEvansNewsletterCheckbox = async (): Promise<void> => {
    await signToEvanEvansNewsletterCheckbox.setChecked(true); //TODO refactor to boolean
  };

  const checkSignToTreadRightNewsletterCheckbox = async (): Promise<void> => {
    await signToTreadRightNewsletterCheckbox.setChecked(true); //TODO refactor to boolean
  };

  const continueToPaymentButtonClick = async (): Promise<void> => {
    await page.waitForLoadState();
    await continueToPaymentButton.click();
    await page.waitForLoadState();
  };

  const fillAndConfirmDetailsForm = async (): Promise<void> => {
    await fillYourDetailsForm();
    await continueToPaymentButtonClick();
  };

  const getInvalidFirstNameAlert = async (): Promise<string> => {
    return await invalidFirstNameAlert.innerText();
  };

  const checkInvalidFirstNameAlertIsVisible = async (): Promise<boolean> => {
    return await invalidFirstNameAlertIsVisible.isVisible();
  };

  const getInvalidLastNameAlert = async (): Promise<string> => {
    return await invalidLastNameAlert.innerText();
  };

  const checkInvalidLastNameAlertIsVisible = async (): Promise<boolean> => {
    return await invalidLastNameAlertIsVisible.isVisible();
  };

  const getInvalidEmailAlert = async (): Promise<string> => {
    return await invalidEmailAlert.innerText();
  };

  const checkInvalidEmailAlertIsVisible = async (): Promise<boolean> => {
    return await invalidEmailAlertIsVisible.isVisible();
  };

  const getInvalidPhoneNumberAlert = async (): Promise<string> => {
    return await invalidPhoneNumberAlert.innerText();
  };

  const getInvalidCountryAlert = async (): Promise<string> => {
    return await invalidCountryAlert.innerText();
  };

  const getTermsAndConditionsUncheckedAlert = async (): Promise<string> => {
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
    checkSignToEvanEvansNewsletterCheckbox,
    checkSignToTreadRightNewsletterCheckbox,
    getFirstName,
    getLastName,
    getYourEmail,
    getPhoneNumber,
    getCountry,
    setFirstName,
    setLastName,
    setYourEmail,
    setPhoneNumber,
    setCountry,
    getTermsAndConditionsCheckbox,
    getSignToEvanEvansNewsletterCheckbox,
    getSignToTreadRightNewsletterCheckbox,
    checkInvalidFirstNameAlertIsVisible,
    checkInvalidLastNameAlertIsVisible,
    checkInvalidEmailAlertIsVisible,
  };
};
