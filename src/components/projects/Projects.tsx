import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useProjects } from '../../hooks/useProjects';
import { projectDemos, manualData } from '../../config/projectsConfig';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { projects, loading } = useProjects();

  const getProjectDemo = (name: string) => projectDemos[name];
  const hasLiveDemo = (name: string) => Boolean(projectDemos[name]);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.from('.pr-tag', {
        opacity: 0, y: 14, duration: 0.7, ease: 'expo.out',
        scrollTrigger: { trigger: '.pr-tag', start: 'top 88%', end: 'bottom top', toggleActions: 'play reverse play reverse' },
      });
      gsap.from('.pr-heading', {
        clipPath: 'inset(0 100% 0 0)', duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: '.pr-heading', start: 'top 85%', end: 'bottom top', toggleActions: 'play reverse play reverse' },
      });
      gsap.utils.toArray<HTMLElement>('.pr-row').forEach((row, i) => {
        gsap.from(row, {
          opacity: 0, y: 20, duration: 0.6, delay: i * 0.07, ease: 'expo.out',
          scrollTrigger: { trigger: row, start: 'top 92%', end: 'bottom top', toggleActions: 'play reverse play reverse' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [loading]);

  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const row     = e.currentTarget;
    const fill    = row.querySelector<HTMLElement>('.pr-fill');
    const name    = row.querySelector<HTMLElement>('.pr-name');
    const tech    = row.querySelector<HTMLElement>('.pr-tech');
    const arrow   = row.querySelector<HTMLElement>('.pr-arrow');
    const details = row.querySelector<HTMLElement>('.pr-details');
    const desc    = row.querySelector<HTMLElement>('.pr-desc');
    const tags    = row.querySelectorAll<HTMLElement>('.pr-tag');

    gsap.killTweensOf([fill, name, tech, arrow, details, desc, ...Array.from(tags)].filter(Boolean));

    // Relleno vertical
    gsap.to(fill,  { scaleY: 1, transformOrigin: 'top center', duration: 0.4, ease: 'power3.inOut' });
    // Colores
    gsap.to(name,  { color: 'var(--bg)', duration: 0.18, delay: 0.12 });
    gsap.to(tech,  { color: 'var(--bg)', duration: 0.18, delay: 0.12 });
    gsap.to(arrow, { rotation: 45, color: 'var(--bg)', duration: 0.25 });
    // Expandir detalles
    if (details) {
      gsap.to(details, { maxHeight: details.scrollHeight + 20, opacity: 1, duration: 0.35, ease: 'expo.out', delay: 0.08 });
    }
    if (desc) gsap.to(desc, { color: 'rgba(8,8,8,0.65)', duration: 0.18, delay: 0.2 });
    tags.forEach(t => gsap.to(t, { backgroundColor: 'rgba(8,8,8,0.12)', color: 'rgba(8,8,8,0.7)', duration: 0.18, delay: 0.2 }));
  };

  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const row     = e.currentTarget;
    const fill    = row.querySelector<HTMLElement>('.pr-fill');
    const name    = row.querySelector<HTMLElement>('.pr-name');
    const tech    = row.querySelector<HTMLElement>('.pr-tech');
    const arrow   = row.querySelector<HTMLElement>('.pr-arrow');
    const details = row.querySelector<HTMLElement>('.pr-details');
    const desc    = row.querySelector<HTMLElement>('.pr-desc');
    const tags    = row.querySelectorAll<HTMLElement>('.pr-tag');

    gsap.killTweensOf([fill, name, tech, arrow, details, desc, ...Array.from(tags)].filter(Boolean));

    gsap.to(fill,  { scaleY: 0, transformOrigin: 'bottom center', duration: 0.35, ease: 'power3.inOut' });
    gsap.to(name,  { color: 'var(--fg)', duration: 0.15 });
    gsap.to(tech,  { color: 'var(--fg)', duration: 0.15 });
    gsap.to(arrow, { rotation: 0, color: 'var(--fg-muted)', duration: 0.2 });
    if (details) gsap.to(details, { maxHeight: 0, opacity: 0, duration: 0.25, ease: 'expo.in' });
    if (desc) gsap.to(desc, { color: 'var(--fg-muted)', duration: 0.15 });
    tags.forEach(t => gsap.to(t, { backgroundColor: 'var(--fg-subtle)', color: 'var(--fg-muted)', duration: 0.15 }));
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--border)', paddingTop: '7rem', paddingBottom: '7rem' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.75rem' }}>

        <div className="pr-tag flex items-baseline gap-3 mb-10">
          <span className="font-display font-bold" style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>03</span>
          <span className="text-label">Proyectos</span>
        </div>

        <h2 className="pr-heading font-display font-extrabold text-section"
          style={{ color: 'var(--fg)', lineHeight: 0.92, marginBottom: '3.5rem', clipPath: 'inset(0 0% 0 0)' }}>
          TRABAJO SELECTO
        </h2>

        {loading ? (
          <p style={{ color: 'var(--fg-muted)' }}>Cargando proyectos…</p>
        ) : (
          <div>
            <div style={{ borderTop: '1px solid var(--border)' }} />

            {projects.map((project) => {
              const title   = manualData[project.name]?.title || project.name;
              const demo    = getProjectDemo(project.name);
              const live    = hasLiveDemo(project.name);
              const href    = live && demo ? demo : project.html_url;
              const techs   = project.technologies || [project.language].filter(Boolean);
              const mainTech = techs[0] || 'Web';

              return (
                <a
                  key={project.id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pr-row"
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1.4rem 1rem',
                    margin: '0 -1rem',
                    borderBottom: '1px solid var(--border)',
                    textDecoration: 'none',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  {/* Relleno vertical animado */}
                  <div
                    className="pr-fill"
                    style={{
                      position: 'absolute', inset: 0,
                      backgroundColor: 'var(--fg)',
                      transform: 'scaleY(0)',
                      transformOrigin: 'top center',
                      zIndex: 0,
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Fila principal: título + tech + arrow */}
                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                    <h3
                      className="pr-name font-display"
                      style={{
                        fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
                        fontWeight: 600,
                        color: 'var(--fg)',
                        letterSpacing: '-0.01em',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {title}
                    </h3>
                    {live && (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0,
                        fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: '#4acf60',
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#4acf60', display: 'inline-block' }} />
                        LIVE
                      </span>
                    )}
                  </div>

                  {/* Derecha: tech + flecha */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexShrink: 0 }}>
                    <span
                      className="pr-tech font-display font-extrabold hidden md:block"
                      style={{ color: 'var(--fg)', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', letterSpacing: '-0.01em' }}
                    >
                      {mainTech}
                    </span>
                    <div
                      className="pr-arrow"
                      style={{
                        width: 34, height: 34, borderRadius: '8px',
                        border: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--fg-muted)', flexShrink: 0,
                      }}
                    >
                      <ArrowUpRight size={15} strokeWidth={1.5} />
                    </div>
                  </div>
                  </div>{/* /fila principal */}

                  {/* Detalles expandibles en hover */}
                  <div
                    className="pr-details"
                    style={{
                      position: 'relative', zIndex: 1,
                      maxHeight: 0, overflow: 'hidden', opacity: 0,
                    }}
                  >
                    <div style={{ paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <p
                        className="pr-desc"
                        style={{ color: 'var(--fg-muted)', fontSize: '0.875rem', lineHeight: 1.65, maxWidth: '72ch' }}
                      >
                        {project.description}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {techs.slice(0, 5).map((t) => (
                          <span
                            key={t}
                            className="pr-tag"
                            style={{
                              fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.04em',
                              padding: '0.2rem 0.6rem', borderRadius: '4px',
                              backgroundColor: 'var(--fg-subtle)',
                              color: 'var(--fg-muted)',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
