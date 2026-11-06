import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Real cinematic Spider-Man frames from movies & Sinister Six comic artwork
const THEME_IMAGES = {
  1: [
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1920&q=85&auto=format',
    'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&q=85&auto=format'
  ],
  // 2: Spider-Man (Real Movie Frames & Sinister Six Battle Artwork!)
  2: [
    '/spidey/sinister-six-bg.jpg',
    '/spidey/bg-4.jpeg',
    '/spidey/bg-3.jpeg',
    '/spidey/bg-5.jpeg',
    '/spidey/bg-1.jpg'
  ],
  3: [
    'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1920&q=85&auto=format'
  ],
  4: [
    'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1920&q=85&auto=format'
  ],
  5: [
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1920&q=85&auto=format'
  ],
  6: [
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=85&auto=format'
  ]
};

const KB_VARIANTS = [
  { initial: { scale: 1.0 }, animate: { scale: 1.08, x: '-1%' } },
  { initial: { scale: 1.06, x: '1%' }, animate: { scale: 1.0 } },
  { initial: { scale: 1.02, y: '-1%' }, animate: { scale: 1.07, y: '1%' } }
];

export const BackgroundFX = () => {
  const { currentTheme, themeId, crtEnabled } = useTheme();
  const [imgIdx, setImgIdx] = useState(0);
  const canvasRef = useRef(null);

  const images = THEME_IMAGES[themeId] || THEME_IMAGES[2];

  // Rotate images slowly every 9 seconds
  useEffect(() => {
    setImgIdx(0);
    const interval = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % images.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [themeId, images.length]);

  // Spider-Web filament particle canvas
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

    const COUNT = W > 768 ? 45 : 22;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.6,
      vx: (Math.random() - 0.5) * 0.45,
      vy: -(Math.random() * 0.45 + 0.1),
      a: Math.random() * 0.5 + 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      // Connect particles with faint glowing spider web filaments
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#ef4444';
            ctx.globalAlpha = (1 - dist / 130) * 0.25;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw floating red & white dust motes
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
        ctx.fillStyle = '#ef4444';
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
  }, []);

  const curSrc = images[imgIdx];
  const kbVariant = KB_VARIANTS[imgIdx % KB_VARIANTS.length];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Real Cinematic Movie Frames with Smooth Crossfade */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="crossfade">
          <motion.div
            key={curSrc}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <motion.div
              className="absolute inset-0"
              initial={kbVariant.initial}
              animate={kbVariant.animate}
              transition={{ duration: 11, ease: 'easeInOut' }}
              style={{
                backgroundImage: `url(${curSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 20%'
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cinematic Film Grading Scrim (Exact match to hackthesinisters - keeps movie frame vivid!) */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.45) 0%,
            rgba(5, 5, 10, 0.55) 45%,
            rgba(5, 5, 10, 0.88) 85%,
            #050508 100%
          )`
        }}
      />

      {/* Radial Vignette to keep text readable while showing Spidey around the edges */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(5,5,10,0.5) 0%, rgba(5,5,10,0.85) 80%)'
        }}
      />

      {/* Spider Red & Blue Ambient Glow Halos */}
      <div
        className="absolute -top-24 -left-24 w-[450px] h-[450px] rounded-full blur-[140px] opacity-25"
        style={{ backgroundColor: '#ef4444' }}
      />
      <div
        className="absolute top-1/3 -right-24 w-[450px] h-[450px] rounded-full blur-[150px] opacity-20"
        style={{ backgroundColor: '#2563eb' }}
      />

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle Scanlines Overlay */}
      {crtEnabled && (
        <div className="absolute inset-0 crt-overlay opacity-40 pointer-events-none" />
      )}

      {/* Frame Carousel Dots Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
        {images.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === imgIdx ? '16px' : '5px',
              height: '5px',
              backgroundColor: i === imgIdx ? '#ef4444' : 'rgba(255,255,255,0.3)'
            }}
          />
        ))}
      </div>
    </div>
  );
};
