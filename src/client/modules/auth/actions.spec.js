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
  isAuthenticated: false,
  isFetching: false
};

describe('auth module action creators', () => {
  describe('#loginUser thunk', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('dispatches LOGIN_SUCCESS when login successful', (done) => {
      const fakeUser = {
        userId: 'userId1',
        twitterId: 'twitterId1',
        username: 'testuser',
        isAuthenticated: true
      };

      fetchMock
        .get(`${rootUrl}/auth/verify`, {
          status: 200,
          body: {
            data: Object.assign({}, fakeUser)
          }
        });

      const expectedActions = [
        { type: actionTypes.LOGIN },
        { type: actionTypes.LOGIN_SUCCESS, payload: { user: fakeUser } }
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.loginUser())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('dispatches LOGIN_FAILURE when login fails', (done) => {
      fetchMock
        .get(`${rootUrl}/auth/verify`, {
          status: 401,
          statusText: 'Unauthorized',
          body: {
            error: 'Unauthorized'
          }
        });

      const expectedActions = [
        { type: actionTypes.LOGIN },
        { type: actionTypes.LOGIN_FAILURE, error: 'Unauthorized' }
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.loginUser())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('#logoutUser thunk', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('dispatches LOGOUT_SUCCESS when logout successful', (done) => {
      fetchMock
        .get(`${rootUrl}/logout/twitter`, {
          status: 200,
          body: {
            data: { isAuthenticated: false }
          }
        });

      const expectedActions = [
        { type: actionTypes.LOGOUT },
        { type: actionTypes.LOGOUT_SUCCESS }
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.logoutUser())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('dispatches LOGOUT_FAILURE when logout fails', (done) => {
      fetchMock
        .get(`${rootUrl}/logout/twitter`, {
          status: 500,
          statusText: 'Internal Server Error'
        });

      const expectedActions = [
        { type: actionTypes.LOGOUT },
        { type: actionTypes.LOGOUT_FAILURE, error: 'Internal Server Error' }
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.logoutUser())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });
});
