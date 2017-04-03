import React from 'react';

import SimonControls from './simon-controls';
import SimonFields from './simon-fields';

const SimonBoard = (props) => {
  return (
    <div className="simon-board row text-center">
      <SimonFields />
      <SimonControls />
    </div>
  );
};

export default SimonBoard;
