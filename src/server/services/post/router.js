const getRouter = require('../../utilities').getRouter;
const isAuthenticated = require('../../middleware/isauthenticated');
const handlers = require('./handlers');

const router = getRouter();

router.post('/posts', isAuthenticated, handlers.createPost);

router.get('/posts/user/:userId', handlers.getByUserId);

router.get('/posts', handlers.getRecent);

router.delete('/posts/:postId', isAuthenticated, handlers.removeByPostId);

module.exports = router;
