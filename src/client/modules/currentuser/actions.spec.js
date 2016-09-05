import { expect } from 'chai';

import * as actions from './actions';
import * as actionTypes from './actiontypes';

describe('currentUser module action creators', () => {
  describe('#populateCurrentUser', () => {
    it('creates an action to populate the current user', () => {
      const fakeUser = {
        username: 'testuser',
        userId: 'testid'
      };

      const expectedAction = {
        type: actionTypes.POPULATE_CURRENT_USER,
        payload: {
          currentUser: fakeUser
        }
      };

      expect(actions.populateCurrentUser(fakeUser)).to.deep.equal(expectedAction);
    });
  });

  describe('#resetCurrentUser', () => {
    it('creates an action to reset currentUser to initial state', () => {
      const expectedAction = {
        type: actionTypes.RESET_CURRENT_USER
      };

      expect(actions.resetCurrentUser()).to.deep.equal(expectedAction);
    });
  });
});
