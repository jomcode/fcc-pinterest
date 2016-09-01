import * as actionTypes from './actiontypes';

import rootUrl from '../../config/rooturl';

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

  fetch(`${rootUrl}/posts/user/${userId}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json'
    }
  })
  .then(response => {
    if (response.status !== 200) throw new Error(response.statusText);
    return response.json();
  })
  .then(json => {
    const user = Object.assign({}, json.data.user);
    const posts = json.data.posts.slice();
    dispatch(getUserPostsSuccess(user, posts));
  })
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
};

export { removeUserPost, resetRemovePost };
