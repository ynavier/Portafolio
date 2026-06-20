import { GSAPAnimationConfig } from './types';

export const educationTimeline: GSAPAnimationConfig = {
  from: { opacity: 0, scaleY: 0, transformOrigin: 'top' },
  duration: 1.2,
  delay: 0.2,
  ease: 'expo.out',
};

export const educationCert: GSAPAnimationConfig = {
  from: { opacity: 0, x: -30 },
  duration: 0.6,
  ease: 'expo.out',
};
