import { test, expect } from '@playwright/test';
import { loginData } from './test-data/login.data';
import { LoginPage } from './pages/login.page';
import { SideMenuComponent } from './components/side-menu.copmonent';
import { PaymentPage } from './pages/payment.page';

test.describe('Payment tests', () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    paymentPage = new PaymentPage(page);

    await page.goto('/'); //config
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    const menu = new SideMenuComponent(page);
    await menu.menuTransferTab.click();
  });

  test('Transfer test', async ({ page }) => {
    //Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 7890 9876 6554 4333';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

    //Act
    paymentPage.makeTransfer(transferReceiver, transferAccount, transferAmount);

    //Assert
    await expect(paymentPage.correctPaymentMessage).toHaveText(expectedMessage);
  });
});
