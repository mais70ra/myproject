import { reset } from 'redux-form';

const UPDATE_CURRENT = 'UPDATE_CURRENT';
const UPDATE_CURRENT_COMMIT = 'UPDATE_CURRENT_COMMIT';
const UPDATE_CURRENT_ROLLBACK = 'UPDATE_CURRENT';

const GET_CURRENT = 'GET_CURRENT';
const GET_CURRENT_COMMIT = 'GET_CURRENT_COMMIT';
const GET_CURRENT_ROLLBACK = 'GET_CURRENT_ROLLBACK';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_CURRENT_COMMIT:
            return {
                ...state,
                currentUser: null
            };
        default:
            return state;
    }
};

export const updateCurrent = data => dispatch => {
    return dispatch({
        type: UPDATE_CURRENT,
        method: 'user.updateCurrent',
        params: data,
        meta: {
            online: {
                effect: {
                    successMessage: 'You successfuly changed your data',
                },
                commit: { type: UPDATE_CURRENT_COMMIT },
                rollback: { type: UPDATE_CURRENT_ROLLBACK },
            }
        }
    })
    .then(() => dispatch(reset('updateCurrent')));
};

export const changeLanguage = data => dispatch => {
    debugger;
    return dispatch({
        type: GET_CURRENT,
        method: 'user.changeLanguage',
        params: data,
        meta: {
            online: {
                effect: {
                    successMessage: 'You successfuly changed your language',
                },
                commit: { type: GET_CURRENT_COMMIT },
                rollback: { type: GET_CURRENT_ROLLBACK },
            }
        }
    })
    .then(() => dispatch(reset('changeLanguage')));
};
