import * as actionTypes from './actiontypes';

const initialState = {
  isFetching: false,
  isSuccessful: false
};

const createPost = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_POST: {
      return Object.assign({}, state, { isFetching: true });
    }

    case actionTypes.CREATE_POST_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        isSuccessful: true
      });
    }

    case actionTypes.CREATE_POST_FAILURE: {
      return Object.assign({}, state, { isFetching: false });
    }

    case actionTypes.RESET_CREATE_POST: {
      return Object.assign({}, initialState);
    }

    default:
      return state;
  }
};

export default createPost;
