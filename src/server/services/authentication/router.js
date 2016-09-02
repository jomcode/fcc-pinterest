const getRouter = require('../../utilities').getRouter;
const isAuthenticated = require('../../middleware/isauthenticated');
const handlers = require('./handlers');

const router = getRouter();

router.get('/auth/verify', isAuthenticated, handlers.verify);

module.exports = router;
