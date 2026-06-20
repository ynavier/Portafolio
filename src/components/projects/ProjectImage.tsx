import React from 'react';

interface ProjectImageProps {
  image: string;
  title: string;
  category: string;
  Icon: React.ElementType;
  hasLiveDemo?: boolean;
}

const ProjectImage: React.FC<ProjectImageProps> = ({ image, title, hasLiveDemo = false }) => {
  return (
    <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
      <img
        src={image}
        alt={title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      />
      {hasLiveDemo && (
        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              backgroundColor: 'rgba(8,8,8,0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(74,207,96,0.3)',
              color: '#4acf60',
              padding: '0.25rem 0.6rem',
              borderRadius: '100px',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#4acf60', animation: 'pulse 2s infinite', display: 'inline-block' }} />
            Live
          </span>
        </div>
      )}
    </div>
  );
};

export default ProjectImage;
