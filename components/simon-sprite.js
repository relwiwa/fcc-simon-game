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
/*  Usage of ogg and mp3 files necessary:
    - When setting currentTime, Chrome and Firefox interpret the position differently
    - OGG file is included for Firefox, but unsupported in Chrome, so MP3 is also included
    - MP3 also works in IE */
import simonSpriteOgg from '../audio/simon-sprite.ogg';
import simonSpriteMp3 from '../audio/simon-sprite.mp3';

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
    const { currentSprite, onSpritePlaybackDone, spriteData } = newProps;

    if (this.clearSpriteTimeout) {
      this.clearSpriteTimeout();
    }
    if (currentSprite !== null) {
      const { spriteDuration, spriteStart } = spriteData[currentSprite];
      this.audio.currentTime = spriteStart;
      this.audio.play();
      this.spriteTimeout = setTimeout(() => {
        this.audio.pause();
        onSpritePlaybackDone();
      }, spriteDuration * 900);
    }
  };

  render() {

    return (
      <audio
        id="simon-sprite"
        ref={(audio) => this.audio = audio}
      >
        <source src={simonSpriteOgg} type="audio/ogg" />
        <source src={simonSpriteMp3} type="audio/mpeg" />
      </audio>
    );
  }
};

export default SimonSprite;
