'use strict';
const neo4j = require('neo4j-driver').v1;
const uuid = require('node-uuid');

const dbConfig = require('../../config').neo4j;

const driver = neo4j.driver(
  dbConfig.url,
  neo4j.auth.basic(dbConfig.user, dbConfig.password)
);

class Service {
  constructor() {
    this.driver = driver;
    this.uuid = uuid;
  }

  // find(params) {}

  get(id) {
    const session = this.driver.session();

    const cypher = 'MATCH (u:User) WHERE u.userId = {userId} RETURN u';

    const cypherParams = {
      userId: id
    };

    return session
      .run(cypher, cypherParams)
      .then(r => {
        const records = r.records.slice();
        session.close();
        return records;
      })
      .catch(e => {
        session.close();
        console.error(e);
      });
  }

  create(data) {
    const session = this.driver.session();

    const cypher = 'CREATE (n:User {username: {usernameParam}, ' +
      'email: {emailParam}, password: {passwordParam}, userId: {userIdParam} ' +
      '}) RETURN n';

    const cypherParams = {
      usernameParam: data.username,
      emailParam: data.email,
      passwordParam: data.password,
      userIdParam: this.uuid.v4()
    };

    return session
      .run(cypher, cypherParams)
      .then((r) => {
        // r.records.forEach(rec => console.log(rec._fields));
        const records = r.records.slice();
        session.close();
        return records;
      })
      .catch(e => {
        session.close();
        console.error(e);
      });
  }

  // update(id, data) {}
  // patch(id, data) {}

  remove(id) {
    const session = this.driver.session();

    const cypher = 'MATCH (u:User) WHERE u.userId = {userIdParam} ' +
      'DETACH DELETE u RETURN u';

    const cypherParams = { userIdParam: id };

    return session
      .run(cypher, cypherParams)
      .then(r => {
        const numDeleted = r.records.length; // return number of records deleted
        // const result = Object.assign({}, r.summary.updateStatistics._stats);
        session.close();
        return numDeleted;
      })
      .catch(e => {
        session.close();
        console.error(e);
      });
  }
}

module.exports = Service;
