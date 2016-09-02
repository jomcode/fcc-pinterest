/* User Router Handlers */
const Service = require('../service');

const us = new Service();

const createUser = require('./createuser')(us);
const getByUserId = require('./getbyuserid')(us);
const removeByUserId = require('./removebyuserid')(us);

module.exports = {
  createUser,
  getByUserId,
  removeByUserId
};
