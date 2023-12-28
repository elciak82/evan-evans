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
import { HeaderComponent } from '../src/components/header.component';
import { PromoCodes } from '../src/helpers/enums/promoCodes.enums';
import { userData } from '../src/test-data/userData.data';
import { BasePage } from '../src/pages/base.page';
import { BaseOptions } from 'vm';
import type { BasePageModel } from '../src/models/basePage.model';
import { BasketPageModel } from '../src/models/basketPage.model';

test.describe('Booking - verifying data in the basket', () => {
  let homePage: {
    acceptCookie: any;
    searchButtonClick: any;
    inputTextToSearchField: any;
  };
  let basePageModel: BasePageModel;
  let basketPageModel: BasketPageModel;

  test.beforeEach(async ({ page }) => {
    basePageModel = BasePage(page);
    await basePageModel.goTo();
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
    basketPageModel = BasketPage(page);

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
    const tourInBasket = await basketPageModel.getTourTitle();
    expect(tourInBasket).toBe(Tours.KatowiceTour);

    const basketCardDetails = await basketPageModel.getBasketCardDetails();
    expect(basketCardDetails.date).toContain(bookingDateTimeFromModal);
    expect(basketCardDetails.persons[0]).toContain(bookingAdultFromModal);
    expect(basketCardDetails.persons[1]).toContain(bookingChildFromModal);

    const basketSummaryDetails = await basketPageModel.getBasketSummaryDetails();
    expect(basketSummaryDetails.persons[0]).toContain(bookingAdultFromModal);
    expect(basketSummaryDetails.persons[1]).toContain(bookingChildFromModal);
    expect(basketSummaryDetails.price).toContain(bookingTotalPriceFromModal);

    //Clear
    await basketPageModel.removeTourFromBasket();
    const removedItemAlert = await basketPageModel.getRemovedItemAlertText();
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
    await basketPage.applyPromoCode(Alerts.INVALID_CODE);

    //Assert
    const invalidPromoCodeAlert = await basketPage.getInvalidPromoCodeAlert();
    expect(invalidPromoCodeAlert).toBe(Alerts.INVALID_CODE);

    //Clear
    await basketPage.removeTourFromBasket();
    const removedItemAlert = await basketPage.getRemovedItemAlertText();
    expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
  });
});
