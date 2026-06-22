import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AcademicSection from './AcademicSection';
import { certifications } from './educationData';
import HeroParticles from '../hero/HeroParticles';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { end: 'bottom top', toggleActions: 'play reverse play reverse' };

      gsap.from('.ed-tag',        { opacity: 0, y: 14,  duration: 0.7, ease: 'expo.out', scrollTrigger: { trigger: '.ed-tag',        start: 'top 88%', ...st } });
      gsap.from('.ed-title-left', { x: -80, opacity: 0, duration: 1,   ease: 'expo.out', scrollTrigger: { trigger: '.ed-title-left', start: 'top 85%', ...st } });
      gsap.from('.ed-title-right',{ x: 80,  opacity: 0, duration: 1,   ease: 'expo.out', scrollTrigger: { trigger: '.ed-title-right',start: 'top 85%', ...st } });
      gsap.from('.ed-academic',   { opacity: 0, y: 40,  duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: '.ed-academic',   start: 'top 82%', ...st } });

      // Cada item de la línea de tiempo entra desde su lado
      gsap.utils.toArray<HTMLElement>('.ed-tl-item').forEach((item, i) => {
        const fromLeft = i % 2 === 0;
        gsap.from(item, {
          opacity: 0,
          x: fromLeft ? -50 : 50,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: { trigger: item, start: 'top 88%', ...st },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--border)', paddingTop: '7rem', paddingBottom: '7rem', position: 'relative' }}
    >
      <HeroParticles />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.75rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="ed-tag flex items-baseline gap-3 mb-10">
          <span className="font-display font-bold" style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>04</span>
          <span className="text-label">Formación</span>
        </div>

        <div style={{ marginBottom: '4rem' }}>
          <h2 className="ed-title-left font-display font-extrabold text-section" style={{ color: 'var(--fg)', lineHeight: 0.95 }}>EDUCACIÓN</h2>
          <h2 className="ed-title-right font-display font-extrabold text-section" style={{ color: 'var(--fg)', lineHeight: 0.95 }}>&amp; CERTIFICACIONES</h2>
        </div>

        {/* Formación académica */}
        <div className="ed-academic" style={{ marginBottom: '5rem' }}>
          <AcademicSection />
        </div>

        {/* Separador de sección */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <span className="text-label">Certificaciones</span>
          <div style={{ flex: 1, height: 1, backgroundColor: 'var(--border)' }} />
          <span className="text-label" style={{ color: 'var(--accent)' }}>{certifications.length}</span>
        </div>

        {/* Línea de tiempo vertical */}
        <div style={{ position: 'relative' }}>

          {/* Línea central — solo desktop */}
          <div className="ed-center-line" style={{
            position: 'absolute',
            left: '50%',
            top: 0, bottom: 0,
            width: 1,
            backgroundColor: 'var(--border)',
            transform: 'translateX(-50%)',
          }} />

          {certifications.map((cert, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div key={i} className="ed-tl-item" style={{ marginBottom: '2.5rem', position: 'relative' }}>

                {/* ── MOBILE: tarjeta simple ── */}
                <div className="ed-tl-card">
                  <p style={{ color: 'var(--fg-muted)', fontSize: '0.7rem', letterSpacing: '0.06em' }}>{cert.date} · <span style={{ color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cert.issuer}</span></p>
                  <h4 className="font-display font-bold" style={{ color: 'var(--fg)', fontSize: '0.9rem', lineHeight: 1.3, margin: '0.3rem 0 0.25rem' }}>{cert.name}</h4>
                  <p style={{ color: 'var(--fg-muted)', fontSize: '0.78rem', lineHeight: 1.6, margin: 0 }}>{cert.description}</p>
                </div>

                {/* ── DESKTOP: zigzag de 2 columnas ── */}
                <div
                  className="ed-tl-desktop"
                  style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center', minHeight: '100px', position: 'relative' }}
                >
                  {/* Dot central */}
                  <div className="ed-center-dot" style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 8, height: 8, borderRadius: '50%',
                    backgroundColor: 'var(--accent)',
                    boxShadow: '0 0 0 3px var(--bg), 0 0 0 4px var(--border-strong)',
                    zIndex: 1,
                  }} />

                  {/* Columna izquierda */}
                  <div style={{ textAlign: isLeft ? 'right' : 'left', paddingRight: isLeft ? '2rem' : 0, paddingLeft: isLeft ? 0 : '2rem' }}>
                    {isLeft ? (
                      <div>
                        <p style={{ color: 'var(--fg-muted)', fontSize: '0.75rem', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>{cert.date}</p>
                        <p style={{ color: 'var(--accent)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{cert.issuer}</p>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-display font-bold" style={{ color: 'var(--fg)', fontSize: '0.95rem', lineHeight: 1.3, marginBottom: '0.4rem' }}>{cert.name}</h4>
                        <p className="line-clamp-2" style={{ color: 'var(--fg-muted)', fontSize: '0.8rem', lineHeight: 1.6 }}>{cert.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Columna derecha */}
                  <div style={{ textAlign: 'left', paddingLeft: '2rem' }}>
                    {isLeft ? (
                      <div>
                        <h4 className="font-display font-bold" style={{ color: 'var(--fg)', fontSize: '0.95rem', lineHeight: 1.3, marginBottom: '0.4rem' }}>{cert.name}</h4>
                        <p className="line-clamp-2" style={{ color: 'var(--fg-muted)', fontSize: '0.8rem', lineHeight: 1.6 }}>{cert.description}</p>
                      </div>
                    ) : (
                      <div>
                        <p style={{ color: 'var(--fg-muted)', fontSize: '0.75rem', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>{cert.date}</p>
                        <p style={{ color: 'var(--accent)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{cert.issuer}</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
