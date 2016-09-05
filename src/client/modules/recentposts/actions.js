import * as actionTypes from './actiontypes';
import postService from '../../services/post';

const getRecentPosts = () => ({
  type: actionTypes.GET_RECENT_POSTS
});

const getRecentPostsSuccess = (posts) => ({
  type: actionTypes.GET_RECENT_POSTS_SUCCESS,
  payload: {
    posts
  }
});

const getRecentPostsFailure = (error) => ({
  type: actionTypes.GET_RECENT_POSTS_FAILURE,
  error
});

const resetGetRecentPosts = () => ({
  type: actionTypes.RESET_GET_RECENT_POSTS
});

const getAllRecentPosts = () => dispatch => {
  dispatch(getRecentPosts());

  return postService
    .getRecent()
    .then(posts => dispatch(getRecentPostsSuccess(posts)))
    .catch(e => dispatch(getRecentPostsFailure(e.message)));
};

export { getAllRecentPosts, resetGetRecentPosts };
