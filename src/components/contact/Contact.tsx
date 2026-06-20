import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactForm from './ContactForm';
import NotificationToast from './NotificationToast';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window { emailjs: any; }
}

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [emailjsLoaded, setEmailjsLoaded] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => { window.emailjs.init('RZPeuWFNsCynZ2Zw3'); setEmailjsLoaded(true); };
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Todo atado a un único trigger — la sección entera
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom top',
          toggleActions: 'play reverse play reverse',
        },
      });

      tl.from('.ct-tag',    { opacity: 0, y: 14,      duration: 0.6, ease: 'expo.out' }, 0)
        .from('.ct-title-1',{ yPercent: 110,           duration: 0.9, ease: 'expo.out' }, 0.1)
        .from('.ct-title-2',{ yPercent: 110,           duration: 0.9, ease: 'expo.out' }, 0.18)
        .from('.ct-info',   { opacity: 0, x: -50,     duration: 0.8, ease: 'expo.out' }, 0.45)
        .from('.ct-form',   { opacity: 0, x: 50,      duration: 0.8, ease: 'expo.out' }, 0.45);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: null, message: '' }), 5000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        minHeight: '100svh',
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: '5rem 1.75rem',
        willChange: 'transform',
      }}
    >
      <NotificationToast notification={notification} />

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>

        {/* Tag */}
        <div className="ct-tag flex items-baseline gap-3 mb-10">
          <span className="font-display font-bold" style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>05</span>
          <span className="text-label">Contacto</span>
        </div>

        {/* Título — cada línea con overflow hidden para el clip de entrada */}
        <div style={{ overflow: 'hidden', marginBottom: '0.04em' }}>
          <h2 className="ct-title-1 font-display font-extrabold text-section" style={{ color: 'var(--fg)', lineHeight: 0.92 }}>
            ¿TIENES UN
          </h2>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: '4rem' }}>
          <h2 className="ct-title-2 font-display font-extrabold text-section" style={{ color: 'var(--fg)', lineHeight: 0.92 }}>
            PROYECTO?
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }} className="block lg:grid">

          {/* Info */}
          <div className="ct-info" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <p style={{ color: 'var(--fg-muted)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '40ch' }}>
              Me encantaría escuchar sobre tus desafíos de datos y BI.
              Escríbeme y trabajemos juntos.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {[
                { Icon: Mail, label: 'Email', value: 'yorielvidal@gmail.com', href: 'mailto:yorielvidal@gmail.com' },
                { Icon: Phone, label: 'Teléfono', value: '+57 (313) 641-2944', href: 'tel:+573136412944' },
                { Icon: MapPin, label: 'Ubicación', value: 'Valledupar, Colombia', href: undefined },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '9px', flexShrink: 0,
                    backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={14} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <div className="text-label" style={{ marginBottom: '0.08rem' }}>{label}</div>
                    {href ? (
                      <a href={href} style={{ color: 'var(--fg)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg)')}>
                        {value}
                      </a>
                    ) : (
                      <span style={{ color: 'var(--fg)', fontSize: '0.875rem' }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              {[
                { Icon: Linkedin, href: 'https://www.linkedin.com/in/yoriel-carvajalino' },
                { Icon: Github, href: 'https://github.com/ynavier' },
                { Icon: Mail, href: 'mailto:yorielvidal@gmail.com' },
              ].map(({ Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: 36, height: 36, borderRadius: '9px',
                    backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--fg-muted)', transition: 'all 0.2s', textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--fg)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--fg-muted)'; }}
                >
                  <Icon size={14} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="ct-form">
            <ContactForm emailjsLoaded={emailjsLoaded} showNotification={showNotification} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
