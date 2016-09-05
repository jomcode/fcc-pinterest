import * as actionTypes from './actiontypes';
import authService from '../../services/authentication';

const login = () => ({
  type: actionTypes.LOGIN
});

const loginSuccess = (user) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: {
    user
  }
});

const loginFailure = (error) => ({
  type: actionTypes.LOGIN_FAILURE,
  error
});

// make GET request to /auth/verify endpoint to see if authenticated
// returns user info if successful
const loginUser = () => dispatch => {
  dispatch(login());

  return authService
    .verify()
    .then(user => dispatch(loginSuccess(user)))
    .catch(e => dispatch(loginFailure(e.message)));
};

export { loginUser };

const logout = () => ({
  type: actionTypes.LOGOUT
});

const logoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS
});

const logoutFailure = (error) => ({
  type: actionTypes.LOGOUT_FAILURE,
  error
});

// log user out from session
const logoutUser = () => dispatch => {
  dispatch(logout());

  return authService
    .logout()
    .then(response => dispatch(logoutSuccess()))
    // .catch(e => dispatch(logoutFailure(e.message)));
    .catch(e => {
      dispatch(logoutFailure(e.message));
    });
};

export { logoutUser };
