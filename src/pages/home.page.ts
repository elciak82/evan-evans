import { Page } from '@playwright/test';

export const HomePage = (page: Page) => {
  const acceptCookieButton = page.getByRole('link', {  //TODO
    name: 'OK',
    exact: true,
  });
  const mainSearchButton = page.getByRole('button', { //TODO
    name: 'Search',
    exact: true,
  });

  const mainSearchInput = page.getByRole('searchbox', { //TODO
    name: 'Find the perfect tour for you',
  });

  const acceptCookie = async (): Promise<void> => {
    await acceptCookieButton.click();
  };

  const searchButtonClick = async (): Promise<void> => {
    await mainSearchButton.click();
    await page.waitForLoadState();
  };

  const inputTextToSearchField = async (text: string): Promise<void> => {
    mainSearchInput.fill(text);
  };

  return { acceptCookie, searchButtonClick, inputTextToSearchField };
};
