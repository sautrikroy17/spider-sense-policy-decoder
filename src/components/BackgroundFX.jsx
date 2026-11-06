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
      {/* Real New York City Spider-Man Movie Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 filter brightness-[0.75] contrast-[1.15]"
        style={{
          backgroundImage: `url('/spidey/bg-3.jpeg')`
        }}
      />

      {/* Cinematic Deep Obsidian Vignette & Atmosphere Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 20%, rgba(10, 8, 20, 0.4) 0%, rgba(5, 5, 8, 0.95) 75%),
            linear-gradient(180deg, rgba(5, 5, 8, 0.7) 0%, rgba(5, 5, 8, 0.95) 100%)
          `
        }}
      />

      {/* Anamorphic Horizontal Lens Flares (Crimson & Cyan) */}
      <div
        className="absolute top-1/4 -left-40 w-[600px] h-[2.5px] rotate-[-4deg] opacity-40 blur-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #ef4444, transparent)',
          boxShadow: '0 0 20px 4px #ef4444'
        }}
      />
      <div
        className="absolute top-2/3 -right-40 w-[550px] h-[2.5px] rotate-[6deg] opacity-30 blur-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #0284c7, transparent)',
          boxShadow: '0 0 20px 4px #0284c7'
        }}
      />

      {/* Volumetric Glowing Atmosphere Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.22, 0.12]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 left-1/3 w-[500px] h-[500px] rounded-full blur-[160px] bg-red-600/20"
      />

      {/* Interactive Physics Spider-Web Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
