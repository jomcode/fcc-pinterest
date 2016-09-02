const getRouter = require('../../utilities').getRouter;
const isAuthenticated = require('../../middleware/isauthenticated');
const handleVerify = require('./handlers').handleVerify;

const router = getRouter();

router.get('/auth/verify', isAuthenticated, handleVerify);

module.exports = router;
