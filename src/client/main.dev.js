/* client entry point */
/* eslint-disable */ // TODO figure out how i want to set up eslint rules
if (process.env.HMR === 'enabled') require('react-hot-loader/patch');

import { AppContainer as HotContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';

import root from './modules/root';
/* eslint-enable */

const rootElement = document.getElementById('root');

render(
  <HotContainer>
    <root.component />
  </HotContainer>,
  rootElement
);

if (module.hot) {
  module.hot.accept('./modules/root', () => {
    const NextRoot = require('./modules/root').default.component;

    render(
      <HotContainer>
        <NextRoot />
      </HotContainer>,
      rootElement
    );
  });
}
