'use strict';
const neo4j = require('neo4j-driver').v1;
const uuid = require('node-uuid');

const dbConfig = require('../../config').neo4j;

const driver = neo4j.driver(dbConfig, neo4j.auth.basic('neo4j', 'admin'));

class Service {
  constructor() {
    this.driver = driver;
    this.uuid = uuid;
  }

  // find(params) {}

  get(id) {
    const session = this.driver.session();

    const cypher = 'MATCH (u:User)-[:HAS_TWITTER_ACCOUNT]->(t) WHERE ' +
      't.twitterId = {twitterId} ' +
      'RETURN u, t';

    const cypherParams = {
      twitterId: id
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

    const cypher = 'CREATE (u:User { username: {username}, userId: {userId} ' +
      '}), (t:TwitterAccount { twitterId: {twitterId} }), ' +
      '(u)-[:HAS_TWITTER_ACCOUNT]->(t) ' +
      'RETURN u, t';

    const cypherParams = {
      twitterId: data.twitterId,
      username: data.username,
      userId: uuid.v4()
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

  // update(id, data) {}
  // patch(id, data) {}
  // remove(id) {}
}

module.exports = Service;
