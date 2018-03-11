import {
  showDialog,
  hardLogout,
  incrementRequestsCount,
  decrementRequestsCount
} from '../Common/duck';

let requestId = 0;

const requestMiddleware = store => next => action => {
  const online = action && action.meta && action.meta.online;

  if (!online) {
    return next(action);
  }

  next(action);
  const effect = online.effect || {};

  if (effect.custom) {
    return effect.custom(store, next, action);
  }

  if (effect.startMessage) {
    showDialog(effect.startMessage, false);
  }

  store.dispatch(incrementRequestsCount());
  return fetch(effect.url || '/rpc', {
    method: effect.method || 'POST',
    credentials: 'include',
    headers: { 
      'content-type': 'application/json; charset=utf-8'
    , ...effect.headers },
    body: effect.rawBody
      ? action.params
      : JSON.stringify({
          jsonrpc: '2.0',
          id: ++requestId,
          method: action.method,
          params: action.params || {}
        })
  })
    .then(res => {
      if (res.ok) {
        return parseResponse(res, action, effect);
      } else if (res.status === 401 && res.statusText === 'Unauthorized') {
        showDialog('Your session has expired', true);
        hardLogout();
        return Promise.reject(res.text().then(msg => new Error(msg)));
      } else if (res.status === 400 && res.body) {
        return res.json().then(body => {
          if (!effect.hideError && body.validation) {
            showDialog(body.message, true);
          }
          if (!effect.hideError && body.error && body.error.message) {
            showDialog(body.error.message, true);
          }
          return Promise.reject(body);
        });
      }

      return Promise.reject(
        res.text().then(msg => {
          const error = new Error(msg);
          if (!effect.hideError) {
            showDialog(effect.errorMessage || error.message, true);
          }
          return error;
        })
      );
    })
    .then(res => {
      store.dispatch(decrementRequestsCount());
      if (online.commit) {
        return next({
          type: online.commit.type,
          meta: online.commit.meta,
          payload: res
        });
      }
    })
    .catch(err => {
      store.dispatch(decrementRequestsCount());
      if (online.rollback) {
        next({
          type: online.rollback.type,
          meta: online.rollback.meta,
          payload: err
        });
      }

      return Promise.reject(err);
    });
};

const parseResponse = (res, action, effect) =>
  res.json().then(res => {
    if (res.error) {
      if (!effect.hideError) {
        showDialog(effect.errorMessage || res.error.message, true);
      }

      if (
        typeof res.error.type === 'string' &&
        res.error.type.indexOf('identity.') > -1
      ) {
        hardLogout();
      }

      return Promise.reject(res.error);
    }

    if (effect.successMessage) {
      showDialog(effect.successMessage);
    }

    return effect.rawResponse ? res : res.result;
  });

export default requestMiddleware;
