import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';
import { SearchPage } from './pages/search.page';
import { TourPage } from './pages/tour.page';
import { BookingComponent } from './components/booking.component';
import { BasketComponent } from './components/basket.component';
import { Alerts } from './helpers/enums/alerts.enums';
import { Tours } from './helpers/enums/tours.enums';
import { BasketPage } from './pages/basket.page';


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

  test.only('Booking a trip - checking a basket popup', async ({ page }) => {
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
    await booking.fillBookingModal();

    const bookingDateTimeFromModal = await booking.getBookingDateAndTimeFromModal();

    await booking.addToBasketButtonClick();

    //Assert
    const itemAddedMessage = await basketPopup.getMessageText();
    expect(itemAddedMessage).toBe(Alerts.ItemAddedBasketAlert);

    const tourInBasket = await basketPopup.getTourTitle();
    expect(tourInBasket).toBe(Tours.KatowiceTour);

    const bookingDateInBasket = await basketPopup.getBasketDetails(0);
    expect(bookingDateInBasket).toContain(bookingDateTimeFromModal);

    const adultPrice = await basketPopup.getBasketDetails(1);
    expect(adultPrice).toBe('Adult' + '\n\n' + '1 x £81.00');

    const totalPrice = await basketPopup.getBasketDetails(2);
    expect(totalPrice).toBe('Total' + '\n\n' + '£81.00');
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
    await booking.bookTourForFirstAvailableDate();
    await basketPopup.viewBasketButtonClick();

    //Assert
    const tourInBasket = await basketPage.getTourTitle();
    expect(tourInBasket).toBe(Tours.KatowiceTour);
  });
});
