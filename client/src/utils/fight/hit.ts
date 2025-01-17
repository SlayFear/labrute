import { Animation, HitStep } from '@eternaltwin/labrute-core/types';
import randomBetween from '@eternaltwin/labrute-core/utils/randomBetween';
import { GlowFilter } from '@pixi/filter-glow';
import { OutlineFilter } from '@pixi/filter-outline';
import { Tweener } from 'pixi-tweener';
import { AnimatedSprite, Application, Text } from 'pixi.js';
import changeAnimation from './changeAnimation.js';

import findFighter, { AnimationFighter } from './findFighter.js';
import stagger from './stagger.js';
import updateHp from './updateHp.js';

const hit = async (
  app: Application,
  fighters: AnimationFighter[],
  step: HitStep,
) => {
  const target = findFighter(fighters, step.target);
  if (!target) {
    throw new Error('Target not found');
  }

  // Get hit animation (random for male brute)
  const animation = target.type === 'brute' && target.data?.gender === 'male'
    ? `hit-${randomBetween(0, 3)}`
    : 'hit';

  // Set animation to the correct hit animation
  changeAnimation(app, target, animation as Animation);

  // Add poison filter if damage is poison
  if (step.action === 'poison') {
    target.currentAnimation.filters = [new GlowFilter({
      distance: 25,
      innerStrength: 1,
      outerStrength: 0,
      color: 0x006400,
    })];
  }

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
  await stagger(target.currentAnimation as AnimatedSprite, target.team);

  // Set animation to `iddle`
  changeAnimation(app, target, 'iddle');
};

export default hit;