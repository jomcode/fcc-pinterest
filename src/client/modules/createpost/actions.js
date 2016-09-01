import * as actionTypes from './actiontypes';
import postService from '../../services/post';

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

  postService
    .create(data)
    .then(response => {
      if (response.status !== 201) throw new Error(response.statusText);
      return response.json();
    })
    .then(json => {
      dispatch(createPostSuccess());
    })
    .catch(e => dispatch(createPostFailure(e)));
};

export { createNewPost, resetCreatePost };
