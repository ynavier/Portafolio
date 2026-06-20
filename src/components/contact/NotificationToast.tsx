import { CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  notification: { type: 'success' | 'error' | null; message: string };
}

const NotificationToast: React.FC<Props> = ({ notification }) => {
  if (!notification.type) return null;

  const isSuccess = notification.type === 'success';

  return (
    <div
      style={{
        position: 'fixed', top: '1.25rem', right: '1.25rem', zIndex: 200,
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        padding: '0.75rem 1.25rem',
        backgroundColor: 'var(--bg-card)',
        border: `1px solid ${isSuccess ? 'rgba(74,207,96,0.3)' : 'rgba(239,68,68,0.3)'}`,
        borderRadius: '10px',
        color: isSuccess ? '#4acf60' : '#ef4444',
        fontSize: '0.875rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {isSuccess ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      <span style={{ color: 'var(--fg)' }}>{notification.message}</span>
    </div>
  );
};

export default NotificationToast;
