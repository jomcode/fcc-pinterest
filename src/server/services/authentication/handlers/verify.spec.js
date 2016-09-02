const expect = require('chai').expect;

const mockRes = require('../../../utilities').mockRes;
const verify = require('./verify');

describe('Authentication Service GET /auth/verify #verify handler', () => {
  const fakeReq = {
    user: {
      userId: 'testing123',
      username: 'testname'
    }
  };

  it('calls response with the proper status and json arg', () => {
    const expectedArg = {
      data: {
        userId: 'testing123',
        username: 'testname',
        isAuthenticated: true
      }
    };

    const res = new mockRes();

    verify(fakeReq, res);

    expect(res.status).to.equal(200);
    expect(res.json.calledWith(expectedArg)).to.equal(true);
  });
});
