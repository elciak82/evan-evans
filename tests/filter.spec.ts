import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';

test.describe('Verifying budget filter', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    homePage = new HomePage(page);
    await homePage.closeModal();
  });

  test.only('Check a page title', async ({ page }) => {
    //Arrange
    //Act
    //Assert
  });
});
