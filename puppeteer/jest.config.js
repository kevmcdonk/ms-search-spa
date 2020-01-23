module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.spec\\.js$',
  testRunner: 'jest-circus/runner',
  testEnvironment: '<rootDir>/jest-environment.js',
  globalSetup: 'jest-environment-puppeteer/setup',
  globalTeardown: 'jest-environment-puppeteer/teardown',
  setupFilesAfterEnv: ['expect-puppeteer', '<rootDir>/jest-framework.js'],
}
