import * as actionTypes from './actiontypes';

import rootUrl from '../../config/rooturl';

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

  fetch(`${rootUrl}/posts`, {
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
    const posts = json.data.slice();
    dispatch(getRecentPostsSuccess(posts));
  })
  .catch(e => dispatch(getRecentPostsFailure(e)));
};

export { getAllRecentPosts, resetGetRecentPosts };
