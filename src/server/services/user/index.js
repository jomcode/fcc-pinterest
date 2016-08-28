'use strict';
const userService = require('./service');
const router = require('./router');

module.exports = router(new userService());
