import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from '../auth';
import currentUser from '../currentuser';

const rootReducer = combineReducers({
  [auth.constants.NAME]: auth.reducer,
  [currentUser.constants.NAME]: currentUser.reducer,
  routing: routerReducer
});

export default rootReducer;
