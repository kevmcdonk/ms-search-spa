import Axios from 'axios';

const baseConfig = {
    baseURL: `https://${process.env.sharePointTenant}.sharepoint.com`
}

export const getWeb = (token) =>
    Axios({
        ...baseConfig,
        method: 'GET',
        url: '/_api/web',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json;odata=verbose'
        }
    })