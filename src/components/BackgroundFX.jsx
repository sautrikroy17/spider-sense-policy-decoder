import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * Completely Original Spider-Man Cinematic Background Engine
 * - Interactive Spider-Silk Physics Canvas: Web filaments react to mouse movement (plucking spider web effect!)
 * - Atmospheric Manhattan Night Horizon Silhouette with glowing window lights
 * - Anamorphic Red & Electric Blue Lens Flares
 * - Atmospheric Floating Crimson Dust Embers
 * - 100% original, zero copied stock photos, zero game controllers
 */
export const BackgroundFX = () => {
  const { currentTheme, crtEnabled } = useTheme();
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
      baseX: Math.random() * W,
      baseY: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      glow: Math.random() * 0.4 + 0.3
    }));

    // Floating embers
    const EMBER_COUNT = W > 768 ? 40 : 20;
    const embers = Array.from({ length: EMBER_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 2 + 0.8,
      speedY: -(Math.random() * 0.6 + 0.2),
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.05 + 0.02
    }));

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // 1. Draw Interactive Spider-Web Filaments
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        // Natural slow drift
        n1.x += n1.vx;
        n1.y += n1.vy;
        if (n1.x < 0 || n1.x > W) n1.vx *= -1;
        if (n1.y < 0 || n1.y > H) n1.vy *= -1;

        // Mouse physics interaction: Plucking web string
        const mDist = Math.hypot(n1.x - mx, n1.y - my);
        if (mDist < 160) {
          const force = (160 - mDist) / 160;
          const angle = Math.atan2(n1.y - my, n1.x - mx);
          n1.x += Math.cos(angle) * force * 2.5;
          n1.y += Math.sin(angle) * force * 2.5;
        }

        // Draw web lines to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);

            // Red & Blue shimmering spider-silk
            ctx.strokeStyle = i % 2 === 0 ? '#ef4444' : '#3b82f6';
            ctx.globalAlpha = (1 - dist / 140) * 0.28;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Draw web junction nodes
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
      
      {/* Deep Obsidian Radial Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 25%, rgba(20, 10, 25, 0.45) 0%, rgba(5, 5, 8, 0.95) 75%),
            linear-gradient(180deg, #050508 0%, rgba(10, 10, 18, 0.8) 50%, #030305 100%)
          `
        }}
      />

      {/* Cinematic Manhattan Night Skyline Horizon Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-96 opacity-35 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-full text-zinc-900"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          {/* Skyscraper Silhouettes */}
          <rect x="40" y="80" width="70" height="240" fill="#0c0d14" />
          <rect x="120" y="40" width="85" height="280" fill="#08090e" />
          <polygon points="162,10 157,40 167,40" fill="#ef4444" opacity="0.8" />
          <rect x="220" y="110" width="60" height="210" fill="#0d0e17" />
          <rect x="295" y="65" width="90" height="255" fill="#090a10" />
          <polygon points="340,30 336,65 344,65" fill="#3b82f6" opacity="0.8" />
          <rect x="400" y="130" width="75" height="190" fill="#0d0e17" />
          <rect x="490" y="50" width="110" height="270" fill="#08090e" />
          <rect x="620" y="90" width="80" height="230" fill="#0c0d14" />
          <rect x="715" y="30" width="95" height="290" fill="#07080d" />
          <polygon points="762,0 758,30 766,30" fill="#ef4444" />
          <rect x="825" y="100" width="85" height="220" fill="#0d0e17" />
          <rect x="925" y="60" width="75" height="260" fill="#090a10" />
          <rect x="1015" y="120" width="90" height="200" fill="#0c0d14" />
          <rect x="1120" y="45" width="100" height="275" fill="#08090e" />
          <polygon points="1170,15 1166,45 1174,45" fill="#ef4444" />
          <rect x="1235" y="95" width="80" height="225" fill="#0d0e17" />
          <rect x="1330" y="70" width="90" height="250" fill="#090a10" />
        </svg>

        {/* Skyline Fog Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/80 to-transparent" />
      </div>

      {/* Cinematic Anamorphic Horizontal Lens Flares (Spider Red & Electric Blue) */}
      <div
        className="absolute top-1/4 -left-40 w-[600px] h-[3px] rotate-[-5deg] opacity-40 blur-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #ef4444, transparent)',
          boxShadow: '0 0 20px 4px #ef4444'
        }}
      />
      <div
        className="absolute top-2/3 -right-40 w-[550px] h-[3px] rotate-[8deg] opacity-35 blur-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)',
          boxShadow: '0 0 20px 4px #3b82f6'
        }}
      />

      {/* Volumetric Glowing Atmosphere Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.28, 0.15]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 left-1/3 w-[500px] h-[500px] rounded-full blur-[160px] bg-red-600/25"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.24, 0.12]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/2 -right-20 w-[450px] h-[450px] rounded-full blur-[170px] bg-blue-600/20"
      />

      {/* Interactive Physics Spider-Web Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle Cinematic Film Scanlines */}
      {crtEnabled && (
        <div className="absolute inset-0 crt-overlay opacity-30 pointer-events-none" />
      )}
    </div>
  );
};
