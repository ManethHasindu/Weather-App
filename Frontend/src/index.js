import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-s4shhni0pe08np7e.us.auth0.com"
      clientId="IyNHJg5OLx6U0Xovsjbf44JSIgrsD8Uy"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://weather-api"
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
