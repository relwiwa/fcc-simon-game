import React from 'react';

import SimonField from './simon-field';

const SimonFields = (props) => {
  const { currentField, currentTurn } = props;

  const renderField = (position) => {
    return (
      <SimonField
        position={position}
        currentField={currentField}
        currentTurn={currentTurn}
      />
    );
  };

  return (
    <div className="simon-fields column small-10 small-offset-1 text-center">
      <div className="row">
        {renderField('simon-top-left')}
        {renderField('simon-top-right')}
      </div>
      <div className="row">
        {renderField('simon-bottom-left')}
        {renderField('simon-bottom-right')}
      </div>
    </div>
  );
};

export default SimonFields;
