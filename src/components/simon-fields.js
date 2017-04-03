import React from 'react';

import SimonField from './simon-field';

const SimonFields = (props) => {
  return (
    <div className="simon-fields col-xs-10 col-xs-offset-1 text-center">
      <div className="row">
        <SimonField
          position="simon-top-left"
        />
        <SimonField
          position="simon-top-right"
        />
      </div>
      <div className="row">
        <SimonField
          position="simon-bottom-left"
        />
        <SimonField
          position="simon-bottom-right"
        />
      </div>
    </div>
  );
};

export default SimonFields;
