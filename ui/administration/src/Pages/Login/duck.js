import { RESET_STATE } from '@redux-offline/redux-offline/lib/constants';
import cookies from 'js-cookie';

const LOGIN = 'LOGIN';
const LOGIN_COMMIT = 'LOGIN_COMMIT';
const LOGIN_ROLLBACK = 'LOGIN_ROLLBACK';
const CHECK_SESSION = 'CHECK_SESSION';
const CHECK_SESSION_NO_COOKIE = 'CHECK_SESSION_NO_COOKIE';
const CHECK_SESSION_COMMIT = 'CHECK_SESSION_COMMIT';
const CHECK_SESSION_ROLLBACK = 'CHECK_SESSION_ROLLBACK';

export const LOGOUT = 'LOGOUT';

const defaultState = {
  currentUser: null,
  passwordChangeRequired: false
};

const parseLogin = action => {
  const currentUser = action.payload
  return currentUser;
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHECK_SESSION_NO_COOKIE:
      return {
        ...state,
        currentUser: null,
        sessionChecked: true
      };
    case LOGIN_COMMIT:
      return { ...state, currentUser: parseLogin(action) };
    case CHECK_SESSION_COMMIT:
      return {
        ...state,
        currentUser: parseLogin(action),
        sessionChecked: true
      };
    case CHECK_SESSION_ROLLBACK:
      cookies.remove('Cookie');
      return {
        ...state,
        currentUser: null,
        sessionChecked: true
      };
    case LOGOUT:
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

export const login = params => ({
  type: LOGIN,
  params: { ...params },
  method: 'user.login',
  meta: {
    online: {
      effect: { url: '/rpc' },
      commit: { type: LOGIN_COMMIT, meta: { params } },
      rollback: { type: LOGIN_ROLLBACK, meta: {} }
    }
  }
});

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT,
    method: 'user.logout',
    meta: {
      online: {}
    }
  });

  dispatch({
    type: RESET_STATE
  });
};

export const checkSession = () => ({
  type: CHECK_SESSION,
  method: 'user.checkSession',
  params: {},
  meta: {
    online: {
      effect: { hideError: true },
      commit: { type: CHECK_SESSION_COMMIT, meta: { params: {} } },
      rollback: { type: CHECK_SESSION_ROLLBACK, meta: {} }
    }
  }
});

export const checkSessionNoCookie = () => ({
  type: CHECK_SESSION_NO_COOKIE
});
