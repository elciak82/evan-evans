import { test, expect } from '@playwright/test';
import { loginData } from './test-data/login.data';
import { LoginPage } from './pages/login.page';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); //config
  });

  test('successful login with correct credentials', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';

    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    //Arrange
    const userId = 'tester';
    const ecpectedErroeMessage = 'identyfikator ma min. 8 znaków';

    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.click();

    //Assert
    await expect(loginPage.loginErrorUserId).toHaveText(
      ecpectedErroeMessage,
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = '1098';
    const expectedMessage = 'hasło ma min. 8 znaków';

    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.passwordInput.blur(); //wyjscie z elementu, zmiana focusu

    //Assert
    await expect(loginPage.loginErrorPassword).toHaveText(
      expectedMessage,
    );
  });
});
