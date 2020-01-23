import Axios from 'axios';

const baseConfig = {
    baseURL: `https://${process.env.qnaMakerHost}.azurewebsites.net/qnamaker`,
    headers: {
        'Authorization': 'EndpointKey ' + process.env.qnaMakerKey,
        'Content-Type': 'application/json'
    }
}

export const getAnswer = (question) =>
    Axios({
        ...baseConfig,
        method: 'POST',
        url: '/knowledgebases/0ba853b3-ea30-4482-9d29-81eca07d5947/generateAnswer',
        data: {
            question,
            top: 3
        }
    })