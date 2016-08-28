'use strict';
const postService = require('./service');
const router = require('./router');

module.exports = router(new postService());
