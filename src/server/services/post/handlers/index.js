/* Post Router Handlers */
const Service = require('../service');

const ps = new Service();

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
