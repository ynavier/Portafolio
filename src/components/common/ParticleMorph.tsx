import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const N = 700;

// ── Samplear puntos de la superficie de una geometría ─
function sampleSurface(geo: THREE.BufferGeometry, n: number): Float32Array {
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

// ── Formas elaboradas ──────────────────────────────────

// 1. Icosaedro (hero)
const ptIco  = () => sampleSurface(new THREE.IcosahedronGeometry(1.7, 4), N);

// 2. Nudo toroidal (about)
const ptKnot = () => sampleSurface(new THREE.TorusKnotGeometry(1.1, 0.28, 256, 24), N);

// 3. Esfera con anillo (skills)
const ptRing = () => {
  const out = new Float32Array(N * 3);
  const half = Math.floor(N * 0.55);
  const sph = sampleSurface(new THREE.SphereGeometry(1.2, 32, 16), half);
  const ring = sampleSurface(new THREE.TorusGeometry(1.85, 0.06, 12, 128), N - half);
  out.set(sph, 0);
  out.set(ring, half * 3);
  return out;
};

// 4. Octaedro doble (projects)
const ptOcta = () => {
  const out = new Float32Array(N * 3);
  const outer = sampleSurface(new THREE.OctahedronGeometry(1.6, 3), Math.floor(N * 0.65));
  const inner = sampleSurface(new THREE.OctahedronGeometry(0.8, 2), N - Math.floor(N * 0.65));
  out.set(outer, 0);
  out.set(inner, Math.floor(N * 0.65) * 3);
  return out;
};

// 5. Torus (education)
const ptTorus = () => sampleSurface(new THREE.TorusGeometry(1.35, 0.5, 24, 96), N);

// 6. Diamante (contact) — dos conos opuestos
const ptDiamond = () => {
  const out = new Float32Array(N * 3);
  const top = sampleSurface(new THREE.ConeGeometry(1.2, 1.6, 8, 4, false), Math.floor(N / 2));
  const geo2 = new THREE.ConeGeometry(1.2, 1.2, 8, 3, false);
  const pos2 = geo2.attributes.position;
  for (let i = 0; i < pos2.count; i++) pos2.setY(i, -pos2.getY(i) - 0.5);
  geo2.computeVertexNormals();
  const bot = sampleSurface(geo2, N - Math.floor(N / 2));
  out.set(top, 0);
  out.set(bot, Math.floor(N / 2) * 3);
  return out;
};

// Generar formas (lazy para no bloquear render)
let shapesCache: Float32Array[] | null = null;
function getShapes(): Float32Array[] {
  if (!shapesCache) {
    shapesCache = [ptIco(), ptKnot(), ptRing(), ptOcta(), ptTorus(), ptDiamond()];
  }
  return shapesCache;
}

// ── Easing ─────────────────────────────────────────────
function easeIO(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

// ── Configuración por sección ──────────────────────────
// RIGHT = positivo en X, LEFT = negativo
const SECTIONS = [
  { id: '#hero',      shapeIdx: 0, side:  1.8 },
  { id: '#about',     shapeIdx: 1, side: -1.8 },
  { id: '#skills',    shapeIdx: 2, side:  1.8 },
  { id: '#projects',  shapeIdx: 3, side: -1.8 },
  { id: '#education', shapeIdx: 4, side:  1.8 },
  { id: '#contact',   shapeIdx: 5, side: -1.8 },
];

// ── Wireframe meshes por forma ─────────────────────────
function buildWireframes(scene: THREE.Scene) {
  const mat = (opacity: number, color = 0x4a65f5) =>
    new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });

  const meshes = [
    // 0 hero: icosaedro
    (() => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 1), mat(0.45)));
      g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.72, 3), mat(0.07, 0xffffff)));
      return g;
    })(),
    // 1 about: torus knot
    (() => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(new THREE.TorusKnotGeometry(1.1, 0.28, 128, 16), mat(0.4)));
      return g;
    })(),
    // 2 skills: esfera + anillo
    (() => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(new THREE.SphereGeometry(1.2, 12, 8), mat(0.3)));
      g.add(new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.04, 8, 64), mat(0.5, 0xffffff)));
      return g;
    })(),
    // 3 projects: octaedro doble
    (() => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(new THREE.OctahedronGeometry(1.6, 2), mat(0.45)));
      g.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.8, 1), mat(0.25, 0xffffff)));
      return g;
    })(),
    // 4 education: torus
    (() => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.5, 14, 64), mat(0.4)));
      g.add(new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.5, 6, 32), mat(0.12, 0xffffff)));
      return g;
    })(),
    // 5 contact: diamante
    (() => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(new THREE.OctahedronGeometry(1.5, 0), mat(0.5)));
      g.add(new THREE.Mesh(new THREE.OctahedronGeometry(1.5, 1), mat(0.1, 0xffffff)));
      return g;
    })(),
  ];

  meshes.forEach((m, i) => {
    m.position.x = SECTIONS[i].side;
    m.visible = i === 0;
    scene.add(m);
  });
  return meshes;
}

// ── Componente principal ───────────────────────────────
const ParticleMorph = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current!;
    const W = window.innerWidth, H = window.innerHeight;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Partículas
    const shapes   = getShapes();
    const currPos  = new Float32Array(shapes[0]);
    const posAttr  = new THREE.BufferAttribute(currPos, 3);
    const geo      = new THREE.BufferGeometry();
    geo.setAttribute('position', posAttr);

    const ptMat = new THREE.PointsMaterial({
      color: 0xffffff, size: 0.025, transparent: true, opacity: 0.45, sizeAttenuation: true,
    });
    const points = new THREE.Points(geo, ptMat);
    points.position.x = SECTIONS[0].side;
    scene.add(points);

    // Wireframes
    const wireframes = buildWireframes(scene);

    // Interpolación de posiciones
    const lerpShapes = (from: Float32Array, to: Float32Array, t: number) => {
      const e = easeIO(t);
      for (let i = 0; i < N * 3; i++) currPos[i] = from[i] + (to[i] - from[i]) * e;
      posAttr.needsUpdate = true;
    };

    // ── ScrollTriggers ─────────────────────────────────
    SECTIONS.forEach((sec, i) => {
      const next = SECTIONS[i + 1];
      if (!next) return;

      const el = document.querySelector(next.id);
      if (!el) return;

      const fromShape = shapes[i];
      const toShape   = shapes[i + 1];
      const fromX     = sec.side;
      const toX       = next.side;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 70%',
        end: 'top 20%',
        scrub: 1.2,
        onUpdate: (self) => {
          const t = self.progress;
          lerpShapes(fromShape, toShape, t);
          points.position.x = fromX + (toX - fromX) * easeIO(t);

          // Wireframes: fade out current, fade in next
          const mats = (wireframes[i] as THREE.Group).children as THREE.Mesh[];
          const nxMats = (wireframes[i + 1] as THREE.Group).children as THREE.Mesh[];
          wireframes[i].visible     = true;
          wireframes[i + 1].visible = true;

          mats.forEach(m => {
            (m.material as THREE.MeshBasicMaterial).opacity *= (1 - t);
          });
          nxMats.forEach(m => {
            (m.material as THREE.MeshBasicMaterial).opacity =
              (m.material as THREE.MeshBasicMaterial).opacity * t;
          });
        },
        onLeave: () => {
          wireframes[i].visible     = false;
          wireframes[i + 1].visible = true;
        },
        onEnterBack: () => {
          wireframes[i].visible     = true;
          wireframes[i + 1].visible = false;
        },
        onLeaveBack: () => {
          wireframes[i].visible     = true;
          wireframes[i + 1].visible = false;
        },
      });
    });

    // ── Animación continua ─────────────────────────────
    const clock = new THREE.Clock();
    let animId: number;
    let lastSection = 0;

    const rotSpeeds = [
      { y: 0.22, x: 0.10 },
      { y: 0.18, x: 0.08 },
      { y: 0.14, x: 0.12 },
      { y: 0.20, x: 0.06 },
      { y: 0.16, x: 0.09 },
      { y: 0.24, x: 0.07 },
    ];

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const rs = rotSpeeds[lastSection];
      wireframes[lastSection].rotation.y = t * rs.y;
      wireframes[lastSection].rotation.x = t * rs.x;
      points.rotation.y = t * 0.06;
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ─────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach(s => s.kill());
      renderer.dispose();
      geo.dispose();
      ptMat.dispose();
      shapesCache = null;
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
};

export default ParticleMorph;
