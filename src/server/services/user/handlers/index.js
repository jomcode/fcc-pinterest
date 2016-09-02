/* User Router Handlers */
const getDb = require('../../../utilities').getDb;
const Service = require('../service');

const us = new Service(getDb());

const createUser = require('./createuser')(us);
const getByUserId = require('./getbyuserid')(us);
const removeByUserId = require('./removebyuserid')(us);

module.exports = {
  createUser,
  getByUserId,
  removeByUserId
};
