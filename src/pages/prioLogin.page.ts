import { Page } from '@playwright/test';

export const PrioLoginPage = (page: Page) => {
  const emailInput = page.locator('[id="Email"]');
  const passwordInput = page.getByPlaceholder('Password');
  const signInButton = page.locator('#login_button');

  const logInToPrio = async (text: string) => {
    const secondPage = await page.context().newPage();
    await secondPage.goto('https://sandboxlogin.prioticket.com');
    await secondPage.waitForLoadState();
    const emailInput = secondPage.locator('#Email');
    const passwordInput = secondPage.locator('#password');
    const signInButton = secondPage.locator('#login_button');
    await emailInput.fill('po1@evanevans.com');
    await passwordInput.fill('Evanevans258!');
    await signInButton.click();
    await secondPage.waitForLoadState();
    // await secondPage.goto(
    //   'https://sandboxactivity.prioticket.com/?ob=oc&cl=y-bd&opp=10&sd=0&ec=',
    // );
    await secondPage.waitForLoadState();
    const searchInput = secondPage.locator('#search');
    await searchInput.fill(text);
  };

  return { logInToPrio };
};
