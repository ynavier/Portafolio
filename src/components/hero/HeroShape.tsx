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

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.background = 'transparent';
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const icoMat = new THREE.MeshBasicMaterial({ color: 0x4a65f5, wireframe: true, transparent: true, opacity: 0.6 });
    group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1, 1), icoMat));

    const outerMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.07 });
    group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 1), outerMat));

    const ptMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.03, transparent: true, opacity: 0.5 });
    const pts   = new THREE.Points(new THREE.IcosahedronGeometry(1.55, 3), ptMat);
    group.add(pts);

    // Mouse reactivity
    const mouse  = { x: 0, y: 0 };
    const lerped = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x =  (e.clientX / window.innerWidth  - 0.5);
      mouse.y = -(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMouseMove);

    const clock = new THREE.Clock();
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      lerped.x += (mouse.x - lerped.x) * 0.04;
      lerped.y += (mouse.y - lerped.y) * 0.04;
      group.rotation.y = t * 0.22 + lerped.x * 0.8;
      group.rotation.x = t * 0.10 + lerped.y * 0.6;
      pts.rotation.y   = -t * 0.14;
      renderer.render(scene, camera);
    };
    animate();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: '60% top', scrub: 1 } });
      tl.to(group.position, { z: -2, duration: 1 }, 0)
        .to(icoMat,          { opacity: 0, duration: 1 }, 0)
        .to(ptMat,           { opacity: 0, duration: 0.8 }, 0)
        .to(outerMat,        { opacity: 0, duration: 0.8 }, 0)
        .to(group.scale,     { x: 0.6, y: 0.6, z: 0.6, duration: 1 }, 0);
    });

    const onResize = () => {
      const nw = container.offsetWidth, nh = container.offsetHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      ctx.revert();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="hidden lg:block"
      style={{
        position: 'absolute',
        right: '1vw',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(300px, 33vw, 480px)',
        height: 'clamp(300px, 33vw, 480px)',
        pointerEvents: 'none',
        zIndex: 0,
        background: 'transparent',
      }}
    />
  );
};

export default HeroShape;
