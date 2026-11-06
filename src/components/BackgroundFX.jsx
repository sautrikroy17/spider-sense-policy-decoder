import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// ─── Curated Dark Cinematic HD Image Sets ──────────────────────────────────────
const THEME_IMAGES = {
  // 1: Shinchan / Comic Action Kamen (Tokyo neon night, moody anime rain)
  1: [
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1920&q=85&auto=format'
  ],
  // 2: Spider-Man (Dark NYC Manhattan skyline at night, web perspective)
  2: [
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1920&q=85&auto=format'
  ],
  // 3: Kick Buttowski (Night action stunts, adrenaline fire embers)
  3: [
    'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85&auto=format'
  ],
  // 4: Dragon Ball (Cosmic golden auroras, Saiyan lightning energy)
  4: [
    'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=1920&q=85&auto=format'
  ],
  // 5: Harry Potter (Midnight Hogwarts gothic mist, patronus glow)
  5: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1920&q=85&auto=format'
  ],
  // 6: Super Mario (Dark 8-bit retro arcade neon, synthwave grid)
  6: [
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=1920&q=85&auto=format'
  ]
};

const KB_VARIANTS = [
  { initial: { scale: 1.05, x: '1%', y: '1%' }, animate: { scale: 1.15, x: '-1%', y: '-1%' } },
  { initial: { scale: 1.12, x: '-1%', y: '-1%' }, animate: { scale: 1.05, x: '1%', y: '1%' } },
  { initial: { scale: 1.06, x: '0%', y: '-1%' }, animate: { scale: 1.14, x: '-1%', y: '1%' } }
];

export const BackgroundFX = () => {
  const { currentTheme, themeId, crtEnabled } = useTheme();
  const [imgIdx, setImgIdx] = useState(0);
  const canvasRef = useRef(null);

  const images = THEME_IMAGES[themeId] || THEME_IMAGES[2];

  // Rotate images slowly every 8 seconds
  useEffect(() => {
    setImgIdx(0);
    const interval = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [themeId, images.length]);

  // Particle Canvas
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

    const COUNT = W > 768 ? 40 : 20;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.5 + 0.1),
      a: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.02 + 0.01
    }));

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      // Spider-Man Web Filament Connections
      if (currentTheme.id === 2) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = currentTheme.accent;
              ctx.globalAlpha = (1 - dist / 120) * 0.22;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) {
          p.y = H + 5;
          p.x = Math.random() * W;
        }
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = currentTheme.accent;
        ctx.globalAlpha = p.a;
        ctx.fill();
      });
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [currentTheme]);

  const curSrc = images[imgIdx];
  const kbVariant = KB_VARIANTS[imgIdx % KB_VARIANTS.length];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Cinematic Imagery with Ken Burns Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="crossfade">
          <motion.div
            key={curSrc}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          >
            <motion.div
              className="absolute inset-0"
              initial={kbVariant.initial}
              animate={kbVariant.animate}
              transition={{ duration: 10, ease: 'easeInOut' }}
              style={{
                backgroundImage: `url(${curSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dark Film Color Grading Scrim */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(5, 5, 10, 0.75) 0%,
            rgba(5, 5, 10, 0.65) 40%,
            rgba(5, 5, 10, 0.90) 80%,
            #050508 100%
          )`
        }}
      />

      {/* Edge Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,10,0.85) 100%)'
        }}
      />

      {/* Animated Subtle Mesh Glowing Blobs */}
      <motion.div
        key={themeId + '-orb1'}
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[140px]"
        style={{ backgroundColor: currentTheme.primary }}
      />
      <motion.div
        key={themeId + '-orb2'}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-1/2 -right-32 w-[450px] h-[450px] rounded-full blur-[150px]"
        style={{ backgroundColor: currentTheme.accent }}
      />

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle Scanlines Overlay */}
      {crtEnabled && (
        <div className="absolute inset-0 crt-overlay opacity-50 pointer-events-none" />
      )}

      {/* Carousel Dots Pill */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/5">
        {images.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === imgIdx ? '16px' : '5px',
              height: '5px',
              backgroundColor: i === imgIdx ? currentTheme.accent : 'rgba(255,255,255,0.2)'
            }}
          />
        ))}
      </div>
    </div>
  );
};
