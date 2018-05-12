import React from 'react';

const SimonField = (props) => {
  const { field, isCurrentField, onUserClicked } = props;

  return (
    <div
      id={field}
      className={'simon-field cell small-6'}
    >
      <div
        className={isCurrentField ? 'simon-field-current' : ''}
        onClick={onUserClicked}>
      </div>
    </div>
  );
};

export default SimonField;
