import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SolarSystem from './SolarSystem';

gsap.registerPlugin(ScrollTrigger);

const TECHS = [
  { name: 'Python',        color: '#3776ab', level: 85 },
  { name: 'PostgreSQL',    color: '#336791', level: 82 },
  { name: 'Power BI',      color: '#f2c811', level: 76 },
  { name: 'Google Cloud',  color: '#4285f4', level: 65 },
  { name: 'Apache Spark',  color: '#e25a1c', level: 60 },
  { name: 'MongoDB',       color: '#47a248', level: 68 },
  { name: 'Docker',        color: '#2496ed', level: 65 },
];

const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { end: 'bottom top', toggleActions: 'play reverse play reverse' };

      gsap.from('.ts-tag', {
        opacity: 0, x: 20, duration: 0.7, ease: 'expo.out',
        scrollTrigger: { trigger: '.ts-tag', start: 'top 88%', ...st },
      });
      gsap.from('.ts-title-1', {
        x: 60, opacity: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: '.ts-title-1', start: 'top 85%', ...st },
      });
      gsap.from('.ts-title-2', {
        x: 60, opacity: 0, duration: 1, delay: 0.08, ease: 'expo.out',
        scrollTrigger: { trigger: '.ts-title-2', start: 'top 85%', ...st },
      });
      gsap.from('.ts-sub', {
        opacity: 0, x: 20, duration: 0.8, delay: 0.15, ease: 'expo.out',
        scrollTrigger: { trigger: '.ts-sub', start: 'top 88%', ...st },
      });

      // Barras de progreso: animan de derecha a izquierda
      TECHS.forEach((t, i) => {
        gsap.fromTo(`.ts-bar-${i}`,
          { width: '0%' },
          {
            width: `${t.level}%`,
            duration: 1.2,
            delay: i * 0.08,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.ts-bars', start: 'top 85%', ...st },
          }
        );
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
        height: '100svh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Canvas full-width como fondo de espacio — oculto en mobile */}
      <div className="ts-solar" style={{ position: 'absolute', inset: 0 }}>
        <SolarSystem />
      </div>

      {/* Overlay: título + barras flotando en el espacio */}
      <div className="ts-overlay" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Tag */}
        <div className="ts-tag" style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <span className="text-label">Stack tecnológico</span>
          <span className="font-display font-bold" style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>02</span>
        </div>

        {/* Título alineado a la derecha */}
        <h2
          className="ts-title-1 font-display font-extrabold"
          style={{ color: 'var(--fg)', lineHeight: 0.92, textAlign: 'right', marginBottom: '0.06em',
            fontSize: 'clamp(1.5rem, 7vw, 4.5rem)', letterSpacing: '-0.025em' }}
        >
          STACK
        </h2>
        <h2
          className="ts-title-2 font-display font-extrabold"
          style={{ color: 'var(--fg)', lineHeight: 0.92, textAlign: 'right', marginBottom: '2rem',
            fontSize: 'clamp(1.5rem, 7vw, 4.5rem)', letterSpacing: '-0.025em' }}
        >
          TECNOLÓGICO
        </h2>

        <p className="ts-sub" style={{
          color: 'var(--fg-muted)', fontSize: '0.85rem', lineHeight: 1.7,
          textAlign: 'right', maxWidth: '28ch', marginBottom: '2rem',
        }}>
          Pasa el cursor sobre los planetas para ver cada tecnología.
        </p>

        {/* Barras de destreza */}
        <div className="ts-bars" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TECHS.map((t, i) => (
            <div key={t.name}>
              <div className="ts-bar-label" style={{ display: 'flex', alignItems: 'baseline', marginBottom: '5px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 500, color: 'var(--fg)', letterSpacing: '0.04em' }}>
                  {t.name}
                </span>
              </div>
              {/* Track */}
              <div className="ts-bar-track" style={{ height: 1.5, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden', position: 'relative', maxWidth: 140 }}>
                <div
                  className={`ts-bar-${i}`}
                  style={{
                    position: 'absolute',
                    right: 0, top: 0, bottom: 0,
                    width: '0%',
                    backgroundColor: t.color,
                    borderRadius: 2,
                    boxShadow: `0 0 6px ${t.color}88`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
