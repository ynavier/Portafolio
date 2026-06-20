import { useState, useEffect, useRef } from 'react';
import { navItems } from './navItems';
import gsap from 'gsap';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);
  const hidden = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastY.current;

      setScrolled(currentY > 60);

      if (currentY < 80) {
        // Siempre visible cerca del top
        if (hidden.current) {
          gsap.to(headerRef.current, { y: 0, duration: 0.4, ease: 'expo.out' });
          hidden.current = false;
        }
      } else if (diff > 6 && !hidden.current) {
        // Scrolleando hacia abajo — ocultar
        gsap.to(headerRef.current, { y: '-110%', duration: 0.4, ease: 'expo.in' });
        hidden.current = true;
      } else if (diff < -6 && hidden.current) {
        // Scrolleando hacia arriba — mostrar
        gsap.to(headerRef.current, { y: 0, duration: 0.45, ease: 'expo.out' });
        hidden.current = false;
      }

      lastY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '1.1rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'border-color 0.4s ease',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backgroundColor: 'transparent',
      }}
    >
      {/* Logo */}
      <button
        onClick={() => scrollTo('#hero')}
        className="font-display font-bold"
        style={{ color: 'var(--fg)', fontSize: '1rem', letterSpacing: '0.06em' }}
      >
        YC
      </button>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-7">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => scrollTo(item.href)}
            className="text-label transition-colors duration-200"
            style={{ color: 'rgba(255,255,255,0.85)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
          >
            {item.name}
          </button>
        ))}
      </nav>

      {/* CTA pill */}
      <button
        onClick={() => scrollTo('#contact')}
        className="hidden md:block text-label transition-all duration-200"
        style={{
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '100px',
          padding: '0.45rem 1.1rem',
          color: 'var(--fg)',
          backgroundColor: 'transparent',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        Hablemos
      </button>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-[5px] p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menú"
      >
        <span style={{ width: 22, height: 1.5, backgroundColor: 'var(--fg)', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
        <span style={{ width: 22, height: 1.5, backgroundColor: 'var(--fg)', display: 'block', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
        <span style={{ width: 22, height: 1.5, backgroundColor: 'var(--fg)', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            backgroundColor: 'rgba(8,8,8,0.97)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border)',
            padding: '1.5rem 1.75rem',
            display: 'flex', flexDirection: 'column', gap: '1.25rem',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.href)}
              className="text-left font-display font-bold"
              style={{ color: 'var(--fg)', fontSize: '1.3rem' }}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
