# Microsoft Search SPA

This sample shows how you can use Microsoft Search to return results in a standalone app. It was born from a request to have the search experience outside of SharePoint with the added benefit of FAQs. Sadly, FAQs are not available in the Graph API yet so this is using QnA Maker.

## Getting started 

Install the project dependencies

`npm install`

Configure the project environment variables by creating a copy of the `.env` file and replace the placeholders with values for your environment

Start the local web development server

`npm run dev`

Navigate to `http://localhost:3000` to view the site

Note that redirect to blank.html is due to comments at https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-JS:-1.2.0-beta.x

## Testing

Execute tests and the Jest test runner

`npm run test`

or

execute tests and the Jest test runner in watch mode 

`npm run test:watch`

## Builds and Releases

All builds and releases are automated by Azure DevOps, just checkin your code to trigger a build.

The build process exports the project as a static website that is deployed to Azure Storage account

## Manually export project as static website

The project can be exported as a static web site (html, css, js)

`npm run export`

This will export all files to the `out` folder

## Technologies used

This project uses the [NEXT.js](https://nextjs.org/) framework for React for building highly performant production ready apps without configuration headaches.

Authentication with Azure is enabled by using [Microsoft Authentication Library for JavaScript (MSAL.js)](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-core/README.md) and [OAuth 2.0 Implicit Grant Flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow).

Integration UI tests and test runner is provided by [Jest](https://jestjs.io/)

User authentication for integration tests provided by [Puppeteer](https://pptr.dev/)

Styles and Controls are provided by [Fabric UI 7](https://developer.microsoft.com/en-us/fabric#/get-started/web)
