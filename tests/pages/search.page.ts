import { Page } from '@playwright/test';

export const SearchPage = (page: Page) => {
  const loadMoreButton = page.getByRole('button', { name: 'Load More' });
  const viewMoreButton = page.getByRole('link', { name: 'View and Book' });
  const tourTitle = page.locator(
    '[class = "card__title card__title--large card__title--slim"]',
  );

  const checkLoadMoreButtonIsVisible = async (): Promise<void> => {
    await loadMoreButton.isEnabled();
  };

  const checkViewMoreButtonIsVisible = async (): Promise<void> => {
    await viewMoreButton.isEnabled();
  };

  const viewMoreButtonClick = async (): Promise<void> => {
    await viewMoreButton.click();
  };

  const getTourTitle = async () => {
    console.log(await tourTitle.innerText());
    return await tourTitle.innerText();
  };

  return {
    checkLoadMoreButtonIsVisible,
    checkViewMoreButtonIsVisible,
    viewMoreButtonClick,
    getTourTitle,
  };
};
