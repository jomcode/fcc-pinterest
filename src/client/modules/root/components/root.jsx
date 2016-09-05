import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

const Root = ({ store, history, routes }) => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);

export default Root;
