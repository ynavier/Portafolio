export type AnimationVariant =
  // Hero
  | 'hero-avatar'
  | 'hero-title'
  | 'hero-description'
  | 'hero-actions'
  // About
  | 'about-text-word'
  | 'about-image'
  // Tech Stack
  | 'techstack-title-left'
  | 'techstack-title-right'
  | 'techstack-band'
  // Projects
  | 'project-card-left'
  | 'project-card-right'
  // Education
  | 'education-timeline'
  | 'education-cert'
  // Contact
  | 'contact-form'
  | 'contact-info';

export interface GSAPAnimationConfig {
  from: Record<string, any>;
  duration: number;
  delay?: number;
  ease: string;
}
