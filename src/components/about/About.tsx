import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const PARAGRAPHS = [
  'Soy Ingeniero de Sistemas graduado de la Universidad Popular del Cesar, con enfoque principal en el ecosistema de datos moderno y Business Intelligence.',
  'Me apasiona transformar datos en conocimiento útil — desde la ingesta y transformación hasta la visualización y análisis predictivo. He fortalecido mis competencias en programación, bases de datos, BI y herramientas cloud. Por hobbie también disfruto el desarrollo fullstack.',
  'Mi objetivo es consolidarme como Ingeniero de Datos, aportando soluciones innovadoras que impulsen la toma de decisiones estratégicas en las organizaciones.',
];

// Divide texto en spans por palabra
const WordSplit = ({ text, style }: { text: string; style?: React.CSSProperties }) => (
  <p style={style}>
    {text.split(' ').map((word, i) => (
      <span
        key={i}
        className="ab-word"
        style={{ display: 'inline-block', marginRight: '0.28em' }}
      >
        {word}
      </span>
    ))}
  </p>
);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { end: 'bottom top', toggleActions: 'play reverse play reverse' };

      // Tag y título: animación normal al entrar
      gsap.from('.ab-tag', {
        opacity: 0, y: 14, duration: 0.7, ease: 'expo.out',
        scrollTrigger: { trigger: '.ab-tag', start: 'top 88%', ...st },
      });
      gsap.from('.ab-title', {
        opacity: 0, y: 50, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: '.ab-title', start: 'top 85%', ...st },
      });

      // Palabras de los párrafos: llegan desde la derecha con scrub
      const words = sectionRef.current!.querySelectorAll<HTMLElement>('.ab-word');

      gsap.from(words, {
        x: 50,
        opacity: 0,
        stagger: 0.01,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.ab-paragraphs',
          start: 'top 95%',
          end: 'top 15%',
          scrub: 0.6,
        },
      });

      // Stats: stagger al entrar
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        paddingTop: '7rem',
        paddingBottom: '7rem',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.75rem' }}>

        {/* Label */}
        <div className="ab-tag flex items-baseline gap-3 mb-10">
          <span className="font-display font-bold" style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>01</span>
          <span className="text-label">Sobre mí</span>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '0', alignItems: 'start' }}
          className="block lg:grid"
        >
          {/* Izquierda: titular */}
          <div style={{ paddingRight: '3rem' }}>
            <h2
              className="ab-title font-display font-extrabold"
              style={{
                fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--fg)',
                marginBottom: '2.5rem',
              }}
            >
              Ingeniero de Sistemas
              <br />
              apasionado por
              <br />
              convertir datos en{' '}
              <span style={{ color: 'var(--accent)' }}>decisiones.</span>
            </h2>

          </div>

          {/* Línea divisora con margen para no tocar los bordes */}
          <div style={{
            width: 1,
            backgroundColor: 'rgba(255,255,255,0.18)',
            alignSelf: 'stretch',
            margin: '2.5rem 0',
          }} />

          {/* Derecha: párrafos con word reveal */}
          <div className="ab-paragraphs" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '0.5rem', paddingLeft: '3rem' }}>
            {PARAGRAPHS.map((text, i) => (
              <WordSplit
                key={i}
                text={text}
                style={{ color: 'var(--fg-muted)', fontSize: '1rem', lineHeight: 1.9, margin: 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
