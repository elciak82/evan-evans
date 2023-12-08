import { Page } from 'playwright';

export const WebEntity = (page: Page) => {
  const clipboardTextFromInput = async (): Promise<void> => {
    let userAgentInfo = await page.evaluate(() => navigator.userAgent);
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Control+C');
    const clipboardText = await page.evaluate('navigator.clipboard.readText()');
  };

  return {
    clipboardTextFromInput,
  };
};

