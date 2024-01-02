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

    // let result = await Promise.resolve(`${testItId}: ${title}: ${priority}`);
    // let testTitle: string = result;
