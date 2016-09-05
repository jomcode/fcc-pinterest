import { expect } from 'chai';

import * as actionTypes from './actiontypes';
import reducer from './reducer';

describe('auth module reducer', () => {
  it('should return initial state', () => {
    const fakeAction = {
      type: 'FAKE'
    };

    const expectedState = {
      isAuthenticated: false,
      isFetching: false
    };

    const state = reducer(undefined, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle LOGIN', () => {
    const fakeAction = {
      type: actionTypes.LOGIN
    };

    const initialState = {
      isAuthenticated: false,
      isFetching: false
    };

    const expectedState = {
      isAuthenticated: false,
      isFetching: true
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const fakeAction = {
      type: actionTypes.LOGIN_SUCCESS
    };

    const initialState = {
      isAuthenticated: false,
      isFetching: true
    };

    const expectedState = {
      isAuthenticated: true,
      isFetching: false
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle LOGIN_FAILURE', () => {
    const fakeAction = {
      type: actionTypes.LOGIN_FAILURE
    };

    const initialState = {
      isAuthenticated: false,
      isFetching: true
    };

    const expectedState = {
      isAuthenticated: false,
      isFetching: false
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle LOGOUT', () => {
    const fakeAction = {
      type: actionTypes.LOGOUT
    };

    const initialState = {
      isAuthenticated: true,
      isFetching: false
    };

    const expectedState = {
      isAuthenticated: true,
      isFetching: true
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle LOGOUT_SUCCESS', () => {
    const fakeAction = {
      type: actionTypes.LOGOUT_SUCCESS
    };

    const initialState = {
      isAuthenticated: true,
      isFetching: true
    };

    const expectedState = {
      isAuthenticated: false,
      isFetching: false
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle LOGOUT_FAILURE', () => {
    const fakeAction = {
      type: actionTypes.LOGOUT_FAILURE
    };

    const initialState = {
      isAuthenticated: true,
      isFetching: true
    };

    const expectedState = {
      isAuthenticated: true,
      isFetching: false
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });
});
