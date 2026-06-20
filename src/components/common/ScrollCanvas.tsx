import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const N = 750;

// ── Samplear superficie de geometría ──────────────────
function sample(geo: THREE.BufferGeometry, n: number): Float32Array {
  const pos = geo.attributes.position;
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * pos.count);
    out[i * 3]     = pos.getX(idx);
    out[i * 3 + 1] = pos.getY(idx);
    out[i * 3 + 2] = pos.getZ(idx);
  }
  geo.dispose();
  return out;
}

// ── Formas ─────────────────────────────────────────────
const buildShapes = () => [
  // 0 – Hélice doble (About)
  (() => {
    const out = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const t = (i / N) * Math.PI * 10 - Math.PI * 5;
      const strand = i % 2 === 0 ? 0 : Math.PI;
      out[i * 3]     = Math.cos(t + strand) * 0.8;
      out[i * 3 + 1] = t * 0.22;
      out[i * 3 + 2] = Math.sin(t + strand) * 0.8;
    }
    return out;
  })(),
  // 1 – Esfera + anillo de Saturno (Skills)
  (() => {
    const half = Math.floor(N * 0.6);
    const sph  = sample(new THREE.SphereGeometry(1.1, 64, 32), half);
    const ring = sample(new THREE.TorusGeometry(1.7, 0.05, 12, 128), N - half);
    const out  = new Float32Array(N * 3);
    out.set(sph, 0);
    out.set(ring, half * 3);
    return out;
  })(),
  // 2 – Octaedro doble (Projects)
  (() => {
    const big   = sample(new THREE.OctahedronGeometry(1.5, 3), Math.floor(N * 0.65));
    const small = sample(new THREE.OctahedronGeometry(0.7, 2), N - Math.floor(N * 0.65));
    const out   = new Float32Array(N * 3);
    out.set(big, 0);
    out.set(small, Math.floor(N * 0.65) * 3);
    return out;
  })(),
  // 3 – Torus (Education)
  sample(new THREE.TorusGeometry(1.3, 0.48, 24, 96), N),
  // 4 – Diamante (Contact)
  sample(new THREE.OctahedronGeometry(1.45, 1), N),
];

// ── Wireframes por forma ───────────────────────────────
const buildWireframes = () => {
  const blue  = (op: number) => new THREE.MeshBasicMaterial({ color: 0x4a65f5, wireframe: true, transparent: true, opacity: op });
  const white = (op: number) => new THREE.MeshBasicMaterial({ color: 0xffffff,  wireframe: true, transparent: true, opacity: op });

  return [
    // 0 – Hélice: torus knot como aproximación visual
    (() => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(new THREE.TorusKnotGeometry(0.9, 0.22, 128, 12), blue(0.4)));
      return g;
    })(),
    // 1 – Esfera + anillo
    (() => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(new THREE.SphereGeometry(1.1, 12, 8), blue(0.3)));
      g.add(new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.03, 8, 64), white(0.5)));
      return g;
    })(),
    // 2 – Octaedro doble
    (() => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(new THREE.OctahedronGeometry(1.5, 2), blue(0.45)));
      g.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.7, 1), white(0.2)));
      return g;
    })(),
    // 3 – Torus
    (() => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.48, 14, 64), blue(0.4)));
      return g;
    })(),
    // 4 – Diamante
    (() => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(new THREE.OctahedronGeometry(1.45, 0), blue(0.5)));
      g.add(new THREE.Mesh(new THREE.OctahedronGeometry(1.45, 1), white(0.1)));
      return g;
    })(),
  ];
};

// ── Secciones que disparan el morph ───────────────────
const TRIGGERS = [
  { id: '#about',     idx: 0 },
  { id: '#skills',    idx: 1 },
  { id: '#projects',  idx: 2 },
  { id: '#education', idx: 3 },
  { id: '#contact',   idx: 4 },
];

// ── Componente ─────────────────────────────────────────
const ScrollCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current!;
    const W  = el.offsetWidth;
    const H  = el.offsetHeight;

    // Escena
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Partículas
    const shapes  = buildShapes();
    const currPos = new Float32Array(shapes[0]);
    const posAttr = new THREE.BufferAttribute(currPos, 3);
    const geo     = new THREE.BufferGeometry();
    geo.setAttribute('position', posAttr);

    const ptMat = new THREE.PointsMaterial({
      color: 0xffffff, size: 0.026, transparent: true, opacity: 0.5, sizeAttenuation: true,
    });
    const points = new THREE.Points(geo, ptMat);
    scene.add(points);

    // Wireframes
    const wires = buildWireframes();
    wires.forEach((w, i) => { w.visible = i === 0; scene.add(w); });

    // Estado actual
    let currentIdx = 0;
    let morphing   = false;

    // Función de morph animado
    const morphTo = (targetIdx: number) => {
      if (targetIdx === currentIdx || morphing) return;
      morphing = true;

      const from = new Float32Array(currPos);
      const to   = shapes[targetIdx];

      // Fade out wireframe actual, fade in el siguiente
      wires[currentIdx].visible = true;
      wires[targetIdx].visible  = true;

      const wOut = (wires[currentIdx] as THREE.Group).children as THREE.Mesh[];
      const wIn  = (wires[targetIdx]  as THREE.Group).children as THREE.Mesh[];
      wOut.forEach(m => gsap.to((m.material as THREE.MeshBasicMaterial), { opacity: 0, duration: 0.6 }));
      wIn.forEach(m  => {
        const mat = m.material as THREE.MeshBasicMaterial;
        const target = mat.opacity;
        mat.opacity = 0;
        gsap.to(mat, { opacity: target, duration: 0.8, delay: 0.4 });
      });

      // Morph de partículas
      const proxy = { t: 0 };
      gsap.to(proxy, {
        t: 1,
        duration: 1.4,
        ease: 'power3.inOut',
        onUpdate() {
          const e = proxy.t;
          for (let i = 0; i < N * 3; i++) {
            currPos[i] = from[i] + (to[i] - from[i]) * e;
          }
          posAttr.needsUpdate = true;
        },
        onComplete() {
          wires[currentIdx].visible = false;
          currentIdx = targetIdx;
          morphing   = false;
        },
      });
    };

    // Scroll triggers por sección
    const timers: ReturnType<typeof setTimeout>[] = [];
    TRIGGERS.forEach(({ id, idx }) => {
      const section = document.querySelector(id);
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        onEnter:     () => morphTo(idx),
        onEnterBack: () => morphTo(idx),
      });
    });

    // Loop de render
    const clock = new THREE.Clock();
    let animId: number;
    const rotSpeeds = [
      [0.18, 0.09], [0.14, 0.07], [0.20, 0.10], [0.15, 0.08], [0.22, 0.06],
    ];

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t  = clock.getElapsedTime();
      const rs = rotSpeeds[currentIdx];
      wires.forEach((w, i) => {
        if (w.visible) {
          w.rotation.y = t * rotSpeeds[i][0];
          w.rotation.x = t * rotSpeeds[i][1];
        }
      });
      points.rotation.y = t * 0.06;
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const ro = new ResizeObserver(() => {
      const nw = el.offsetWidth, nh = el.offsetHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(animId);
      timers.forEach(clearTimeout);
      ro.disconnect();
      ScrollTrigger.getAll().forEach(s => s.kill());
      renderer.dispose();
      geo.dispose();
      ptMat.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100vh', position: 'sticky', top: 0 }}
    />
  );
};

export default ScrollCanvas;
