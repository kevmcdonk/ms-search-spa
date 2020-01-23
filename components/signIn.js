import React, { useContext } from 'react'
import { UserContext } from '~/context';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react';
import { PrimaryButton } from 'office-ui-fabric-react';

const SignIn = () => {

    const { signIn } = useContext(UserContext);

    return (
        <Dialog
            hidden={false}
            dialogContentProps={{
                type: DialogType.normal,
                title: 'You are not signed in',
                closeButtonAriaLabel: 'Close',
                subText: 'Usually, you should sign in automatically when you are logged in but please could you click the button below to be directed to the login page.'
            }}
            modalProps={{
                isBlocking: true
            }}
        >
            <DialogFooter>
                <PrimaryButton onClick={signIn} text="Click here to sign in" />
            </DialogFooter>
        </Dialog>
    )
}

export default SignIn