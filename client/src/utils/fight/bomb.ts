import { Animation, BombStep } from '@eternaltwin/labrute-core/types';
import randomBetween from '@eternaltwin/labrute-core/utils/randomBetween';
import { OutlineFilter } from '@pixi/filter-outline';
import { Tweener } from 'pixi-tweener';
import { AnimatedSprite, Application, Text } from 'pixi.js';
import changeAnimation from './changeAnimation.js';

import findFighter, { AnimationFighter } from './findFighter.js';
import stagger from './stagger.js';
import updateHp from './updateHp.js';

const bomb = async (
  app: Application,
  fighters: AnimationFighter[],
  step: BombStep,
) => {
  const fighter = findFighter(fighters, step.fighter);
  if (!fighter) {
    throw new Error('Fighter not found');
  }

  // Set animation to `launch`
  changeAnimation(app, fighter, 'launch');

  // Wait 500ms
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 500);
  });

  // Set animation to `iddle`
  changeAnimation(app, fighter, 'iddle');

  // Get targets
  const targets = step.targets.map((t) => {
    const target = findFighter(fighters, t);

    if (!target) {
      throw new Error('Target not found');
    }

    return target;
  });

  for (let i = 0; i < targets.length; i++) {
    const { [i]: target } = targets;

    // Get hit animation (random for male brute)
    const animation = target.type === 'brute' && target.data?.gender === 'male'
      ? `hit-${randomBetween(0, 3)}`
      : 'hit';

    // Set animation to the correct hit animation
    changeAnimation(app, target, animation as Animation);

    // Display floating and fading damage text
    const damageText = new Text(`-${step.damage}`, {
      fontFamily: 'Poplar', fontSize: 20, fill: 0xffffff
    });
    damageText.anchor.set(0.5);
    damageText.x = target.currentAnimation.x;
    damageText.y = target.currentAnimation.y - target.currentAnimation.height;
    damageText.zIndex = 1000;
    damageText.filters = [new OutlineFilter()];
    app.stage.addChild(damageText);

    Tweener.add({
      target: damageText,
      duration: 2,
    }, {
      y: damageText.y - 100,
      alpha: 0,
    }).then(() => {
      // Remove text
      damageText.destroy();
    }).catch(console.error);

    // Update HP bar
    if (target.hpBar) {
      updateHp(target, -step.damage);
    }

    // Stagger
    // eslint-disable-next-line no-await-in-loop
    stagger(target.currentAnimation as AnimatedSprite, target.team)
      .then(() => {
        // Set animation to `iddle`
        changeAnimation(app, target, 'iddle');
      })
      .catch(console.error);
  }
};

export default bomb;