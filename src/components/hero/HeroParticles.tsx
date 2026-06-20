import { useEffect, useRef } from 'react';

const COUNT = 260;

interface ShootingStar {
  x: number; y: number;
  vx: number; vy: number;
  length: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  twinkle: boolean;
  twinklePhase: number;
  twinkleSpeed: number;
}

const spawn = (W: number, H: number): Particle => ({
  x: Math.random() * W,
  y: Math.random() * H,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4,
  size: Math.random() * 0.8 + 0.5,
  opacity: 0,
  baseOpacity: Math.random() * 0.5 + 0.2,
  twinkle: Math.random() < 0.35,          // 35% de partículas parpadean
  twinklePhase: Math.random() * Math.PI * 2,
  twinkleSpeed: 0.8 + Math.random() * 2.5, // velocidades variadas
});

const HeroParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    const particles: Particle[] = Array.from({ length: COUNT }, () => {
      const p = spawn(W, H);
      p.opacity = p.baseOpacity; // arranca visible
      return p;
    });

    const mouse = { x: -9999, y: -9999 };
    const PULL_RADIUS  = 160;
    const HOLE_RADIUS  = 18;

    // ── Estrellas fugaces ────────────────────────────────
    const shootingStars: ShootingStar[] = [];
    let meteorTimer = 0;
    let nextInterval = 3 + Math.random() * 4;

    const spawnStar = () => {
      const angle = (15 + Math.random() * 25) * (Math.PI / 180); // diagonal suave
      const speed = 8 + Math.random() * 6;
      const len   = 80 + Math.random() * 120;
      shootingStars.push({
        x: Math.random() * W * 0.8,
        y: Math.random() * H * 0.4, // aparecen en la mitad superior
        vx:  Math.cos(angle) * speed,
        vy:  Math.sin(angle) * speed,
        length: len,
        opacity: 0,
        life: 0,
        maxLife: 0.7 + Math.random() * 0.5,
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    canvas.parentElement?.addEventListener('mousemove', onMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', onMouseLeave);

    let animId: number;
    let time = 0;
    const DT = 0.016;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time   += DT;
      meteorTimer += DT;
      ctx.clearRect(0, 0, W, H);

      // ── Spawn & draw estrellas fugaces ─────────────────
      if (meteorTimer > nextInterval) {
        meteorTimer = 0;
        nextInterval = 3 + Math.random() * 4;
        spawnStar();
        if (Math.random() > 0.55) setTimeout(spawnStar, 200 + Math.random() * 300);
      }

      for (let s = shootingStars.length - 1; s >= 0; s--) {
        const st = shootingStars[s];
        st.life += DT;
        const t  = st.life / st.maxLife;
        st.opacity = t < 0.2 ? t / 0.2 : 1 - (t - 0.2) / 0.8;
        st.x += st.vx;
        st.y += st.vy;

        // Línea con degradado (cabeza brillante, cola desvanecida)
        const tailX = st.x - st.vx / (st.vx ** 2 + st.vy ** 2) ** 0.5 * st.length;
        const tailY = st.y - st.vy / (st.vx ** 2 + st.vy ** 2) ** 0.5 * st.length;
        const grad  = ctx.createLinearGradient(tailX, tailY, st.x, st.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(1, `rgba(255,255,255,${st.opacity * 0.9})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(st.x, st.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.5;
        ctx.stroke();

        if (st.life >= st.maxLife) shootingStars.splice(s, 1);
      }

      particles.forEach(p => {
        const dx   = mouse.x - p.x;
        const dy   = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Absorbida → respawn inmediato a plena opacidad (sin fade, sin gaps)
        if (dist < HOLE_RADIUS) {
          Object.assign(p, spawn(W, H));
          p.opacity = p.baseOpacity;
          return;
        }

        // Gravedad + efecto espiral (fuerza tangencial)
        if (dist < PULL_RADIUS) {
          const strength   = ((PULL_RADIUS - dist) / PULL_RADIUS) ** 1.5 * 0.6;
          const nx = dx / dist;
          const ny = dy / dist;
          // Atracción radial
          p.vx += nx * strength * 0.35;
          p.vy += ny * strength * 0.35;
          // Componente tangencial para espiral
          p.vx += (-ny) * strength * 0.18;
          p.vy +=   nx  * strength * 0.18;
        }

        // Amortiguación + movimiento
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x  += p.vx;
        p.y  += p.vy;

        // Fade in al aparecer
        if (p.opacity < p.baseOpacity) p.opacity = Math.min(p.baseOpacity, p.opacity + 0.02);

        // Wrap en bordes
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Parpadeo tipo estrella (oscila entre 0.15 y baseOpacity)
        let displayOp = p.opacity;
        if (p.twinkle) {
          const flicker = (Math.sin(time * p.twinkleSpeed + p.twinklePhase) + 1) / 2;
          displayOp = 0.08 + flicker * p.baseOpacity;
        }

        // Brillo extra cerca del cursor
        const proximity = dist < PULL_RADIUS ? 1 - dist / PULL_RADIUS : 0;
        const finalOp   = displayOp + proximity * 0.35;

        // Las estrellas brillantes son ligeramente más grandes al pico
        const displaySize = p.twinkle
          ? p.size * (0.7 + ((Math.sin(time * p.twinkleSpeed + p.twinklePhase) + 1) / 2) * 0.6)
          : p.size;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.2, displaySize), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, finalOp)})`;
        ctx.fill();
      });
    };
    animate();

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default HeroParticles;
