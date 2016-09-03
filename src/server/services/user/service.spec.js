const expect = require('chai').expect;

const UserService = require('./service');

describe('User Service database service', () => {
  describe('#get', () => {
    function fakeDb() {}

    fakeDb.prototype.query = function query(cypher, params, cb) {
      const fakeResult = [
        { id: 1, userId: params.userId, password: 'testpassword' }
      ];

      cb(null, fakeResult);
    };

    const db = new fakeDb();
    const service = new UserService(db);

    it('returns expected result', (done) => {
      const expectedResult = {
        userId: 'testing123'
      };

      const fakeUserId = 'testing123';

      service.get(fakeUserId)
        .then(result => {
          expect(result).to.deep.equal(expectedResult);
          done();
        });
    });
  });

  describe('#create', () => {
    function fakeDb() {}

    fakeDb.prototype.query = function query(cypher, params, cb) {
      const fakeResult = [
        {
          id: 1,
          userId: params.userId,
          password: params.password,
          username: params.username,
          email: params.email
        }
      ];

      cb(null, fakeResult);
    };

    const db = new fakeDb();
    const service = new UserService(db);

    it('returns expected result', (done) => {
      const fakeUser = {
        password: 'testpassword',
        username: 'testuser',
        email: 'test@test.com'
      };

      service
        .create(fakeUser)
        .then(result => {
          expect(result).to.not.have.property('password');
          expect(result).to.have.property('userId');
          done();
        });
    });
  });

  describe('#remove', () => {
    function fakeDb() {}

    fakeDb.prototype.query = function query(cypher, params, cb) {
      const fakeResult = true;
      cb(null, fakeResult);
    };

    const db = new fakeDb();
    const service = new UserService(db);

    it('returns expected result', (done) => {
      const fakeUserId = 'testing123';

      const expectedResult = true;

      service
        .remove(fakeUserId)
        .then(result => {
          expect(result).to.equal(expectedResult);
          done();
        });
    });
  });
});
