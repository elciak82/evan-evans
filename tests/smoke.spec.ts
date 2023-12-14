import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { PageTitles } from '../src/helpers/enums/titles.enums';
import { SearchPage } from '../src/pages/search.page';
import { BasePageModel } from '../src/models/basePage.model';
import { BasePage } from '../src/pages/base.page';

test.describe('Verifying page titles', () => {
  let homePage: {
    acceptCookie: any;
    searchButtonClick: any;
    inputTextToSearchField: any;
  };
  let basePageModel: BasePageModel;

  test.beforeEach(async ({ page }) => {
    basePageModel = BasePage(page);
    await basePageModel.goTo();
    homePage = HomePage(page);
    await homePage.acceptCookie();
  });

  test('Check a home page title @smoke', async ({ page }) => {
    //Arrange
    const title = await page.title();

    //Act
    //Assert
    expect(title).toBe(PageTitles.HomePageTitle);
  });

  test('Check a search page title @smoke', async ({ page }) => {
    //Arrange
    const searchPage = SearchPage(page);

    //Act
    const homePage = HomePage(page);
    await homePage.searchButtonClick();
    await searchPage.checkLoadMoreButtonIsVisible();

    //Assert
    const title = await page.title();
    expect(title).toBe(PageTitles.SearchResultsTitle);
  });

  test('Check a tour page title @smoke', async ({ page }) => {
    //Arrange
    const searchText = 'Katowice';
    const searchPage = SearchPage(page);

    //Act
    const homePage = HomePage(page);
    await homePage.inputTextToSearchField(searchText);
    await homePage.searchButtonClick();

    await searchPage.viewMoreButtonClick();

    //Assert
    const title = await page.title();
    expect(title).toBe(PageTitles.TourPageTitle);
  });
});
