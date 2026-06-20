import { GSAPAnimationConfig } from './types';

export const aboutTextWord: GSAPAnimationConfig = {
  from: { opacity: 0, x: -20 },
  duration: 0.5,
  ease: 'expo.out',
};

export const aboutImage: GSAPAnimationConfig = {
  from: { opacity: 0, x: 60, rotationY: 15 },
  duration: 0.7,
  delay: 0.15,
  ease: 'expo.out',
};
