import * as actionTypes from './actiontypes';
import postService from '../../services/post';

const getUserPosts = (userId) => ({
  type: actionTypes.GET_USER_POSTS,
  payload: {
    userId
  }
});

const getUserPostsSuccess = (posts) => ({
  type: actionTypes.GET_USER_POSTS_SUCCESS,
  payload: {
    posts
  }
});

const getUserPostsFailure = (error) => ({
  type: actionTypes.GET_USER_POSTS_FAILURE,
  error
});

// TODO is this needed?
const resetGetUserPosts = () => ({
  type: actionTypes.RESET_GET_USER_POSTS
});

const getPostsByUser = userId => dispatch => {
  dispatch(getUserPosts(userId));

  return postService
    .getByUserId(userId)
    .then(posts => dispatch(getUserPostsSuccess(posts)))
    .catch(e => dispatch(getUserPostsFailure(e.message)));
};

export { getPostsByUser, resetGetUserPosts };

const removePost = () => ({
  type: actionTypes.REMOVE_POST
});

const removePostSuccess = (postId) => ({
  type: actionTypes.REMOVE_POST_SUCCESS,
  payload: {
    postId
  }
});

const removePostFailure = (error) => ({
  type: actionTypes.REMOVE_POST_FAILURE,
  error
});

// TODO is this needed?
const resetRemovePost = () => ({
  type: actionTypes.RESET_REMOVE_POST
});

const removeUserPost = postId => dispatch => {
  dispatch(removePost());

  return postService
    .removeByPostId(postId)
    .then(result => dispatch(removePostSuccess(postId)))
    .catch(e => dispatch(removePostFailure(e.message)));
};

export { removeUserPost, resetRemovePost };
