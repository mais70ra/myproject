import {
  showDialog,
  hardLogout,
  incrementRequestsCount,
  decrementRequestsCount
} from '../Common/duck';
import { getStore } from './store';

let requestId = 0;

const effect = (effect = {}, action = {}) => {
  if (effect.custom) {
    return effect.custom(effect, action);
  }

  getStore().dispatch(incrementRequestsCount());
  return fetch(effect.url || `/rpc/${action.method}`, {
    method: effect.method || 'POST',
    credentials: 'include',
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: ++requestId,
      method: action.method,
      params: action.params || {}
    })
  }).then(res => {
    getStore().dispatch(decrementRequestsCount());
    if (res.ok) {
      return parseResponse(res, action);
    } else if (res.status === 401 && res.statusText === 'Unauthorized') {
      showDialog('Your session has expired', true);
      hardLogout();
      return Promise.reject(
        res.text().then(msg => {
          const error = new Error(msg);
          error.permanent = true;
          error.noDialog = true;
          return error;
        })
      );
    } else if (res.status === 400 && res.body) {
      return res.json().then(body => {
        if (body.validation && !action.hideError) {
          showDialog(body.message, true);
        }

        body.noDialog = true;
        body.permanent = true;
        return Promise.reject(body);
      });
    }

    return Promise.reject(res.text().then(msg => new Error(msg)));
  });
};

const parseResponse = (res, action) =>
  res.json().then(res => {
    if (res.error) {
      res.error.permanent = true;
      res.error.noDialog = true;
      if (!action.hideError) {
        showDialog(action.errorMessage || res.error.message, true);
      } else if (
        typeof res.error.type === 'string' &&
        res.error.type.indexOf('identity.' > -1)
      ) {
        hardLogout();
        showDialog(action.errorMessage || res.error.message, true);
      }

      return Promise.reject(res.error);
    }

    if (action.statusMessage) {
      showDialog(action.statusMessage);
    }

    return res.result;
  });

const discard = (error, action, retries) => {
  const shouldDiscard = error.permanent || retries > 3;
  if (shouldDiscard && !error.noDialog && !action.hideError) {
    showDialog(action.errorMessage || error.message, true);
  }
  return shouldDiscard;
};

const retry = (action, retries) =>
  action.meta.urgent ? 1000 : 1000 * (retries + 1);

const persistOptions = {
  whitelist: ['auth']
};

export default {
  effect,
  discard,
  retry,
  persistOptions
};
