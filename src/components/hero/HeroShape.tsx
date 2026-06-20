import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroShape = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current!;
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    // ── Escena ──────────────────────────────────────────
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Icosaedro wireframe (acento azul) ───────────────
    const icoGeo = new THREE.IcosahedronGeometry(1, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x4a65f5,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    // ── Esfera de puntos exterior (blanco) ──────────────
    const ptGeo  = new THREE.IcosahedronGeometry(1.55, 3);
    const ptMat  = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.018,
      transparent: true,
      opacity: 0.25,
    });
    const points = new THREE.Points(ptGeo, ptMat);
    scene.add(points);

    // ── Icosaedro exterior sutil ────────────────────────
    const outerGeo = new THREE.IcosahedronGeometry(1.55, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const outer = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outer);

    // ── Animación continua ──────────────────────────────
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      ico.rotation.y    =  t * 0.22;
      ico.rotation.x    =  t * 0.10;
      points.rotation.y = -t * 0.14;
      points.rotation.z =  t * 0.06;
      outer.rotation.y  =  t * 0.08;
      outer.rotation.x  = -t * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    // ── Scroll: la forma se aleja y desvanece ───────────
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: '60% top',
          scrub: 1,
        },
      });

      tl.to(ico.position,    { z: -2,  duration: 1 }, 0)
        .to(icoMat,          { opacity: 0, duration: 1 }, 0)
        .to(ptMat,           { opacity: 0, duration: 0.8 }, 0)
        .to(outerMat,        { opacity: 0, duration: 0.8 }, 0)
        .to(ico.scale,       { x: 0.6, y: 0.6, z: 0.6, duration: 1 }, 0);
    });

    // ── Resize ──────────────────────────────────────────
    const onResize = () => {
      const nw = container.offsetWidth;
      const nh = container.offsetHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      ctx.revert();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="hidden lg:block"
      style={{
        position: 'absolute',
        right: '3vw',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(320px, 34vw, 520px)',
        height: 'clamp(320px, 34vw, 520px)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default HeroShape;
