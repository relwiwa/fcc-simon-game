import React from 'react';
import { render } from 'react-dom';

import '../../styles/global-styles.scss';
import '../../config/font-awesome';

import SimonGame from './components/simon-game';

render(
  <SimonGame />,
  document.getElementById('root')
);
