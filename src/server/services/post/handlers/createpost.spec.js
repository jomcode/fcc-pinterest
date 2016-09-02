const expect = require('chai').expect;

const mockRes = require('../../../utilities').mockRes;
const createPost = require('./createpost');

function mockService() {}

mockService.prototype.create = function create(data) {
  const result = Object.assign({}, data, { postId: 'testing456' });
  return Promise.resolve(result);
};

describe('Post Service POST /posts handler', () => {
  const fakeReq = {
    body: {
      data: {
        userId: 'testing123',
        title: 'test title',
        imageUrl: 'http://test.com/image.jpg'
      }
    }
  };

  it('calls response with the proper status and json arg', (done) => {
    const expectedArg = {
      data: {
        userId: 'testing123',
        title: 'test title',
        imageUrl: 'http://test.com/image.jpg',
        postId: 'testing456'
      }
    };

    const res = new mockRes();
    const service = new mockService();

    createPost(service, fakeReq, res)
      .then(() => {
        expect(res.status).to.equal(201);
        expect(res.json.calledWith(expectedArg)).to.equal(true);
        done();
      });
  });
});
