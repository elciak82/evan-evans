import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { SearchPage } from '../src/pages/search.page';
import { TourPage } from '../src/pages/tour.page';
import { BookingComponent } from '../src/components/booking.component';
import { BasketComponent } from '../src/components/basket.component';
import { Alerts } from '../src/helpers/enums/alerts.enums';
import { Tours } from '../src/helpers/enums/tours.enums';
import { BasketPage } from '../src/pages/basket.page';
import { Persons } from '../src/helpers/enums/persons.enums';
import { UserDetailsPage } from '../src/pages/userDetails.page';
import { HeaderComponent } from '../src/components/header.component';
import { userData } from '../src/test-data/userData.data';

test.describe('VerIfying the Your Details form', () => {
  let homePage: {
    acceptCookie: any;
    searchButtonClick: any;
    inputTextToSearchField: any;
  };

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    homePage = HomePage(page);
    await homePage.acceptCookie();
  });

  test('Confirming an empty form - verifying alerts', async ({ page }) => {
    //Arrange
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);
    const booking = BookingComponent(page);
    const basketPopup = BasketComponent(page);
    const basketPage = BasketPage(page);
    const formPage = UserDetailsPage(page);
    const header = HeaderComponent(page);

    //Act
    await homePage.inputTextToSearchField(Tours.KatowiceTour);
    await homePage.searchButtonClick();

    await searchPage.viewMoreButtonClick();
    await tourPage.bookButtonClick();
    await booking.fillBookingModal(Persons.ADULT);
    await booking.addToBasketButtonClick();
    await basketPopup.checkoutNowButtonClick();
    await formPage.continueToPaymentButtonClick();

    //Assert
    const invalidFirstNameAlert = await formPage.getInvalidFirstNameAlert();
    expect.soft(invalidFirstNameAlert).toBe(Alerts.VALID_NAME_ERROR);

    const invalidLastNameAlert = await formPage.getInvalidLastNameAlert();
    expect.soft(invalidLastNameAlert).toBe(Alerts.VALID_NAME_ERROR);

    const invalidEmailAlert = await formPage.getInvalidEmailAlert();
    expect.soft(invalidEmailAlert).toBe(Alerts.VALID_EMAIL_ERROR);

    const invalidPhoneNumberAlert = await formPage.getInvalidPhoneNumberAlert();
    expect.soft(invalidPhoneNumberAlert).toBe(Alerts.VALID_PHONE_NUMBER_ERROR);

    const invalidCountryAlert = await formPage.getInvalidCountryAlert();
    expect.soft(invalidCountryAlert).toBe(Alerts.VALID_COUNTRY_ERROR);

    const termsAndConditionsUncheckedAlert =
      await formPage.getTermsAndConditionsUncheckedAlert();
    expect.soft(termsAndConditionsUncheckedAlert).toBe(
      Alerts.ACCEPT_TERMS_AND_CONDITION_ERROR,
    );

    //Clear
    await header.openBasket();
    await basketPage.removeTourFromBasket();
    const removedItemAlert = await basketPage.getRemovedItemAlertText();
    expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
  });

  test('Insert correct data to fields and check SIGN ME UP checkboxes - check if all fields/checkboxes are filled in/checked', async ({
    page,
  }) => {
    //Arrange
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);
    const booking = BookingComponent(page);
    const basketPopup = BasketComponent(page);
    const basketPage = BasketPage(page);
    const formPage = UserDetailsPage(page);
    const header = HeaderComponent(page);

    //Act
    await homePage.inputTextToSearchField(Tours.KatowiceTour);
    await homePage.searchButtonClick();

    await searchPage.viewMoreButtonClick();
    await tourPage.bookButtonClick();
    await booking.fillBookingModal(Persons.ADULT);
    await booking.addToBasketButtonClick();
    await basketPopup.checkoutNowButtonClick();
    await formPage.fillYourDetailsForm();
    await formPage.checkSignToEvanEvansNewsletterCheckbox();
    await formPage.checkSignToTreadRightNewsletterCheckbox();

    //Assert
    const firstName = await formPage.getFirstName();
    expect.soft(firstName).toBe(userData.firstName);

    const lastName = await formPage.getLastName();
    expect.soft(lastName).toBe(userData.lastName);

    const yourEmail = await formPage.getYourEmail();
    expect.soft(yourEmail).toBe(userData.yourEmail);

    const phoneNumber = await formPage.getPhoneNumber();
    expect.soft(phoneNumber).toBe(userData.yourPhoneNumber);

    const country = await formPage.getCountry();
    expect.soft(country).toBe(userData.yourCountry);

    const termsAndConditionsIsChecked =
      await formPage.getTermsAndConditionsCheckbox();
    expect.soft(termsAndConditionsIsChecked).toBe(true);

    const signToEvanEvansNewsletterIsChecked =
      await formPage.getSignToEvanEvansNewsletterCheckbox();
    expect.soft(signToEvanEvansNewsletterIsChecked).toBe(true);

    const signToTreadRightNewsletterIsChecked =
      await formPage.getSignToTreadRightNewsletterCheckbox();
    expect.soft(signToTreadRightNewsletterIsChecked).toBe(true);

    //Clear
    await header.openBasket();
    await basketPage.removeTourFromBasket();
    const removedItemAlert = await basketPage.getRemovedItemAlertText();
    expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
  });

  test('Validate the First Name field', async ({ page }) => {
    //Arrange
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);
    const booking = BookingComponent(page);
    const basketPopup = BasketComponent(page);
    const basketPage = BasketPage(page);
    const formPage = UserDetailsPage(page);
    const header = HeaderComponent(page);

    //Act
    await homePage.inputTextToSearchField(Tours.KatowiceTour);
    await homePage.searchButtonClick();

    await searchPage.viewMoreButtonClick();
    await tourPage.bookButtonClick();
    await booking.fillBookingModal(Persons.ADULT);
    await booking.addToBasketButtonClick();
    await basketPopup.checkoutNowButtonClick();

    await formPage.setFirstName(' ');
    await formPage.continueToPaymentButtonClick();

    //Assert
    expect.soft(await formPage.getInvalidFirstNameAlert()).toBe(
      Alerts.VALID_NAME_ERROR,
    );

    //Act
    await formPage.setFirstName('Bo');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidFirstNameAlertIsVisible()).toBe(false);

    //Act
    await formPage.setFirstName('B');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidFirstNameAlertIsVisible()).toBe(true);

    //Act
    await formPage.setFirstName('Ed ');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidFirstNameAlertIsVisible()).toBe(true);

    //Act
    await formPage.setFirstName('Ed Ed');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidFirstNameAlertIsVisible()).toBe(false);

    //Act
    await formPage.setFirstName('Ed Ed2');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidFirstNameAlertIsVisible()).toBe(true);

    //Act
    await formPage.setFirstName('Ed-Ed');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidFirstNameAlertIsVisible()).toBe(false);

    //Act
    await formPage.setFirstName(' Ed-Ed');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidFirstNameAlertIsVisible()).toBe(true);

    //Act
    await formPage.setFirstName('Ed-Ed!');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidFirstNameAlertIsVisible()).toBe(true);

    //Clear
    await header.openBasket();
    await basketPage.removeTourFromBasket();
    const removedItemAlert = await basketPage.getRemovedItemAlertText();
    expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
  });

  test('Validate the Last Name field', async ({ page }) => {
    //Arrange
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);
    const booking = BookingComponent(page);
    const basketPopup = BasketComponent(page);
    const basketPage = BasketPage(page);
    const formPage = UserDetailsPage(page);
    const header = HeaderComponent(page);

    //Act
    await homePage.inputTextToSearchField(Tours.KatowiceTour);
    await homePage.searchButtonClick();

    await searchPage.viewMoreButtonClick();
    await tourPage.bookButtonClick();
    await booking.fillBookingModal(Persons.ADULT);
    await booking.addToBasketButtonClick();
    await basketPopup.checkoutNowButtonClick();

    await formPage.setLastName(' ');
    await formPage.continueToPaymentButtonClick();

    //Assert
    expect.soft(await formPage.getInvalidLastNameAlert()).toBe(
      Alerts.VALID_NAME_ERROR,
    );

    //Act
    await formPage.setLastName('Li');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidLastNameAlertIsVisible()).toBe(false);

    //Act
    await formPage.setLastName('L');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidLastNameAlertIsVisible()).toBe(true);

    //Act
    await formPage.setLastName('Li ');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidLastNameAlertIsVisible()).toBe(true);

    //Act
    await formPage.setLastName('Li Lu');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidLastNameAlertIsVisible()).toBe(false);

    //Act
    await formPage.setLastName('Li Li2');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidLastNameAlertIsVisible()).toBe(true);

    //Act
    await formPage.setLastName('Li-Lu');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidLastNameAlertIsVisible()).toBe(false);

    //Act
    await formPage.setLastName(' Li-Lu');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidLastNameAlertIsVisible()).toBe(true);

    //Act
    await formPage.setLastName('Li-Lu!');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidLastNameAlertIsVisible()).toBe(true);

    //Clear
    await header.openBasket();
    await basketPage.removeTourFromBasket();
    const removedItemAlert = await basketPage.getRemovedItemAlertText();
    expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
  });

  test.only('Validate the Your Email field', async ({ page }) => {
    //Arrange
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);
    const booking = BookingComponent(page);
    const basketPopup = BasketComponent(page);
    const basketPage = BasketPage(page);
    const formPage = UserDetailsPage(page);
    const header = HeaderComponent(page);

    //Act
    await homePage.inputTextToSearchField(Tours.KatowiceTour);
    await homePage.searchButtonClick();

    await searchPage.viewMoreButtonClick();
    await tourPage.bookButtonClick();
    await booking.fillBookingModal(Persons.ADULT);
    await booking.addToBasketButtonClick();
    await basketPopup.checkoutNowButtonClick();

    await formPage.setYourEmail(' ');
    await formPage.continueToPaymentButtonClick();

    //Assert
    expect
      .soft(await formPage.getInvalidEmailAlert())
      .toBe(Alerts.VALID_EMAIL_ERROR);

    //Act
    await formPage.setYourEmail('email');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidEmailAlertIsVisible()).toBe(true);

    //Act
    await formPage.setYourEmail('email@');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidEmailAlertIsVisible()).toBe(true);

    //Act
    await formPage.setYourEmail('email@email');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidEmailAlertIsVisible()).toBe(false);

    //Act
    await formPage.setYourEmail('email@email.');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidEmailAlertIsVisible()).toBe(true);

    //Act
    await formPage.setYourEmail('email@email.com');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidEmailAlertIsVisible()).toBe(false);

    //Act
    await formPage.setYourEmail('email@.email.com');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidEmailAlertIsVisible()).toBe(true);

    //Act
    await formPage.setYourEmail('email.email@email.com');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidEmailAlertIsVisible()).toBe(false);

    //Act
    await formPage.setYourEmail('@email.com');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidEmailAlertIsVisible()).toBe(true);

    //Act
    await formPage.setYourEmail('email-email@email.com');
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect.soft(await formPage.checkInvalidEmailAlertIsVisible()).toBe(false);

    //Clear
    await header.openBasket();
    await basketPage.removeTourFromBasket();
    const removedItemAlert = await basketPage.getRemovedItemAlertText();
    expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
  });
});
