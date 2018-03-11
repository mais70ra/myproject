import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import history from './history';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

import customOfflineConfig from './offline';
import rootReducer from '../reducers';
import requestMiddleware from './requestMiddleware';

const middlewares = [thunk, routerMiddleware(history), requestMiddleware];

let store;

export const getStore = () => store;

export const getStoreAsync = () => {
  if (store) {
    return Promise.resolve(store);
  }

  return new Promise(resolve => {
    const persistCallback = () => {
      resolve(store);
    };

    store = createStore(
      rootReducer,
      compose(
        applyMiddleware(...middlewares),
        offline({ ...offlineConfig, ...customOfflineConfig, persistCallback }),
        window.devToolsExtension ? window.devToolsExtension({maxAge: 10}) : f => f
      )
    );

    if (module.hot) {
      module.hot.accept('../reducers.js', () => {
        const nextRootReducer = require('../reducers.js').default;
        store.replaceReducer(nextRootReducer);
      });
    }
  });
};
