import { HypnotiseStep } from '@eternaltwin/labrute-core/types';
import { Easing, Tweener } from 'pixi-tweener';
import { Application } from 'pixi.js';
import changeAnimation from './changeAnimation.js';
import { getRandomPosition } from './fightPositions.js';
import findFighter, { AnimationFighter } from './findFighter.js';

const hypnotise = async (
  app: Application,
  fighters: AnimationFighter[],
  step: HypnotiseStep,
) => {
  const brute = findFighter(fighters, step.brute);
  if (!brute) {
    throw new Error('Brute not found');
  }
  const pet = findFighter(fighters, step.pet);
  if (!pet) {
    throw new Error('Pet not found');
  }
  // Get random position
  const { x, y } = getRandomPosition(fighters, brute.team);

  // Set pet animation to `run`
  changeAnimation(app, pet, 'run');

  // Move pet to other team
  await Tweener.add({
    target: pet.currentAnimation,
    duration: 0.5,
    ease: Easing.linear,
  }, { x, y });

  // Change pet team
  pet.team = brute.team;
  pet.master = brute.name;

  // Set pet animation to `iddle`
  changeAnimation(app, pet, 'iddle');
};

export default hypnotise;