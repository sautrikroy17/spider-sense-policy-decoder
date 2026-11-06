import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/soundEffects';

/**
 * Spider-Man #2: Left Edge 3D Wall Crawler & Peeker
 * - Peeks out from the left edge of the viewport
 * - Has 3D perspective tilt reacting to cursor coordinates
 * - Shoots a diagonal web thread across the screen on click!
 */
export const SpideyWallPeeker = () => {
  const [isPeeking, setIsPeeking] = useState(false);
  const [tilt, setTilt] = useState({ rotateY: 20, rotateX: 0 });
  const [webShot, setWebShot] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const W = window.innerWidth;
      const H = window.innerHeight;

      // When mouse is in the left 35% of the screen, Spidey peeks out!
      if (x < W * 0.35) {
        setIsPeeking(true);
        const normY = (y / H - 0.5) * 25;
        const normX = (x / (W * 0.35)) * 15;
        setTilt({ rotateY: normX, rotateX: -normY });
      } else {
        setIsPeeking(false);
        setTilt({ rotateY: 25, rotateX: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = () => {
    sound.playThwip();
    setWebShot(true);
    setTimeout(() => setWebShot(false), 900);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-25 pointer-events-auto select-none"
    >
      <motion.div
        animate={{
          x: isPeeking ? 10 : -35,
          rotateY: tilt.rotateY,
          rotateX: tilt.rotateX,
          scale: isPeeking ? 1.08 : 0.98
        }}
        transition={{ type: 'spring', damping: 18, stiffness: 190 }}
        whileHover={{ x: 15, scale: 1.12 }}
        onClick={handleClick}
        className="relative cursor-pointer group"
      >
        {/* Clean Transparent Spider-Man Wall Crawler */}
        <img
          src="/spidey/spidey-crouch-perfect.png?v=12"
          alt="Spider-Man Peeking"
          className="w-36 sm:w-48 md:w-56 h-auto drop-shadow-[0_12px_36px_rgba(239,68,68,0.75)] filter brightness-110 pointer-events-none select-none will-change-transform"
        />

        {/* Web Shooting Line Animation */}
        <AnimatePresence>
          {webShot && (
            <motion.div
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1, opacity: [1, 0.9, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute left-28 top-16 w-[350px] sm:w-[500px] h-[2px] bg-gradient-to-r from-white via-white/80 to-transparent origin-left shadow-[0_0_12px_rgba(255,255,255,1)] pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Peeking Badge */}
        <motion.div
          animate={{ opacity: isPeeking ? 1 : 0 }}
          className="absolute -right-6 top-6 px-2.5 py-1 rounded-full bg-red-600/90 text-[10px] font-mono font-bold text-white shadow-lg pointer-events-none whitespace-nowrap"
        >
          🕷️ WALL PATROL
        </motion.div>
      </motion.div>
    </div>
  );
};

