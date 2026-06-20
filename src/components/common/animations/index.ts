import { AnimationVariant, GSAPAnimationConfig } from './types';
import * as heroAnimations from './heroAnimations';
import * as aboutAnimations from './aboutAnimations';
import * as techstackAnimations from './techstackAnimations';
import * as projectsAnimations from './projectsAnimations';
import * as educationAnimations from './educationAnimations';
import * as contactAnimations from './contactAnimations';

const animationMap: Record<AnimationVariant, GSAPAnimationConfig> = {
  // Hero
  'hero-avatar': heroAnimations.heroAvatar,
  'hero-title': heroAnimations.heroTitle,
  'hero-description': heroAnimations.heroDescription,
  'hero-actions': heroAnimations.heroActions,
  // About
  'about-text-word': aboutAnimations.aboutTextWord,
  'about-image': aboutAnimations.aboutImage,
  // Tech Stack
  'techstack-title-left': techstackAnimations.techstackTitleLeft,
  'techstack-title-right': techstackAnimations.techstackTitleRight,
  'techstack-band': techstackAnimations.techstackBand,
  // Projects
  'project-card-left': projectsAnimations.projectCardLeft,
  'project-card-right': projectsAnimations.projectCardRight,
  // Education
  'education-timeline': educationAnimations.educationTimeline,
  'education-cert': educationAnimations.educationCert,
  // Contact
  'contact-form': contactAnimations.contactForm,
  'contact-info': contactAnimations.contactInfo,
};

export const getAnimationConfig = (variant: AnimationVariant): GSAPAnimationConfig => {
  return animationMap[variant];
};

export type { AnimationVariant, GSAPAnimationConfig };
