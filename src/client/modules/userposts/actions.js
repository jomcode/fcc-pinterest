import * as actionTypes from './actiontypes';

import rootUrl from '../../config/rooturl';

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
  type: actionTypes.GET_USER_POSTS_FAILURE
});

const resetGetUserPosts = () => ({
  type: actionTypes.RESET_GET_USER_POSTS
});

const getPostsByUser = userId => dispatch => {
  dispatch(getUserPosts(userId));
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

const removePostFailure = () => ({
  type: actionTypes.REMOVE_POST_FAILURE
});

const resetRemovePost = () => ({
  type: actionTypes.RESET_REMOVE_POST
});

const removeUserPost = postId => dispatch => {
  dispatch(removePost());
};

export { removeUserPost, resetRemovePost };
