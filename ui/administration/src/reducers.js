import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from './Pages/Login/duck';
import { dialog, online } from './Common/duck';

import userList from './Pages/User/List/duck';
import userCreate from './Pages/User/Create/duck';
// import userEdit from './Pages/User/Edit/duck';
import userDropdowns from './Pages/User/duck';

export default combineReducers({
  router: routerReducer,
  online,
  auth,
  user: combineReducers({ dropdowns: userDropdowns, userList, userCreate }), // , userCreate, userEdit
  dialog,
  form: formReducer,
  settings: combineReducers({ dropdowns: userDropdowns })
});
