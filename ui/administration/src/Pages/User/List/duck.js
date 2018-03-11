import update from 'immutability-helper';
import get from 'lodash.get';

const FETCH_USERS = 'FETCH_USERS';
const FETCH_USERS_COMMIT = 'FETCH_USERS_COMMIT';
const SELECT_USER = 'SELECT_USER';
const CHANGE_FILTERS = 'CHANGE_FILTERS';

const defaultState = {
  data: [],
  selected: [],
  filters: {
    name: '',
    phone: '',
    paging: { pageNumber: 1, pageSize: 5 }
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_USERS_COMMIT:
      const pagination = get(action.payload, ['pagination', 0]);
      const data = action.payload;
      return update(state, {
        data: { $set: data },
        filters: {
          paging: {
            pageNumber: { $set: get(pagination, 'pageNumber', 1) },
            totalPages: { $set: get(pagination, 'pagesTotal', null) },
            totalRecords: { $set: get(pagination, 'recordsTotal', null) }
          }
        }
      });
    case SELECT_USER:
      return { ...state, selected: action.selected };
    case CHANGE_FILTERS:
      return {
        ...state,
        selected: [],
        filters: action.filters
      };
    default:
      return state;
  }
};

export const fetchUsers = (filters = defaultState.filters) => ({
  type: FETCH_USERS,
  method: 'user.findAll',
  params: {
    firstName: filters.firstName,
    lastName: filters.lastName,
    phone: filters.phone,
    paging: {
      pageNumber: get(filters, ['paging', 'pageNumber'], 1),
      pageSize: get(
        filters,
        ['paging', 'pageSize'],
        get(defaultState, ['filters', 'paging', 'pageSize'])
      )
    }
  },
  meta: {
    online: {
      commit: { type: FETCH_USERS_COMMIT, meta: { filters } }
    }
  }
});

export const selectUser = selected => ({
  type: SELECT_USER,
  selected
});

export const changeFilters = (filters, shouldFetch = true) => dispatch =>
  Promise.resolve(
    dispatch({
      type: CHANGE_FILTERS,
      filters
    })
  ).then(() => shouldFetch && dispatch(fetchUsers(filters)));
