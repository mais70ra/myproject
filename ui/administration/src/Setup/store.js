import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import history from './history';

import rootReducer from '../reducers';
import requestMiddleware from './requestMiddleware';

const middlewares = [thunk, routerMiddleware(history), requestMiddleware];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension && process.env.NODE_ENV !== 'production'
      ? window.devToolsExtension({ maxAge: 10 })
      : f => f
  )
);

if (module.hot) {
  module.hot.accept('../reducers.js', () => {
    const nextRootReducer = require('../reducers.js').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
