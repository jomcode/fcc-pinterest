const expect = require('chai').expect;

const mockRes = require('../../../utilities').mockRes;
const removeByUserId = require('./removebyuserid');

function mockService() {}

mockService.prototype.remove = function remove(id) {
  return Promise.resolve(true);
};

describe('DELETE /users/:userId #removeByUserId handler', () => {
  const fakeReq = {
    params: {
      userId: 'testing123'
    }
  };

  it('calls response with status 204 and proper json arg', (done) => {
    const expectedArg = { data: true };
    const res = new mockRes();
    const service = new mockService();

    removeByUserId(service, fakeReq, res)
      .then(() => {
        expect(res.status).to.equal(204);
        expect(res.json.calledWith(expectedArg)).to.equal(true);
        done();
      });
  });
});
