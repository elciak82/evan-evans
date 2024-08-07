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
import { BasePage } from '../src/pages/base.page';
import type { BasePageModel } from '../src/models/basePage.model';
import { BasketPageModel } from '../src/models/basketPage.model';
import { HomePageModel } from '../src/models/homePage.model';
import { SearchPageModel } from '../src/models/searchPage.model';
import { TourPageModel } from '../src/models/tourPage.model';
import { BasketComponentModel } from '../src/models/basketComponent.model';
import { BookingComponentModel } from '../src/models/bookingComponent.model';
import { HeaderComponentModel } from '../src/models/headerComponent.model';
import { getTestTitle } from '../src/helpers/utilities';

test.describe('Booking - verifying data in the basket', () => {
  let basePageModel: BasePageModel;
  let homePageModel: HomePageModel;
  let basketPageModel: BasketPageModel;
  let searchPageModel: SearchPageModel;
  let tourPageModel: TourPageModel;
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
    getTestTitle(
      'TC10',
      'Booking a trip for ONE ADULT and TWO CHILDREN - checking a tour in the basket',
    ),
    async ({ page }) => {
      //Arrange
      searchPageModel = SearchPage(page);
      tourPageModel = TourPage(page);
      bookingComponentModel = BookingComponent(page);
      basketComponentModel = BasketComponent(page);
      basketPageModel = BasketPage(page);

      //Act
      await homePageModel.inputTextToSearchField('Travcorp');
      await homePageModel.searchButtonClick();

      await searchPageModel.viewMoreButtonClick();
      await tourPageModel.bookButtonClick();
      await bookingComponentModel.fillBookingModal(
        Persons.ADULT,
        Persons.CHILD,
        Persons.CHILD,
      );

      const bookingDateTimeFromModal =
        await bookingComponentModel.getBookingDateAndTimeFromModal();
      const bookingAdultFromModal =
        await bookingComponentModel.adultBasketPrice();
      const bookingChildFromModal =
        await bookingComponentModel.childBasketPrice();
      const bookingTotalPriceFromModal =
        await bookingComponentModel.getBookingTotalPriceFromModal();

      await bookingComponentModel.addToBasketButtonClick();

      await basketComponentModel.viewBasketButtonClick();

      //Assert
      const tourInBasket = await basketPageModel.getTourTitle();
      expect(tourInBasket).toBe(Tours.VisitingTravcorp);

      const basketCardDetails = await basketPageModel.getBasketCardDetails();
      expect(basketCardDetails.date).toContain(bookingDateTimeFromModal);
      expect(basketCardDetails.persons[0]).toContain(bookingAdultFromModal);
      expect(basketCardDetails.persons[1]).toContain(bookingChildFromModal);

      const basketSummaryDetails =
        await basketPageModel.getBasketSummaryDetails();
      expect(basketSummaryDetails.persons[0]).toContain(bookingAdultFromModal);
      expect(basketSummaryDetails.persons[1]).toContain(bookingChildFromModal);
      expect(basketSummaryDetails.price).toContain(bookingTotalPriceFromModal);

      //Clear
      await basketPageModel.removeTourFromBasket();
      const removedItemAlert = await basketPageModel.getRemovedItemAlertText();
      expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
    },
  );

  test(
    getTestTitle(
      'TC11',
      'Booking a trip for ONE ADULT checking a tour in the basket',
    ),
    async ({ page }) => {
      //Arrange
      searchPageModel = SearchPage(page);
      tourPageModel = TourPage(page);
      bookingComponentModel = BookingComponent(page);
      basketComponentModel = BasketComponent(page);
      basketPageModel = BasketPage(page);
      headerComponentModel = HeaderComponent(page);

      //Act
      await homePageModel.inputTextToSearchField('Rybnik');
      await homePageModel.searchButtonClick();

      await searchPageModel.viewMoreButtonClick();
      await tourPageModel.bookButtonClick();
      await bookingComponentModel.fillBookingModal(
        Persons.ADULT,
        // Persons.SENIOR,
      );

      const bookingDateTimeFromModal =
        await bookingComponentModel.getBookingDateAndTimeFromModal();
      const bookingAdultFromModal =
        await bookingComponentModel.adultBasketPrice();
      // const bookingChildFromModal =
      //   await bookingComponentModel.childBasketPrice();
      const bookingTotalPriceFromModal =
        await bookingComponentModel.getBookingTotalPriceFromModal();

      await bookingComponentModel.addToBasketButtonClick();

      await basketComponentModel.closeBasketPopupButtonClick();
      await headerComponentModel.openBasket();

      //Assert
      const tourInBasket = await basketPageModel.getTourTitle();
      expect(tourInBasket).toBe(Tours.VisitingRybnik);

      const basketCardDetails = await basketPageModel.getBasketCardDetails();
      expect(basketCardDetails.date).toContain(bookingDateTimeFromModal);
      expect(basketCardDetails.persons[0]).toContain(bookingAdultFromModal);
      // expect(basketCardDetails.persons[1]).toContain(bookingChildFromModal);

      const basketSummaryDetails =
        await basketPageModel.getBasketSummaryDetails();
      expect(basketSummaryDetails.persons[0]).toContain(
        bookingAdultFromModal,
      );
      // expect(basketSummaryDetails.persons[1]).toContain(bookingChildFromModal);
      expect(basketSummaryDetails.price).toContain(bookingTotalPriceFromModal);

      //Clear
      await basketPageModel.removeTourFromBasket();
      const removedItemAlert = await basketPageModel.getRemovedItemAlertText();
      expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
    },
  );

  test.skip(
    getTestTitle('TC12', 'Booking a trip - adding a promo code'),
    async ({ page }) => {
      //Arrange
      searchPageModel = SearchPage(page);
      tourPageModel = TourPage(page);
      bookingComponentModel = BookingComponent(page);
      basketComponentModel = BasketComponent(page);
      basketPageModel = BasketPage(page);

      //Act
      await homePageModel.inputTextToSearchField('Travcorp');
      await homePageModel.searchButtonClick();

      await searchPageModel.viewMoreButtonClick();
      await tourPageModel.bookButtonClick();

      await bookingComponentModel.fillBookingModal(Persons.ADULT);
      await bookingComponentModel.addToBasketButtonClick();

      await basketComponentModel.viewBasketButtonClick();
      await basketPageModel.applyPromoCode(PromoCodes.CODE5);

      //Assert
      const promoCodeIncluded = await basketPageModel.promoCodeIncluded();
      expect(promoCodeIncluded).toBe(true);

      //Clear
      await basketPageModel.removeTourFromBasket();
      const removedItemAlert = await basketPageModel.getRemovedItemAlertText();
      expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
    },
  );

  test(
    getTestTitle('TC13', 'Booking a trip - adding an invalid promo code'),
    async ({ page }) => {
      //Arrange
      searchPageModel = SearchPage(page);
      tourPageModel = TourPage(page);
      bookingComponentModel = BookingComponent(page);
      basketComponentModel = BasketComponent(page);
      basketPageModel = BasketPage(page);

      //Act
      await homePageModel.inputTextToSearchField('Rybnik');
      await homePageModel.searchButtonClick();

      await searchPageModel.viewMoreButtonClick();
      await tourPageModel.bookButtonClick();

      await bookingComponentModel.fillBookingModal(Persons.ADULT);
      await bookingComponentModel.addToBasketButtonClick();

      await basketComponentModel.viewBasketButtonClick();
      await basketPageModel.applyPromoCode(Alerts.INVALID_CODE);

      //Assert
      const invalidPromoCodeAlert =
        await basketPageModel.getInvalidPromoCodeAlert();
      expect(invalidPromoCodeAlert).toBe(Alerts.INVALID_CODE);

      //Clear
      await basketPageModel.removeTourFromBasket();
      const removedItemAlert = await basketPageModel.getRemovedItemAlertText();
      expect(removedItemAlert).toBe(Alerts.ITEM_REMOVED_BASKET_ALERT);
    },
  );
});
