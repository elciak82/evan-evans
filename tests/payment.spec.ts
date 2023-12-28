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

test.describe('VerIfying tour ordering', () => {
  let basePageModel: BasePageModel;
  let homePageModel: HomePageModel;
  let paymentPageModel: PaymentPageModel;
  let paymentConfirmedPageModel: PaymentConfirmedPageModel;
  let userDetailsPageModel: UserDetailsPageModel;

  test.beforeEach(async ({ page }) => {
    basePageModel = BasePage(page);
    await basePageModel.goTo();

    homePageModel = HomePage(page);
    await homePageModel.acceptCookie();
  });

  test('Payment for the trip - verifying confirmation', async ({ page }) => {
    //Arrange
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);
    const booking = BookingComponent(page);
    const basketPopup = BasketComponent(page);
    userDetailsPageModel = UserDetailsPage(page);
    paymentPageModel = PaymentPage(page);
    paymentConfirmedPageModel = PaymentConfirmedPage(page);

    //Act
    await homePageModel.inputTextToSearchField(Tours.HarryPotterTour);
    await homePageModel.searchButtonClick();

    await searchPage.viewMoreButtonClick();
    await tourPage.bookButtonClick();
    await booking.fillBookingModal(Persons.ADULT);

    const bookingDateTimeFromModal =
      await booking.getBookingDateAndTimeFromModal();
    const bookingAdultFromModal = await booking.adultBasketPrice();
    const bookingTotalPriceFromModal =
      await booking.getBookingTotalPriceFromModal();

    await booking.addToBasketButtonClick();
    await basketPopup.checkoutNowButtonClick();
    await userDetailsPageModel.fillYourDetailsForm();
    await userDetailsPageModel.checkSignToEvanEvansNewsletterCheckbox();
    await userDetailsPageModel.checkSignToTreadRightNewsletterCheckbox();
    await userDetailsPageModel.continueToPaymentButtonClick();

    await paymentPageModel.fillPaymentForm();
    await paymentPageModel.payButtonClick();

    //Assert
    const orderedTourTitle = await paymentConfirmedPageModel.getOrderedTourTitle();
    expect(orderedTourTitle).toBe(Tours.HarryPotterTour);

    const orderDetails = await paymentConfirmedPageModel.getConfirmationDetails();
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

  test('Payment for the trip - verifying order in the Prio', async ({
    page,
  }) => {
    //Arrange
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);
    const booking = BookingComponent(page);
    const basketPopup = BasketComponent(page);
    userDetailsPageModel = UserDetailsPage(page);
    paymentPageModel = PaymentPage(page);
    paymentConfirmedPageModel = PaymentConfirmedPage(page);
    const apiPrio = ApiPrioticket();

    //Act
    await homePageModel.inputTextToSearchField(Tours.HarryPotterTour);
    await homePageModel.searchButtonClick();

    await searchPage.viewMoreButtonClick();
    await tourPage.bookButtonClick();
    await booking.fillBookingModal(Persons.ADULT);

    await booking.addToBasketButtonClick();
    await basketPopup.checkoutNowButtonClick();
    await userDetailsPageModel.fillYourDetailsForm();
    await userDetailsPageModel.checkSignToEvanEvansNewsletterCheckbox();
    await userDetailsPageModel.checkSignToTreadRightNewsletterCheckbox();
    await userDetailsPageModel.continueToPaymentButtonClick();

    await paymentPageModel.fillPaymentForm();
    await paymentPageModel.payButtonClick();

    const confirmationCode = await paymentConfirmedPageModel.getConfirmationCode();
    const orderStatus = await apiPrio.getOrderStatus(confirmationCode);

    //Assert
    expect(orderStatus).toBe('ORDER_CONFIRMED');
  });
});
