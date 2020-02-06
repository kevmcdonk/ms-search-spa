import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '~/context';
import {
    News,
    Layout,
    Search
} from '~/components';
import { getNews, getMyTrending } from '~/services';
import { findKey } from 'lodash';

const Home = () => {

    const { isAuthenticated, isLoading, getSharePointAccessToken, getGraphAccessToken } = useContext(UserContext);
    const [globalNews, setGlobalNews] = useState([]);
    const [trendingItems, setTrendingItems] = useState([]);

    useEffect(() => {
        var homeRef = this;
        getSharePointAccessToken()
            .then((spToken) => {
                getGraphAccessToken()
                    .then((graphToken) => {
                        Promise.all([getNews(spToken), getMyTrending(graphToken)])
                            .then((res) => {
                                //TODO: Work out how to split this out in to separate function
                                let queryResults = [];
                                res[0].data.PrimaryQueryResult.RelevantResults.Table.Rows.map((row, _i) => {

                                    // Title, DocId, Author, Path, Description, PictureThumbnailUrl, SiteName, SPWebUrl, ViewsLifeTime, ViewsRecent
                                    let queryResult = {
                                        title: '',
                                        docId: '',
                                        author: '',
                                        path: '',
                                        description: '',
                                        pictureThumbnailUrl: '',
                                        siteName: '',
                                        spWebUrl: '',
                                        viewsLifeTime: 0,
                                        viewsRecent: 0
                                    };
                                    row.Cells.map((cell, j) => {
                                        if (cell.Key == 'Title') {
                                            queryResult.title = cell.Value;
                                        }
                                        else if (cell.Key == 'DocId') {
                                            queryResult.docId = cell.Value;
                                        }
                                        else if (cell.Key == 'Author') {
                                            queryResult.author = cell.Value;
                                        }
                                        else if (cell.Key == 'Path') {
                                            queryResult.path = cell.Value;
                                        }
                                        else if (cell.Key == 'Description') {
                                            queryResult.description = cell.Value;
                                        }
                                        else if (cell.Key == 'PictureThumbnailURL') {
                                            queryResult.pictureThumbnailUrl = cell.Value;
                                        }
                                        else if (cell.Key == 'SiteName') {
                                            queryResult.siteName = cell.Value;
                                        }
                                        else if (cell.Key == 'SPWebUrl') {
                                            queryResult.spWebUrl = cell.Value;
                                        }
                                        else if (cell.Key == 'ViewsLifeTime') {
                                            queryResult.viewsLifeTime = cell.Value;
                                        }
                                        else if (cell.Key == 'ViewsRecent') {
                                            queryResult.viewsRecent = cell.Value;
                                        }
                                    });
                                    queryResults.push(queryResult);
                                });
                                setGlobalNews(queryResults);

                                let processedQueryResults = [];
                                console.log('Results length: ' + res.length);
                                console.log(res);
                                
                                res[1].data.value.map((_row, i) => {

                                    // Title, DocId, Author, Path, Description, PictureThumbnailUrl, SiteName, SPWebUrl, ViewsLifeTime, ViewsRecent
                                    let queryResult = {
                                        title: _row.resourceVisualization.title,
                                        docId: '',
                                        author: '',
                                        path: '',
                                        description: _row.resourceVisualization.previewText,
                                        pictureThumbnailUrl: _row.resourceVisualization.previewImageUrl,
                                        siteName: '',
                                        spWebUrl: '',
                                        viewsLifeTime: 0,
                                        viewsRecent: 0
                                    };
                                    processedQueryResults.push(queryResult);
                                });
                                setTrendingItems(processedQueryResults);

                            }, err => console.error(err))
                    })
            })
    }, [])

    return (
        <Layout>
            {isAuthenticated && !isLoading &&
                <>
                    <div className={'ms-Grid-row'} style={{ margin: '20px 0' }}>
                        <div className={'ms-Grid-col ms-sm12'} style={{ margin: '20px 0' }}>
                            <Search />
                        </div>
                    </div>
                    {globalNews && globalNews.length > 0 &&
                        <div id="globalNews" style={{ margin: '20px 0' }}>
                            <News data={globalNews} headerText='News' elementPrefix='Global' />
                        </div>
                    }

                    {trendingItems && trendingItems.length > 0 &&
                        <div id="trendingItems" style={{ margin: '20px 0' }}>
                            <News data={trendingItems} headerText='Trending Items' elementPrefix='Trending' />
                        </div>
                    }
                </>
            }
        </Layout>
    )

    processSearchResults = (searchResults) => {
        let queryResults = [];
        searchResults.map((row, _i) => {

            // Title, DocId, Author, Path, Description, PictureThumbnailUrl, SiteName, SPWebUrl, ViewsLifeTime, ViewsRecent
            let queryResult = {
                title: '',
                docId: '',
                author: '',
                path: '',
                description: '',
                pictureThumbnailUrl: '',
                siteName: '',
                spWebUrl: '',
                viewsLifeTime: 0,
                viewsRecent: 0
            };
            row.Cells.map((cell, j) => {
                if (cell.Key == 'Title') {
                    queryResult.title = cell.Value;
                }
                else if (cell.Key == 'DocId') {
                    queryResult.docId = cell.Value;
                }
                else if (cell.Key == 'Author') {
                    queryResult.author = cell.Value;
                }
                else if (cell.Key == 'Path') {
                    queryResult.path = cell.Value;
                }
                else if (cell.Key == 'Description') {
                    queryResult.description = cell.Value;
                }
                else if (cell.Key == 'PictureThumbnailURL') {
                    queryResult.pictureThumbnailUrl = cell.Value;
                }
                else if (cell.Key == 'SiteName') {
                    queryResult.siteName = cell.Value;
                }
                else if (cell.Key == 'SPWebUrl') {
                    queryResult.spWebUrl = cell.Value;
                }
                else if (cell.Key == 'ViewsLifeTime') {
                    queryResult.viewsLifeTime = cell.Value;
                }
                else if (cell.Key == 'ViewsRecent') {
                    queryResult.viewsRecent = cell.Value;
                }
            });
            queryResults.push(queryResult);
        });
        return queryResults;
    }

    processTrendingItems = (trendingItemResults) => {
        let queryResults = [];
        trendingItemResults.map((_row, i) => {

            // Title, DocId, Author, Path, Description, PictureThumbnailUrl, SiteName, SPWebUrl, ViewsLifeTime, ViewsRecent
            let queryResult = {
                title: _row.resourceVisualization.title,
                docId: '',
                author: '',
                path: '',
                description: _row.resourceVisualization.previewText,
                pictureThumbnailUrl: _row.resourceVisualization.previewImageUrl,
                siteName: '',
                spWebUrl: '',
                viewsLifeTime: 0,
                viewsRecent: 0
            };
            queryResults.push(queryResult);
        });
        return queryResults;
    }
}

export default Home