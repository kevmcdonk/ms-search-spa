import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '~/context';
import {
    News,
    Layout,
    Search
} from '~/components';
import { getNews } from '~/services';
import { findKey } from 'lodash';

const Home = () => {

    const { isAuthenticated, isLoading, getSharePointAccessToken, getGraphAccessToken } = useContext(UserContext);
    const [globalNews, setGlobalNews] = useState([]);

    useEffect(() => {
        getSharePointAccessToken()
            .then((spToken) => {
                Promise.all([getNews(spToken)])
                        .then((res) => {
                            let queryResults = [];
                            res[0].data.PrimaryQueryResult.RelevantResults.Table.Rows.map((row, i)=> {
                                
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
                        }, err => console.error(err))
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
                        <div id="globalNews" className={'ms-Grid-row'} style={{ margin: '20px 0' }}>
                            <div className={'ms-Grid-col ms-sm12'}>
                                <News data={globalNews} elementPrefix='Gloabl' hideArrows={true} wheel={false} />
                            </div>
                        </div>
                    }
                </>
            }
        </Layout>
    )
}

export default Home