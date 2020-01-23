const path = require('path')

describe('app', () => {
  
  it('should display login page', async () => {
    await page.goto(process.env.APP_URL);
    await page.waitFor(2000);
    await expect(page).toMatch('Sign in')
  })
})