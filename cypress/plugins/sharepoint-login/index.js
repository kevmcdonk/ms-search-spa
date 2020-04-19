'use strict'

const puppeteer = require('puppeteer');
const cypress = require('cypress');

/**
*
* @param {options.username} string username
* @param {options.password} string password
* @param {options.pageUrl} string URL of the SharePoint page
*/
module.exports.SharePointLogin = async function SharePointLogin(options = {}) {

console.log('Username - humph:' + options.username);
  // Check if the required options are provided
  if (!options.username || !options.password) {
    throw new Error('Username or password missing.');
  }
  if (!options.pageUrl) {
    throw new Error('Login Url missing')
  }

  // Authenticate
  /*
  const data  = await spauth.getAuth(options.pageUrl, {
    username: options.username,
    password: options.password
  });
*/

  const auth = JSON.parse(cypress.env('AUTH'))
  return new Promise((resolve, reject) => {
      cy.request({
          method: 'POST',
          url: `https://login.microsoftonline.com/${options.tenantId}/oauth2/v2.0/token`,
          form: true,
          body: auth.post_body
      }).then(res => resolve(res.body.id_token), err => reject(err))
  });

  
  // Launch puppeteer to get the SP Headers
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders(data.headers);
  await page.goto(options.pageUrl, {
    waitUntil: 'load'
  });

  // Retrieve the cookies from the browser session
  const cookies = await getCookies({ page, options });
  await finalizeSession({ page, browser, options });

  // Return the browser cookies
  return { cookies }
}

async function getCookies({ page, options } = {}) {
  // Wait for an element on the SharePoint page
  await page.waitForSelector("#SuiteNavPlaceHolder", { visible: true, delay: 10000 })
  // Retrieving all the cookies
  const cookies = options.getAllBrowserCookies
  ? await getCookiesForAllDomains(page)
  : await page.cookies(options.pageUrl)
  if (options.logs) {
    console.log(cookies)
  }
  return cookies
}

async function getCookiesForAllDomains(page) {
  const cookies = await page._client.send('Network.getAllCookies', {})
  return cookies.cookies
}

async function finalizeSession({ page, browser, options } = {}) {
  await browser.close()
}