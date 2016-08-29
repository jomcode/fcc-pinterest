/* client entry point */
/* eslint-disable */ // TODO figure out how i want to set up eslint rules
if (process.env.HMR === 'enabled') require('react-hot-loader/patch');

import { AppContainer as HotContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import root from './modules/root';
import configureStore from './config/configurestore';
/* eslint-enable */

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
const rootElement = document.getElementById('root');

render(
  <HotContainer>
    <root.component store={store} history={history} />
  </HotContainer>,
  rootElement
);

if (module.hot) {
  module.hot.accept('./modules/root', () => {
    const NextRoot = require('./modules/root').default.component;

    render(
      <HotContainer>
        <NextRoot store={store} history={history} />
      </HotContainer>,
      rootElement
    );
  });
}
