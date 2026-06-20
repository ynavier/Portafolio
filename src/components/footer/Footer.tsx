import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        padding: '2.5rem 1.75rem',
      }}
    >
      <div
        className="max-w-[1400px] mx-auto"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}
      >
        <span className="font-display font-bold" style={{ color: 'var(--fg)', fontSize: '0.95rem', letterSpacing: '0.06em' }}>
          YC
        </span>

        <p className="text-label" style={{ textAlign: 'center' }}>
          © {new Date().getFullYear()} Yoriel Carvajalino — Ingeniero de Datos
        </p>

        <button
          onClick={scrollTop}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            color: 'var(--fg-muted)', fontSize: '0.7rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', fontWeight: 500,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-muted)')}
        >
          <ArrowUp size={13} strokeWidth={1.5} />
          Inicio
        </button>
      </div>
    </footer>
  );
};

export default Footer;
