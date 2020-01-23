import { FrameworkUtilities } from '../../jest-framework-utilities';

describe('app', () => {
  jest.setTimeout(60000);

  beforeAll(async () => {
    console.log('Logging in as standard user');
    var utils = new FrameworkUtilities();
    await utils.loginAsMeganB();
    console.log('Logged in as standard user'); 
    await page.waitFor(3000);
  })

  it('should show required message when no results found for question', async () => {
    var expectedText = 'Sorry, we cannot find a response to that question. Please provide further feedback for our admins as to what you were looking for';
    var textToSearchWith = 'chicken';
    await page.type('input[role=searchbox]', textToSearchWith, {
      delay: 1
      });
    await page.waitFor(3000);
    await expect(page).toMatch(expectedText);
  })

})