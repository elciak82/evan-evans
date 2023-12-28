import { Page } from 'playwright';

export type TourPageModel = {
  bookButtonClick(): Promise<void>;
};
