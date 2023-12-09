import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';
import { SearchPage } from './pages/search.page';
import { TourPage } from './pages/tour.page';
import { BookingComponent } from './components/booking.component';
import { BasketComponent } from './components/basket.component';
import { Alerts } from './helpers/enums/alerts.enums';
import { Tours } from './helpers/enums/tours.enums';
import { BasketPage } from './pages/basket.page';
import { Persons } from './helpers/enums/persons.enums';
import { UserDetailsPage } from './pages/userDetails.page';
import { HeaderComponent } from './components/header.component';
import { userData } from './test-data/userData.data';

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
    expect(invalidFirstNameAlert).toBe(Alerts.VALID_NAME_ERROR);

    const invalidLastNameAlert = await formPage.getInvalidLastNameAlert();
    expect(invalidLastNameAlert).toBe(Alerts.VALID_NAME_ERROR);

    const invalidEmailAlert = await formPage.getInvalidEmailAlert();
    expect(invalidEmailAlert).toBe(Alerts.VALID_EMAIL_ERROR);

    const invalidPhoneNumberAlert = await formPage.getInvalidPhoneNumberAlert();
    expect(invalidPhoneNumberAlert).toBe(Alerts.VALID_PHONE_NUMBER_ERROR);

    const invalidCountryAlert = await formPage.getInvalidCountryAlert();
    expect(invalidCountryAlert).toBe(Alerts.VALID_COUNTRY_ERROR);

    const termsAndConditionsUncheckedAlert =
      await formPage.getTermsAndConditionsUncheckedAlert();
    expect(termsAndConditionsUncheckedAlert).toBe(
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
    expect(firstName).toBe(userData.firstName);

    const lastName = await formPage.getLastName();
    expect(lastName).toBe(userData.lastName);

    const yourEmail = await formPage.getYourEmail();
    expect(yourEmail).toBe(userData.yourEmail);

    const phoneNumber = await formPage.getPhoneNumber();
    expect(phoneNumber).toBe(userData.yourPhoneNumber);

    const country = await formPage.getCountry();
    expect(country).toBe(userData.yourCountry);

    const termsAndConditionsIsChecked =
      await formPage.getTermsAndConditionsCheckbox();
    expect(termsAndConditionsIsChecked).toBe(true);

    const signToEvanEvansNewsletterIsChecked =
      await formPage.getSignToEvanEvansNewsletterCheckbox();
    expect(signToEvanEvansNewsletterIsChecked).toBe(true);

    const signToTreadRightNewsletterIsChecked =
      await formPage.getSignToTreadRightNewsletterCheckbox();
    expect(signToTreadRightNewsletterIsChecked).toBe(true);

    //Clear
    await header.openBasket();
    await basketPage.removeTourFromBasket();
    const removedItemAlert = await basketPage.getRemovedItemAlertText();
    expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
  });

  test.only('Validate the First Name field', async ({ page }) => {
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
    const invalidFirstNameAlert = await formPage.invalidFirstNameAlertIsVisible();
    expect(invalidFirstNameAlert).toBe(true);

    await formPage.setFirstName('vv');
    console.log(await formPage.getFirstName());
    await formPage.continueToPaymentButtonClick();
    //Assert
    expect(invalidFirstNameAlert).toBe(false);

    //Clear
    await header.openBasket();
    await basketPage.removeTourFromBasket();
    const removedItemAlert = await basketPage.getRemovedItemAlertText();
    expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
  });
});
