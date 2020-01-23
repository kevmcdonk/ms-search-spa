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

  it('should show five static applications for standard user', async () => {
    const staticAppDiv = await page.$('#staticApps');
    const staticAppsCount = await staticAppDiv.$$eval('div.menu-item-wrapper', divs => divs.length);
    console.log('Static Apps Length: ' + staticAppsCount);
    await expect(staticAppsCount).toBe(5);
  })

  it('should show eleven dynamic applications for standard user', async () => {
    const dynamicAppDiv = await page.$('#dynamicApps');
    const dynamicAppsCount = await dynamicAppDiv.$$eval('div.menu-item-wrapper', divs => divs.length);
    console.log('Dynamic Apps Length: ' + dynamicAppsCount);
    await expect(dynamicAppsCount).toBe(11);
  })
})