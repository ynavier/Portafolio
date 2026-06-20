import { ExternalLink, Github } from 'lucide-react';

interface ProjectLinksProps {
  demo?: string;
  github: string;
  hasLiveDemo: boolean;
}

const linkStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.35rem',
  fontSize: '0.78rem',
  fontWeight: 500,
  letterSpacing: '0.04em',
  color: 'var(--fg-muted)',
  transition: 'color 0.2s',
  textDecoration: 'none',
};

const ProjectLinks: React.FC<ProjectLinksProps> = ({ demo, github, hasLiveDemo }) => {
  return (
    <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.75rem' }}>
      {hasLiveDemo && demo && (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-muted)')}
        >
          <ExternalLink size={13} />
          Demo
        </a>
      )}
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        style={linkStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-muted)')}
      >
        <Github size={13} />
        {hasLiveDemo ? 'Código' : 'Ver proyecto'}
      </a>
    </div>
  );
};

export default ProjectLinks;
