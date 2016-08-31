import * as actionTypes from './actiontypes';

const login = () => ({
  type: actionTypes.LOGIN
});

const loginSuccess = () => ({
  type: actionTypes.LOGIN_SUCCESS
});

const loginFailure = () => ({
  type: actionTypes.LOGIN_FAILURE
});

const loginUser = () => dispatch => {};

export { loginUser };

const logout = () => ({
  type: actionTypes.LOGOUT
});

const logoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS
});

const logoutFailure = () => ({
  type: actionTypes.LOGOUT_FAILURE
});

const logoutUser = () => dispatch => {};

export { logoutUser };
