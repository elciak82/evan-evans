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
import { PaymentPage } from '../src/pages/payment.page';
import { Countries } from '../src/helpers/enums/countries.enums';

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

  test.only('Insert correct data to fields and check SIGN ME UP checkboxes - check if all fields/checkboxes are filled in/checked', async ({
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
    const paymentPage = PaymentPage(page);

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
    await formPage.continueToPaymentButtonClick();

    await paymentPage.setAddressLine1('Test');

    //Assert

    //Clear
    await header.openBasket();
    await basketPage.removeTourFromBasket();
    const removedItemAlert = await basketPage.getRemovedItemAlertText();
    expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
  });
});
