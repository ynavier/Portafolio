import { useRef } from 'react';
import { certifications } from './educationData';

interface CertificationsProps {
  lineRef?: React.RefObject<HTMLDivElement>;
}

const Certifications = ({ lineRef }: CertificationsProps) => {
  return (
    <div>
      <h3
        className="font-display font-bold"
        style={{ color: 'var(--fg)', fontSize: '1rem', letterSpacing: '0.04em', marginBottom: '2rem' }}
      >
        Certificaciones
      </h3>

      <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
        {/* Línea base (siempre visible, tenue) */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 1, backgroundColor: 'var(--border)',
        }} />
        {/* Línea animada con scrub */}
        <div
          ref={lineRef}
          style={{
            position: 'absolute', left: 0, top: 0,
            width: 1, height: '100%',
            backgroundColor: 'var(--accent)',
            transformOrigin: 'top',
            scaleY: 0,
            opacity: 0.7,
          }}
        />

        {certifications.map((cert, index) => (
          <div
            key={index}
            className="ed-cert-item"
            style={{ marginBottom: index < certifications.length - 1 ? '2.5rem' : 0, position: 'relative' }}
          >
            {/* Dot */}
            <div style={{
              position: 'absolute', left: '-1.9rem', top: '0.3rem',
              width: '1.1rem', height: '1.1rem', borderRadius: '50%',
              backgroundColor: 'var(--bg)',
              border: '1px solid var(--border-strong)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <cert.icon style={{ width: 9, height: 9, color: 'var(--accent)' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem', gap: '1rem' }}>
              <h4 className="font-display font-bold" style={{ color: 'var(--fg)', fontSize: '0.92rem', lineHeight: 1.3 }}>
                {cert.name}
              </h4>
              <time style={{ color: 'var(--fg-muted)', fontSize: '0.68rem', flexShrink: 0, letterSpacing: '0.04em' }}>
                {cert.date}
              </time>
            </div>
            <p style={{ color: 'var(--accent)', fontSize: '0.76rem', fontWeight: 500, marginBottom: '0.35rem' }}>
              {cert.issuer}
            </p>
            <p style={{ color: 'var(--fg-muted)', fontSize: '0.83rem', lineHeight: 1.65 }}>
              {cert.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
