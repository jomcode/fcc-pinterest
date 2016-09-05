import { expect } from 'chai';

import * as actionTypes from './actiontypes';
import reducer from './reducer';

describe('createPost module reducer', () => {
  it('should return initial state', () => {
    const fakeAction = {
      type: 'FAKE'
    };

    const expectedState = {
      isFetching: false,
      isSuccessful: false
    };

    const state = reducer(undefined, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle CREATE_POST', () => {
    const fakeAction = {
      type: actionTypes.CREATE_POST
    };

    const initialState = {
      isFetching: false,
      isSuccessful: false
    };

    const expectedState = {
      isFetching: true,
      isSuccessful: false
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle CREATE_POST_SUCCESS', () => {
    const fakeAction = {
      type: actionTypes.CREATE_POST_SUCCESS
    };

    const initialState = {
      isFetching: true,
      isSuccessful: false
    };

    const expectedState = {
      isFetching: false,
      isSuccessful: true
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle CREATE_POST_FAILURE', () => {
    const fakeAction = {
      type: actionTypes.CREATE_POST_FAILURE
    };

    const initialState = {
      isFetching: true,
      isSuccessful: false
    };

    const expectedState = {
      isFetching: false,
      isSuccessful: false
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle RESET_CREATE_POST', () => {
    const fakeAction = {
      type: actionTypes.RESET_CREATE_POST
    };

    const initialState = {
      isFetching: false,
      isSuccessful: true
    };

    const expectedState = {
      isFetching: false,
      isSuccessful: false
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });
});
