import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.4,
        syncTouch: false,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;