import React from 'react';

const SimonField = (props) => {
  const { position } = props;

  return (
    <div
      id={position}
      className="simon-field col col-xs-6"
    >
      <div></div>
    </div>
  );
};

export default SimonField;
