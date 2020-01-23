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
                            setGlobalNews(res[0].data.value);
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