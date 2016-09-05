import { expect } from 'chai';

import * as actionTypes from './actiontypes';
import reducer from './reducer';

describe('recentPosts module reducer', () => {
  it('should return initial state', () => {
    const fakeAction = {
      type: 'FAKE'
    };

    const expectedState = {
      posts: [],
      isFetching: false
    };

    const state = reducer(undefined, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle GET_RECENT_POSTS', () => {
    const fakeAction = {
      type: actionTypes.GET_RECENT_POSTS
    };

    const initialState = {
      posts: [],
      isFetching: false
    };

    const expectedState = {
      posts: [],
      isFetching: true
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle GET_RECENT_POSTS_SUCCESS', () => {
    const fakePosts = [{}, {}, {}];

    const fakeAction = {
      type: actionTypes.GET_RECENT_POSTS_SUCCESS,
      payload: {
        posts: fakePosts.slice()
      }
    };

    const initialState = {
      posts: [],
      isFetching: true
    };

    const expectedState = {
      posts: fakePosts.slice(),
      isFetching: false
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle GET_RECENT_POSTS_FAILURE', () => {
    const fakeAction = {
      type: actionTypes.GET_RECENT_POSTS_FAILURE
    };

    const initialState = {
      posts: [],
      isFetching: true
    };

    const expectedState = {
      posts: [],
      isFetching: false
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle RESET_GET_RECENT_POSTS', () => {
    const fakeAction = {
      type: actionTypes.RESET_GET_RECENT_POSTS
    };

    const initialState = {
      posts: [{}, {}, {}],
      isFetching: false
    };

    const expectedState = {
      posts: [],
      isFetching: false
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });
});
