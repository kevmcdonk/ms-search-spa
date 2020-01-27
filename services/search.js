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
        data: {
            "requests": [
                {
                  "entityTypes": [
                    "microsoft.graph.driveItem"
                  ],
                  "query": {
                    "query_string": {
                      "query": searchQuery
                    }
                  },
                  "from": 0,
                  "size": 25
                }
              ]
        },
        headers: {
            'Authorization': graphToken
        }
    })
