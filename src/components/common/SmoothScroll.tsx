import { ReactLenis, useLenis } from 'lenis/react';
import { ReactNode, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function LenisScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);
  }, []);

  return null;
}

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
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
