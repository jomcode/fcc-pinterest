/* client entry point */
import React from 'react';
import { render } from 'react-dom';

import root from './modules/root';

const rootElement = document.getElementById('root');

render(
  <root.component />,
  rootElement
);
