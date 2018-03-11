import 'babel-polyfill';
import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './Setup/registerServiceWorker';

import { Provider } from 'react-redux';
import store from './Setup/store';

import { ConnectedRouter } from 'react-router-redux';
import Routes from './routes';
import history from './Setup/history';

import { MuiThemeProvider } from 'material-ui/styles';
import theme from './Setup/theme';

import './Setup/tapEventPlugin';
import { resetRequestsCount, resetDialog } from './Common/duck';

import SessionGateway from './Pages/Login/SessionGateway';

store.dispatch(resetRequestsCount());
store.dispatch(resetDialog());
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <SessionGateway>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </SessionGateway>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
