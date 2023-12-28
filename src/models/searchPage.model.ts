import { Page } from 'playwright';

export type SearchPageModel = {
  checkLoadMoreButtonIsVisible(): Promise<void>;
  checkViewMoreButtonIsVisible(): Promise<void>;
  viewMoreButtonClick(): Promise<void>;
  getTourTitle(): Promise<string>;
};
