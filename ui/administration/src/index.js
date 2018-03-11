import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './Setup/registerServiceWorker';

import { Provider } from 'react-redux';
import { getStoreAsync } from './Setup/store';

import { ConnectedRouter } from 'react-router-redux';
import Routes from './routes';
import history from './Setup/history';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './Setup/muiTheme';

import './Setup/tapEventPlugin';
import { resetRequestsCount, resetDialog } from './Common/duck';

getStoreAsync().then(store => {
  store.dispatch(resetRequestsCount());
  store.dispatch(resetDialog());
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
  );
});

registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
