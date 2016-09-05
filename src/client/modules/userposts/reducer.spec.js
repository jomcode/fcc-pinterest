import { expect } from 'chai';

import * as actionTypes from './actiontypes';
import reducer from './reducer';

describe('userPosts module reducer', () => {
  it('should return initial state', () => {
    const fakeAction = {
      type: 'FAKE'
    };

    const expectedState = {
      queryId: null,
      posts: [],
      isFetching: false
    };

    const state = reducer(undefined, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle GET_USER_POSTS', () => {
    const fakeUserId = 'userId1';
    const fakeAction = {
      type: actionTypes.GET_USER_POSTS,
      payload: {
        userId: fakeUserId
      }
    };

    const initialState = {
      queryId: null,
      posts: [],
      isFetching: false
    };

    const expectedState = {
      queryId: fakeUserId,
      posts: [],
      isFetching: true
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle GET_USER_POSTS_SUCCESS', () => {
    const fakeUserId = 'userId1';
    const fakePosts = [{}, {}, {}];
    const fakeAction = {
      type: actionTypes.GET_USER_POSTS_SUCCESS,
      payload: {
        posts: fakePosts.slice()
      }
    };

    const initialState = {
      queryId: fakeUserId,
      posts: [],
      isFetching: true
    };

    const expectedState = {
      queryId: fakeUserId,
      posts: fakePosts.slice(),
      isFetching: false
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle GET_USER_POSTS_FAILURE', () => {
    const fakeUserId = 'userId1';
    const fakeAction = {
      type: actionTypes.GET_USER_POSTS_FAILURE
    };

    const initialState = {
      queryId: fakeUserId,
      posts: [],
      isFetching: true
    };

    const expectedState = {
      queryId: null,
      posts: [],
      isFetching: false
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle RESET_GET_USER_POSTS', () => {
    const fakeUserId = 'userId1';
    const fakeAction = {
      type: actionTypes.RESET_GET_USER_POSTS
    };

    const initialState = {
      queryId: fakeUserId,
      posts: [{}, {}, {}],
      isFetching: false
    };

    const expectedState = {
      queryId: null,
      posts: [],
      isFetching: false
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle REMOVE_POST', () => {
    const fakeUserId = 'userId1';
    const fakePosts = [{ postId: 'postId1' }, { postId: 'postId2' }];
    const fakeAction = {
      type: actionTypes.REMOVE_POST
    };

    const initialState = {
      queryId: fakeUserId,
      posts: fakePosts.slice(),
      isFetching: false
    };

    const expectedState = {
      queryId: fakeUserId,
      posts: fakePosts.slice(),
      isFetching: true
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle REMOVE_POST_SUCCESS', () => {
    const fakeUserId = 'userId1';
    const fakePostId = 'postId1';
    const fakePosts = [{ postId: 'postId1' }, { postId: 'postId2' }];
    const fakeAction = {
      type: actionTypes.REMOVE_POST_SUCCESS,
      payload: {
        postId: fakePostId.slice()
      }
    };

    const initialState = {
      queryId: fakeUserId,
      posts: fakePosts.slice(),
      isFetching: true
    };

    const expectedState = {
      queryId: fakeUserId,
      posts: fakePosts.slice(1),
      isFetching: false
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle REMOVE_POST_FAILURE', () => {
    const fakeUserId = 'userId1';
    const fakePosts = [{ postId: 'postId1' }, { postId: 'postId2' }];
    const fakeAction = {
      type: actionTypes.REMOVE_POST_FAILURE
    };

    const initialState = {
      queryId: fakeUserId,
      posts: fakePosts.slice(),
      isFetching: true
    };

    const expectedState = {
      queryId: fakeUserId,
      posts: fakePosts.slice(),
      isFetching: false
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle RESET_REMOVE_POST', () => {
    const fakeUserId = 'userId1';
    const fakePosts = [{ postId: 'postId1' }, { postId: 'postId2' }];
    const fakeAction = {
      type: actionTypes.RESET_REMOVE_POST
    };

    const initialState = {
      queryId: fakeUserId,
      posts: fakePosts.slice(),
      isFetching: true
    };

    const expectedState = {
      queryId: null,
      posts: [],
      isFetching: false
    };

    const state = reducer(initialState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });
});
