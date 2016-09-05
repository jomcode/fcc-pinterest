import { expect } from 'chai';

import * as actionTypes from './actiontypes';
import reducer from './reducer';

describe('currentUser module reducer', () => {
  const fakeUser = {
    userId: 'userId1',
    twitterId: 'twitterId1',
    username: 'testuser'
  };

  it('should handle POPULATE_CURRENT_USER', () => {
    const fakeAction = {
      type: actionTypes.POPULATE_CURRENT_USER,
      payload: {
        currentUser: fakeUser
      }
    };

    const expectedState = Object.assign({}, fakeUser);

    const state = reducer(undefined, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle RESET_CURRENT_USER', () => {
    const fakeAction = {
      type: actionTypes.RESET_CURRENT_USER
    };

    const fakeState = Object.assign({}, fakeUser);

    const expectedState = {
      userId: null,
      twitterId: null,
      username: null
    };

    const state = reducer(fakeState, fakeAction);

    expect(state).to.deep.equal(expectedState);
  });
});
