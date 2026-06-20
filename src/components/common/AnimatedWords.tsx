import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedWordsProps {
  text: string;
  className?: string;
  staggerDelay?: number;
}

const AnimatedWords = ({ text, className = '', staggerDelay = 0.05 }: AnimatedWordsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    if (!containerRef.current) return;

    const wordEls = containerRef.current.querySelectorAll<HTMLSpanElement>('.word');

    const ctx = gsap.context(() => {
      gsap.from(wordEls, {
        opacity: 0,
        x: -20,
        duration: 0.5,
        ease: 'expo.out',
        stagger: staggerDelay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, index) => (
        <span key={index} className="word inline-block mr-1">
          {word}
        </span>
      ))}
    </div>
  );
};

export default AnimatedWords;
