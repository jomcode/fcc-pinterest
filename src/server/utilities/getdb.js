const seraph = require('seraph');

const dbConfig = require('../config').neo4j;

const getDb = () => seraph(dbConfig);

module.exports = getDb;
