import * as actionTypes from './actiontypes';

export const populateCurrentUser = (currentUser) => ({
  type: actionTypes.POPULATE_CURRENT_USER,
  payload: {
    currentUser
  }
});

export const resetCurrentUser = () => ({
  type: actionTypes.RESET_CURRENT_USER
});
