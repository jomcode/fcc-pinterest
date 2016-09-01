import * as actionTypes from './actiontypes';
import postService from '../../services/post';

const getUserPosts = (userId) => ({
  type: actionTypes.GET_USER_POSTS,
  payload: {
    userId
  }
});

const getUserPostsSuccess = (user, posts) => ({
  type: actionTypes.GET_USER_POSTS_SUCCESS,
  payload: {
    user,
    posts
  }
});

const getUserPostsFailure = (error) => ({
  type: actionTypes.GET_USER_POSTS_FAILURE,
  error
});

const resetGetUserPosts = () => ({
  type: actionTypes.RESET_GET_USER_POSTS
});

const getPostsByUser = userId => dispatch => {
  dispatch(getUserPosts(userId));

  postService
    .getByUserId(userId)
    .then(posts => dispatch(getUserPostsSuccess(posts.user, posts.posts)))
    .catch(e => dispatch(getUserPostsFailure(e)));
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

const resetRemovePost = () => ({
  type: actionTypes.RESET_REMOVE_POST
});

const removeUserPost = postId => dispatch => {
  dispatch(removePost());

  postService
    .removeByPostId(postId)
    .then(result => dispatch(removePostSuccess(postId)))
    .catch(e => dispatch(removePostFailure(e)));
};

export { removeUserPost, resetRemovePost };
