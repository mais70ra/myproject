import { reset } from 'redux-form';

const CREATE_USER = 'CREATE_USER';
const CREATE_USER_COMMIT = 'CREATE_USER_COMMIT';
const CREATE_USER_ROLLBACK = 'CREATE_USER';

export default (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const userCreate = data => dispatch => {
    return dispatch({
        type: CREATE_USER,
        method: 'user.create',
        params: data,
        meta: {
            online: {
                effect: {
                    successMessage: 'User Successfuly Created',
                },
                commit: { type: CREATE_USER_COMMIT },
                rollback: { type: CREATE_USER_ROLLBACK },
            }
        }
    })
    .then(() => dispatch(reset('userCreate')));
};
