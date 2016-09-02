/* Twitter Account Service */
const twitterAccountService = require('./service');
const router = require('./router');

module.exports = router(new twitterAccountService());
