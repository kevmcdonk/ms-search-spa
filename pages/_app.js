import React from 'react';
import App from 'next/app';
import * as Msal from 'msal';

import { initializeIcons } from '@uifabric/icons';

import { UserContext } from '~/context';
import { getMe, getMyPhoto } from '~/services';
import { MsalConfig, LoginScopes, SharePointScopes, GraphScopes } from '~/config';

class MyApp extends App {

    state = {
        isLoading: true,
        isAuthenticated: false,
        user: {},
        userPhoto: {},
        err: null
    };

    componentDidMount = () => {

        initializeIcons();

        this.userAgentApplication = new Msal.UserAgentApplication(MsalConfig);

        this.userAgentApplication.handleRedirectCallback((err, res) => {
            //if (err) { console.error(err); return; }
            // console.log('MSAL Redirect response: ' + res);
            if (err) {
                console.log(err);
            } else {
                if (res.tokenType === "id_token") {
                    this.getGraphAccessToken();
                } else if (res.tokenType === "access_token") {
                    // console.log('MSAL Access Token loaded')
                } else {
                    // console.log("token type is:" + res.tokenType);
                }
            }
        });

        this.handleUser();
    }

    handleUser = () => {
        const user = this.userAgentApplication.getAccount();

        if (user) {
            const userProfile = this.getUserProfile()
            const userProfilePhoto = this.getUserProfilePhoto()

            Promise.all([userProfile, userProfilePhoto]).then(values => {
                const user = values[0];
                const photo = values[1];
                this.setState({ user, isAuthenticated: true, userPhoto: URL.createObjectURL(photo), isLoading: false })
            });
        } else {
            this.setState({ isLoading: true });
            this.signIn();
        }
    }

    signIn = () => {
        // console.log('Calling sign in');
        this.userAgentApplication.loginRedirect(LoginScopes);
    }

    signOut = () => {
        this.userAgentApplication.logout();
    }

    getGraphAccessToken = () => {
        return this.getAccessToken(GraphScopes)
    }

    getSharePointAccessToken = () => {
        return this.getAccessToken(SharePointScopes)
    }

    getAccessToken = (scopes) => {
        this.userAgentApplication.redirectUri = '';

        return new Promise((resolve, reject) => {
            // console.log('Retrieving access token');
            this.userAgentApplication
                .acquireTokenSilent(scopes)
                .then(res => resolve(res.accessToken), (err) => {
                    console.log('Access Token Error: %o', err)
                    this.signIn();
                })
        });
    }

    getUserProfile = () => {
        return new Promise((resolve, reject) => {
            this.getGraphAccessToken()
                .then(token => getMe(token))
                .then(res => resolve(res.data), err => reject(err))
        });
    }

    getUserProfilePhoto = () => {
        return new Promise((resolve, reject) => {
            this.getGraphAccessToken()
                .then(token => getMyPhoto(token))
                .then(res => resolve(res.data), err => reject(err))
        })
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <UserContext.Provider value={{
                user: this.state.user,
                userPhoto: this.state.userPhoto,
                signIn: this.signIn,
                signOut: this.signOut,
                getGraphAccessToken: this.getGraphAccessToken,
                getSharePointAccessToken: this.getSharePointAccessToken,
                isAuthenticated: this.state.isAuthenticated,
                isLoading: this.state.isLoading
            }}>
                <Component {...pageProps} />
            </UserContext.Provider >
        )
    }
}

export default MyApp;