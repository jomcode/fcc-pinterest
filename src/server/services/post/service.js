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

  // TODO clean this up
  find(params) {
    const db = this.driver;

    if (params && params.query) {
      const cypher = 'MATCH (u:User)-[:HAS_POSTED]->(post) ' +
      'WHERE u.userId = {userId} ' +
      'RETURN u, post';

      const cypherParams = {
        userId: params.query.userId
      };

      return new Promise((resolve, reject) => {
        db.query(cypher, cypherParams, (err, result) => {
          if (err) return reject(err);

          const posts = result.map(d => {
            delete d.u.id;
            delete d.post.id;
            const user = Object.assign({}, d.u);
            const post = Object.assign({}, d.post);
            return Object.assign({}, user, post);
          });

          return resolve(posts);
        });
      });
    }

    const cypher = 'MATCH (u:User)-[:HAS_POSTED]->(post) ' +
      'RETURN u, post';

    const cypherParams = {};

    return new Promise((resolve, reject) => {
      db.query(cypher, cypherParams, (err, result) => {
        if (err) return reject(err);

        const posts = result.map(d => {
          delete d.u.id;
          delete d.post.id;
          const user = Object.assign({}, d.u);
          const post = Object.assign({}, d.post);
          return Object.assign({}, user, post);
        });

        return resolve(posts);
      });
    });
  }

  // get(id) {}

  create(data) {
    const db = this.driver;

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

    return new Promise((resolve, reject) => {
      db.query(cypher, cypherParams, (err, result) => {
        if (err) return reject(err);

        const created = result.reduce((prev, curr) => {
          delete curr.u.id;
          delete curr.p.id;
          const user = Object.assign({}, curr.u);
          const post = Object.assign({}, curr.p);
          return Object.assign(prev, user, post);
        }, {});

        return resolve(created);
      });
    });
  }

  // update(id, data) {}
  // patch(id, data) {}

  // TODO decide on what to return from resolved promise
  remove(id) {
    const db = this.driver;

    const cypher = 'MATCH (p:Post) WHERE p.postId = {postId} ' +
      'DETACH DELETE p ' +
      'RETURN p';

    const cypherParams = {
      postId: id
    };

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
