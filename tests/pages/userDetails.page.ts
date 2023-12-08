import { Page } from '@playwright/test';
import { userData } from '../test-data/userData.data';
import { WebEntity } from '../webEntity';

export const UserDetailsPage = (page: Page) => {
  let webEntity: {
    clipboardTextFromInput: any;
  };
  const firstNameInput = page.locator('#first-name-input');
  const lastNameInput = page.locator('#last-name-input');
  const yourEmailInput = page.locator('#email-input');
  const yourEmailInput1 = page.$('#email-input');
  // const yourEmailInpu1 = page.locator<HTMLInputElement>('td:nth-child(2) p').val();
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
    await termsAndConditionsCheckbox.setChecked(true);
  };

  // const changeIt = function () {
  //   var inputValue = (<HTMLInputElement>(
  //     document.getElementById('#first-name-input')
  //   )).value;
  //   return console.log(inputValue);
  // };

  const getFirstName = async () => {
    webEntity = WebEntity(page);
    webEntity.clipboardTextFromInput();
    await firstNameInput.click();
    return webEntity.clipboardTextFromInput();
    // let userAgentInfo = await page.evaluate(() => navigator.userAgent);
    // await page.keyboard.press("Control+A");
    // await page.keyboard.press("Control+C");
    // let clipboardText = await page.evaluate("navigator.clipboard.readText()");
    // return clipboardText;
  }; //https://playwrightsolutions.com/how-do-i-check-the-value-inside-an-input-field-with-playwright/

  const getLastName = async () => {
    return await lastNameInput.innerText();
  };

  const getYourEmail = async () => {
    return await yourEmailInput.innerText();
  };

  const getPhoneNumberEmail = async () => {
    return await yourPhoneNumberInput.innerText();
  };

  const getCountry = async () => {
    return await orEnterCountryInput.innerText();
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

  const checkSignToEvanEvansNewsletterCheckbox = async () => {
    await signToEvanEvansNewsletterCheckbox.setChecked(true);
  };

  const checkSignToTreadRightNewsletterCheckbox = async () => {
    await signToTreadRightNewsletterCheckbox.setChecked(true);
  };

  const continueToPaymentButtonClick = async () => {
    await continueToPaymentButton.click(); //I know this is incorrect, but it has to be like that for now
    await continueToPaymentButton.click();
  };

  const fillAndConfirmDetailsForm = async () => {
    await fillYourDetailsForm();
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
    checkSignToEvanEvansNewsletterCheckbox,
    checkSignToTreadRightNewsletterCheckbox,
    getFirstName,
    getLastName,
    getYourEmail,
    getPhoneNumberEmail,
    getCountry,
    getTermsAndConditionsCheckbox,
    getSignToEvanEvansNewsletterCheckbox,
    getSignToTreadRightNewsletterCheckbox,
  };
};
function clipboardTextFromInput(): import('playwright-core').Page {
  throw new Error('Function not implemented.');
}
