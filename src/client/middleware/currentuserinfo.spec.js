import { expect } from 'chai';

import auth from '../modules/auth';
import currentUser from '../modules/currentuser';
import middleware from './currentuserinfo';

const createFakeStore = () => ({
  dispatch: sinon.spy()
});

describe('currentUserInfo middleware', () => {
  it('should dispatch if LOGIN_SUCCESS is detected', () => {
    const fakeStore = createFakeStore();

    const fakeUser = {
      userId: 'userId1',
      twitterId: 'twitterId1',
      username: 'testuser'
    };

    const fakeAction = {
      type: auth.actionTypes.LOGIN_SUCCESS,
      payload: {
        user: Object.assign({}, fakeUser)
      }
    };

    const expectedAction = {
      type: currentUser.actionTypes.POPULATE_CURRENT_USER,
      payload: {
        currentUser: Object.assign({}, fakeUser)
      }
    };

    middleware(fakeStore)(fakeStore.dispatch)(fakeAction);

    const first = fakeStore.dispatch.getCall(0);
    const second = fakeStore.dispatch.getCall(1);

    const firstAction = first.args[0];
    const secondAction = second.args[0];

    expect(firstAction).to.deep.equal(expectedAction);
    expect(secondAction).to.deep.equal(fakeAction);
  });

  it('should dispatch if LOGOUT_SUCCESS is detected', () => {
    const fakeStore = createFakeStore();

    const fakeAction = {
      type: auth.actionTypes.LOGOUT_SUCCESS
    };

    const expectedAction = {
      type: currentUser.actionTypes.RESET_CURRENT_USER
    };

    middleware(fakeStore)(fakeStore.dispatch)(fakeAction);

    const first = fakeStore.dispatch.getCall(0);
    const second = fakeStore.dispatch.getCall(1);

    const firstAction = first.args[0];
    const secondAction = second.args[0];

    expect(firstAction).to.deep.equal(expectedAction);
    expect(secondAction).to.deep.equal(fakeAction);
  });

  it('should ignore all other actions and pass original through', () => {
    const fakeStore = createFakeStore();

    const fakeAction = { type: 'FAKE' };

    middleware(fakeStore)(fakeStore.dispatch)(fakeAction);

    const first = fakeStore.dispatch.getCall(0);

    const firstAction = first.args[0];

    expect(fakeStore.dispatch.calledOnce).to.equal(true);
    expect(firstAction).to.deep.equal(fakeAction);
  });
});
