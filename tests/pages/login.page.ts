import { Page } from '@playwright/test';
import { PulpitPage } from './pulpit.page';

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.getByTestId('login-input');
  passwordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');
  loginErrorUserId = this.page.getByTestId('error-login-id');
  loginErrorPassword = this.page.getByTestId('error-login-password');

  async login(userId: string, userPassword: string): Promise<void> {
    //funkcje asynchroniczne
    await this.fillLoginCredentials(userId, userPassword);
    await this.loginButton.click();
  }

  async fillLoginCredentials(
    userId: string,
    userPassword: string,
  ): Promise<void> {
    await this.loginInput.fill(userId);
    await this.passwordInput.fill(userPassword);
    await this.passwordInput.blur();
  }
}
