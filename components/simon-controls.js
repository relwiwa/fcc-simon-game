import React from 'react';

const SimonControls = (props) => {
  const { currentStep, gameStatus, isTurnedOn, onStartOrRestart, onToggleStrictMode, onToggleTurnedOn, strictMode } = props;

  const renderCurrentStep = () => {
    if (gameStatus === 'not-started') {
      return '00';
    }
    const leadingZero = (currentStep + 1) < 10 ? '0' : '';
    return (
      leadingZero + (currentStep + 1)
    );
  };

  return (
    <div className="simon-controls column small-7 medium-5 medium-offset-1 text-center">
      <div className="row">
        <div className="simon-controls-wrapper-1 column small-12">
          <div className="simon-controls-wrapper-2">

            <div className="simon-controls-top">
              <h3>Simon<sup className="small">&reg;</sup></h3>
            </div>

            <div className="simon-controls-middle">

              <div className="simon-controls-middle-1 row collapse">
                <div className="strict-mode-indicator column small-offset-9 small-2 text-center">
                  <span className={strictMode ? 'strict-mode-on' : ''}></span>
                </div>
              </div>

              <div className="simon-controls-middle-2 row collapse">
                <div className="column small-4">
                  {/* was not able to position span in accordance with the other buttons in
                      this row without using button :-( */}
                  <button className="step-counter-button">
                    <span>
                      {isTurnedOn ? renderCurrentStep() : '--'}</span>
                  </button>
                </div>
                <div className="column small-4">
                  <button
                    className="re-start-button"
                    onClick={isTurnedOn ? onStartOrRestart : null}
                  ></button>
                </div>
                <div className="column small-4">
                  <button
                    className="strict-mode-toggle"
                    onClick={isTurnedOn ? onToggleStrictMode : null}></button>
                </div>
              </div>

              <div className="simon-controls-middle-3 row collapse">
                <div className="column small-4">
                  <div className="simon-controls-text">Count</div>
                </div>
                <div className="column small-4">
                  <div className="simon-controls-text">Start</div>
                </div>
                <div className="column small-4">
                  <div className="simon-controls-text">Strict</div>
                </div>
              </div>

            </div>

            <div className="simon-controls-bottom">
              <div className="switch tiny">
                <input className="switch-input" checked={isTurnedOn} id="exampleSwitch" type="checkbox" name="exampleSwitch" />
                <label className="switch-paddle" for="exampleSwitch" onClick={onToggleTurnedOn}>
                  <span className="show-for-sr">Turn Simon Game on or off</span>
                  <span className="switch-active" aria-hidden="true">On</span>
                  <span className="switch-inactive" aria-hidden="true">Off</span>
                </label>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SimonControls;
