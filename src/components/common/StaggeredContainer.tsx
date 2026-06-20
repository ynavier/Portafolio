import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

const StaggeredContainer = ({
  children,
  className = '',
  staggerDelay = 0.15,
}: StaggeredContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const items = ref.current.querySelectorAll<HTMLElement>('.stagger-item');

    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.7,
        ease: 'expo.out',
        stagger: staggerDelay,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
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

export const StaggeredItem = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`stagger-item ${className}`}>{children}</div>
);

export default StaggeredContainer;
