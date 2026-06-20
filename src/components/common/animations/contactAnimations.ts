import { GSAPAnimationConfig } from './types';

export const contactForm: GSAPAnimationConfig = {
  from: { opacity: 0, x: 80 },
  duration: 0.8,
  delay: 0.2,
  ease: 'expo.out',
};

export const contactInfo: GSAPAnimationConfig = {
  from: { opacity: 0, x: -80 },
  duration: 0.8,
  delay: 0.2,
  ease: 'expo.out',
};
