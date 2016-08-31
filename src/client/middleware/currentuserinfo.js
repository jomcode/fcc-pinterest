import auth from '../modules/auth';
import currentUser from '../modules/currentuser';

const currentUserInfo = store => next => action => {
  switch (action.type) {
    case auth.actionTypes.LOGIN_SUCCESS: {
      const user = Object.assign({}, action.payload.user);
      store.dispatch(currentUser.actions.populateCurrentUser(user));
      break;
    }

    case auth.actionTypes.LOGOUT_SUCCESS: {
      store.dispatch(currentUser.actions.resetCurrentUser());
      break;
    }

    default:
      break;
  }

  return next(action);
};

export default currentUserInfo;
