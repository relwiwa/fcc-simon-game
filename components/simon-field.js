import React from 'react';

const SimonField = (props) => {
  const { position } = props;

  return (
    <div
      id={position}
      className="simon-field column small-6"
    >
      <div></div>
    </div>
  );
};

export default SimonField;
