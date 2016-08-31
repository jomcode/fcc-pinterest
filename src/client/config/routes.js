import React from 'react';
import { Route, IndexRoute } from 'react-router';

import app from '../modules/app';
import createPost from '../modules/createpost';

const routes = (
  <Route path="/" component={app.container}>
    <Route path="/posts/create" component={createPost.container} />
  </Route>
);

export default routes;
