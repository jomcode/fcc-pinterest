const sinon = require('sinon');
const expect = require('chai').expect;

const verify = require('./verify');

function mockRes() {}

mockRes.prototype.status = function status(code) {
  this.status = code;
  return this;
};

mockRes.prototype.json = sinon.spy();

describe('Authentication Service GET /auth/verify handler', () => {
  const fakeReq = {
    user: {
      userId: 'testing123',
      username: 'testname'
    }
  };

  it('is called with the proper status and json arg', () => {
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
