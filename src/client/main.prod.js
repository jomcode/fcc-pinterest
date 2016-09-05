/* client entry point */
import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import './main.scss';
import root from './modules/root';
import configureStore from './config/configurestore';
import routes from './config/routes';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

const rootElement = document.getElementById('root');

render(
  <root.component store={store} history={history} routes={routes} />,
  rootElement
);
