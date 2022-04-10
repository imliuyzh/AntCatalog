import './assets/fonts/ffkievitslabwebprobook.woff2';
import './index.css';
import '@patternfly/react-core/dist/styles/base.css';

import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

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
