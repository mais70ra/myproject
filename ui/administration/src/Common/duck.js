import { push, goBack, goForward } from 'react-router-redux';
import { RESET_STATE } from '@redux-offline/redux-offline/lib/constants';
import { LOGOUT } from '../Pages/Login/duck';
import { getStore } from '../Setup/store';
import { base64ToBlob } from './helpers';

export const changeRoute = route => dispatch => dispatch(push(route));

export const routeBack = () => dispatch => dispatch(goBack());

export const routeForward = () => dispatch => dispatch(goForward());

const INCREMENT_REQUESTS_COUNT = 'INCREMENT_REQUESTS_COUNT';
const DECREMENT_REQUESTS_COUNT = 'DECREMENT_REQUESTS_COUNT';
const RESET_REQUESTS_COUNT = 'RESET_REQUESTS_COUNT';

export const online = (state = { requests: 0 }, action) => {
  switch (action.type) {
    case INCREMENT_REQUESTS_COUNT:
      return { ...state, requests: state.requests + 1 };
    case DECREMENT_REQUESTS_COUNT:
      return {
        ...state,
        requests: state.requests - 1 < 0 ? 0 : state.requests - 1
      };
    case RESET_REQUESTS_COUNT:
      return {
        ...state,
        requests: 0
      };
    default:
      return state;
  }
};

export const incrementRequestsCount = () => ({
  type: INCREMENT_REQUESTS_COUNT
});

export const decrementRequestsCount = () => ({
  type: DECREMENT_REQUESTS_COUNT
});

export const resetRequestsCount = () => ({
  type: RESET_REQUESTS_COUNT
});

const SHOW_DIALOG = 'SHOW_DIALOG';
const CLOSE_DIALOG = 'CLOSE_DIALOG';
const RESET_DIALOG = 'RESET_DIALOG';

export const dialog = (state = { statusesQueue: [] }, action) => {
  switch (action.type) {
    case SHOW_DIALOG:
      if (state.message) {
        const nextStatusesShow = [...state.statusesQueue];
        if (
          !nextStatusesShow.some(x => x.message === action.message) &&
          state.message !== action.message
        ) {
          nextStatusesShow.push({
            message: action.message,
            isError: action.isError
          });
        }

        return { ...state, statusesQueue: nextStatusesShow };
      }

      return {
        ...state,
        message: action.message,
        isError: action.isError
      };
    case CLOSE_DIALOG:
      if (state.statusesQueue.length) {
        const nextStatusesClose = [...state.statusesQueue];
        const nextStatus = nextStatusesClose.shift();
        return {
          ...state,
          statusesQueue: nextStatusesClose,
          message: nextStatus.message,
          isError: nextStatus.isError
        };
      }
      return { ...state, message: null, isError: false };
    case RESET_DIALOG:
      return {
        ...state,
        message: null,
        isError: false,
        statusesQueue: []
      };
    default:
      return state;
  }
};

export const showDialog = (message, isError) =>
  getStore().dispatch({
    type: SHOW_DIALOG,
    message,
    isError
  });

export const closeDialog = () => ({
  type: CLOSE_DIALOG
});

export const resetDialog = () => ({
  type: RESET_DIALOG
});

export const hardLogout = () => {
  getStore().dispatch({
    type: LOGOUT
  });

  getStore().dispatch({
    type: RESET_STATE
  });
};

const UPLOAD_PHOTO = 'UPLOAD_PHOTO';
const UPLOAD_PHOTO_COMMIT = 'UPLOAD_PHOTO_COMMIT';

export const uploadPhoto = data => dispatch => {
  const formData = new FormData();
  const file = base64ToBlob(data.file);
  formData.append('file', file, data.filename || 'photo.png');

  return dispatch({
    type: UPLOAD_PHOTO,
    params: formData,
    meta: {
      online: {
        effect: { url: '/file-upload', rawBody: true, rawResponse: true },
        commit: {
          type: UPLOAD_PHOTO_COMMIT,
          meta: { prop: data.prop }
        }
      }
    }
  });
};