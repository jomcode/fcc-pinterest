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
  posts: [],
  isFetching: false
};

describe('recentPosts module action creators', () => {
  describe('#getAllRecentPosts thunk', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('dispatches GET_RECENT_POSTS_SUCCESS when get is successful', (done) => {
      const fakePosts = [{}, {}, {}];

      fetchMock
        .get(`${rootUrl}/posts`, {
          status: 200,
          body: {
            data: fakePosts.slice()
          }
        });

      const expectedActions = [
        { type: actionTypes.GET_RECENT_POSTS },
        {
          type: actionTypes.GET_RECENT_POSTS_SUCCESS,
          payload: {
            posts: fakePosts.slice()
          }
        }
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.getAllRecentPosts())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('dispatches GET_RECENT_POSTS_FAILURE when get fails', (done) => {
      fetchMock
        .get(`${rootUrl}/posts`, {
          status: 500,
          statusText: 'Internal Server Error'
        });

      const expectedActions = [
        { type: actionTypes.GET_RECENT_POSTS },
        {
          type: actionTypes.GET_RECENT_POSTS_FAILURE,
          error: 'Internal Server Error'
        }
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.getAllRecentPosts())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('#resetGetRecentPosts', () => {
    it('creates an action to reset recentPosts to initial state', () => {
      const expectedAction = {
        type: actionTypes.RESET_GET_RECENT_POSTS
      };

      expect(actions.resetGetRecentPosts()).to.deep.equal(expectedAction);
    });
  });
});
