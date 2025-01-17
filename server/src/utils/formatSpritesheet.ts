import SpriteSmith from 'spritesmith';
import {
  Animation, Brute, Gender,
} from '@eternaltwin/labrute-core/types';
import { ANIMATIONS } from '@eternaltwin/labrute-core/constants';
import { FRAMES } from '../animations/getFrame.js';

interface Frame {
  frame: {
    x: number;
    y: number;
    w: number;
    h: number;
  },
  rotated: boolean,
  trimmed: boolean,
  anchor: {
    x: number;
    y: number;
  },
}

type FrameFileName = `${Animation}-${Gender}-${number}.png`;

export interface SpritesheetJson {
  [frame: FrameFileName]: Frame,
  animations: Record<Animation, string[]>,
  meta: {
    app: string;
    version: string;
    image: string;
    format: string;
    size: {
      w: number;
      h: number;
    },
    scale: string;
    smartupdate: string;
  }
}

const generateAnimationArray = (animation: Animation, gender: Gender) => Array.from(
  { length: FRAMES[gender][animation].length },
  (v, k) => `${animation}-${gender}-${k + 1}.png`,
);

const generateAnimations = (gender: Gender) => ANIMATIONS
  .reduce<Record<Animation, string[]>>((acc, animation) => {
    acc[animation] = generateAnimationArray(animation, gender);

    return acc;
  }, {} as Record<Animation, string[]>);

const formatSpritesheet = (
  spritesheet: SpriteSmith.SpriteResult,
  brute: Brute,
): SpritesheetJson => ({
  ...Object.entries(spritesheet.coordinates)
    .reduce<Record<FrameFileName, Frame>>((acc, [frame, data]) => {
      acc[frame as FrameFileName] = {
        frame: {
          x: data.x,
          y: data.y,
          w: data.width,
          h: data.height,
        },
        rotated: false,
        trimmed: false,
        anchor: {
          x: 0.523077,
          y: 0.897059,
        },
      };

      return acc;
    }, {} as Record<FrameFileName, Frame>),
  animations: generateAnimations(brute.data.gender),
  meta: {
    app: 'https://www.codeandweb.com/texturepacker',
    version: '1.0',
    image: `${brute.name}.png`,
    format: 'RGBA8888',
    size: { w: spritesheet.properties.width, h: spritesheet.properties.height },
    scale: '1',
    smartupdate: '$TexturePacker:SmartUpdate:ecc90d11856343dacff9417a6254e566:b33a3fe65889c54d0315918392650172:b920835fe2519a5dc0b950d29546a2e7$',
  },
});

export default formatSpritesheet;