export type HomePageModel = {
  acceptCookie(): Promise<void>;
  searchButtonClick(): Promise<void>;
  inputTextToSearchField(text: string): Promise<void>;
};
