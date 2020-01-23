import Axios from 'axios';

const baseConfig = {
    baseURL: 'https://graph.microsoft.com/v1.0'
}

export const sendFeedback = (token, feedbackText) =>
    Axios({
        ...baseConfig,
        method: 'POST',
        baseURL: baseConfig.baseURL,
        url: '/sites/m365x809970.sharepoint.com,e1ba37b2-751b-42de-9bab-be74ffbea41b,46f7de5a-cd84-455f-ad29-3be5596a7890/lists/dc94e7a3-658e-4f41-b6d3-fa2eac515a64/items',
        data: {
            'fields': {
                'Title': feedbackText
            }
        },
        headers: {
            'Authorization': token
        }
    })