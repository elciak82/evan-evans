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
import { HeaderComponent } from './components/header.component';
import { PromoCodes } from './helpers/enums/promoCodes.enums';

test.describe('Booking - verifying data in the basket', () => {
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
    const removedItemAlert = await basketPage.getRemovedItemAlertText();
    expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
  });

  test('Booking a trip for ONE STUDENT and ONE FAMILY - checking a tour in the basket', async ({
    page,
  }) => {
    //Arrange
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);
    const booking = BookingComponent(page);
    const basketPopup = BasketComponent(page);
    const basketPage = BasketPage(page);
    const header = HeaderComponent(page);

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

    await basketPopup.closeBasketPopupButtonClick();
    await header.openBasket();

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
    const removedItemAlert = await basketPage.getRemovedItemAlertText();
    expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
  });

  test('Booking a trip - adding a promo code', async ({ page }) => {
    //Arrange
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);
    const booking = BookingComponent(page);
    const basketPopup = BasketComponent(page);
    const basketPage = BasketPage(page);
    const header = HeaderComponent(page);

    //Act
    await homePage.inputTextToSearchField(Tours.HarryPotterTour);
    await homePage.searchButtonClick();

    await searchPage.viewMoreButtonClick();
    await tourPage.bookButtonClick();

    await booking.fillBookingModal(Persons.STUDENT);
    await booking.addToBasketButtonClick();

    await basketPopup.viewBasketButtonClick();
    await basketPage.applyPromoCode(PromoCodes.CODE10);

    //Assert
    const promoCodeIncluded = await basketPage.promoCodeIncluded();
    expect(promoCodeIncluded).toBe(true);

    //Clear
    await basketPage.removeTourFromBasket();
    const removedItemAlert = await basketPage.getRemovedItemAlertText();
    expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
  });

  test('Booking a trip - adding an invalid promo code', async ({ page }) => {
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

    await booking.fillBookingModal(Persons.FAMILY);
    await booking.addToBasketButtonClick();

    await basketPopup.viewBasketButtonClick();
    await basketPage.applyPromoCode(PromoCodes.INVALID_CODE);

    //Assert
    const invalidPromoCodeAlert = await basketPage.getInvalidPromoCodeAlert();
    expect(invalidPromoCodeAlert).toBe(Alerts.INVALID_CODE);

    //Clear
    await basketPage.removeTourFromBasket();
    const removedItemAlert = await basketPage.getRemovedItemAlertText();
    expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
  });
});
