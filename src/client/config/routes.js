import React from 'react';
import { Route, IndexRoute } from 'react-router';

import app from '../modules/app';

const routes = (
  <Route path="/" component={app.container}>

  </Route>
);

export default routes;
