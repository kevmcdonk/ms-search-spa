import React, { useContext } from 'react';
import { UserContext } from '~/context';

import { PrimaryButton } from 'office-ui-fabric-react'

const SignOut = () => {

    const { signOut } = useContext(UserContext);

    return (
        <div>
            <PrimaryButton onClick={signOut}>Sign Out</PrimaryButton>
        </div>
    )
}

export default SignOut