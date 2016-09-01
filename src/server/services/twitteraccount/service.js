'use strict';
const seraph = require('seraph');
const uuid = require('node-uuid');

const dbConfig = require('../../config').neo4j;

const driver = seraph(dbConfig);

class Service {
  constructor() {
    this.driver = driver;
    this.uuid = uuid;
  }

  // find(params) {}

  get(id) {
    const db = this.driver;

    const cypher = 'MATCH (u:User)-[:HAS_TWITTER_ACCOUNT]->(t) WHERE ' +
      't.twitterId = {twitterId} ' +
      'RETURN u, t';

    const cypherParams = {
      twitterId: id
    };

    return new Promise((resolve, reject) => {
      db.query(cypher, cypherParams, (err, result) => {
        if (err) return reject(err);

        const user = result.reduce((prev, curr) => {
          delete curr.u.id;
          delete curr.t.id;
          const u = Object.assign({}, curr.u);
          const t = Object.assign({}, curr.t);
          return Object.assign(prev, u, t);
        }, {});

        return resolve(user);
      });
    });
  }

  create(data) {
    const db = this.driver;

    const cypher = 'CREATE (u:User { username: {username}, userId: {userId} ' +
      '}), (t:TwitterAccount { twitterId: {twitterId} }), ' +
      '(u)-[:HAS_TWITTER_ACCOUNT]->(t) ' +
      'RETURN u, t';

    const cypherParams = {
      twitterId: data.twitterId,
      username: data.username,
      userId: uuid.v4()
    };

    return new Promise((resolve, reject) => {
      db.query(cypher, cypherParams, (err, result) => {
        if (err) return reject(err);

        const user = result.reduce((prev, curr) => {
          delete curr.u.id;
          delete curr.t.id;
          const u = Object.assign({}, curr.u);
          const t = Object.assign({}, curr.t);
          return Object.assign(prev, u, t);
        }, {});

        return resolve(user);
      });
    });
  }

  // update(id, data) {}
  // patch(id, data) {}
  // remove(id) {}
}

module.exports = Service;
