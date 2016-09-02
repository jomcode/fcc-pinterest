const sinon = require('sinon');

function mockRes() {}

mockRes.prototype.status = function status(code) {
  this.status = code;
  return this;
};

mockRes.prototype.json = sinon.spy();

module.exports = mockRes;
