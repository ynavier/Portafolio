import { education } from './educationData';

const AcademicSection = () => {
  return (
    <div>
      <h3
        className="font-display font-bold"
        style={{ color: 'var(--fg)', fontSize: '1rem', letterSpacing: '0.04em', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
        Formación académica
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {education.map((item, index) => (
          <div
            key={index}
            className="ed-item"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '1.5rem',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', gap: '1rem' }}>
              <h4 className="font-display font-bold" style={{ color: 'var(--fg)', fontSize: '1rem', lineHeight: 1.3 }}>
                {item.degree}
              </h4>
              <span
                style={{
                  flexShrink: 0,
                  backgroundColor: 'var(--accent-dim)',
                  color: 'var(--accent)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '100px',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                Sept. 2026
              </span>
            </div>
            <p style={{ color: 'var(--accent)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '0.5rem' }}>
              {item.institution}
            </p>
            <p style={{ color: 'var(--fg-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicSection;
