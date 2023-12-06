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

  test('Booking a trip for one child and two adults - checking a basket popup', async ({
    page,
  }) => {
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
    basketPopup.viewBasketButtonClick
    await basketPage.removeTourFromBasket();
    const removedItemAlert = await basketPage.getRemoverItemAlertText();
    expect(Alerts.ITEM_REMOVED_BASKET_ALERT).toBe(removedItemAlert);
  });

  test('Booking a trip for ONE ADULT and TWO CHILDREN - checking a tour in the basket', async ({
    page,
  }) => {
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
    await booking.fillBookingModal(Persons.ADULT, Persons.CHILD, Persons.CHILD);

    const bookingDateTimeFromModal =
      await booking.getBookingDateAndTimeFromModal();
    const bookingAdultFromModal = await booking.adultBasketPrice();
    const bookingChildFromModal = await booking.childBasketPrice();
    const bookingTotalPriceFromModal =
      await booking.getBookingTotalPriceFromModal();

    await booking.addToBasketButtonClick();

    await basketPopup.viewBasketButtonClick();

    //Assert
    const tourInBasket = await basketPage.getTourTitle();
    expect(tourInBasket).toBe(Tours.KatowiceTour);

    const basketCardDetails = await basketPage.getBasketCardDetails();
    expect(basketCardDetails.date).toContain(bookingDateTimeFromModal);
    expect(basketCardDetails.persons[0]).toContain(bookingAdultFromModal);
    expect(basketCardDetails.persons[1]).toContain(bookingChildFromModal);

    const basketSummaryDetails = await basketPage.getBasketSummaryDetails();
    expect(basketSummaryDetails.persons[0]).toContain(bookingAdultFromModal);
    expect(basketSummaryDetails.persons[1]).toContain(bookingChildFromModal);
    expect(basketSummaryDetails.price).toContain(bookingTotalPriceFromModal);

    //Clear
    await basketPage.removeTourFromBasket();
    const removedItemAlert = await basketPage.getRemoverItemAlertText();
    expect(Alerts.ITEM_REMOVED_BASKET_ALERT).toBe(removedItemAlert);
  });

  test.only('Booking a trip for ONE STUDENT and ONE FAMILY - checking a tour in the basket', async ({
    page,
  }) => {
    //Arrange
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);
    const booking = BookingComponent(page);
    const basketPopup = BasketComponent(page);
    const basketPage = BasketPage(page);

    //Act
    await homePage.inputTextToSearchField(Tours.HarryPotterTour);
    await homePage.searchButtonClick();

    await searchPage.viewMoreButtonClick();
    await tourPage.bookButtonClick();
    await booking.fillBookingModal(Persons.STUDENT, Persons.FAMILY);

    const bookingDateTimeFromModal =
      await booking.getBookingDateAndTimeFromModal();
    const bookingStudentFromModal = await booking.studentBasketPrice();
    const bookingFamilyFromModal = await booking.familyBasketPrice();
    const bookingTotalPriceFromModal =
      await booking.getBookingTotalPriceFromModal();

    await booking.addToBasketButtonClick();

    await basketPopup.viewBasketButtonClick();

    //Assert
    const tourInBasket = await basketPage.getTourTitle();
    expect(tourInBasket).toBe(Tours.HarryPotterTour);

    const basketCardDetails = await basketPage.getBasketCardDetails();
    expect(basketCardDetails.date).toContain(bookingDateTimeFromModal);
    expect(basketCardDetails.persons[0]).toContain(bookingStudentFromModal);
    expect(basketCardDetails.persons[1]).toContain(bookingFamilyFromModal);

    const basketSummaryDetails = await basketPage.getBasketSummaryDetails();
    expect(basketSummaryDetails.persons[0]).toContain(bookingStudentFromModal);
    expect(basketSummaryDetails.persons[1]).toContain(bookingFamilyFromModal);
    expect(basketSummaryDetails.price).toContain(bookingTotalPriceFromModal);

    //Clear
    await basketPage.removeTourFromBasket();
    const removedItemAlert = await basketPage.getRemoverItemAlertText();
    expect(Alerts.ITEM_REMOVED_BASKET_ALERT).toBe(removedItemAlert);
  });
});
