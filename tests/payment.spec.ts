import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { SearchPage } from '../src/pages/search.page';
import { TourPage } from '../src/pages/tour.page';
import { BookingComponent } from '../src/components/booking.component';
import { BasketComponent } from '../src/components/basket.component';
import { Tours } from '../src/helpers/enums/tours.enums';
import { Persons } from '../src/helpers/enums/persons.enums';
import { UserDetailsPage } from '../src/pages/userDetails.page';
import { PaymentPage } from '../src/pages/payment.page';
import { PaymentConfirmedPage } from '../src/pages/paymentConfirmed.page';
import { BasePageModel } from '../src/models/basePage.model';
import { BasePage } from '../src/pages/base.page';
import { ApiPrioticket } from '../src/helpers/apiPrioticket';
import { HomePageModel } from '../src/models/homePage.model';
import { PaymentPageModel } from '../src/models/paymentPage.model';
import { PaymentConfirmedPageModel } from '../src/models/paymentConfirmedPage.model';
import { UserDetailsPageModel } from '../src/models/userDetailsPage.model';
import { SearchPageModel } from '../src/models/searchPage.model';
import { TourPageModel } from '../src/models/tourPage.model';
import { BasketComponentModel } from '../src/models/basketComponent.model';
import { BookingComponentModel } from '../src/models/bookingComponent.model';
import { UserDataGenerator } from '../src/datafactory/user';

test.describe('VerIfying tour ordering', () => {
  let basePageModel: BasePageModel;
  let homePageModel: HomePageModel;
  let searchPageModel: SearchPageModel;
  let tourPageModel: TourPageModel;
  let paymentPageModel: PaymentPageModel;
  let paymentConfirmedPageModel: PaymentConfirmedPageModel;
  let userDetailsPageModel: UserDetailsPageModel;
  let basketComponentModel: BasketComponentModel;
  let bookingComponentModel: BookingComponentModel;

  test.beforeEach(async ({ page }) => {
    test.slow();
    basePageModel = BasePage(page);
    await basePageModel.goTo();

    homePageModel = HomePage(page);
    await homePageModel.acceptCookie();
  });

  test('TC14 - Payment for the trip - verifying confirmation @regression', async ({ page }) => {
    //Arrange
    searchPageModel = SearchPage(page);
    tourPageModel = TourPage(page);
    bookingComponentModel = BookingComponent(page);
    basketComponentModel = BasketComponent(page);
    userDetailsPageModel = UserDetailsPage(page);
    paymentPageModel = PaymentPage(page);
    paymentConfirmedPageModel = PaymentConfirmedPage(page);

    //Act
    await homePageModel.inputTextToSearchField(Tours.HarryPotterTour);
    await homePageModel.searchButtonClick();

    await searchPageModel.viewMoreButtonClick();
    await tourPageModel.bookButtonClick();
    await bookingComponentModel.fillBookingModal(Persons.ADULT);

    const bookingDateTimeFromModal =
      await bookingComponentModel.getBookingDateAndTimeFromModal();
    const bookingAdultFromModal =
      await bookingComponentModel.adultBasketPrice();
    const bookingTotalPriceFromModal =
      await bookingComponentModel.getBookingTotalPriceFromModal();

    await bookingComponentModel.addToBasketButtonClick();
    await basketComponentModel.checkoutNowButtonClick();
    const userData = await UserDataGenerator().createRandomUser();
    await userDetailsPageModel.fillYourDetailsForm(userData);
    await userDetailsPageModel.checkSignToEvanEvansNewsletterCheckbox();
    await userDetailsPageModel.checkSignToTreadRightNewsletterCheckbox();
    await userDetailsPageModel.continueToPaymentButtonClick();

    await paymentPageModel.fillPaymentForm();
    await paymentPageModel.payButtonClick();

    //Assert
    const orderedTourTitle =
      await paymentConfirmedPageModel.getOrderedTourTitle();
    expect(orderedTourTitle).toBe(Tours.HarryPotterTour);

    const orderDetails =
      await paymentConfirmedPageModel.getConfirmationDetails();
    expect(orderDetails.date).toContain(bookingDateTimeFromModal);
    expect(orderDetails.persons[0]).toContain(bookingAdultFromModal);

    const confirmationSummaryDetails =
      await paymentConfirmedPageModel.getConfirmationSummaryDetails();
    expect(confirmationSummaryDetails.persons[0]).toContain(
      bookingAdultFromModal,
    );
    expect(confirmationSummaryDetails.price).toContain(
      bookingTotalPriceFromModal,
    );
  });

  test('TC15 - Payment for the trip - verifying order in the Prio @regression', async ({
    page,
  }) => {
    //Arrange
    searchPageModel = SearchPage(page);
    tourPageModel = TourPage(page);
    bookingComponentModel = BookingComponent(page);
    basketComponentModel = BasketComponent(page);
    userDetailsPageModel = UserDetailsPage(page);
    paymentPageModel = PaymentPage(page);
    paymentConfirmedPageModel = PaymentConfirmedPage(page);

    //Act
    await homePageModel.inputTextToSearchField(Tours.HarryPotterTour);
    await homePageModel.searchButtonClick();

    await searchPageModel.viewMoreButtonClick();
    await tourPageModel.bookButtonClick();
    await bookingComponentModel.fillBookingModal(Persons.ADULT);

    await bookingComponentModel.addToBasketButtonClick();
    await basketComponentModel.checkoutNowButtonClick();
    const userData = await UserDataGenerator().createRandomUser();
    await userDetailsPageModel.fillYourDetailsForm(userData);
    await userDetailsPageModel.checkSignToEvanEvansNewsletterCheckbox();
    await userDetailsPageModel.checkSignToTreadRightNewsletterCheckbox();
    await userDetailsPageModel.continueToPaymentButtonClick();

    await paymentPageModel.fillPaymentForm();
    await paymentPageModel.payButtonClick();

    //Assert
    const confirmationCode =
      await paymentConfirmedPageModel.getConfirmationCode();
    const orderStatus = await ApiPrioticket().getOrderStatus(confirmationCode);
    expect(orderStatus).toBe('ORDER_CONFIRMED');
  });
});
