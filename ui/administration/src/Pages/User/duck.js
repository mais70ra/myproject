const DROPDOWN = 'DROPDOWN';
const DROPDOWN_COMMIT = 'DROPDOWN_COMMIT';
const DROPDOWN_ROLLBACK = 'DROPDOWN_ROLLBACK';
const defaultState = {
    dropdowns: {}
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case DROPDOWN_COMMIT:
        return action.payload
        default:
            return state;
    }
};


export const fetchUserDropdowns = x => dispatch => {
    return dispatch({
        type: DROPDOWN,
        method: 'dictionaries.get',
        params: ['gender', 'languages'],
        meta: {
            online: {
                effect: { hideError: true },
                commit: { type: DROPDOWN_COMMIT },
                rollback: { type: DROPDOWN_ROLLBACK },
            }
        },
    });
};
