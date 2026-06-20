import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { technologies } from './Data';
import { TechBand } from './TechBand';
import './animations.css';

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const band1 = [
    ...technologies['Lenguajes'],
    ...technologies['Databases'],
    ...technologies['Cloud Platforms'],
  ];
  const band2 = [
    ...technologies['Big Data & Streaming'],
    ...technologies['Microsoft Stack'],
    ...technologies['BI & Visualization'],
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Tag fade in
      gsap.from('.ts-tag', {
        opacity: 0, y: 14, duration: 0.7, ease: 'expo.out',
        scrollTrigger: { trigger: '.ts-tag', start: 'top 88%', end: 'bottom top', toggleActions: 'play reverse play reverse' },
      });

      gsap.from('.ts-title-block', {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: '.ts-title-block', start: 'top 85%', end: 'bottom top', toggleActions: 'play reverse play reverse' },
      });

      gsap.from('.ts-sub', {
        opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: '.ts-sub', start: 'top 88%', end: 'bottom top', toggleActions: 'play reverse play reverse' },
      });

      // Bands: parallax scrub — band1 va hacia la izquierda, band2 hacia la derecha
      gsap.to('.ts-band-wrap-1', {
        x: -60, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom', end: 'bottom top',
          scrub: true,
        },
      });
      gsap.to('.ts-band-wrap-2', {
        x: 60, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom', end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        paddingTop: '7rem',
        paddingBottom: '7rem',
        overflow: 'hidden',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-[1.75rem] mb-16">
        <div className="ts-tag flex items-baseline gap-3 mb-8">
          <span className="font-display font-bold" style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>02</span>
          <span className="text-label">Stack tecnológico</span>
        </div>

        <div className="ts-title-block" style={{ clipPath: 'inset(0 0 0% 0)' }}>
          <h2 className="font-display font-extrabold text-section" style={{ color: 'var(--fg)', lineHeight: 0.92 }}>
            HERRAMIENTAS
            <br />
            &amp; TECNOLOGÍAS
          </h2>
        </div>

        <p className="ts-sub mt-8" style={{ color: 'var(--fg-muted)', fontSize: '1.05rem', maxWidth: '50ch', lineHeight: 1.7 }}>
          Tecnologías y herramientas con las que trabajo para crear soluciones
          de datos robustas y escalables.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div className="ts-band-wrap-1">
          <TechBand techs={band1} direction="left" speed="medium" />
        </div>
        <div className="ts-band-wrap-2">
          <TechBand techs={band2} direction="right" speed="medium" />
        </div>
      </div>
    </section>
  );
};

export default TechStack;
