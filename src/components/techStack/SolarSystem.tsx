import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

// ── Planetas ───────────────────────────────────────────
const PLANETS = [
  { name: 'Python',        icon: `${DEVICON}/python/python-original.svg`,               color: '#3776ab', planetColor: 0x3776ab, radius: 0.32, orbit: 2.4,  speed: 0.85, startAngle: 0.5  },
  { name: 'PostgreSQL',    icon: `${DEVICON}/postgresql/postgresql-original.svg`,        color: '#336791', planetColor: 0x336791, radius: 0.26, orbit: 3.5,  speed: 0.52, startAngle: 2.0  },
  { name: 'Power BI',      icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg', color: '#f2c811', planetColor: 0xf2c811, radius: 0.28, orbit: 4.6,  speed: 0.34, startAngle: 4.0  },
  { name: 'Google Cloud',  icon: `${DEVICON}/googlecloud/googlecloud-original.svg`,      color: '#4285f4', planetColor: 0x4285f4, radius: 0.24, orbit: 5.7,  speed: 0.23, startAngle: 1.2  },
  { name: 'Apache Spark',  icon: `${DEVICON}/apachespark/apachespark-original.svg`,      color: '#e25a1c', planetColor: 0xe25a1c, radius: 0.22, orbit: 6.8,  speed: 0.15, startAngle: 3.5  },
  { name: 'MongoDB',       icon: `${DEVICON}/mongodb/mongodb-original.svg`,              color: '#47a248', planetColor: 0x47a248, radius: 0.20, orbit: 7.8,  speed: 0.10, startAngle: 0.8  },
  { name: 'Looker Studio', icon: 'https://www.gstatic.com/analytics-suite/header/suite/v2/ic_data_studio.svg', color: '#4285f4', planetColor: 0x4285f4, radius: 0.18, orbit: 8.8,  speed: 0.07, startAngle: 2.8  },
];

type ScreenPos = { x: number; y: number; behind: boolean };

const SolarSystem = () => {
  const mountRef  = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<ScreenPos[]>(PLANETS.map(() => ({ x: 0, y: 0, behind: false })));
  const [sunPos, setSunPos]       = useState({ x: 0, y: 0, r: 50 });
  const [hovered, setHovered]     = useState<number>(-1);
  const posRef    = useRef<ScreenPos[]>(PLANETS.map(() => ({ x: 0, y: 0, behind: false })));
  const hovRef    = useRef<number>(-1);

  useEffect(() => {
    const container = mountRef.current!;
    const W = container.offsetWidth;
    const H = container.offsetHeight;

    // ── Escena ────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 300);
    camera.position.set(3, 5, 18);
    camera.lookAt(4, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Iluminación ───────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const sunLight = new THREE.PointLight(0xffffff, 4, 40);
    scene.add(sunLight);

    // ── Sol ───────────────────────────────────────────
    // Sol invisible en Three.js — lo manejamos con CSS para control de z-index
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 32, 16),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    scene.add(sun);
    // Sin halo de puntos — el brillo lo da CSS

    // ── Estrellas de fondo ────────────────────────────
    const starPos = new Float32Array(1800 * 3);
    for (let i = 0; i < 1800; i++) {
      const r = 40 + Math.random() * 80;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      starPos[i * 3]     = r * Math.sin(p) * Math.cos(t);
      starPos[i * 3 + 1] = r * Math.cos(p);
      starPos[i * 3 + 2] = r * Math.sin(p) * Math.sin(t);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.08, transparent: true, opacity: 0.6 });
    scene.add(new THREE.Points(starGeo, starMat));
    // Parpadeo de estrellas
    gsap.to(starMat, { opacity: 0.25, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    // ── Órbitas ───────────────────────────────────────
    PLANETS.forEach(p => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 160; i++) {
        const a = (i / 160) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * p.orbit, 0, Math.sin(a) * p.orbit));
      }
      scene.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.07 })
      ));
    });

    // ── Cinturón de asteroides (animado) ──────────────
    const beltPos = new Float32Array(500 * 3);
    const beltAngles = new Float32Array(500);
    const beltRadii  = new Float32Array(500);
    for (let i = 0; i < 500; i++) {
      beltAngles[i] = Math.random() * Math.PI * 2;
      beltRadii[i]  = 4.8 + (Math.random() - 0.5) * 0.6;
      const y = (Math.random() - 0.5) * 0.2;
      beltPos[i * 3]     = Math.cos(beltAngles[i]) * beltRadii[i];
      beltPos[i * 3 + 1] = y;
      beltPos[i * 3 + 2] = Math.sin(beltAngles[i]) * beltRadii[i];
    }
    const beltGeo = new THREE.BufferGeometry();
    beltGeo.setAttribute('position', new THREE.BufferAttribute(beltPos, 3));
    const beltAttr = beltGeo.attributes.position as THREE.BufferAttribute;
    scene.add(new THREE.Points(
      beltGeo,
      new THREE.PointsMaterial({ color: 0x8888aa, size: 0.05, transparent: true, opacity: 0.45 })
    ));

    // ── Planetas ──────────────────────────────────────
    const planetMeshes: THREE.Mesh[]  = [];
    const planetGroups: THREE.Group[] = [];
    const planetAngles: number[]      = PLANETS.map(p => p.startAngle);

    // Auras de color alrededor de cada planeta

    PLANETS.forEach((p, i) => {
      const group = new THREE.Group();
      scene.add(group);
      planetGroups.push(group);

      // Esfera del planeta (invisible — solo sirve para raycasting)
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(p.radius * 1.4, 16, 12),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      mesh.position.set(p.orbit, 0, 0);
      mesh.userData = { idx: i };
      group.add(mesh);
      planetMeshes.push(mesh);

      // Sin aura de color — solo el icono HTML sobre el mesh invisible
    });

    // ── Estado de animación ───────────────────────────
    let orbitSpeed = 0;
    let beltAngle  = 0;

    // ── ScrollTrigger ─────────────────────────────────
    const ctx = gsap.context(() => {
      // Planetas emergen desde el centro
      planetMeshes.forEach((mesh, i) => {
        gsap.from(mesh.position, {
          x: 0, z: 0,
          duration: 1.4, delay: i * 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: container, start: 'top 75%', toggleActions: 'play none none reverse' },
        });
      });
      // Velocidad de órbita
      const proxy = { v: 0 };
      gsap.to(proxy, {
        v: 1, duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: container, start: 'top 75%', toggleActions: 'play none none reverse' },
        onUpdate() { orbitSpeed = proxy.v; },
      });
    });

    // ── Raycasting ────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    raycaster.params.Points = { threshold: 0.1 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(planetMeshes);
      const idx  = hits.length > 0 ? (hits[0].object.userData.idx as number) : -1;
      hovRef.current = idx;
      setHovered(idx);
      container.style.cursor = idx >= 0 ? 'pointer' : 'default';
    };
    container.addEventListener('mousemove', onMouseMove);

    // ── Estrellas fugaces ─────────────────────────────
    type Meteor = {
      line: THREE.Line;
      vel: THREE.Vector3;
      life: number;
      maxLife: number;
      mat: THREE.LineBasicMaterial;
    };
    const meteors: Meteor[] = [];

    const spawnMeteor = () => {
      // Posición de inicio aleatoria en el espacio
      const x = (Math.random() - 0.3) * 30;
      const y = 8 + Math.random() * 8;
      const z = (Math.random() - 0.5) * 20;

      // Dirección: diagonal hacia abajo-derecha
      const vel = new THREE.Vector3(
        3 + Math.random() * 4,
        -(2 + Math.random() * 3),
        -1 + Math.random() * 2
      );

      const length = 2 + Math.random() * 3;
      const dir    = vel.clone().normalize();
      const tail   = dir.clone().multiplyScalar(-length);

      const pts = [
        new THREE.Vector3(x, y, z),
        new THREE.Vector3(x + tail.x, y + tail.y, z + tail.z),
      ];

      const mat  = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
      scene.add(line);

      meteors.push({ line, vel, life: 0, maxLife: 0.6 + Math.random() * 0.4, mat });
    };

    // Spawn inicial y periódico
    let meteorTimer = 0;
    const meteorInterval = 3 + Math.random() * 3; // cada 3-6 segundos

    // ── Loop ──────────────────────────────────────────
    const clock = new THREE.Clock();
    let animId: number;
    let frameCount = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frameCount++;
      const dt = clock.getDelta();

      // Cinturón de asteroides rota
      beltAngle += 0.02 * orbitSpeed * dt;
      for (let i = 0; i < 500; i++) {
        const a = beltAngles[i] + beltAngle;
        beltAttr.setX(i, Math.cos(a) * beltRadii[i]);
        beltAttr.setZ(i, Math.sin(a) * beltRadii[i]);
      }
      beltAttr.needsUpdate = true;

      // Planetas orbitan
      PLANETS.forEach((p, i) => {
        planetAngles[i] += p.speed * orbitSpeed * dt;
        planetGroups[i].rotation.y = planetAngles[i];
        planetMeshes[i].rotation.y += 0.4 * dt;
      });

      sun.rotation.y    += 0.15 * dt;

      // ── Estrellas fugaces ──────────────────────────
      meteorTimer += dt;
      if (meteorTimer > meteorInterval) {
        meteorTimer = 0;
        // Spawn 1 o 2 meteoros
        spawnMeteor();
        if (Math.random() > 0.6) setTimeout(spawnMeteor, 200);
      }

      for (let m = meteors.length - 1; m >= 0; m--) {
        const meteor = meteors[m];
        meteor.life += dt;
        const t = meteor.life / meteor.maxLife;

        // Mover
        meteor.line.position.addScaledVector(meteor.vel, dt * 6);

        // Fade out hacia el final
        meteor.mat.opacity = t < 0.3 ? (t / 0.3) * 0.9 : (1 - t) * 0.9;

        if (meteor.life >= meteor.maxLife) {
          scene.remove(meteor.line);
          meteor.line.geometry.dispose();
          meteor.mat.dispose();
          meteors.splice(m, 1);
        }
      }

      // Actualizar posiciones 2D cada 2 frames
      if (frameCount % 2 === 0) {
        const cw = container.offsetWidth;
        const ch = container.offsetHeight;

        // Sol: posición 2D + radio proyectado
        const s0 = new THREE.Vector3(0, 0, 0).project(camera);
        const s1 = new THREE.Vector3(0.7, 0, 0).project(camera);
        const sx = (s0.x * 0.5 + 0.5) * cw;
        const sy = (-s0.y * 0.5 + 0.5) * ch;
        const ex = (s1.x * 0.5 + 0.5) * cw;
        const ey = (-s1.y * 0.5 + 0.5) * ch;
        const sr = Math.sqrt((ex - sx) ** 2 + (ey - sy) ** 2);
        setSunPos({ x: sx, y: sy, r: Math.max(sr, 20) });

        // Vectores cámara→sol y radio angular del sol
        const camPos    = camera.position.clone();
        const sunWorld  = new THREE.Vector3(0, 0, 0);
        const camToSun  = sunWorld.clone().sub(camPos);
        const distToSun = camToSun.length();
        const dirToSun  = camToSun.clone().normalize();

        // Radio angular del sol (en radianes) con buffer para el tamaño del icono
        const sunAngularR = Math.atan(0.85 / distToSun);

        const newPos = PLANETS.map((_, i) => {
          const wp = planetMeshes[i].getWorldPosition(new THREE.Vector3());

          const camToPlanet   = wp.clone().sub(camPos);
          const distToPlanet  = camToPlanet.length();
          const dirToPlanet   = camToPlanet.clone().normalize();

          // Separación angular entre planeta y sol
          const cosAngle = Math.min(1, dirToSun.dot(dirToPlanet));
          const angle    = Math.acos(cosAngle);

          // Detrás = más lejos que el sol Y dentro del cono angular del sol
          const behind = distToPlanet > distToSun && angle < sunAngularR;

          // Proyección a pantalla
          wp.project(camera);
          return {
            x: (wp.x * 0.5 + 0.5) * cw,
            y: (-wp.y * 0.5 + 0.5) * ch,
            behind,
          };
        });
        posRef.current = newPos;
        setPositions([...newPos]);
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const nw = container.offsetWidth, nh = container.offsetHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      ctx.revert();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Canvas Three.js */}
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      {/* Sol CSS con glow — z-index 2, entre iconos de detrás (1) y delante (3) */}
      <div style={{
        position: 'absolute',
        left: sunPos.x - sunPos.r,
        top: sunPos.y - sunPos.r,
        width: sunPos.r * 2,
        height: sunPos.r * 2,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #ffffff 0%, #fff8e7 35%, rgba(255,248,200,0.3) 65%, transparent 100%)',
        boxShadow: '0 0 30px 12px rgba(255,255,255,0.35), 0 0 80px 30px rgba(255,240,180,0.15)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Iconos HTML sobre cada planeta */}
      {PLANETS.map((p, i) => {
        const pos = positions[i];
        if (!pos) return null;
        const isHov = hovered === i;
        return (
          <div
            key={p.name}
            style={{
              position: 'absolute',
              left: pos.x,
              top: pos.y,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              transition: 'transform 0.2s',
              zIndex: pos.behind ? 1 : 3,
            }}
          >
            {/* Solo el icono flotando, sin círculo */}
            <img
              src={p.icon}
              alt={p.name}
              style={{
                width: Math.max(28, Math.round(p.radius * 130)),
                height: Math.max(28, Math.round(p.radius * 130)),
                objectFit: 'contain',
                transition: 'transform 0.2s, filter 0.2s',
                transform: isHov ? 'scale(1.35)' : 'scale(1)',
                filter: isHov
                  ? `drop-shadow(0 0 8px ${p.color}) brightness(1.2)`
                  : 'brightness(0.9)',
              }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            {/* Label al hacer hover */}
            {isHov && (
              <div style={{
                backgroundColor: 'rgba(8,8,8,0.9)',
                border: `1px solid ${p.color}55`,
                borderRadius: '5px',
                padding: '2px 8px',
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: p.color,
                whiteSpace: 'nowrap',
                marginTop: 4,
              }}>
                {p.name}
              </div>
            )}
          </div>
        );
      })}

      {/* Label del sol */}
      <div style={{
        position: 'absolute', bottom: '1.25rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
      }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#ffffff', boxShadow: '0 0 8px #ffffff88' }} />
        <span className="text-label">Data Engineering</span>
      </div>
    </div>
  );
};

export default SolarSystem;
