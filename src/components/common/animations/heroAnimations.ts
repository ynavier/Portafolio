import { GSAPAnimationConfig } from './types';

export const heroAvatar: GSAPAnimationConfig = {
  from: { opacity: 0, y: -80 },
  duration: 0.8,
  delay: 0.2,
  ease: 'back.out(1.7)',
};

export const heroTitle: GSAPAnimationConfig = {
  from: { opacity: 0 },
  duration: 0.6,
  delay: 0.2,
  ease: 'expo.out',
};

export const heroDescription: GSAPAnimationConfig = {
  from: { opacity: 0, y: 30 },
  duration: 0.6,
  delay: 0.35,
  ease: 'expo.out',
};

export const heroActions: GSAPAnimationConfig = {
  from: { opacity: 0, y: 20 },
  duration: 0.5,
  delay: 0.5,
  ease: 'expo.out',
};
