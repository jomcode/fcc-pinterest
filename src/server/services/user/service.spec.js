const expect = require('chai').expect;

const UserService = require('./service');

describe('User Service database service', () => {
  describe('#get', () => {
    function fakeDb() {}

    fakeDb.prototype.query = function query(cypher, params, cb) {};

    const db = new fakeDb();
    const service = new UserService(db);

    it('returns expected data');
  });

  describe('#create', () => {
    function fakeDb() {}

    fakeDb.prototype.query = function query(cypher, params, cb) {};

    const db = new fakeDb();
    const service = new UserService(db);

    it('returns expected data');
  });

  describe('#remove', () => {
    function fakeDb() {}

    fakeDb.prototype.query = function query(cypher, params, cb) {};

    const db = new fakeDb();
    const service = new UserService(db);

    it('returns expected data');
  });
});
