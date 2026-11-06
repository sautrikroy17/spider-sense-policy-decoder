import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Cinematic Spider-Man New York Movie Background Engine
 * - Layer 1: Authentic Manhattan Night / Spider-Man movie photography with anamorphic grading & film vignette
 * - Layer 2: Interactive Spider-Silk Physics Canvas where webs pluck & react to mouse movement
 * - Layer 3: Anamorphic Crimson & Cyan Lens Flares + Floating Embers
 */
export const BackgroundFX = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

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
      {/* 🎬 Real 4K Cinematic Spider-Man New York City Movie Backdrop with Smooth Camera Drift */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          x: [0, -12, 0],
          y: [0, -8, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -inset-8 bg-cover bg-center bg-no-repeat opacity-65 sm:opacity-75 filter brightness-105 contrast-110 saturate-[1.25] will-change-transform"
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
