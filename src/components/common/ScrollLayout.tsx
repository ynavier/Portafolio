import { ReactNode } from 'react';
import ScrollCanvas from './ScrollCanvas';

const ScrollLayout = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', backgroundColor: 'var(--bg)' }}>
    {/* Contenido izquierdo — scrollea normalmente */}
    <div style={{ width: '58%', flexShrink: 0, minWidth: 0 }}>
      {children}
    </div>

    {/* Panel derecho — Three.js sticky */}
    <div style={{ width: '42%', flexShrink: 0 }}>
      <ScrollCanvas />
    </div>
  </div>
);

export default ScrollLayout;
