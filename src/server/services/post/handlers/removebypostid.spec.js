const expect = require('chai').expect;

const mockRes = require('../../../utilities').mockRes;
const removeByPostId = require('./removebypostid');

function mockService() {}

mockService.prototype.remove = function remove(id) {
  return Promise.resolve(true);
};

describe('Post Service DELETE /posts/:postId #removeByPostId handler', () => {
  const fakeReq = {
    params: {
      postId: 'testing123'
    }
  };

  it('calls response with the proper status and json arg', (done) => {
    const expectedArg = {
      data: true
    };

    const res = new mockRes();
    const service = new mockService();

    removeByPostId(service, fakeReq, res)
      .then(() => {
        expect(res.status).to.equal(204);
        expect(res.json.calledWith(expectedArg)).to.equal(true);
        done();
      });
  });
});
