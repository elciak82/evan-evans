import { Page } from "playwright";

export type BasePageModel = {
  goTo(): Promise<void>;
  // opeNewTab():  Promise<Page>;
};
