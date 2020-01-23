/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports, @typescript-eslint/explicit-member-accessibility */
const PuppeteerEnvironment = require('jest-environment-puppeteer');
const JestScreenshot = require('@rws-air/jestscreenshot');
require('jest-circus');
const jestConfig = require('./jest.config');

const retryAttempts = process.env.RETRY_ATTEMPTS || 2;

// @ts-ignore
class CustomEnvironment extends PuppeteerEnvironment {
  async setup() {
    await super.setup();
    // await this.global.page.waitForNavigation();
    //if (!process.env.CI) await this.localSetup();
  }

  async teardown() {
    // @ts-ignore
    //await this.global.page.waitFor(2000);
    //await super.teardown();
  }

  async handleTestEvent(event, state) {
    // console.log('A test event: ' + event.name);
    if (event.name === 'test_fn_failure') {
      //if (state.currentlyRunningTest.invocations > retryAttempts) {
        const testName = state.currentlyRunningTest.name;
        const imagePath = 'puppeteer/images/' + testName + '.png';
        console.log('Take screenshot');
        this.global.page.screenshot({path:imagePath, fullPage: true});
        /*
        const jestScreenshot = new JestScreenshot({
          page: this.global.page,
          dirName: __dirname,
          testName,
          slackUpload: false,
        });

        await jestScreenshot.setup();*/
      //}
    }
  }
}

module.exports = CustomEnvironment;