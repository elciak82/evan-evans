import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { PageTitles } from '../src/helpers/enums/titles.enums';
import { SearchPage } from '../src/pages/search.page';
import { TourPage } from '../src/pages/tour.page';

test.describe('Verifying page titles', () => {
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

  test('Check a home page title', async ({ page }) => {
    //Arrange
    const title = await page.title();

    //Act
    //Assert
    expect(title).toBe(PageTitles.HomePageTitle);
  });

  test('Check a search page title', async ({ page }) => {
    //Arrange
    const searchPage = SearchPage(page);

    //Act
    await homePage.searchButtonClick();
    await searchPage.checkLoadMoreButtonIsVisible();

    //Assert
    const title = await page.title();
    expect(title).toBe(PageTitles.SearchResultsTitle);
  });

  test('Check a tour page title', async ({ page }) => {
    //Arrange
    const searchText = 'Katowice';
    const searchPage = SearchPage(page);
    const tourPage = TourPage(page);

    //Act
    await homePage.inputTextToSearchField(searchText);
    await homePage.searchButtonClick();

    await searchPage.viewMoreButtonClick();

    //Assert
    const title = await page.title();
    expect(title).toBe(PageTitles.TourPageTitle);
  });
});
