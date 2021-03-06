import React from 'react';

import SimonBoard from './simon-board';
import '../styles/style.scss';

const SimonGame = (props) => {
  return (
    <div className="simon-game grid-container grid-container-padded">
      <h1 className="text-center">
        Simon Game
      </h1>
      <SimonBoard />
    </div>
  );
};

export default SimonGame;
