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
import { HomePageModel } from '../src/models/homePage.model';
import { BasePageModel } from '../src/models/basePage.model';
import { BasketPageModel } from '../src/models/basketPage.model';
import { SearchPageModel } from '../src/models/searchPage.model';
import { TourPageModel } from '../src/models/tourPage.model';
import { BasePage } from '../src/pages/base.page';
import { BasketComponentModel } from '../src/models/basketComponent.model';

test.describe('Booking - verifying data in the basket popup', () => {
  let basePageModel: BasePageModel;
  let homePageModel: HomePageModel;
  let basketPageModel: BasketPageModel;
  let searchPageModel: SearchPageModel;
  let tourPageModel: TourPageModel;
  let basketComponentModel: BasketComponentModel;

  test.beforeEach(async ({ page }) => {
    basePageModel = BasePage(page);
    await basePageModel.goTo();

    homePageModel = HomePage(page);
    await homePageModel.acceptCookie();
  });

  test('Booking a trip for ONE CHILD and TWO ADULTS - checking data in the basket popup', async ({
    page,
  }) => {
    //Arrange
    searchPageModel = SearchPage(page);
    tourPageModel = TourPage(page);
    const booking = BookingComponent(page);
    basketComponentModel = BasketComponent(page);
    basketPageModel = BasketPage(page);

    //Act
    await homePageModel.inputTextToSearchField(Tours.KatowiceTour);
    await homePageModel.searchButtonClick();

    await searchPageModel.viewMoreButtonClick();
    await tourPageModel.bookButtonClick();
    await booking.fillBookingModal(Persons.ADULT, Persons.ADULT, Persons.CHILD);

    const bookingDateTimeFromModal =
      await booking.getBookingDateAndTimeFromModal();
    const bookingAdultFromModal = await booking.adultBasketPrice();
    const bookingChildFromModal = await booking.childBasketPrice();
    const bookingTotalPriceFromModal =
      await booking.getBookingTotalPriceFromModal();

    await booking.addToBasketButtonClick();

    //Assert
    const itemAddedMessage = await basketComponentModel.getMessageText();
    expect(itemAddedMessage).toBe(Alerts.ITEM_ADDED_BASKET_ALERT);

    const tourInBasket = await basketComponentModel.getTourTitle();
    expect(tourInBasket).toBe(Tours.KatowiceTour);

    const basketDetails = await basketComponentModel.getBasketDetails();
    expect(basketDetails.date).toContain(bookingDateTimeFromModal);
    expect(basketDetails.persons[0]).toContain(bookingAdultFromModal);
    expect(basketDetails.persons[1]).toContain(bookingChildFromModal);
    expect(basketDetails.price).toContain(bookingTotalPriceFromModal);

    //Clear
    await basketComponentModel.viewBasketButtonClick();
    await basketPageModel.removeTourFromBasket();
    const removedItemAlert = await basketPageModel.getRemovedItemAlertText();
    expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
  });
});
