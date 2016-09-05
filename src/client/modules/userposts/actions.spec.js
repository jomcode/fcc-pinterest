import thunk from 'redux-thunk';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';

import rootUrl from '../../config/rooturl';
import * as actions from './actions';
import * as actionTypes from './actiontypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  queryId: null, // TODO is this necessary?
  posts: [],
  isFetching: false
};

describe('userPosts module action creators', () => {
  describe('#getPostsByUser thunk', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('dispatches GET_USER_POSTS_SUCCESS when get is successful', (done) => {
      const fakeUserId = 'userId1';
      const fakePosts = [{}, {}, {}];

      fetchMock
        .get(`${rootUrl}/posts/user/${fakeUserId}`, {
          status: 200,
          body: {
            data: fakePosts.slice()
          }
        });

      const expectedActions = [
        { type: actionTypes.GET_USER_POSTS, payload: { userId: fakeUserId } },
        {
          type: actionTypes.GET_USER_POSTS_SUCCESS,
          payload: {
            posts: fakePosts.slice()
          }
        }
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.getPostsByUser(fakeUserId))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('dispatches GET_USER_POSTS_FAILURE when get fails', (done) => {
      const fakeUserId = 'userId1';

      fetchMock
      .get(`${rootUrl}/posts/user/${fakeUserId}`, {
        status: 500,
        statusText: 'Internal Server Error'
      });

      const expectedActions = [
        { type: actionTypes.GET_USER_POSTS, payload: { userId: fakeUserId } },
        {
          type: actionTypes.GET_USER_POSTS_FAILURE,
          error: 'Internal Server Error'
        }
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.getPostsByUser(fakeUserId))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('#resetGetUserPosts', () => {
    it('creates an action to reset userPosts to initial state', () => {
      const expectedAction = {
        type: actionTypes.RESET_GET_USER_POSTS
      };

      expect(actions.resetGetUserPosts()).to.deep.equal(expectedAction);
    });
  });

  describe('#removeUserPost thunk', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('dispatches REMOVE_POST_SUCCESS when remove is successful', (done) => {
      const fakePostId = 'postId1';

      fetchMock
        .delete(`${rootUrl}/posts/${fakePostId}`, {
          status: 204
        });

      const expectedActions = [
        { type: actionTypes.REMOVE_POST },
        {
          type: actionTypes.REMOVE_POST_SUCCESS,
          payload: {
            postId: fakePostId.slice()
          }
        }
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.removeUserPost(fakePostId))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('dispatches REMOVE_POST_FAILURE when remove fails', (done) => {
      const fakePostId = 'postId1';

      fetchMock
        .delete(`${rootUrl}/posts/${fakePostId}`, {
          status: 500,
          statusText: 'Internal Server Error'
        });

      const expectedActions = [
        { type: actionTypes.REMOVE_POST },
        {
          type: actionTypes.REMOVE_POST_FAILURE,
          error: 'Internal Server Error'
        }
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.removeUserPost(fakePostId))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('#resetRemovePost', () => {
    it('creates an action to reset userPosts to initial state', () => {
      const expectedAction = {
        type: actionTypes.RESET_REMOVE_POST
      };

      expect(actions.resetRemovePost()).to.deep.equal(expectedAction);
    });
  });
});
