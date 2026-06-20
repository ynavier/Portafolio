import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionDividerProps {
  fromColor?: string;
  toColor?: string;
}

const SectionDivider = ({
  fromColor = 'from-transparent',
  toColor = 'to-transparent',
}: SectionDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current!, {
        opacity: 0,
        duration: 1,
        ease: 'none',
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
    <div
      ref={ref}
      className={`h-32 bg-gradient-to-b ${fromColor} ${toColor} pointer-events-none`}
    />
  );
};

export default SectionDivider;
