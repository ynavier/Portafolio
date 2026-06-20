import { GSAPAnimationConfig } from './types';

export const projectCardLeft: GSAPAnimationConfig = {
  from: { opacity: 0, x: -60, rotation: -2 },
  duration: 0.7,
  ease: 'expo.out',
};

export const projectCardRight: GSAPAnimationConfig = {
  from: { opacity: 0, x: 60, rotation: 2 },
  duration: 0.7,
  ease: 'expo.out',
};
