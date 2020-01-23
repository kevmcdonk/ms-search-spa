import Axios from 'axios';

const baseConfig = {
    baseURL: 'https://graph.microsoft.com/v1.0'
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