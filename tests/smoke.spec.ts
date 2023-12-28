import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { PageTitles } from '../src/helpers/enums/titles.enums';
import { SearchPage } from '../src/pages/search.page';
import { BasePageModel } from '../src/models/basePage.model';
import { BasePage } from '../src/pages/base.page';
import { HomePageModel } from '../src/models/homePage.model';
import { SearchPageModel } from '../src/models/searchPage.model';

test.describe('Verifying page titles', () => {
  let basePageModel: BasePageModel;
  let homePageModel: HomePageModel;
  let searchPageModel: SearchPageModel;

  test.beforeEach(async ({ page }) => {
    basePageModel = BasePage(page);
    await basePageModel.goTo();

    homePageModel = HomePage(page);
    await homePageModel.acceptCookie();
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
    searchPageModel = SearchPage(page);

    //Act
    await homePageModel.searchButtonClick();
    await searchPageModel.checkLoadMoreButtonIsVisible();

    //Assert
    const title = await page.title();
    expect(title).toBe(PageTitles.SearchResultsTitle);
  });

  test('Check a tour page title @smoke', async ({ page }) => {
    //Arrange
    const searchText = 'Katowice';
    searchPageModel = SearchPage(page);

    //Act
    await homePageModel.inputTextToSearchField(searchText);
    await homePageModel.searchButtonClick();

    await searchPageModel.viewMoreButtonClick();

    //Assert
    const title = await page.title();
    expect(title).toBe(PageTitles.TourPageTitle);
  });
});
