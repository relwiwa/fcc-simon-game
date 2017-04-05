import React from 'react';

const SimonField = (props) => {
  const { position, currentField, currentTurn } = props;

  return (
    <div
      id={position}
      className={'simon-field column small-6'}
    >
      <div
        className={currentField === position ? 'simon-field-current' : ''}>
      </div>
    </div>
  );
};

export default SimonField;
