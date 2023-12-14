import { Page } from '@playwright/test';
import { BasePageModel } from '../models/basePage.model';

export const BasePage = (page: Page, url = '/'): BasePageModel => {
  const goTo = async (): Promise<void> => {
    await page.goto(url);
  };

  return { goTo };
};
