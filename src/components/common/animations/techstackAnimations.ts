import { GSAPAnimationConfig } from './types';

export const techstackTitleLeft: GSAPAnimationConfig = {
  from: { opacity: 0, x: -50 },
  duration: 0.8,
  delay: 0.2,
  ease: 'expo.out',
};

export const techstackTitleRight: GSAPAnimationConfig = {
  from: { opacity: 0, x: 50 },
  duration: 0.8,
  delay: 0.2,
  ease: 'expo.out',
};

export const techstackBand: GSAPAnimationConfig = {
  from: { opacity: 0, x: 100 },
  duration: 0.8,
  ease: 'expo.out',
};
