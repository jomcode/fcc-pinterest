import * as actionTypes from './actiontypes';

const initialState = {
  userId: null,
  twitterId: null,
  username: null
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POPULATE_CURRENT_USER: {
      const { currentUser: { userId, twitterId, username } } = action.payload;

      return Object.assign({}, state, { userId, twitterId, username });
    }

    case actionTypes.RESET_CURRENT_USER: {
      return Object.assign({}, initialState);
    }

    default:
      return state;
  }
};

export default currentUser;
