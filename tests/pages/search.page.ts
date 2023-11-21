import { Page } from '@playwright/test';

export const SearchPage = (page: Page) => {
  const loadMoreButton = page.getByRole('button', { name: 'Load More' });

  const viewMoreButton = page.getByRole('link', { name: 'View and Book' });

  const checkLoadMoreButtonIsVisible = async (): Promise<void> => {
    await loadMoreButton.isEnabled();
  };

  const checkViewMoreButtonIsVisible = async (): Promise<void> => {
    await viewMoreButton.isEnabled();
  };

  return { checkLoadMoreButtonIsVisible, checkViewMoreButtonIsVisible };
};
