const expect = require('chai').expect;

const mockRes = require('../../../utilities').mockRes;
const getByUserId = require('./getbyuserid');

function mockService() {}

mockService.prototype.get = function get(id) {
  const result = Object.assign({}, { userId: id });
  return Promise.resolve(result);
};

describe('User Service GET /users/:userId #getByUserId handler', () => {
  const fakeReq = {
    params: {
      userId: 'testing123'
    }
  };

  it('calls response with status 200 and proper json arg', (done) => {
    const expectedArg = {
      data: {
        userId: 'testing123'
      }
    };

    const res = new mockRes();
    const service = new mockService();

    getByUserId(service, fakeReq, res)
      .then(() => {
        expect(res.status).to.equal(200);
        expect(res.json.calledWith(expectedArg)).to.equal(true);
        done();
      });
  });
});
