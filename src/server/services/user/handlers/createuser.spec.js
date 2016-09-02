const expect = require('chai').expect;

const mockRes = require('../../../utilities').mockRes;
const createUser = require('./createuser');

function mockService() {}

mockService.prototype.create = function create(data) {
  const result = Object.assign({}, data, { userId: 'testing123' });
  return Promise.resolve(result);
};

describe('User Service POST /users #createUser handler', () => {
  it('calls response with status 201 and proper json arg');
});
