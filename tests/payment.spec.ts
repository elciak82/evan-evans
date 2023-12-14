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

test.describe('VerIfying tour ordering', () => {
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

  test('Payment for the trip - verifying confirmation', async ({
    page,
  }) => {
    //Arrange
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);
    const booking = BookingComponent(page);
    const basketPopup = BasketComponent(page);
    const formPage = UserDetailsPage(page);
    const paymentPage = PaymentPage(page);
    const paymentConfirmedPage = PaymentConfirmedPage(page);

    //Act
    await homePage.inputTextToSearchField(Tours.HarryPotterTour);
    await homePage.searchButtonClick();

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
    await formPage.fillYourDetailsForm();
    await formPage.checkSignToEvanEvansNewsletterCheckbox();
    await formPage.checkSignToTreadRightNewsletterCheckbox();
    await formPage.continueToPaymentButtonClick();

    await paymentPage.fillPaymentForm();
    await paymentPage.payButtonClick();

    // const confirmationCode = await paymentConfirmedPage.getConfirmationCode();
    // console.log(confirmationCode);

    //Assert
    const orderedTourTitle = await paymentConfirmedPage.getOrderedTourTitle();
    expect(orderedTourTitle).toBe(Tours.HarryPotterTour);

    const orderDetails = await paymentConfirmedPage.getConfirmationDetails();
    expect(orderDetails.date).toContain(bookingDateTimeFromModal);
    expect(orderDetails.persons[0]).toContain(bookingAdultFromModal);

    const confirmationSummaryDetails =
      await paymentConfirmedPage.getConfirmationSummaryDetails();
    expect(confirmationSummaryDetails.persons[0]).toContain(
      bookingAdultFromModal,
    );
    expect(confirmationSummaryDetails.price).toContain(
      bookingTotalPriceFromModal,
    );
  });
});
