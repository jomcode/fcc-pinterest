const sinon = require('sinon');
const expect = require('chai').expect;

const isAuthenticated = require('./isauthenticated');

function mockRes() {}

mockRes.prototype.status = function status(code) {
  this.status = code;
  return this;
};

mockRes.prototype.json = sinon.spy();

describe('isAuthenticated middleware', () => {
  const authenticated = { user: {} };
  const unauthenticated = {};

  it('calls next() ONLY if req.user exists', () => {
    const nextSpy = sinon.spy();

    const res = new mockRes();

    isAuthenticated(authenticated, res, nextSpy);
    expect(nextSpy.calledOnce).to.equal(true);
    isAuthenticated(unauthenticated, res, nextSpy);
    expect(res.status).to.equal(401);
    expect(nextSpy.calledOnce).to.equal(true);
    expect(res.json.calledWith({ error: 'Unauthorized' })).to.equal(true);
  });
});
