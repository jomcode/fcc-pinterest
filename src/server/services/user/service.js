'use strict';
const uuid = require('node-uuid');

class Service {
  constructor(db) {
    this.driver = db;
    this.uuid = uuid;
  }

  // find(params) {}

  get(id) {
    const db = this.driver;

    const cypher = 'MATCH (u:User) WHERE u.userId = {userId} RETURN u';

    const cypherParams = {
      userId: id
    };

    return new Promise((resolve, reject) => {
      db.query(cypher, cypherParams, (err, result) => {
        if (err) return reject(err);

        const user = result.reduce((prev, curr) => {
          delete curr.u.id;
          delete curr.u.password;
          const record = Object.assign({}, curr.u);
          return Object.assign(prev, record);
        }, {});

        return resolve(user);
      });
    });
  }

  create(data) {
    const db = this.driver;

    const cypher = 'CREATE (u:User {username: {username}, ' +
      'email: {email}, password: {password}, userId: {userId} ' +
      '}) RETURN u';

    const cypherParams = {
      username: data.username,
      email: data.email,
      password: data.password,
      userId: this.uuid.v4()
    };

    return new Promise((resolve, reject) => {
      db.query(cypher, cypherParams, (err, result) => {
        if (err) return reject(err);

        const created = result.reduce((prev, curr) => {
          delete curr.u.id;
          delete curr.u.password;
          const user = Object.assign({}, curr.u);
          return Object.assign(prev, user);
        }, {});

        return resolve(created);
      });
    });
  }

  // update(id, data) {}
  // patch(id, data) {}

  remove(id) {
    const db = this.driver;

    const cypher = 'MATCH (u:User) WHERE u.userId = {userId} ' +
      'DETACH DELETE u';

    const cypherParams = { userId: id };

    return new Promise((resolve, reject) => {
      db.query(cypher, cypherParams, (err, result) => {
        if (err) return reject(err);

        const meta = Object.assign({}, result.metadata);

        return resolve(meta.deleted);
      });
    });
  }
}

module.exports = Service;
