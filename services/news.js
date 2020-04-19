import Axios from 'axios';

// This is not currently used but looking at using to have a list of apps
const baseConfig = {
    baseURL: `https://${process.env.sharePointTenant}.sharepoint.com`
}

//TODO: Should use SP Search it appears to filter by type - no graph!!!
const baseGraphConfig = {
    baseURL: 'https://graph.microsoft.com/beta'
}

const baseHeaders = {
    Accept: 'application/json;odata=nometadata'
}

const selectFields = [
    'AbsoluteUrl',
    'BannerImageUrl',
    'BannerThumbnailUrl',
    'Description',
    'FirstPublished',
    'ImgAssetUrl',
    'Path',
    'Title'
].join(',');

const expandFields = [
    'CreatedBy'
].join(',')

const metadataFilter = '<Where><Eq><FieldRef Name="FSObjType" /><Value Type="Integer">0</Value></Eq></Where>'

export const getNews = (spToken) =>
    Axios({
        ...baseConfig,
        method: 'POST',
        url: '/_api/search/query',
        params: {
            querytext: '\'ContentTypeId:0x0101009D1CB255DA76424F860D91F20E6C4118* and PromotedState=2\'',
            sortlist: '\'LastModifiedTime:descending\'',
            rowlimit: 8
        },
        headers: {
            ...baseHeaders,
            Authorization: 'Bearer ' + spToken,

        }
    })

export const getAllApps = (spToken) =>
    Axios({
        ...baseConfig,
        method: 'POST',
        url: '/_api/sitepages/pages/Feed',
        data: {
            metadataFilter: metadataFilter
        },
        params: {
            promotedstate: 2,
            published: true,
            $select: selectFields,
            $skip: 0,
            $top: 13,
            $expand: expandFields
        },
        headers: {
            ...baseHeaders,
            Authorization: 'Bearer ' + spToken
        }
    })

export const findApps = (spToken, text) =>
    Axios({
        ...baseConfig,
        method: 'GET',
        url: `/_api/web/lists/GetByTitle('Site Pages')/items`,
        params: {
            $filter: `substringof('${text}',Title) or substringof('${text}',AppDescription)`
        },
        headers: {
            ...baseHeaders,
            Authorization: 'Bearer ' + spToken
        }
    })

    export const searchRankedApps = (spToken, text) =>
    Axios({
        ...baseConfig,
        method: 'GET',
        url: `/_api/search/query`,
        params: {
            querytext: `'sites/${process.env.hubAppCatalogSite}
            /SitePages'`
        },
        headers: {
            ...baseHeaders,
            Authorization: 'Bearer ' + spToken
        }
    })

    export const getUsedApps = (graphToken) =>
    Axios({
        ...baseGraphConfig,
        method: 'GET',
        url: '/me/insights/used?$filter=ResourceVisualization/mediaType eq \'text/html\' & ResourceVisualization/type eq \'Web\'',
        headers: {
            Authorization: 'Bearer ' + graphToken
        }
    })