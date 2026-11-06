import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const BackgroundFX = () => {
  const { currentTheme, crtEnabled } = useTheme();
  const canvasRef = useRef(null);

  // Dynamic particle canvas system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Particles count based on screen size
    const particleCount = Math.min(width > 768 ? 45 : 20, 60);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 0.9 - 0.2, // upward drift
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color: currentTheme.accent
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

        // Wrap around boundaries
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = currentTheme.accent;
        ctx.globalAlpha = Math.max(0.1, Math.min(p.alpha, 0.8));
        ctx.shadowBlur = 8;
        ctx.shadowColor = currentTheme.accent;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentTheme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic Base Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${currentTheme.bgGradient} transition-colors duration-700`} />

      {/* Cyber Grid or Halftone Overlay */}
      <div className="absolute inset-0 opacity-20 cyber-grid" />
      <div className="absolute inset-0 opacity-15 halftone-bg" />

      {/* Pulsing Luminous Orbs (21st.dev / Mesh Gradient Style) */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
          opacity: [0.25, 0.45, 0.25]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px]"
        style={{ backgroundColor: currentTheme.primary }}
      />
      <motion.div
        animate={{
          scale: [1, 1.35, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] rounded-full blur-[140px]"
        style={{ backgroundColor: currentTheme.accent }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full blur-[100px]"
        style={{ backgroundColor: currentTheme.secondary }}
      />

      {/* Floating Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* Vignette Edge Shading */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80" />

      {/* CRT Scanline Overlay (Hack The Box / CTF style) */}
      {crtEnabled && (
        <div className="absolute inset-0 crt-overlay opacity-60 pointer-events-none" />
      )}
    </div>
  );
};
