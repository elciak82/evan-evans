import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  test('quick payment with correct data', async ({ page }) => {
    //Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'testerLO';
    const userPassword = '10987654';
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransverReceiver = 'Chuck Demobankowy';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedTransverReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });
});

test('succesful mobile top-up', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('testerLO');
  await page.getByTestId('password-input').fill('password');
  await page.getByTestId('login-button').click();

  await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
  await page.locator('#widget_1_topup_amount').fill('123');
  await page.locator('#uniform-widget_1_topup_agreement span').click();
  await page.getByRole('button', { name: 'doładuj telefon' }).click();
  await page.getByTestId('close-button').click();

  await expect(page.locator('#show_messages')).toHaveText(
    'Doładowanie wykonane! 123,00PLN na numer 500 xxx xxx',
  );
});
