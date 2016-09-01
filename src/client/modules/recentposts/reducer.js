import * as actionTypes from './actiontypes';

const initialState = {
  posts: [],
  isFetching: false
};

const recentPosts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_RECENT_POSTS: {
      return Object.assign({}, state, { isFetching: true });
    }

    case actionTypes.GET_RECENT_POSTS_SUCCESS: {
      const { posts } = action.payload;

      return Object.assign({}, state, {
        posts,
        isFetching: false
      });
    }

    case actionTypes.GET_RECENT_POSTS_FAILURE: {
      return Object.assign({}, state, { isFetching: false });
    }

    case actionTypes.RESET_GET_RECENT_POSTS: {
      return Object.assign({}, initialState);
    }

    default:
      return state;
  }
};

export default recentPosts;
