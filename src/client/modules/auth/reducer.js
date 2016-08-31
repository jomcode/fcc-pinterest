import * as actionTypes from './actiontypes';

const initialState = {
  isAuthenticated: false,
  isFetching: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN: {
      return Object.assign({}, state, { isFetching: true });
    }

    case actionTypes.LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true
      });
    }

    case actionTypes.LOGIN_FAILURE: {
      return Object.assign({}, state, { isFetching: false });
    }

    case actionTypes.LOGOUT: {
      return Object.assign({}, state, { isFetching: true });
    }

    case actionTypes.LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      });
    }

    case actionTypes.LOGOUT_FAILURE: {
      return Object.assign({}, state, { isFetching: false });
    }

    default:
      return state;
  }
};

export default auth;
