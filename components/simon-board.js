import React, { Component } from 'react';

import SimonControls from './simon-controls';
import SimonFields from './simon-fields';

const fields = ['simon-top-left', 'simon-top-right', 'simon-bottom-left', 'simon-bottom-right'];

class SimonBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTurnedOn: false, // true || false
      gameStatus: 'not-started', // started || not-started || won
      strictMode: false, // true || false
      sequence: [], // Array(20)
      currentStep: 0, // 0 ... 19
      currentTurn: 'ai', // ai || human
    }
  }

  componentWillMount() {
  }

  createSequence() {
    let sequence = [];
    for (let i = 0; i < 20; i++) {
      sequence.push(fields[Math.floor(Math.random() * fields.length)]);
    }
    return sequence;
  }

  handleStartOrRestart() {
    this.setState({
      sequence: this.createSequence(),
      currentStep: 0,
      currentTurn: 'ai',
      gameStatus: 'started',
    });
  }

  handleToggleStrictMode() {
    // back to step one
    this.setState({
      strictMode: !this.state.strictMode
    });
  }

  handleToggleTurnedOn() {
    this.setState({
      isTurnedOn: !this.state.isTurnedOn
    });
  }

  render() {
    const { currentStep, currentTurn, isTurnedOn, sequence, strictMode } = this.state;
    const currentField = sequence[currentStep];

    return (
      <div className="simon-board row text-center">
        <SimonFields
          currentField={currentField}
          currentTurn={currentTurn}
        />
        <SimonControls
          isTurnedOn={isTurnedOn}
          strictMode={strictMode}
          currentStep={currentStep}
          onStartOrRestart={() => this.handleStartOrRestart()}
          onToggleStrictMode={() => this.handleToggleStrictMode()}
          onToggleTurnedOn={() => this.handleToggleTurnedOn()}
        />
      </div>
    );
  }
};

export default SimonBoard;
