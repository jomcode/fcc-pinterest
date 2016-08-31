import * as actionTypes from './actiontypes';

const initialState = {
  queryId: null, // TODO is this necessary?
  posts: [],
  isFetching: false
};

const userPosts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_POSTS: {
      const { userId } = action.payload;

      return Object.assign({}, state, {
        queryId: userId.slice(),
        isFetching: true
      });
    }

    case actionTypes.GET_USER_POSTS_SUCCESS: {
      const { posts } = action.payload;

      return Object.assign({}, state, {
        posts,
        isFetching: false
      });
    }

    case actionTypes.GET_USER_POSTS_FAILURE: {
      return Object.assign({}, state, {
        queryId: null,
        isFetching: false
      });
    }

    case actionTypes.RESET_GET_USER_POSTS: {
      return Object.assign({}, initialState);
    }

    case actionTypes.REMOVE_POST: {
      return Object.assign({}, state, { isFetching: true });
    }

    case actionTypes.REMOVE_POST_SUCCESS: {
      const { postId } = action.payload;

      const updatedPosts = state.posts.filter(p => p.id !== postId);

      return Object.assign({}, state, {
        posts: updatedPosts,
        isFetching: false
      });
    }

    case actionTypes.REMOVE_POST_FAILURE: {
      return Object.assign({}, state, { isFetching: false });
    }

    case actionTypes.RESET_REMOVE_POST: {
      return Object.assign({}, initialState);
    }

    default:
      return state;
  }
};

export default userPosts;
