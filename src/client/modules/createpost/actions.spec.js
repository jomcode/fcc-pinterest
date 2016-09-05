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
  isFetching: false,
  isSuccessful: false
};

describe('createPost module action creators', () => {
  describe('#createNewPost thunk', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('dispatches CREATE_POST_SUCCESS when create is succesful', (done) => {
      const fakePost = {
        userId: 'userId1',
        username: 'testuser',
        title: 'test title',
        imageUrl: 'test.jpg'
      };

      fetchMock
        .post(`${rootUrl}/posts`, {
          status: 201,
          body: {
            data: Object.assign({}, fakePost)
          }
        });

      const expectedActions = [
        { type: actionTypes.CREATE_POST },
        { type: actionTypes.CREATE_POST_SUCCESS }
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.createNewPost())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('dispatches CREATE_POST_FAILURE when create fails', (done) => {
      fetchMock
        .post(`${rootUrl}/posts`, {
          status: 500,
          statusText: 'Internal Server Error'
        });

      const expectedActions = [
        { type: actionTypes.CREATE_POST },
        { type: actionTypes.CREATE_POST_FAILURE, error: 'Internal Server Error' }
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.createNewPost())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('#resetCreatePost', () => {
    it('creates an action to reset createPost to initial state', () => {
      const expectedAction = {
        type: actionTypes.RESET_CREATE_POST
      };

      expect(actions.resetCreatePost()).to.deep.equal(expectedAction);
    });
  });
});
