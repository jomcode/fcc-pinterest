const expect = require('chai').expect;

const mockRes = require('../../../utilities').mockRes;
const createUser = require('./createuser');

function mockService() {}

mockService.prototype.create = function create(data) {
  const result = Object.assign({}, data, { userId: 'testing123' });
  return Promise.resolve(result);
};

describe('User Service POST /users #createUser handler', () => {
  const fakeReq = {
    body: {
      data: {
        username: 'testuser'
      }
    }
  };

  it('calls response with status 201 and proper json arg', (done) => {
    const expectedArg = {
      data: {
        userId: 'testing123',
        username: 'testuser'
      }
    };

    const res = new mockRes();
    const service = new mockService();

    createUser(service, fakeReq, res)
      .then(() => {
        expect(res.status).to.equal(201);
        expect(res.json.calledWith(expectedArg)).to.equal(true);
        done();
      });
  });
});
