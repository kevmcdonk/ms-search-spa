const withCSS = require('@zeit/next-css')
require('dotenv').config()

module.exports = () => {
    return withCSS({
        cssLoaderOptions: {
            url: false
        },
        env: {
            clientId: process.env.APP_CLIENT_ID,
            url: process.env.APP_URL,
            redirectUri: process.env.APP_REDIRECT_URI,
            postLogoutRedirectUri: process.env.APP_POST_LOGOUT_REDIRECT_URI,
            authority: process.env.APP_AUTHORITY,
            sharePointTenant: process.env.APP_SHAREPOINT_TENANT,
            qnaMakerHost: process.env.QNAMAKER_HOST,
            qnaMakerKey: process.env.QNAMAKER_KEY
        }
    })
}