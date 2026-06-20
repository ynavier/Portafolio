import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAnimationConfig, AnimationVariant } from './animations';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
}

const AnimatedSection = ({
  children,
  className = '',
  variant = 'hero-description',
  delay = 0,
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const config = getAnimationConfig(variant);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current!, {
        ...config.from,
        duration: config.duration,
        delay: (config.delay ?? 0) + delay,
        ease: config.ease,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          end: 'bottom top',
          toggleActions: 'play reverse play reverse',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default AnimatedSection;
