import { RESET_STATE } from '@redux-offline/redux-offline/lib/constants';

const LOGIN = 'LOGIN';
const LOGIN_COMMIT = 'LOGIN_COMMIT';
const LOGIN_ROLLBACK = 'LOGIN_ROLLBACK';
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
    case LOGIN_COMMIT:
      return { ...state, currentUser: parseLogin(action) };
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
