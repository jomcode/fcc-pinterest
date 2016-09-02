const expect = require('chai').expect;

const mockRes = require('../../../utilities').mockRes;
const removeByUserId = require('./removebyuserid');

function mockService() {}

mockService.prototype.remove = function remove(id) {
  return Promise.resolve(true);
};

describe('DELETE /users/:userId #removeByUserId handler', () => {
  it('calls response with status 204 and proper json arg');
});
