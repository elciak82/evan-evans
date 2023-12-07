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
import { YourDetailsPage } from './pages/yourDetails.page';

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

  test('Insert incorrect data to fields - checking alerts', async ({
    page,
  }) => {
    //Arrange
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);
    const booking = BookingComponent(page);
    const basketPopup = BasketComponent(page);
    const basketPage = BasketPage(page);
    const formPage = YourDetailsPage(page);

    //Act
    await homePage.inputTextToSearchField(Tours.KatowiceTour);
    await homePage.searchButtonClick();

    await searchPage.viewMoreButtonClick();
    await tourPage.bookButtonClick();
    await booking.fillBookingModal(Persons.ADULT);
    await booking.addToBasketButtonClick();
    await basketPopup.checkoutNowButtonClick();

    await formPage.fillYourDetailsForm();

    //Assert

    //Clear
    await basketPopup.viewBasketButtonClick();
    await basketPage.removeTourFromBasket();
    const removedItemAlert = await basketPage.getRemovedItemAlertText();
    expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
  });
});
