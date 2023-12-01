import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';
import { SearchPage } from './pages/search.page';
import { TourPage } from './pages/tour.page';
import { BookingComponent } from './components/booking.component';
import { BasketComponent } from './components/basket.component';
import { Alerts } from './helpers/enums/alerts.enums';

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

  test('Adding trip to the cart - checking a basket popup', async ({ page }) => {
    //Arrange
    const searchText = 'Katowice';
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);
    const booking = BookingComponent(page);
    const cart = BasketComponent(page);

    //Act
    await homePage.inputTextToSearchField(searchText);
    await homePage.searchButtonClick();

    await searchPage.viewMoreButtonClick();

    await tourPage.bookButtonClick();

    await booking.bookTour('');
    
    //Assert
    const itemAddedMessage = await cart.getMessageText();
    expect(itemAddedMessage).toBe(Alerts.ItemAddedBasketAlert);
  });

  test('Adding trip to the cart - checking a basket', async ({ page }) => {
    //Arrange
    const searchText = 'Katowice';
    const day = '10';
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);
    const booking = BookingComponent(page);
    const cart = BasketComponent(page);

    //Act
    await homePage.inputTextToSearchField(searchText);
    await homePage.searchButtonClick();

    await searchPage.viewMoreButtonClick();

    await tourPage.bookButtonClick();

    await booking.bookTour(day);
    
    //Assert
    const itemAddedMessage = await cart.getMessageText();
    expect(itemAddedMessage).toBe(Alerts.ItemAddedBasketAlert);
  });
});
