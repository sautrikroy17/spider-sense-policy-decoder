import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Cinematic Spider-Man New York Movie Background Engine
 * - Layer 1: Authentic Manhattan Night / Spider-Man movie photography with anamorphic grading & film vignette
 * - Layer 2: 3D Antique Clock Tower Brass Gears that rotate with scroll & mouse parallax (TASM2 homage)
 * - Layer 3: Interactive Spider-Silk Physics Canvas where webs pluck & react to mouse movement
 * - Layer 4: Anamorphic Crimson & Cyan Lens Flares + Floating Embers
 */
export const BackgroundFX = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [parallax, setParallax] = useState({ x: 0, y: 0, rotateY: 0, rotateX: 0 });

  const { scrollYProgress } = useScroll();
  const gearRotate1 = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const gearRotate2 = useTransform(scrollYProgress, [0, 1], [0, -540]);
  const gearRotate3 = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    const onWindowMove = (e) => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const nx = (e.clientX / W - 0.5);
      const ny = (e.clientY / H - 0.5);
      setParallax({
        x: nx * -26,
        y: ny * -20,
        rotateY: nx * 3.5,
        rotateX: -ny * 3.5
      });
    };
    window.addEventListener('mousemove', onWindowMove, { passive: true });
    return () => window.removeEventListener('mousemove', onWindowMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Interactive Spider-Web Network Nodes
    const NODE_COUNT = W > 768 ? 55 : 28;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      glow: Math.random() * 0.4 + 0.3
    }));

    // Floating embers
    const EMBER_COUNT = W > 768 ? 35 : 18;
    const embers = Array.from({ length: EMBER_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 2 + 0.8,
      speedY: -(Math.random() * 0.5 + 0.2),
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // 1. Draw Interactive Spider-Web Filaments
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;
        if (n1.x < 0 || n1.x > W) n1.vx *= -1;
        if (n1.y < 0 || n1.y > H) n1.vy *= -1;

        // Pluck web string with mouse physics
        const mDist = Math.hypot(n1.x - mx, n1.y - my);
        if (mDist < 160) {
          const force = (160 - mDist) / 160;
          const angle = Math.atan2(n1.y - my, n1.x - mx);
          n1.x += Math.cos(angle) * force * 2.5;
          n1.y += Math.sin(angle) * force * 2.5;
        }

        // Draw web lines
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);

          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = i % 2 === 0 ? '#ef4444' : '#38bdf8';
            ctx.globalAlpha = (1 - dist / 135) * 0.28;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Draw web nodes
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.globalAlpha = n1.glow;
        ctx.fill();
      }

      // 2. Draw Floating Crimson Dust Embers
      embers.forEach((emb) => {
        emb.x += emb.speedX;
        emb.y += emb.speedY;
        if (emb.y < 0) {
          emb.y = H + 10;
          emb.x = Math.random() * W;
        }

        ctx.beginPath();
        ctx.arc(emb.x, emb.y, emb.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.globalAlpha = emb.alpha;
        ctx.fill();
      });

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#050508]">
      {/* 🎬 Real 4K Cinematic Spider-Man New York City Movie Backdrop with 3D Depth Parallax */}
      <motion.div
        animate={{
          x: parallax.x,
          y: parallax.y,
          rotateY: parallax.rotateY,
          rotateX: parallax.rotateX,
          scale: [1.02, 1.05, 1.02]
        }}
        transition={{
          scale: { duration: 25, repeat: Infinity, ease: 'easeInOut' },
          x: { type: 'spring', damping: 25, stiffness: 120 },
          y: { type: 'spring', damping: 25, stiffness: 120 },
          rotateY: { type: 'spring', damping: 25, stiffness: 120 },
          rotateX: { type: 'spring', damping: 25, stiffness: 120 }
        }}
        className="absolute -inset-10 bg-cover bg-center bg-no-repeat opacity-65 sm:opacity-75 filter brightness-105 contrast-110 saturate-[1.25] will-change-transform"
        style={{
          backgroundImage: `url('/spidey/bg-3.jpeg')`
        }}
      />

      {/* Cinematic Panavision 2.39:1 Letterbox Gradient & Soft Edge Vignette (Keeps Center & Text 100% Readable) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 35%, rgba(5, 5, 8, 0.2) 0%, rgba(5, 5, 8, 0.65) 60%, rgba(5, 5, 8, 0.92) 100%),
            linear-gradient(180deg, rgba(5, 5, 8, 0.6) 0%, transparent 20%, transparent 75%, rgba(5, 5, 8, 0.95) 100%)
          `
        }}
      />

      {/* Cyber Subtle Hex Spider-Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />

      {/* ⚙️ 3D Cinematic Clock Tower Brass Gears (The Amazing Spider-Man 2 Homage) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden [perspective:1000px]">
        {/* Giant Left Clock Tower Gear */}
        <motion.div
          style={{ rotate: gearRotate1 }}
          className="absolute -top-32 -left-32 w-[480px] h-[480px] opacity-25 filter drop-shadow-[0_0_35px_rgba(245,158,11,0.25)] text-amber-500/60"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-current" strokeWidth="1.5">
            <circle cx="100" cy="100" r="90" strokeDasharray="6,4" />
            <circle cx="100" cy="100" r="76" strokeWidth="2" />
            <circle cx="100" cy="100" r="30" strokeWidth="2.5" />
            <circle cx="100" cy="100" r="10" fill="currentColor" opacity="0.4" />
            {/* Gear Spokes */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="100"
                y1="100"
                x2={100 + 75 * Math.cos((deg * Math.PI) / 180)}
                y2={100 + 75 * Math.sin((deg * Math.PI) / 180)}
                strokeWidth="1.8"
              />
            ))}
            {/* Cog Teeth */}
            {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((deg) => (
              <rect
                key={deg}
                x="96"
                y="5"
                width="8"
                height="10"
                fill="currentColor"
                opacity="0.6"
                transform={`rotate(${deg} 100 100)`}
              />
            ))}
          </svg>
        </motion.div>

        {/* Medium Right Clock Gear (Counter-Rotating) */}
        <motion.div
          style={{ rotate: gearRotate2 }}
          className="absolute top-1/3 -right-24 w-[420px] h-[420px] opacity-20 filter drop-shadow-[0_0_30px_rgba(239,68,68,0.25)] text-red-500/60"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-current" strokeWidth="1.5">
            <circle cx="100" cy="100" r="85" strokeWidth="2" />
            <circle cx="100" cy="100" r="45" strokeDasharray="4,4" />
            <circle cx="100" cy="100" r="14" fill="currentColor" opacity="0.3" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1="100"
                y1="100"
                x2={100 + 85 * Math.cos((deg * Math.PI) / 180)}
                y2={100 + 85 * Math.sin((deg * Math.PI) / 180)}
                strokeWidth="2.2"
              />
            ))}
            {[...Array(16)].map((_, i) => (
              <rect
                key={i}
                x="95"
                y="8"
                width="10"
                height="10"
                fill="currentColor"
                opacity="0.5"
                transform={`rotate(${i * 22.5} 100 100)`}
              />
            ))}
          </svg>
        </motion.div>

        {/* Central Faint Dial frozen near 1:21 (Iconic TASM2 detail) */}
        <motion.div
          style={{ rotate: gearRotate3 }}
          className="absolute bottom-12 left-1/3 w-[340px] h-[340px] opacity-15 text-zinc-400"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-current" strokeWidth="1">
            <circle cx="100" cy="100" r="90" strokeDasharray="2,6" />
            {/* Clock Hand at 1:21 */}
            <line x1="100" y1="100" x2="135" y2="45" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="100" y1="100" x2="160" y2="125" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="100" cy="100" r="4" fill="#ef4444" />
          </svg>
        </motion.div>
      </div>

      {/* 2.39:1 Anamorphic Lens Flares (Crimson Red & Neon Web Cyan) */}
      <motion.div
        animate={{ opacity: [0.35, 0.6, 0.35], scaleX: [0.95, 1.05, 0.95] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-32 w-[700px] h-[3px] rotate-[-3deg] blur-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #ef4444, #f87171, transparent)',
          boxShadow: '0 0 25px 5px rgba(239, 68, 68, 0.8)'
        }}
      />
      <motion.div
        animate={{ opacity: [0.25, 0.5, 0.25], scaleX: [1.05, 0.95, 1.05] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-3/5 -right-32 w-[650px] h-[3px] rotate-[4deg] blur-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #38bdf8, #818cf8, transparent)',
          boxShadow: '0 0 25px 5px rgba(56, 189, 248, 0.7)'
        }}
      />

      {/* Volumetric Glowing Atmosphere Atmosphere */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.28, 0.15]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] bg-red-600/25"
      />
      <motion.div
        animate={{
          scale: [1.15, 0.95, 1.15],
          opacity: [0.1, 0.22, 0.1]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 -right-20 w-[550px] h-[550px] rounded-full blur-[170px] bg-blue-600/20"
      />

      {/* Interactive Physics Spider-Silk Canvas with Plucking Strings & Embers */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
