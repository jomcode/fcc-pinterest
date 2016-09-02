/* Post Router Handlers */
const getDb = require('../../../utilities').getDb;
const Service = require('../service');

const ps = new Service(getDb());

const createPost = require('./createpost')(ps);
const getByUserId = require('./getbyuserid')(ps);
const getRecent = require('./getrecent')(ps);
const removeByPostId = require('./removebypostid')(ps);

module.exports = {
  createPost,
  getByUserId,
  getRecent,
  removeByPostId
};
