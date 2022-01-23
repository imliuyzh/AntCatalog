import './assets/fonts/ffkievitslabwebprobook.woff2';
import './index.css';
import '@patternfly/react-core/dist/styles/base.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store';

window.ANTCATALOG_SERVICES_ENDPOINT =
    (process.env.NODE_ENV === 'production') ? '' : 'http://localhost:26997'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
