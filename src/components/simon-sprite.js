import React, { Component } from 'react';

/*  simon-sprite.mp3 contains the following files:
    * from freeCodeCamp:
      - https://s3.amazonaws.com/freecodecamp/simonSound1.mp3
      - https://s3.amazonaws.com/freecodecamp/simonSound2.mp3
      - https://s3.amazonaws.com/freecodecamp/simonSound3.mp3
      - https://s3.amazonaws.com/freecodecamp/simonSound4.mp3
    * from soundbible.com under Attribution 3.0 licence:
      - http://soundbible.com/1003-Ta-Da.html
      - http://soundbible.com/1682-Robot-Blip.html
    => the single sprite file was created so that the sounds can be played on mobile devices */
import simonSprite from '../audio/simon-sprite.mp3';

class SimonSprite extends Component {
  constructor(props) {
    super(props);
  };

  componentWillUnmount() {
    this.clearSpriteTimeout();
    this.audio.pause();
  }

  componentWillUpdate(newProps) {
    this.setupSimonSprite(newProps);
  }

  clearSpriteTimeout() {
    clearTimeout(this.spriteTimeout);
  }

  setupSimonSprite(newProps) {
    const { currentSprite, fieldData, onSpritePlaybackDone } = newProps;
    if (this.clearSpriteTimeout) {
      this.clearSpriteTimeout();
    }
    if (currentSprite !== null) {
      this.audio.currentTime = fieldData[currentSprite].spriteStart;
      this.audio.play();
      this.spriteTimeout = setTimeout(() => {
        this.audio.pause();
        onSpritePlaybackDone();
      }, fieldData[currentSprite].spriteDuration * 1000);
    }
  };

  render() {

    return (
      <audio
        id="simon-sprite"
        type="audio/mpeg"
        src={simonSprite}
        ref={(audio) => this.audio = audio}
      ></audio>
    );
  }
};

export default SimonSprite;
