export const simonConfig = {
  sequenceLength: 20,
  fields: [
    'simon-top-left',
    'simon-top-right',
    'simon-bottom-left',
    'simon-bottom-right'
  ],
  spriteData: {
    'simon-top-left': {
      spriteStart: 0,
      spriteDuration: 1
    },
    'simon-top-right': {
      spriteStart: 1,
      spriteDuration: 1
    },
    'simon-bottom-left': {
      spriteStart: 2,
      spriteDuration: 1
    },
    'simon-bottom-right': {
      spriteStart: 3,
      spriteDuration: 1
    },
    'error': {
      spriteStart: 4,
      spriteDuration: 1
    },
    'success': {
      spriteStart: 5,
      spriteDuration: 2
    }
  }
};
