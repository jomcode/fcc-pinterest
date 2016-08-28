'use strict';
const neo4j = require('neo4j-driver').v1;
const uuid = require('node-uuid');

const userService = require('./service');
const router = require('./router');
const dbConfig = require('../../config').neo4j;

const driver = neo4j.driver(dbConfig, neo4j.auth.basic('neo4j', 'admin'));

module.exports = router(new userService(driver, uuid));
