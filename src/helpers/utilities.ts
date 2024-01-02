import { testCase } from './testTags/testCasesGroups';

  export const getTestTitle = (testItId: string, title: string): string => {
    let priority!: string;
    switch (true) {
      case testCase.groups.smoke.includes(testItId):
        priority = '@SMOKE';
        break;
      case testCase.groups.regression.includes(testItId):
        priority = '@REGRESSION';
        break;
      default:
        break;
    }
    return `${testItId}: ${title}: ${priority}`;
  };
  
  //https://truuts.medium.com/how-to-add-tags-dynamically-in-playwright-tests-e2d06e00f4e2
