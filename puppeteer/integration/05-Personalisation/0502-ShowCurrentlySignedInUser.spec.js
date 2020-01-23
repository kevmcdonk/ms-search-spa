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
    expect('This should have a test').toEqual('This is not yet implemented');
  })

})