export type UserDetailsPageModel = {
  fillYourDetailsForm(): Promise<void>;
  continueToPaymentButtonClick(): Promise<void>;
  getInvalidFirstNameAlert(): Promise<string>;
  getInvalidLastNameAlert(): Promise<string>;
  getInvalidEmailAlert(): Promise<string>;
  getInvalidPhoneNumberAlert(): Promise<string>;
  getInvalidCountryAlert(): Promise<string>;
  getTermsAndConditionsUncheckedAlert(): Promise<string>;
  checkSignToEvanEvansNewsletterCheckbox(): Promise<void>;
  checkSignToTreadRightNewsletterCheckbox(): Promise<void>;
  getFirstName(): Promise<string>;
  getLastName(): Promise<string>;
  getYourEmail(): Promise<string>;
  getPhoneNumber(): Promise<string>;
  getCountry(): Promise<string>;
  setFirstName(firstName: string): Promise<void>;
  setLastName(lastName: string): Promise<void>;
  setYourEmail(email: string): Promise<void>;
  setPhoneNumber(phone: string): Promise<void>;
  setCountry(country: string): Promise<void>;
  getTermsAndConditionsCheckbox(): Promise<boolean>;
  getSignToEvanEvansNewsletterCheckbox(): Promise<boolean>;
  getSignToTreadRightNewsletterCheckbox(): Promise<boolean>;
  checkInvalidFirstNameAlertIsVisible(): Promise<boolean>;
  checkInvalidLastNameAlertIsVisible(): Promise<boolean>;
  checkInvalidEmailAlertIsVisible(): Promise<boolean>;
};
