import * as actionTypes from './actiontypes';

const initialState = {
  isAuthenticated: false,
  isFetching: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default auth;
