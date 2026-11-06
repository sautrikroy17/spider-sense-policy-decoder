import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// ─── HD Cinematic Image Sets Per Theme ───────────────────────────────────────
// Using Unsplash with specific curated art-direction per character theme
const THEME_IMAGES = {
  // Shinchan: colorful anime/cartoon city, neon Japan streets
  1: [
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1920&q=85&auto=format',
  ],
  // Spider-Man: NYC rooftop night, urban web grid, dark city
  2: [
    'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1518176258769-f227c798150e?w=1920&q=85&auto=format',
  ],
  // Kick Buttowski: extreme sports, skatepark, fire, action
  3: [
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85&auto=format',
  ],
  // Dragon Ball: cosmic energy, lightning storm, super saiyan sky
  4: [
    'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1504192010706-dd7f569ee2be?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=85&auto=format',
  ],
  // Harry Potter: dark castle, misty forest, Hogwarts night
  5: [
    'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1920&q=85&auto=format',
  ],
  // Super Mario: pixel neon arcade, colorful retro
  6: [
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=85&auto=format',
  ],
};

// Ken Burns keyframe variants for each image (alternating pan directions)
const KB_VARIANTS = [
  { initial: { scale: 1.08, x: '2%', y: '1%' },   animate: { scale: 1.18, x: '-1%', y: '-1%' } },
  { initial: { scale: 1.1,  x: '-2%', y: '-1%' },  animate: { scale: 1.18, x: '1%',  y: '1%'  } },
  { initial: { scale: 1.12, x: '1%', y: '-2%' },   animate: { scale: 1.08, x: '-2%', y: '1%'  } },
];

export const BackgroundFX = () => {
  const { currentTheme, themeId, crtEnabled } = useTheme();
  const [imgIdx, setImgIdx] = useState(0);
  const [loaded, setLoaded] = useState({});
  const intervalRef = useRef(null);
  const canvasRef = useRef(null);

  const images = THEME_IMAGES[themeId] || THEME_IMAGES[2];

  // Rotate hero images every 6 seconds
  useEffect(() => {
    setImgIdx(0);
    intervalRef.current = setInterval(() => {
      setImgIdx(i => (i + 1) % images.length);
    }, 6000);
    return () => clearInterval(intervalRef.current);
  }, [themeId, images.length]);

  // Preload all images for active theme
  useEffect(() => {
    images.forEach((src, i) => {
      if (!loaded[src]) {
        const img = new Image();
        img.onload = () => setLoaded(p => ({ ...p, [src]: true }));
        img.src = src;
      }
    });
  }, [themeId]);

  // Canvas floating particles (kept lightweight)
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

    const COUNT = Math.min(W > 768 ? 55 : 25, 70);
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -(Math.random() * 0.7 + 0.15),
      a: Math.random() * 0.5 + 0.15,
      ps: Math.random() * 0.025 + 0.008,
      t: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      const now = Date.now() * 0.001;
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.t += 0.02;
        p.x += Math.sin(p.t) * 0.3;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        const alpha = Math.max(0.05, Math.min(0.75, p.a + Math.sin(now * p.ps * 10) * 0.12));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = currentTheme.accent;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = currentTheme.accent;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };
    render();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, [currentTheme]);

  const curSrc = images[imgIdx];
  const kbVariant = KB_VARIANTS[imgIdx % KB_VARIANTS.length];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">

      {/* ── Layer 1: Cinematic hero image with Ken Burns + crossfade ── */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="crossfade">
          <motion.div
            key={curSrc}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          >
            {/* Ken Burns slow zoom + pan */}
            <motion.div
              className="absolute inset-0"
              initial={kbVariant.initial}
              animate={kbVariant.animate}
              transition={{ duration: 8, ease: 'easeInOut' }}
              style={{
                backgroundImage: `url(${curSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Layer 2: Cinematic color-grade overlay (theme-tinted film grain) ── */}
      <motion.div
        className="absolute inset-0"
        key={themeId + '-grade'}
        animate={{ opacity: [0.72, 0.68, 0.72] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: `linear-gradient(
            160deg,
            ${currentTheme.primary}55 0%,
            rgba(0,0,0,0.78) 45%,
            ${currentTheme.accent}22 100%
          )`
        }}
      />

      {/* ── Layer 3: Strong bottom fade (like hackthesinisters / wheretheflag) ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            transparent 30%,
            rgba(5,5,8,0.55) 60%,
            rgba(5,5,8,0.95) 85%,
            #050508 100%
          )`
        }}
      />

      {/* ── Layer 4: Side vignettes ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 50%, rgba(5,5,8,0.7) 100%)`
        }}
      />

      {/* ── Layer 5: Animated mesh gradient orbs ── */}
      <motion.div
        key={themeId + '-orb1'}
        animate={{ scale: [1, 1.3, 1], x: [0, 60, 0], y: [0, -40, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[130px]"
        style={{ backgroundColor: currentTheme.primary }}
      />
      <motion.div
        key={themeId + '-orb2'}
        animate={{ scale: [1, 1.4, 1], x: [0, -50, 0], y: [0, 50, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-1/2 -right-48 w-[550px] h-[550px] rounded-full blur-[150px]"
        style={{ backgroundColor: currentTheme.accent }}
      />
      <motion.div
        key={themeId + '-orb3'}
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full blur-[110px]"
        style={{ backgroundColor: currentTheme.secondary }}
      />

      {/* ── Layer 6: Animated particle canvas ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

      {/* ── Layer 7: Cyber grid (subtle) ── */}
      <div className="absolute inset-0 cyber-grid opacity-[0.07]" />

      {/* ── Layer 8: Noise texture (film grain) ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* ── Layer 9: CRT scanlines (optional toggle) ── */}
      {crtEnabled && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.18) 2px,
              rgba(0,0,0,0.18) 4px
            )`,
          }}
        />
      )}

      {/* ── Layer 10: Image dot carousel indicator ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === imgIdx ? '20px' : '6px',
              height: '6px',
              backgroundColor: i === imgIdx ? currentTheme.accent : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>
    </div>
  );
};
