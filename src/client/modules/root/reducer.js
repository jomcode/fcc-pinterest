import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from '../auth';
import currentUser from '../currentuser';
import createPost from '../createpost';

const rootReducer = combineReducers({
  [auth.constants.NAME]: auth.reducer,
  [currentUser.constants.NAME]: currentUser.reducer,
  [createPost.constants.NAME]: createPost.reducer,
  routing: routerReducer,
  form: formReducer
});

export default rootReducer;
