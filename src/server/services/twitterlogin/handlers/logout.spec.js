const sinon = require('sinon');
const expect = require('chai').expect;

const mockRes = require('../../../utilities').mockRes;
const logout = require('./logout');

describe('TwitterLogin Service GET /logout/twitter #logout', () => {
  const fakeReq = {
    logout: sinon.spy()
  };

  it('calls req.logout and response with proper status and json arg', () => {
    const expectedArg = {
      data: {
        isAuthenticated: false
      }
    };

    const res = new mockRes();

    logout(fakeReq, res);

    expect(fakeReq.logout.calledOnce).to.equal(true);
    expect(res.status).to.equal(200);
    expect(res.json.calledWith(expectedArg)).to.equal(true);
  });
});
