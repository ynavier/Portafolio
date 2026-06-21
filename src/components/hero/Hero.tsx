import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Download, ArrowDown } from 'lucide-react';
import HeroShape from './HeroShape';
import HeroParticles from './HeroParticles';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from('.h-label', { opacity: 0, y: 14, duration: 0.8, ease: 'expo.out' })
        .from('.h-line-1', { y: '105%', duration: 1, ease: 'expo.out' }, '-=0.5')
        .from('.h-line-2', { y: '105%', duration: 1, ease: 'expo.out' }, '-=0.75')
        .from('.h-sep', { scaleX: 0, duration: 0.9, ease: 'expo.out', transformOrigin: 'left' }, '-=0.4')
        .from('.h-desc', { opacity: 0, y: 18, duration: 0.8, ease: 'expo.out' }, '-=0.5')
        .from('.h-socials', { opacity: 0, y: 14, duration: 0.7, ease: 'expo.out' }, '-=0.4')
        .from('.h-actions', { opacity: 0, y: 14, duration: 0.7, ease: 'expo.out' }, '-=0.35')
        .from('.h-scroll', { opacity: 0, duration: 0.6 }, '-=0.2');

      gsap.to('.h-content', {
        y: -80,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '35% top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDownloadCV = () => {
    const a = document.createElement('a');
    a.href = 'https://drive.usercontent.google.com/download?id=19zTCdtBFLr7WgIh5rHvj8Gba0fN6tOQw&export=download&authuser=0';
    a.download = 'CV_Yoriel_Vidal.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: '100svh',
        backgroundColor: 'var(--bg)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '7rem 1.75rem 5rem',
      }}
    >
      <HeroParticles />
      <HeroShape />
      <div className="h-content" style={{ width: '100%', position: 'relative', zIndex: 1 }}>

        {/* Label row */}
        <div className="h-label" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <span className="text-label" style={{ color: 'var(--accent)' }}>Data Engineer</span>
          <span style={{ width: 28, height: 1, backgroundColor: 'var(--fg-muted)', display: 'inline-block' }} />
          <span className="text-label">Business Intelligence</span>
          <span style={{ width: 28, height: 1, backgroundColor: 'var(--fg-muted)', display: 'inline-block' }} />
          <span className="text-label">Valledupar, Colombia</span>
        </div>

        {/* Name */}
        <h1 style={{ marginBottom: 0 }}>
          <div style={{ overflow: 'hidden' }}>
            <span className="h-line-1 block font-display font-extrabold text-hero" style={{ color: 'var(--fg)' }}>
              YORIEL
            </span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span className="h-line-2 block font-display font-extrabold text-hero" style={{ color: 'var(--fg)' }}>
              CARVAJALINO
            </span>
          </div>
        </h1>

        {/* Separator — llega hasta donde termina CARVAJALINO, no hasta la esfera */}
        <div
          className="h-sep"
          style={{ width: 'min(100%, 68%)', height: 1, backgroundColor: 'var(--border-strong)', margin: '2.5rem 0 2rem' }}
        />

        {/* Bottom row */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* Description */}
          <p className="h-desc" style={{ color: 'var(--fg-muted)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '52ch' }}>
            Transformando datos en insights accionables a través de soluciones
            ETL, Data Warehousing y visualización cloud.
          </p>

          {/* Action buttons */}
          <div className="h-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              className="btn-cross-accent"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver proyectos
            </button>
            <button
              className="btn-cross"
              onClick={handleDownloadCV}
            >
              <Download size={13} strokeWidth={2} />
              Descargar CV
            </button>
          </div>

          {/* Socials row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem' }}>

            {/* Social icons */}
            <div className="h-socials" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              {[
                { href: 'https://www.linkedin.com/in/yoriel-carvajalino', Icon: Linkedin, label: 'LinkedIn' },
                { href: 'https://github.com/ynavier', Icon: Github, label: 'GitHub' },
                { href: 'mailto:yorielvidal@gmail.com', Icon: Mail, label: 'Email' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    color: 'var(--fg-muted)', fontSize: '0.78rem', letterSpacing: '0.06em',
                    textTransform: 'uppercase', fontWeight: 500,
                    transition: 'color 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-muted)')}
                >
                  <Icon size={15} strokeWidth={1.5} />
                  {label}
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="h-scroll"
        style={{
          position: 'absolute', bottom: '2rem', right: '1.75rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        }}
      >
        <span className="text-label" style={{ writingMode: 'vertical-rl', letterSpacing: '0.18em' }}>scroll</span>
        <ArrowDown size={12} strokeWidth={1.5} style={{ color: 'var(--fg-muted)' }} className="animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
