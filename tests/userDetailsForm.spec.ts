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
import { BasePageModel } from '../src/models/basePage.model';
import { HomePageModel } from '../src/models/homePage.model';
import { BasePage } from '../src/pages/base.page';
import { BasketPageModel } from '../src/models/basketPage.model';
import { SearchPageModel } from '../src/models/searchPage.model';
import { TourPageModel } from '../src/models/tourPage.model';
import { UserDetailsPageModel } from '../src/models/userDetailsPage.model';
import { BasketComponentModel } from '../src/models/basketComponent.model';
import { BookingComponentModel } from '../src/models/bookingComponent.model';
import { HeaderComponentModel } from '../src/models/headerComponent.model';
import { UserDataGenerator } from '../src/datafactory/user';
import { getTestTitle } from '../src/helpers/utilities';

test.describe('VerIfying the Your Details form', () => {
  let basePageModel: BasePageModel;
  let homePageModel: HomePageModel;
  let basketPageModel: BasketPageModel;
  let searchPageModel: SearchPageModel;
  let tourPageModel: TourPageModel;
  let userDetailsPageModel: UserDetailsPageModel;
  let basketComponentModel: BasketComponentModel;
  let bookingComponentModel: BookingComponentModel;
  let headerComponentModel: HeaderComponentModel;

  test.beforeEach(async ({ page }) => {
    basePageModel = BasePage(page);
    await basePageModel.goTo();

    homePageModel = HomePage(page);
    await homePageModel.acceptCookie();
  });

  test(
    getTestTitle('TC04', 'Confirming an empty form - verifying alerts'),
    async ({ page }) => {
      //Arrange
      searchPageModel = SearchPage(page);
      tourPageModel = TourPage(page);
      bookingComponentModel = BookingComponent(page);
      basketComponentModel = BasketComponent(page);
      basketPageModel = BasketPage(page);
      userDetailsPageModel = UserDetailsPage(page);
      headerComponentModel = HeaderComponent(page);

      //Act
      await homePageModel.inputTextToSearchField('VISITING TRAVCORP');
      await homePageModel.searchButtonClick();

      await searchPageModel.viewMoreButtonClick();
      await tourPageModel.bookButtonClick();
      await bookingComponentModel.fillBookingModal(Persons.ADULT);
      await bookingComponentModel.addToBasketButtonClick();
      await basketComponentModel.checkoutNowButtonClick();
      await userDetailsPageModel.continueToPaymentButtonClick();

      //Assert
      const invalidFirstNameAlert =
        await userDetailsPageModel.getInvalidFirstNameAlert();
      expect.soft(invalidFirstNameAlert).toBe(Alerts.VALID_NAME_ERROR);

      const invalidLastNameAlert =
        await userDetailsPageModel.getInvalidLastNameAlert();
      expect.soft(invalidLastNameAlert).toBe(Alerts.VALID_NAME_ERROR);

      const invalidEmailAlert =
        await userDetailsPageModel.getInvalidEmailAlert();
      expect.soft(invalidEmailAlert).toBe(Alerts.VALID_EMAIL_ERROR);

      const invalidPhoneNumberAlert =
        await userDetailsPageModel.getInvalidPhoneNumberAlert();
      expect
        .soft(invalidPhoneNumberAlert)
        .toBe(Alerts.VALID_PHONE_NUMBER_ERROR);

      const invalidCountryAlert =
        await userDetailsPageModel.getInvalidCountryAlert();
      expect.soft(invalidCountryAlert).toBe(Alerts.VALID_COUNTRY_ERROR);

      const termsAndConditionsUncheckedAlert =
        await userDetailsPageModel.getTermsAndConditionsUncheckedAlert();
      expect
        .soft(termsAndConditionsUncheckedAlert)
        .toBe(Alerts.ACCEPT_TERMS_AND_CONDITION_ERROR);

      //Clear
      await headerComponentModel.openBasket();
      await basketPageModel.removeTourFromBasket();
      const removedItemAlert = await basketPageModel.getRemovedItemAlertText();
      expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
    },
  );

  test(
    getTestTitle(
      'TC05',
      'Insert correct data to fields and check SIGN ME UP checkboxes - check if all fields/checkboxes are filled in/checked',
    ),
    async ({ page }) => {
      //Arrange
      searchPageModel = SearchPage(page);
      tourPageModel = TourPage(page);
      bookingComponentModel = BookingComponent(page);
      basketComponentModel = BasketComponent(page);
      basketPageModel = BasketPage(page);
      userDetailsPageModel = UserDetailsPage(page);
      headerComponentModel = HeaderComponent(page);

      //Act
      await homePageModel.inputTextToSearchField('VISITING TRAVCORP');
      await homePageModel.searchButtonClick();

      await searchPageModel.viewMoreButtonClick();
      await tourPageModel.bookButtonClick();
      await bookingComponentModel.fillBookingModal(Persons.ADULT);
      await bookingComponentModel.addToBasketButtonClick();
      await basketComponentModel.checkoutNowButtonClick();
      const userData = await UserDataGenerator().createRandomUser();
      await userDetailsPageModel.fillYourDetailsForm(userData);
      await userDetailsPageModel.checkSignToEvanEvansNewsletterCheckbox();
      await userDetailsPageModel.checkSignToTreadRightNewsletterCheckbox();

      const firstName = await userDetailsPageModel.getFirstName();
      expect.soft(firstName).toBe(userData.firstName);

      const lastName = await userDetailsPageModel.getLastName();
      expect.soft(lastName).toBe(userData.lastName);

      const yourEmail = await userDetailsPageModel.getYourEmail();
      expect.soft(yourEmail).toBe(userData.email);

      const phoneNumber = await userDetailsPageModel.getPhoneNumber();
      expect.soft(phoneNumber).toBe(userData.phone);

      const country = await userDetailsPageModel.getCountry();
      expect.soft(country).toBe(userData.country);

      const termsAndConditionsIsChecked =
        await userDetailsPageModel.getTermsAndConditionsCheckbox();
      expect.soft(termsAndConditionsIsChecked).toBe(true);

      const signToEvanEvansNewsletterIsChecked =
        await userDetailsPageModel.getSignToEvanEvansNewsletterCheckbox();
      expect.soft(signToEvanEvansNewsletterIsChecked).toBe(true);

      const signToTreadRightNewsletterIsChecked =
        await userDetailsPageModel.getSignToTreadRightNewsletterCheckbox();
      expect.soft(signToTreadRightNewsletterIsChecked).toBe(true);

      //Clear
      await headerComponentModel.openBasket();
      await basketPageModel.removeTourFromBasket();
      const removedItemAlert = await basketPageModel.getRemovedItemAlertText();
      expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
    },
  );

  test(
    getTestTitle('TC06', 'Validate the First Name field @regression'),
    async ({ page }) => {
      //Arrange
      searchPageModel = SearchPage(page);
      tourPageModel = TourPage(page);
      bookingComponentModel = BookingComponent(page);
      basketComponentModel = BasketComponent(page);
      basketPageModel = BasketPage(page);
      userDetailsPageModel = UserDetailsPage(page);
      headerComponentModel = HeaderComponent(page);

      //Act
      await homePageModel.inputTextToSearchField('VISITING TRAVCORP');
      await homePageModel.searchButtonClick();

      await searchPageModel.viewMoreButtonClick();
      await tourPageModel.bookButtonClick();
      await bookingComponentModel.fillBookingModal(Persons.ADULT);
      await bookingComponentModel.addToBasketButtonClick();
      await basketComponentModel.checkoutNowButtonClick();

      await userDetailsPageModel.setFirstName(' ');
      await userDetailsPageModel.continueToPaymentButtonClick();

      //Assert
      expect
        .soft(await userDetailsPageModel.getInvalidFirstNameAlert())
        .toBe(Alerts.VALID_NAME_ERROR);

      //Act
      await userDetailsPageModel.setFirstName('Bo');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidFirstNameAlertIsVisible())
        .toBe(false);

      //Act
      await userDetailsPageModel.setFirstName('B');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidFirstNameAlertIsVisible())
        .toBe(true);

      //Act
      await userDetailsPageModel.setFirstName('Ed ');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidFirstNameAlertIsVisible())
        .toBe(true);

      //Act
      await userDetailsPageModel.setFirstName('Ed Ed');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidFirstNameAlertIsVisible())
        .toBe(false);

      //Act
      await userDetailsPageModel.setFirstName('Ed Ed2');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidFirstNameAlertIsVisible())
        .toBe(true);

      //Act
      await userDetailsPageModel.setFirstName('Ed-Ed');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidFirstNameAlertIsVisible())
        .toBe(false);

      //Act
      await userDetailsPageModel.setFirstName(' Ed-Ed');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidFirstNameAlertIsVisible())
        .toBe(true);

      //Act
      await userDetailsPageModel.setFirstName('Ed-Ed!');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidFirstNameAlertIsVisible())
        .toBe(true);

      //Clear
      await headerComponentModel.openBasket();
      await basketPageModel.removeTourFromBasket();
      const removedItemAlert = await basketPageModel.getRemovedItemAlertText();
      expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
    },
  );

  test(
    getTestTitle('TC07', 'Validate the Last Name field'),
    async ({ page }) => {
      //Arrange
      searchPageModel = SearchPage(page);
      tourPageModel = TourPage(page);
      bookingComponentModel = BookingComponent(page);
      basketComponentModel = BasketComponent(page);
      basketPageModel = BasketPage(page);
      userDetailsPageModel = UserDetailsPage(page);
      headerComponentModel = HeaderComponent(page);

      //Act
      await homePageModel.inputTextToSearchField('VISITING TRAVCORP');
      await homePageModel.searchButtonClick();

      await searchPageModel.viewMoreButtonClick();
      await tourPageModel.bookButtonClick();
      await bookingComponentModel.fillBookingModal(Persons.ADULT);
      await bookingComponentModel.addToBasketButtonClick();
      await basketComponentModel.checkoutNowButtonClick();

      await userDetailsPageModel.setLastName(' ');
      await userDetailsPageModel.continueToPaymentButtonClick();

      //Assert
      expect
        .soft(await userDetailsPageModel.getInvalidLastNameAlert())
        .toBe(Alerts.VALID_NAME_ERROR);

      //Act
      await userDetailsPageModel.setLastName('Li');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidLastNameAlertIsVisible())
        .toBe(false);

      //Act
      await userDetailsPageModel.setLastName('L');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidLastNameAlertIsVisible())
        .toBe(true);

      //Act
      await userDetailsPageModel.setLastName('Li ');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidLastNameAlertIsVisible())
        .toBe(true);

      //Act
      await userDetailsPageModel.setLastName('Li Lu');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidLastNameAlertIsVisible())
        .toBe(false);

      //Act
      await userDetailsPageModel.setLastName('Li Li2');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidLastNameAlertIsVisible())
        .toBe(true);

      //Act
      await userDetailsPageModel.setLastName('Li-Lu');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidLastNameAlertIsVisible())
        .toBe(false);

      //Act
      await userDetailsPageModel.setLastName(' Li-Lu');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidLastNameAlertIsVisible())
        .toBe(true);

      //Act
      await userDetailsPageModel.setLastName('Li-Lu!');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidLastNameAlertIsVisible())
        .toBe(true);

      //Clear
      await headerComponentModel.openBasket();
      await basketPageModel.removeTourFromBasket();
      const removedItemAlert = await basketPageModel.getRemovedItemAlertText();
      expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
    },
  );

  test(
    getTestTitle('TC08', 'Validate the Your Email field'),
    async ({ page }) => {
      //Arrange
      searchPageModel = SearchPage(page);
      tourPageModel = TourPage(page);
      bookingComponentModel = BookingComponent(page);
      basketComponentModel = BasketComponent(page);
      basketPageModel = BasketPage(page);
      userDetailsPageModel = UserDetailsPage(page);
      headerComponentModel = HeaderComponent(page);

      //Act
      await homePageModel.inputTextToSearchField(Tours.VisitingRybnik);
      await homePageModel.searchButtonClick();

      await searchPageModel.viewMoreButtonClick();
      await tourPageModel.bookButtonClick();
      await bookingComponentModel.fillBookingModal(Persons.ADULT);
      await bookingComponentModel.addToBasketButtonClick();
      await basketComponentModel.checkoutNowButtonClick();

      await userDetailsPageModel.setYourEmail(' ');
      await userDetailsPageModel.continueToPaymentButtonClick();

      //Assert
      expect
        .soft(await userDetailsPageModel.getInvalidEmailAlert())
        .toBe(Alerts.VALID_EMAIL_ERROR);

      //Act
      await userDetailsPageModel.setYourEmail('email');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidEmailAlertIsVisible())
        .toBe(true);

      //Act
      await userDetailsPageModel.setYourEmail('email@');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidEmailAlertIsVisible())
        .toBe(true);

      //Act
      await userDetailsPageModel.setYourEmail('email@email');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidEmailAlertIsVisible())
        .toBe(false);

      //Act
      await userDetailsPageModel.setYourEmail('email@email.');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidEmailAlertIsVisible())
        .toBe(true);

      //Act
      await userDetailsPageModel.setYourEmail('email@email.com');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidEmailAlertIsVisible())
        .toBe(false);

      //Act
      await userDetailsPageModel.setYourEmail('email@.email.com');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidEmailAlertIsVisible())
        .toBe(true);

      //Act
      await userDetailsPageModel.setYourEmail('email.email@email.com');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidEmailAlertIsVisible())
        .toBe(false);

      //Act
      await userDetailsPageModel.setYourEmail('@email.com');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidEmailAlertIsVisible())
        .toBe(true);

      //Act
      await userDetailsPageModel.setYourEmail('email-email@email.com');
      await userDetailsPageModel.continueToPaymentButtonClick();
      //Assert
      expect
        .soft(await userDetailsPageModel.checkInvalidEmailAlertIsVisible())
        .toBe(false);

      //Clear
      await headerComponentModel.openBasket();
      await basketPageModel.removeTourFromBasket();
      const removedItemAlert = await basketPageModel.getRemovedItemAlertText();
      expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
    },
  );
});
