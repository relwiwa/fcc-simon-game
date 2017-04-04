import React, { Component } from 'react';

import SimonControls from './simon-controls';
import SimonFields from './simon-fields';

class SimonBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTurnedOn: false
    }
  }

  handleToggleTurnedOn() {
    this.setState({
      isTurnedOn: !this.state.isTurnedOn
    });
  }

  render() {
    const { isTurnedOn } = this.state;

    return (
      <div className="simon-board row text-center">
        <SimonFields />
        <SimonControls
          isTurnedOn={isTurnedOn}
          onToggleTurnedOn={() => this.handleToggleTurnedOn()}
        />
      </div>
    );
  }
};

export default SimonBoard;
