import { Page } from '@playwright/test';

export const PrioHomePage = (page: Page) => {
  const activityTab = page.locator('//span[text()="Activity"]');
};
