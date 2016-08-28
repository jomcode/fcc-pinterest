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

  find() {}
  get() {}
  create() {}
  update() {}
  patch() {}
  remove() {}
}

module.exports = Service;
