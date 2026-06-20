import { useState } from 'react';
import { Send, Check } from 'lucide-react';

interface Props {
  emailjsLoaded: boolean;
  showNotification: (type: 'success' | 'error', message: string) => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.85rem 1rem',
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: 'var(--fg)',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s',
  fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.7rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 500,
  color: 'var(--fg-muted)',
  marginBottom: '0.5rem',
};

const ContactForm: React.FC<Props> = ({ emailjsLoaded, showNotification }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const now = new Date();
      const currentDate = now.toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota' });
      if (emailjsLoaded && window.emailjs) {
        await window.emailjs.send('service_dqt053l', 'template_tsdysoz', {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'yorielvidal@gmail.com',
          reply_to: formData.email,
          current_date: currentDate,
        });
        setIsSubmitted(true);
        showNotification('success', '¡Mensaje enviado exitosamente! Te contactaré pronto.');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => { setIsSubmitting(false); setIsSubmitted(false); }, 3000);
      } else {
        throw new Error('EmailJS no disponible');
      }
    } catch {
      setIsSubmitting(false);
      showNotification('error', 'Error al enviar. Por favor, intenta nuevamente.');
    }
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = 'var(--border-strong)');
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = 'var(--border)');

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <label style={labelStyle}>Nombre *</label>
        <input
          type="text" name="name" value={formData.name} onChange={handleChange}
          required disabled={isSubmitting || isSubmitted}
          placeholder="Tu nombre completo"
          style={{ ...inputStyle, opacity: isSubmitting || isSubmitted ? 0.5 : 1 }}
          onFocus={focusStyle} onBlur={blurStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Email *</label>
        <input
          type="email" name="email" value={formData.email} onChange={handleChange}
          required disabled={isSubmitting || isSubmitted}
          placeholder="tu@email.com"
          style={{ ...inputStyle, opacity: isSubmitting || isSubmitted ? 0.5 : 1 }}
          onFocus={focusStyle} onBlur={blurStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Mensaje *</label>
        <textarea
          name="message" value={formData.message} onChange={handleChange}
          required disabled={isSubmitting || isSubmitted}
          rows={5}
          placeholder="Cuéntame sobre tu proyecto…"
          style={{ ...inputStyle, resize: 'none', opacity: isSubmitting || isSubmitted ? 0.5 : 1 }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--border-strong)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '0.85rem 2rem',
          borderRadius: '8px',
          backgroundColor: isSubmitted ? '#1a3a1a' : 'var(--fg)',
          color: isSubmitted ? '#4acf60' : 'var(--bg)',
          border: isSubmitted ? '1px solid #4acf60' : 'none',
          fontWeight: 600,
          fontSize: '0.82rem',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          cursor: isSubmitting || isSubmitted ? 'default' : 'pointer',
          opacity: isSubmitting ? 0.7 : 1,
          transition: 'all 0.3s ease',
        }}
      >
        {isSubmitted ? (
          <><Check size={16} /> Enviado</>
        ) : (
          <><Send size={14} style={{ transform: isSubmitting ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s' }} /> Enviar mensaje</>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
