const getRouter = require('../../utilities').getRouter;
const isAuthenticated = require('../../middleware/isauthenticated');
const handlers = require('./handlers');

const router = getRouter();

router.get('/users/:userId', isAuthenticated, handlers.getByUserId);

router.post('/users', handlers.createUser);

router.delete('/users/:userId', isAuthenticated, handlers.removeByUserId);

module.exports = router;
