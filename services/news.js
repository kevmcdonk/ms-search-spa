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
/*
https://cpsdemos.sharepoint.com/sites/TheLanding/_api
/search/postquery
{ "request": {"ClientType":"HighlightedContentWebPart",
"QueryTemplate":"((ContentTypeId:0x0101009D1CB255DA76424F860D91F20E6C4118* AND PromotedState=2))",
"SelectProperties":["ContentType","ContentTypeId","Title","EditorOwsUser","ModifiedBy","LastModifiedBy","FileExtension","FileType","Path","SiteName","SiteTitle","PictureThumbnailURL","DefaultEncodingURL","LastModifiedTime","ListID","ListItemID","SiteID","WebId","UniqueID","SPWebUrl","UserName","ProfileImageSrc","Name","Initials","WebPath","PreviewUrl","IconUrl","AccentColor","CardType","TipActionLabel","TipActionButtonIcon","ClassName","IsExternalContent"],
"Properties":[{"Name":"TrimSelectProperties","Value":{"StrVal":"1","QueryPropertyValueTypeIndex":1}},{"Name":"EnableDynamicGroups","Value":{"BoolVal":"True","QueryPropertyValueTypeIndex":3}},{"Name":"EnableMultiGeoSearch","Value":{"BoolVal":"False","QueryPropertyValueTypeIndex":3}}],
"SourceId":"8413CD39-2156-4E00-B54D-11EFD9ABDB89",
"TrimDuplicates":false,
"RowLimit":8,
"RowsPerPage":8,
"SortList":[{"Property":"LastModifiedTime","Direction":1}]} }

https://cpsdemos.sharepoint.com/_api/search/query?querytext=%27ContentTypeId:0x0101009D1CB255DA76424F860D91F20E6C4118*%20and%20PromotedState=2%27&sortlist=%27LastModifiedTime:descending%27
*/
export const getNews = (spToken) =>
    Axios({
        ...baseConfig,
        method: 'POST',
        url: '/_api/search/query',
        params: {
            querytext: '\'ContentTypeId:0x0101009D1CB255DA76424F860D91F20E6C4118* and PromotedState=2\'',
            sortlist: '\'LastModifiedTime:descending\''
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