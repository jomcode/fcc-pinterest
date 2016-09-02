/* Twitter Account Service */
const getDb = require('../../utilities').getDb;
const twitterAccountService = require('./service');
const router = require('./router');

module.exports = router(new twitterAccountService(getDb()));
