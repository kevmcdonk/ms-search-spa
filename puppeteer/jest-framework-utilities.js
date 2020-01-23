const PuppeteerEnvironment = require('jest-environment-puppeteer');
const JestScreenshot = require('@rws-air/jestscreenshot');
require('jest-circus');

const retryAttempts = process.env.RETRY_ATTEMPTS || 2;

// @ts-ignore
export class FrameworkUtilities {
    async loginAsMeganB() {
        await jest.setTimeout(20000);
        await page.goto(process.env.APP_URL);
        await page.waitFor('input[name=loginfmt]');
        await page.click("input[name=loginfmt]");
        await page.type("input[name=loginfmt]", process.env.TEST_USERNAME, {
            delay: 1
        });
        await page.click("input[type=submit]");
        await page.waitForNavigation()
        await page.waitFor('input[name=passwd]');
        await page.click("input[name=passwd]");
        await page.waitFor(1000);
        await page.type("input[name=passwd]", process.env.TEST_PASSWORD, {
            delay: 1
        });
        await page.click("input[type=submit]");
        await page.waitFor("input[type=submit]");
        await page.click("input[type=submit]");
        await page.waitFor(3000);
    }
}
