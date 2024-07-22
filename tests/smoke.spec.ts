import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { PageTitles } from '../src/helpers/enums/titles.enums';
import { SearchPage } from '../src/pages/search.page';
import { BasePageModel } from '../src/models/basePage.model';
import { BasePage } from '../src/pages/base.page';
import { HomePageModel } from '../src/models/homePage.model';
import { SearchPageModel } from '../src/models/searchPage.model';
import { getTestTitle } from '../src/helpers/utilities';

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

  test(getTestTitle('TC01', 'Check a home page title'), async ({ page }) => {
    //Arrange
    const title = await page.title();

    //Act
    //Assert
    expect(title).toBe(PageTitles.HomePageTitle);
  });

  test(getTestTitle('TC02', 'Check a search page title'), async ({ page }) => {
    //Arrange
    searchPageModel = SearchPage(page);

    //Act
    await homePageModel.searchButtonClick();
    await searchPageModel.checkLoadMoreButtonIsVisible();

    //Assert
    const title = await page.title();
    expect(title).toBe(PageTitles.SearchResultsTitle);
  });

  test(getTestTitle('TC03', 'Check a tour page title'), async ({ page }) => {
    //Arrange
    const searchText = 'RYBNIK';
    searchPageModel = SearchPage(page);

    //Act
    await homePageModel.inputTextToSearchField(searchText);
    await homePageModel.searchButtonClick();

    await searchPageModel.viewMoreButtonClick();

    //Assert
    const title = await page.title();
    expect(title).toContain(PageTitles.TourPageTitle);
  });
});
