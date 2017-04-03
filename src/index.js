import React from 'react';
import { render } from 'react-dom';
import SimonGame from './components/simon-game';
import styles from '../styles/style.scss';

render(
  <SimonGame />,
  document.getElementById('root')
);
