import Axios from 'axios';

const baseConfig = {
    baseURL: 'https://graph.microsoft.com/beta'
}

export const searchDriveItems = (graphToken, searchQuery) =>
    Axios({
        ...baseConfig,
        method: 'POST',
        baseURL: baseConfig.baseURL,
        url: '/search/query',
        data: 
        {
          "requests":[
            {
              "entityTypes":["listItem"],
              "query":{"queryString":searchQuery},
              "fields":["id","name","contentclass","title","resource","parentReference","lastModifiedDateTime","summary"]
            }
          ]
        },
        headers: {
            'Authorization': graphToken
        }
    })
