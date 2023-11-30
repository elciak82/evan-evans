import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';
import { TitlePages } from './helpers/enums/titles.enums';
import { SearchPage } from './pages/search.page';
import { TourPage } from './pages/tour.page';
import { BookingComponent } from './components/booking.component';
import { BasketComponent } from './components/cart.component';

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

  test.only('Adding trip to the cart', async ({ page }) => {
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

    await booking.bookTour();
    
    //Assert
    const message = await cart.getMessageText();
    expect(message).toBe('Item Added!');
  });
});
