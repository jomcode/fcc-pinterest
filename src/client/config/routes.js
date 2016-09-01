import React from 'react';
import { Route, IndexRoute } from 'react-router';

import app from '../modules/app';
import createPost from '../modules/createpost';
import userPosts from '../modules/userposts';

const routes = (
  <Route path="/" component={app.container}>
    <Route path="/posts/create" component={createPost.container} />
    <Route path="/posts/users/:userId" component={userPosts.container} />
  </Route>
);

export default routes;
