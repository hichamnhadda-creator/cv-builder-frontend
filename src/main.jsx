import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './utils/i18n';
import './styles/globals.css';
import './styles/animations.css';
import './styles/rtl.css';
import { APP_VERSION } from './utils/constants';

// Reset mechanism to clear old local storage data on version updates
const currentVersion = localStorage.getItem('app_version');
if (currentVersion !== APP_VERSION) {
    console.warn(`[App Initialization] Version changed from ${currentVersion} to ${APP_VERSION}. Clearing old localStorage data to prevent conflicts.`);
    localStorage.clear();
    localStorage.setItem('app_version', APP_VERSION);
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
