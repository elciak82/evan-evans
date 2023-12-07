import { Page } from '@playwright/test';
import { userData } from '../test-data/userData.data';

export const YourDetailsPage = (page: Page) => {
  const firstNameInput = page.locator('#first-name-input');
  const lastNameInput = page.locator('#last-name-input');
  const yourEmailInput = page.locator('#email-input');
  const yourPhoneNumberInput = page.locator('#phone-number-input');
  const countryDropdown = page.locator('#country-select');
  const orEnterCountryInput = page.locator('#country-input');
  const termsAndConditionsCheckbox = page.locator(
    '[class*="default-checkbox--terms"] .form-check-label',
  );

  const fillYourDetailsForm = async (): Promise<void> => {
    await firstNameInput.fill(userData.firstName);
    await lastNameInput.fill(userData.lastName);
    await yourEmailInput.fill(userData.yourEmail);
    await yourPhoneNumberInput.fill(userData.yourPhoneNumber);
    await orEnterCountryInput.fill(userData.yourCountry);
    await termsAndConditionsCheckbox.click();
  };

  return { fillYourDetailsForm };
};
