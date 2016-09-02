const expect = require('chai').expect;

const TwitterAccountService = require('./service');

describe('TwitterAccount Service database service', () => {
  describe('#get', () => {
    function fakeDb() {}

    fakeDb.prototype.query = function query(cypher, params, cb) {
      const fakeRecord = [
        {
          u: { id: 1, userId: 'testing123' },
          t: { id: 1, twitterId: params.twitterId }
        }
      ];

      cb(null, fakeRecord);
    };

    const db = new fakeDb();
    const service = new TwitterAccountService(db);

    it('returns expected data', (done) => {
      const expectedResult = {
        userId: 'testing123',
        twitterId: 'testing456'
      };

      const fakeTwitterId = 'testing456';

      service
        .get(fakeTwitterId)
        .then(result => {
          expect(result).to.deep.equal(expectedResult);
          done();
        });
    });
  });

  describe('#create', () => {
    function fakeDb() {}

    fakeDb.prototype.query = function query(cypher, params, cb) {
      const fakeRecord = [
        {
          u: { id: 1, userId: params.userId, username: params.username },
          t: { id: 1, twitterId: params.twitterId }
        }
      ];

      cb(null, fakeRecord);
    };

    const db = new fakeDb();
    const service = new TwitterAccountService(db);

    it('returns expected data', (done) => {
      const fakeTwitterAccount = {
        twitterId: 'testing123',
        username: 'test username'
      };

      service
        .create(fakeTwitterAccount)
        .then(result => {
          expect(result).to.have.property('userId');
          expect(result).to.have.property('username', 'test username');
          expect(result).to.have.property('twitterId', 'testing123');
          done();
        });
    });
  });
});
