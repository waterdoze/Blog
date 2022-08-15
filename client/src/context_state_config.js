import React, { useState } from 'react';
import { ProfileContextProvider } from './context/ProfileContext';

import AllRoutes from './routes';

const ContextState = () => {

    
    return (
        <div>
            <ProfileContextProvider>
                <AllRoutes />
            </ProfileContextProvider>
        </div>
    )
}


export default ContextState;