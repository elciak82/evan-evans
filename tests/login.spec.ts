import { test, expect } from '@playwright/test';
import { loginData } from './test-data/login.data';
import { LoginPage } from './pages/login.page';
import { PulpitPage } from './pages/pulpit.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/'); //config
    loginPage = new LoginPage(page);
  });

  test('successful login with correct credentials', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';

    //Act
    await loginPage.login(userId, userPassword);

    //Assert
    const pulpitPage = new PulpitPage(page);
    await expect(pulpitPage.userName).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    //Arrange
    const userId = 'tester';
    const ecpectedErroeMessage = 'identyfikator ma min. 8 znaków';

    //Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.click();

    //Assert
    await expect(loginPage.loginErrorUserId).toHaveText(ecpectedErroeMessage);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = '1098';
    const expectedMessage = 'hasło ma min. 8 znaków';

    //Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.passwordInput.blur(); //wyjscie z elementu, zmiana focusu

    //Assert
    await expect(loginPage.loginErrorPassword).toHaveText(expectedMessage);
  });
});
