import { Page } from '@playwright/test';
import { BasePageModel } from '../models/basePage.model';

export const BasePage = (page: Page, url = '/'): BasePageModel => {
  const goTo = async (): Promise<void> => {
    await page.goto(url);
  };

  // const opeNewTab = async (): Promise<Page> => {
  //   const secondPage = await page.context().newPage();
  //   await secondPage.goto('https://sandboxlogin.prioticket.com');
  //   return secondPage;
  // };

  return { goTo};
};
