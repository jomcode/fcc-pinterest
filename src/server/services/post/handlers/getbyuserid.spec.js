const expect = require('chai').expect;

const mockRes = require('../../../utilities').mockRes;
const getByUserId = require('./getbyuserid');

function mockService() {}

mockService.prototype.find = function find(params) {
  return Promise.resolve([{}, {}, {}]);
};

describe('Post Service GET /posts/user/:userId #getByUserId handler', () => {
  const fakeReq = {
    params: {
      userId: 'testing123'
    }
  };

  it('calls response with the proper status and json arg', (done) => {
    const expectedArg = {
      data: [{}, {}, {}]
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
