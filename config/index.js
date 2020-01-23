export const MsalConfig = {
    auth: {
        clientId: process.env.clientId,
        redirectUri: process.env.redirectUri,
        postLogoutRedirectUri: process.env.postLogoutRedirectUri,
        authority: process.env.authority,
        navigateToLoginRequestUrl: true
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true
    }
}

export const LoginScopes = {
    scopes: [
        'https://graph.microsoft.com/User.Read',
        'https://graph.microsoft.com/Sites.ReadWrite.All',
        `https://${process.env.sharePointTenant}.sharepoint.com/AllSites.Read`,
        `https://${process.env.sharePointTenant}.sharepoint.com/AllSites.Write`,
        'https://graph.microsoft.com/openid',
        'https://graph.microsoft.com/profile',
        'https://graph.microsoft.com/offline_access'
    ],
        redirectUri: process.env.redirectUri
}

export const GraphScopes = {
    scopes: [
        'https://graph.microsoft.com/User.Read',
        'https://graph.microsoft.com/Sites.ReadWrite.All',
    ],
    redirectUri: process.env.redirectUri + '/blank.html'
}

export const SharePointScopes = {
    scopes: [
        `https://${process.env.sharePointTenant}.sharepoint.com/AllSites.Read`,
        `https://${process.env.sharePointTenant}.sharepoint.com/AllSites.Write`
    ],
    redirectUri: process.env.redirectUri + '/blank.html'
}