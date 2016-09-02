const expect = require('chai').expect;

const PostService = require('./service');

describe('Post Service database service', () => {
  describe('#find', () => {
    function fakeDb() {}

    fakeDb.prototype.query = function query(cypher, params, cb) {
      const fakeResult = [
        {
          u: { id: 1, userId: params.userId || 'testid' },
          post: { id: 1, postId: 'testing456' }
        },
        {
          u: { id: 2, userId: params.userId || 'testid' },
          post: { id: 2, postId: 'testing456' }
        }
      ];

      cb(null, fakeResult);
    };

    const db = new fakeDb();
    const service = new PostService(db);

    it('returns expected data when given params.query.userId', (done) => {
      const fakeParams = {
        query: {
          userId: 'testing123'
        }
      };

      service
        .find(fakeParams)
        .then(result => {
          result.forEach(r => expect(r.userId).to.equal(fakeParams.query.userId));
          done();
        });
    });

    it('returns expected data when given no params', (done) => {
      service
        .find()
        .then(result => {
          result.forEach(r => {
            expect(r).to.have.property('userId', 'testid');
            expect(r).to.have.property('postId', 'testing456');
          });
          done();
        });
    });
  });

  describe('#create', () => {
    function fakeDb() {}

    fakeDb.prototype.query = function query(cypher, params, cb) {
      const fakeResult = [
        {
          u: { id: 1, userId: params.userId },
          p: { id: 1, postId: params.postId, title: params.title }
        }
      ];

      cb(null, fakeResult);
    };

    const db = new fakeDb();
    const service = new PostService(db);

    it('returns expected data', (done) => {
      const fakePost = {
        userId: 'testing123',
        title: 'test title'
      };

      service
        .create(fakePost)
        .then(result => {
          expect(result).to.not.have.property('id');
          expect(result).to.have.property('userId', 'testing123');
          expect(result).to.have.property('title', 'test title');
          expect(result).to.have.property('postId');
          done();
        });
    });
  });

  describe('#remove', () => {
    function fakeDb() {}

    fakeDb.prototype.query = function query(cypher, params, cb) {
      const fakeResult = {
        metadata: {
          deleted: true
        }
      };

      cb(null, fakeResult);
    };

    const db = new fakeDb();
    const service = new PostService(db);

    it('returns expected data', (done) => {
      const fakePostId = 'testing123';

      const expectedResult = true;

      service
        .remove(fakePostId)
        .then(result => {
          expect(result).to.equal(expectedResult);
          done();
        });
    });
  });
});
