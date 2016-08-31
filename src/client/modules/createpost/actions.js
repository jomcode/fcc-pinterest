import * as actionTypes from './actiontypes';

import rootUrl from '../../config/rooturl';

const createPost = () => ({
  type: actionTypes.CREATE_POST
});

const createPostSuccess = () => ({
  type: actionTypes.CREATE_POST_SUCCESS
});

const createPostFailure = (error) => ({
  type: actionTypes.CREATE_POST_FAILURE,
  error
});

const resetCreatePost = () => ({
  type: actionTypes.RESET_CREATE_POST
});

const createNewPost = (data) => dispatch => {
  dispatch(createPost());

  fetch(`${rootUrl}/posts`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data })
  })
  .then(response => {
    if (response.status !== 201) throw new Error(response.statusText);
    dispatch(createPostSuccess());
  })
  .catch(e => dispatch(createPostFailure(e)));
};

export { createNewPost, resetCreatePost };
