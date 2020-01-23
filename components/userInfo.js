import React, { useContext } from 'react'
import { UserContext } from '~/context';

import { Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react'

const UserInfo = () => {

    const { userPhoto, user } = useContext(UserContext);

    return (
        <div>
            {userPhoto && user.givenName &&
                <Persona imageUrl={userPhoto}
                    text={user.displayName}
                    secondaryText={user.jobTitle}
                    size={PersonaSize.size56}
                    hidePersonaDetails={false}
                    presence={PersonaPresence.online} />
            }
        </div>
    )
}

export default UserInfo;