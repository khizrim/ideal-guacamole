import React from 'react';

import { ThemeProvider } from '@gravity-ui/uikit';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import { App } from 'src/components/organisms/App';
import { store } from 'src/store';
import { registerServiceWorker } from 'src/utils/service-worker';

import './index.css';

registerServiceWorker();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={'light'}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
