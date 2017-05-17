import React, { Component } from 'react';


import { simonConfig } from '../data/simon-config';
import SimonControls from './simon-controls';
import SimonFields from './simon-fields';
import SimonSprite from './simon-sprite';

class SimonBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTurnedOn: false, // true || false
      gameStatus: 'not-started', // not-started || started || error || switch-to-ai || user-won
      strictMode: false, // true || false
      sequence: null, // Array(20)
      currentTurn: 'ai', // ai || user
      currentStep: 0, // 0 ... sequence.length
      currentStepAi: 0, // 0 ... sequence.length
      currentStepUser: 0, // 0 ... sequence.length
      currentField: null,
      currentSprite: null,
    }
  }

  continueAfterPlaybackAi() {
    const { currentStep, currentStepAi, sequence } = this.state;
    /*  ai has finished playing sequence til current step
        => switch back to user */
    if (currentStepAi === currentStep) {
      this.setState({
        currentTurn: 'user',
        currentStepAi: 0,
        currentStepUser: 0,
        currentField: null,
        currentSprite: null,
      });
    }
    else {
      /*  ai has not yet finished playing sequence til current step
          => continue ai sequence */
      this.setState({
        currentStepAi: currentStepAi + 1,
        currentField: sequence[currentStepAi + 1],
        currentSprite: sequence[currentStepAi + 1],
      });
    }   
  }

  continueAfterPlaybackUser() {
    const { currentStep, gameStatus, sequence, strictMode } = this.state;
    /*  user had clicked wrong field, so error sound was played
        => switch back to ai */
    if (gameStatus === 'error') {
      let newState = {
        gameStatus: 'started',
        currentTurn: 'ai',
        currentStepAi: 0,
        currentStepUser: 0,
        currentField: sequence[0],
        currentSprite: sequence[0],        
      }
      /* in strict mode, also reset game to step 0 */
      if (strictMode === true) {
        newState.currentStep = 0;
      }
      this.setState(newState);
    }
    /*  user had successfully clicked the sequence til current step
        => increase currentStep and switch back to ai */
    else if (gameStatus === 'switch-to-ai') {
      this.setState({
        gameStatus: 'started',
        currentTurn: 'ai',
        currentStepAi: 0,
        currentStepUser: 0,
        currentField: sequence[0],
        currentSprite: sequence[0],
        currentStep: currentStep + 1,
      });
    }
    /*  user had clicked the whole sequence
        => last field and sprite were animated
        => now play winner sprite */
    else if (gameStatus === 'user-won') {
      this.setState({
        currentSprite: 'success',
        currentField: null,
        gameStatus: 'finished'
      });
    }
    /*  user had won the game and success sprite was played
        => now reset sprite */
    else if (gameStatus === 'finished') {
      this.setState({
        currentSprite: null,
      });
    }
    /*  user had clicked the right field, but has not yet replayed
        sequence until currentStep
        => reset field and sprite, and it is still user's turn */
    else {
      this.setState({
        currentField: null,
        currentSprite: null,
      })
    }
  }

  createSequence() {
    let sequence = [];
    const { fields, numberOfFields, sequenceLength } = simonConfig;
    for (let i = 0; i < sequenceLength; i++) {
      let sequenceElement = fields[Math.floor(Math.random() * fields.length)];
      // prevent same element one after another 
      if (sequence.length > 1) {
        while (sequence[i - 1] === sequenceElement) {
          sequenceElement = fields[Math.floor(Math.random() * fields.length)];
        }
      }
      sequence.push(sequenceElement);
    }
    return sequence;
  }

  handleUserClicked(event, field) {
    const { sequence, currentStep, currentStepUser } = this.state;
    let newState = {};
    newState.currentField = field;
    /*  user has clicked the correct field */
    if (field === sequence[currentStepUser]) {
      newState.currentSprite = field;
      // user has replayed sequence until current step
      if (currentStepUser === currentStep) {
        // user has replayed the whole sequence, game is won
        if (currentStepUser === sequence.length - 1) {
          newState.gameStatus = 'user-won';
        }
        /* user has not yet replayed the whole sequence
            => set gameStatus to 'switch-to-ai'
            => continueAfterPlaybackUser handles switching to ai */
        else {
          newState.gameStatus = 'switch-to-ai';
        }
      }
      // user has not yet replayed sequence until current step
      else {
        newState.currentStepUser = this.state.currentStepUser + 1;
      }
    }
    /*  user has clicked the incorrect field
        => clicked field gets animated, but error sprite gets played
        => gameStatus gets changed to error
        => continueAfterPlaybackUser handles switchting to ai */
    else {
      newState.currentSprite = 'error';
      newState.gameStatus = 'error';
    }
    this.setState(newState);
  }

  handleSpritePlaybackDone() {
    const { currentTurn } = this.state;
    if (currentTurn === 'ai') {
      this.continueAfterPlaybackAi();     
    }
    else {
      this.continueAfterPlaybackUser();
    }
  }

  handleStartOrRestart() {
    const sequence = this.createSequence();
    // game starts o restarts at step 0 and it is ai's turn
    this.setState({
      sequence: sequence,
      currentStep: 0,
      currentTurn: 'ai',
      gameStatus: 'started',
      currentStepAi: 0,
      currentStepUser: 0,
      currentField: sequence[0],
      currentSprite: sequence[0],
    });
  }

  // when toggling strict mode, restart game
  handleToggleStrictMode() {
    const sequence = this.createSequence();
    this.setState({
      sequence: sequence,
      currentStep: 0,
      currentTurn: 'ai',
      gameStatus: 'started',
      currentStepAi: 0,
      currentStepUser: 0,
      currentField: sequence[0],
      currentSprite: sequence[0],
      strictMode: !this.state.strictMode,
    });
  }

  handleToggleTurnedOn() {
    // stop audio playing before resetting currentSprite
    const { isTurnedOn } = this.state;
    if (isTurnedOn === true) {
      this.setState({
        currentStep: 0,
        currentTurn: 'ai',
        gameStatus: 'not-started',
        currentStepAi: 0,
        currentStepUser: 0,
        currentField: null,
        currentSprite: null,
        sequence: null,
        isTurnedOn: false,
        strictMode: false,
      });
    }
    else {
      this.setState({
        isTurnedOn: true
      });
    }
  }

  render() {
    const { currentField, currentSprite, currentStep, currentTurn, gameStatus, isTurnedOn, sequence, strictMode } = this.state;

    return (
      <div className="simon-board row text-center">
        <SimonFields
          currentField={currentField}
          currentTurn={currentTurn}
          gameStatus={gameStatus}
          onUserClicked={(event, field) => this.handleUserClicked(event, field)}
        />
        {isTurnedOn === true && <SimonSprite
          spriteData={simonConfig.spriteData}
          sequence={sequence}
          currentSprite={currentSprite}
          onSpritePlaybackDone={() => this.handleSpritePlaybackDone()}
        />}
        <SimonControls
          gameStatus={gameStatus}
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
