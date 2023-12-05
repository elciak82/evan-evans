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

test.describe('Verifying booking', () => {
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

  test('Booking a trip for one child and two children - checking a basket popup', async ({
    page,
  }) => {
    //Arrange
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);
    const booking = BookingComponent(page);
    const basketPopup = BasketComponent(page);

    //Act
    await homePage.inputTextToSearchField(Tours.KatowiceTour);
    await homePage.searchButtonClick();

    await searchPage.viewMoreButtonClick();
    await tourPage.bookButtonClick();
    await booking.fillBookingModal(Persons.CHILD, Persons.ADULT, Persons.ADULT);

    const bookingDateTimeFromModal =
      await booking.getBookingDateAndTimeFromModal();
    const bookingAdultFromModal = await booking.adultBasketPrice();
    const bookingChildFromModal = await booking.childBasketPrice();
    const bookingTotalPriceFromModal = await booking.getBookingTotalFromModal();

    await booking.addToBasketButtonClick();

    //Assert
    const itemAddedMessage = await basketPopup.getMessageText();
    expect(itemAddedMessage).toBe(Alerts.ItemAddedBasketAlert);

    const tourInBasket = await basketPopup.getTourTitle();
    expect(tourInBasket).toBe(Tours.KatowiceTour);

    const basketDetails = await basketPopup.getBasketDetails();
    expect(basketDetails.date).toContain(bookingDateTimeFromModal);
    expect(basketDetails.persons[0]).toContain(bookingChildFromModal);
    expect(basketDetails.persons[1]).toContain(bookingAdultFromModal);
    expect(basketDetails.price).toContain(bookingTotalPriceFromModal);
  });

  test('Booking a trip - checking a tour in the basket', async ({ page }) => {
    //Arrange
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);
    const booking = BookingComponent(page);
    const basketPopup = BasketComponent(page);
    const basketPage = BasketPage(page);

    //Act
    await homePage.inputTextToSearchField(Tours.KatowiceTour);
    await homePage.searchButtonClick();

    await searchPage.viewMoreButtonClick();
    await tourPage.bookButtonClick();
    await booking.bookTourForFirstAvailableDate(Persons.ADULT);
    await basketPopup.viewBasketButtonClick();

    //Assert
    const tourInBasket = await basketPage.getTourTitle();
    expect(tourInBasket).toBe(Tours.KatowiceTour);
  });
});
