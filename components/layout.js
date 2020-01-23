import React, { useContext } from 'react';
import Head from 'next/head';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { UserContext } from '~/context';
import { Header } from '~/components';

const Layout = ({ children, title = 'Digital Workplace Hub' }) => {

    const { isLoading } = useContext(UserContext);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="shortcut icon" href="favicon.png" />
                <link rel="stylesheet" href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/11.0.0/css/fabric.min.css" />
                <script src="https://unpkg.com/markdown-it@8.4.0/dist/markdown-it.min.js" />
            </Head>

            <div className={'ms-Grid-row'} style={{ margin: '20px 0' }}>
                <div className={'ms-Grid-col ms-sm12'}>
                    {isLoading ?
                        <Spinner size={SpinnerSize.medium} />
                        : <Header />
                    }
                </div>
            </div>

            {children}

        </>
    )
}

export default Layout