import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from '../auth';
import currentUser from '../currentuser';
import createPost from '../createpost';
import userPosts from '../userposts';
import recentPosts from '../recentposts';

const rootReducer = combineReducers({
  [auth.constants.NAME]: auth.reducer,
  [currentUser.constants.NAME]: currentUser.reducer,
  [createPost.constants.NAME]: createPost.reducer,
  [userPosts.constants.NAME]: userPosts.reducer,
  [recentPosts.constants.NAME]: recentPosts.reducer,
  routing: routerReducer,
  form: formReducer
});

export default rootReducer;
