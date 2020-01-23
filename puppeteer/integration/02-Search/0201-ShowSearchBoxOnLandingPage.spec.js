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

  it('should show search box with Ask your question here', async () => {
    await expect(page).toMatchElement('input[role=searchbox]', { placeholder: 'Ask your question here...' });
  })

  
})