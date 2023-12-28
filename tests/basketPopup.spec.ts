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

test.describe('Booking - verifying data in the basket popup', () => {
  let homePageModel: HomePageModel;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    homePageModel = HomePage(page);
    await homePageModel.acceptCookie();
  });

  test('Booking a trip for ONE CHILD and TWO ADULTS - checking data in the basket popup', async ({
    page,
  }) => {
    //Arrange
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);
    const booking = BookingComponent(page);
    const basketPopup = BasketComponent(page);
    const basketPage = BasketPage(page);

    //Act
    await homePageModel.inputTextToSearchField(Tours.KatowiceTour);
    await homePageModel.searchButtonClick();

    await searchPage.viewMoreButtonClick();
    await tourPage.bookButtonClick();
    await booking.fillBookingModal(Persons.ADULT, Persons.ADULT, Persons.CHILD);

    const bookingDateTimeFromModal =
      await booking.getBookingDateAndTimeFromModal();
    const bookingAdultFromModal = await booking.adultBasketPrice();
    const bookingChildFromModal = await booking.childBasketPrice();
    const bookingTotalPriceFromModal =
      await booking.getBookingTotalPriceFromModal();

    await booking.addToBasketButtonClick();

    //Assert
    const itemAddedMessage = await basketPopup.getMessageText();
    expect(itemAddedMessage).toBe(Alerts.ITEM_ADDED_BASKET_ALERT);

    const tourInBasket = await basketPopup.getTourTitle();
    expect(tourInBasket).toBe(Tours.KatowiceTour);

    const basketDetails = await basketPopup.getBasketDetails();
    expect(basketDetails.date).toContain(bookingDateTimeFromModal);
    expect(basketDetails.persons[0]).toContain(bookingAdultFromModal);
    expect(basketDetails.persons[1]).toContain(bookingChildFromModal);
    expect(basketDetails.price).toContain(bookingTotalPriceFromModal);

    //Clear
    await basketPopup.viewBasketButtonClick();
    await basketPage.removeTourFromBasket();
    const removedItemAlert = await basketPage.getRemovedItemAlertText();
    expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
  });
});
