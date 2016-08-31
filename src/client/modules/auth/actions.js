import * as actionTypes from './actiontypes';

import rootUrl from '../../config/rooturl';

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

  fetch(`${rootUrl}/auth/verify`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json'
    }
  })
    .then(response => {
      if (response.status !== 200) throw new Error(response.statusText);
      return response.json();
    })
    .then(json => {
      const user = Object.assign({}, json.data);
      dispatch(loginSuccess(user));
    })
    .catch(e => dispatch(loginFailure(e)));
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

  fetch(`${rootUrl}/logout/twitter`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json'
    }
  })
  .then(response => {
    if (response.status !== 200) throw new Error(response.statusText);
    return response.json();
  })
  .then(json => dispatch(logoutSuccess()))
  .catch(e => dispatch(logoutFailure(e)));
};

export { logoutUser };
