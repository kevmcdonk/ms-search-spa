import Axios from 'axios';

const baseConfig = {
    baseURL: 'https://graph.microsoft.com/v1.0'
}
const betaBaseConfig = {
    baseURL: 'https://graph.microsoft.com/beta'
}

export const getMe = (graphToken) =>
    Axios({
        ...baseConfig,
        method: 'GET',
        baseURL: baseConfig.baseURL,
        url: '/me',
        headers: {
            'Authorization': graphToken
        }
    })

export const getMyPhoto = (graphToken) =>
    Axios({
        ...baseConfig,
        method: 'GET',
        url: '/me/photos/48x48/$value',
        responseType: 'blob',
        headers: {
            'Authorization': graphToken
        }
    })

    export const getMyTrending = (graphToken) =>
    Axios({
        ...betaBaseConfig,
        method: 'GET',
        url: '/me/insights/trending',
        params: {
            $top: 8
        },
        headers: {
            'Authorization': graphToken
        }
    })
