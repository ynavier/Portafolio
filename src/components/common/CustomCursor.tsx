import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Solo en dispositivos con mouse
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    let mouseX = -100, mouseY = -100;
    let ringX  = -100, ringY  = -100;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!visible) {
        gsap.set([dot, ring], { opacity: 1 });
        visible = true;
      }

      // El punto sigue al instante
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    // El círculo grande sigue con lerp
    const tick = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      gsap.set(ring, { x: ringX, y: ringY });
    };

    window.addEventListener('mousemove', onMove);
    gsap.ticker.add(tick);

    // Hover en interactivos — anima width/height para no distorsionar el borde
    const onEnterLink = () => {
      gsap.to(ring, { width: 72, height: 72, top: -36, left: -36, opacity: 0.6, duration: 0.35, ease: 'expo.out' });
      gsap.to(dot,  { opacity: 0, duration: 0.2 });
    };
    const onLeaveLink = () => {
      gsap.to(ring, { width: 40, height: 40, top: -20, left: -20, opacity: 1, duration: 0.35, ease: 'expo.out' });
      gsap.to(dot,  { opacity: 1, duration: 0.2 });
    };

    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };

    addListeners();

    // Observer para elementos que se agregan después (proyectos async)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(tick);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Círculo grande con lag */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: -20, left: -20,
          width: 40, height: 40,
          border: '1.5px solid #ffffff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      {/* Punto central */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: -3, left: -3,
          width: 6, height: 6,
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;
