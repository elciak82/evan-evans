import { test, expect } from '@playwright/test';
import { loginData } from './test-data/login.data';
import { LoginPage } from './pages/login.page';
import { PulpitPage } from './pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpit: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    pulpit = new PulpitPage(page);

    await page.goto('/'); //config
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);
  });

  test('quick payment with correct data', async ({ page }) => {
    //Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransverReceiver = 'Chuck Demobankowy';

    //Act
    pulpit.makeTransfer(receiverId, transferAmount, transferTitle);

    //Assert
    await expect(pulpit.message).toHaveText(
      `Przelew wykonany! ${expectedTransverReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('succesful mobile top-up', async ({ page }) => {
    //Arrange
    const receiverOption = '500 xxx xxx';
    const amount = '40';

    //Act
    pulpit.makeMobileTopUp(receiverOption, amount);

    //Assert
    await expect(pulpit.message).toHaveText(
      `Doładowanie wykonane! ${amount},00PLN na numer ${receiverOption}`,
    );
  });

  test('correct balance after succesful mobile top-up', async ({ page }) => {
    //Arrange
    const receiverOption = '500 xxx xxx';
    const amount = '50';
    const initialBalance = await pulpit.balance.innerText();
    const expectedBalance = Number(initialBalance) - Number(amount);

    //Act
    pulpit.makeMobileTopUp(receiverOption, amount);

    //Assert
    await expect(pulpit.balance).toHaveText(`${expectedBalance}`);
  });
});
