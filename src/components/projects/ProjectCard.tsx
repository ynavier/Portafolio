import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { ProjectProps } from '../../types/project';

const ProjectCard: React.FC<ProjectProps & { index?: number }> = ({
  title,
  description,
  technologies,
  demo,
  github,
  category,
  hasLiveDemo,
  index = 0,
}) => {
  const primaryHref = hasLiveDemo && demo ? demo : github;
  const isPrimary = hasLiveDemo && demo;

  return (
    <article
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        transition: 'border-color 0.25s ease, background-color 0.25s ease',
        cursor: 'default',
        height: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-strong)';
        e.currentTarget.style.backgroundColor = '#141414';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.backgroundColor = 'var(--bg-card)';
      }}
    >
      {/* Top row: number + category + link */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            className="font-display font-bold"
            style={{ color: 'var(--fg-subtle)', fontSize: '0.75rem', letterSpacing: '0.04em', userSelect: 'none' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            style={{
              fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--accent)',
              backgroundColor: 'var(--accent-dim)', padding: '0.2rem 0.55rem',
              borderRadius: '4px',
            }}
          >
            {category}
          </span>
          {hasLiveDemo && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#4acf60', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: '0.65rem', color: '#4acf60', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Live</span>
            </span>
          )}
        </div>
        <a
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: 32, height: 32, borderRadius: '8px',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--fg-muted)',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-strong)';
            e.currentTarget.style.color = 'var(--fg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--fg-muted)';
          }}
        >
          {isPrimary ? <ExternalLink size={13} strokeWidth={1.5} /> : <ArrowUpRight size={14} strokeWidth={1.5} />}
        </a>
      </div>

      {/* Title */}
      <h3
        className="font-display font-bold"
        style={{
          fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)',
          lineHeight: 1.25,
          color: 'var(--fg)',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="line-clamp-3"
        style={{ color: 'var(--fg-muted)', fontSize: '0.875rem', lineHeight: 1.7, flex: 1 }}
      >
        {description}
      </p>

      {/* Footer: tags + github link */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              style={{
                padding: '0.18rem 0.55rem',
                backgroundColor: 'var(--fg-subtle)',
                color: 'var(--fg-muted)',
                borderRadius: '4px',
                fontSize: '0.68rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
              }}
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span style={{ padding: '0.18rem 0.55rem', color: 'var(--fg-muted)', fontSize: '0.68rem' }}>
              +{technologies.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {isPrimary && (
            <a href={demo} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 500, color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.03em' }}>
              <ExternalLink size={12} /> Demo
            </a>
          )}
          <a href={github} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 500, color: 'var(--fg-muted)', textDecoration: 'none', letterSpacing: '0.03em', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-muted)')}>
            <Github size={12} /> Código
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
