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

  // TODO if params does not params: { query: { userId: 'someid' } } then
  // return all posts, otherwise return all posts by that user
  find(params) {
    const session = this.driver.session();

    const cypher = 'MATCH (u:User)-[:HAS_POSTED]->(posts) ' +
      'WHERE u.userId = {userId} ' +
      'RETURN u, posts';

    const cypherParams = {
      userId: params.query.userId
    };

    return session
      .run(cypher, cypherParams)
      .then(r => {
        const records = r.records.slice();
        session.close();
        return records;
      })
      .catch(e => {
        console.error(e);
        session.close();
      });
  }

  // get(id) {}

  create(data) {
    const session = this.driver.session();

    const cypher = 'MATCH (u:User) WHERE u.userId = {userId} ' +
      'CREATE (p:Post { postId: {postId}, title: {title}, ' +
      'imageUrl: {imageUrl} }), ' +
      '(u)-[:HAS_POSTED]->(p) RETURN u, p';

    const cypherParams = {
      userId: data.userId,
      postId: this.uuid.v4(),
      title: data.title,
      imageUrl: data.imageUrl
    };

    return session
      .run(cypher, cypherParams)
      .then(r => {
        const records = r.records.slice();
        session.close();
        return records;
      })
      .catch(e => {
        console.error(e);
        session.close();
      });
  }

  // update(id, data) {}
  // patch(id, data) {}
  // remove(id) {}
}

module.exports = Service;
