const expect = require('chai').expect;

const mockRes = require('../../../utilities').mockRes;
const getByUserId = require('./getbyuserid');

function mockService() {}

mockService.prototype.get = function get(id) {
  const result = Object.assign({}, { userId: id });
  return Promise.resolve(result);
};

describe('GET /users/:userId #getByUserId handler', () => {
  it('calls response with status 200 and proper json arg');
});
