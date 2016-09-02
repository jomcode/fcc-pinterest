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

        return resolve();
      });
    });
  }

  create(data) {
    const db = this.driver;

    const cypher = 'CREATE (n:User {username: {username}, ' +
      'email: {email}, password: {password}, userId: {userId} ' +
      '}) RETURN n';

    const cypherParams = {
      username: data.username,
      email: data.email,
      password: data.password,
      userId: this.uuid.v4()
    };

    return new Promise((resolve, reject) => {
      db.query(cypher, cypherParams, (err, result) => {
        if (err) return reject(err);

        return resolve();
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

        return resolve();
      });
    });
  }
}

module.exports = Service;
