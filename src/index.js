import React from 'react';
import { render } from 'react-dom';

import './global-styles.scss';
import SimonGame from './components/simon-game';

render(
  <SimonGame />,
  document.getElementById('root')
);
