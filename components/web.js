import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '~/context';
import { getWeb } from '~/services';

const Web = () => {

    const { getSharePointAccessToken } = useContext(UserContext);
    const [web, setWeb] = useState(null);

    useEffect(() => {
        getSharePointAccessToken()
            .then(token => getWeb(token))
            .then(res => setWeb(res.data.d), err => console.error(err))
    }, [])

    return (
        <>
            {web &&
                <p>{web.Title}</p>}
        </>
    );

}

export default Web