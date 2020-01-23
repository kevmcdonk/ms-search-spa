import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en">
                <Head />
                <body className={'ms-Fabric ms-Grid'}
                    dir="ltr"
                    style={{
                        maxWidth: '1140px',
                        margin: '0 auto',
                        backgroundImage: 'url(background.png)'
                    }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument