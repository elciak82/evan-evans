import { test, expect } from '@playwright/test';
import { loginData } from './test-data/login.data';
import { LoginPage } from './pages/login.page';
import { MenuComponent } from './pages/menu.copmonent';
import { PaymentPage } from './pages/payment.page';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/'); //config
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    const menu = new MenuComponent(page);
    await menu.menuTransferTab.click();
  });

  test('Transfer test', async ({ page }) => {
    //Arrange
    const transferReceiver = 'Jan Nowak';
    const ransferAccount = '12 3456 7890 9876 6554 4333';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

    //Act
    const paymentPage = new PaymentPage(page);
    await paymentPage.transferReceiverInput.fill(transferReceiver);
    await paymentPage.accountInput.fill(ransferAccount);
    await paymentPage.amuntInput.fill(transferAmount);
    await paymentPage.makeTransferButton.click();
    await paymentPage.closeButton.click();

    //Assert
    await expect(paymentPage.correctPaymenyMessage).toHaveText(expectedMessage);
  });
});
