const expect = require('chai').expect;

const mockRes = require('../../../utilities').mockRes;
const loginCallback = require('./logincallback');

describe('TwitterLogin Service GET /login/twitter/callback #loginCallback', () => {
  const fakeReq = {};

  it('calls response redirect with proper arg', () => {
    const res = new mockRes();

    loginCallback(fakeReq, res);

    expect(res.redirect.calledOnce).to.equal(true);
    expect(res.redirect.calledWith('/')).to.equal(true);
  });
});
