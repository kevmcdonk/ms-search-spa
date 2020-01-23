import React, { useContext } from 'react';
import { Persona, PersonaSize, IconButton, DirectionalHint, ContextualMenuItemType } from 'office-ui-fabric-react';
import { UserContext } from '~/context';
import { getFirstCharacter, capitalise } from "~/services";

const Header = () => {

    const {
        user,
        userPhoto,
        isAuthenticated,
        signIn,
        signOut
    } = useContext(UserContext);

    return (
        <>
            <div className={'ms-Grid-col ms-sm11'}></div>
            <div className={'ms-Grid-col ms-sm1'} style={{ display: 'inline-flex', justifyContent: 'flex-end' }}>
                {isAuthenticated && user &&
                    <>
                        <Persona
                            imageUrl={userPhoto}
                            imageInitials={capitalise(getFirstCharacter(user.givenName)) + capitalise(getFirstCharacter(user.surname))}
                            text={user.displayName}
                            size={PersonaSize.size32}
                            hidePersonaDetails={true}
                            styles={{ display: 'inline-block' }}
                        />

                        <IconButton style={{ backgroundColor: 'rgba(0,0,0,0)' }}
                            menuProps={{
                                directionalHint: DirectionalHint.bottomRightEdge,
                                items: [{
                                    key: 'name',
                                    text: user.displayName,
                                    style: { fontWeight: 'bold' }
                                },
                                {
                                    key: 'upn',
                                    text: user.userPrincipalName
                                }, {
                                    key: 'signOut',
                                    text: 'Sign Out',
                                    onClick: signOut
                                }]
                            }}
                            title="SignedInUserMenu"
                            ariaLabel="SignedInUserMenu" />
                    </>
                }
                {!isAuthenticated &&
                    <>
                        <Persona showUnknownPersonaCoin={true}
                            size={PersonaSize.size32}
                            hidePersonaDetails={true} />
                        <IconButton style={{ backgroundColor: 'rgba(0,0,0,0)' }}
                            menuProps={{
                                directionalHint: DirectionalHint.bottomRightEdge,
                                items: [{
                                    key: 'signIn',
                                    text: 'Sign In',
                                    onClick: signIn
                                }]
                            }}
                            title="SignedOutUserMenu"
                            ariaLabel="SignedOutUserMenu" />
                    </>
                }
            </div>
        </>
    )
}



export default Header;