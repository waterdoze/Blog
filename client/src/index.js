import React from "react";
import {createRoot} from "react-dom/client";
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App'

const container = document.getElementById('root');
const root = createRoot(container);

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;

root.render(
    <Auth0Provider
        domain={domain}
        clientId={clientID}
        redirectUri={window.location.origin}>
        
        <App />
    </Auth0Provider>
);