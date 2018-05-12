import React from 'react';

import SimonField from './simon-field';

const SimonFields = (props) => {
  const { currentField, currentTurn, gameStatus, onUserClicked } = props;

  const renderField = (field) => {
    return (
      <SimonField
        field={field}
        isCurrentField={currentField === field ? true : false}
        onUserClicked={currentTurn === 'user' && gameStatus === 'started' ? (event) => onUserClicked(event, field) : null}
      />
    );
  };

  return (
    <div className="simon-fields cell small-10 small-offset-1 text-center">
      <div className="grid-x">
        {renderField('simon-top-left')}
        {renderField('simon-top-right')}
      </div>
      <div className="grid-x">
        {renderField('simon-bottom-left')}
        {renderField('simon-bottom-right')}
      </div>
    </div>
  );
};

export default SimonFields;
