import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/soundEffects';

/**
 * Spider-Man #3: Right Edge 3D Wall Peeker & Leaper
 * - Peeks out from the right edge of the screen
 * - Reacts to cursor movement with 3D perspective tilt
 * - Performs an interactive 3D spring leap & shoots web on click!
 * - 100% transparent PNG with dynamic drop shadow
 */
export const SpideySentinel = () => {
  const [isPeeking, setIsPeeking] = useState(false);
  const [tilt, setTilt] = useState({ rotateY: -20, rotateX: 0 });
  const [isLeaping, setIsLeaping] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [webShot, setWebShot] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const W = window.innerWidth;
      const H = window.innerHeight;

      // When mouse is in the right 35% of the screen, Spidey peeks out from the right!
      if (x > W * 0.65) {
        setIsPeeking(true);
        const normY = (y / H - 0.5) * 25;
        const normX = ((W - x) / (W * 0.35)) * 15;
        setTilt({ rotateY: -normX, rotateX: -normY });
      } else {
        setIsPeeking(false);
        setTilt({ rotateY: -20, rotateX: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = () => {
    sound.playThwip();
    setIsLeaping(true);
    setWebShot(true);
    setShowTip(true);

    setTimeout(() => {
      setWebShot(false);
    }, 900);

    setTimeout(() => {
      setIsLeaping(false);
    }, 1400);

    setTimeout(() => {
      setShowTip(false);
    }, 3800);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="fixed right-0 top-2/3 -translate-y-1/2 z-25 pointer-events-auto select-none"
    >
      <motion.div
        animate={
          isLeaping
            ? {
                x: [-10, -90, -30, 0],
                y: [0, -120, -20, 0],
                rotateZ: [0, 22, -10, 0],
                rotateY: [tilt.rotateY, -50, 20, tilt.rotateY],
                scale: [1, 1.35, 0.95, 1]
              }
            : {
                x: isPeeking ? -10 : 35,
                rotateY: tilt.rotateY,
                rotateX: tilt.rotateX,
                scale: isPeeking ? 1.08 : 0.98,
                y: [0, 6, 0]
              }
        }
        transition={{
          duration: isLeaping ? 1.4 : 3.5,
          repeat: isLeaping ? 0 : Infinity,
          ease: 'easeInOut'
        }}
        whileHover={{ x: -25, scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleClick}
        className="relative cursor-pointer group"
      >
        {/* Clean Transparent Spider-Man Leaping Sentinel */}
        <img
          src="/spidey/spidey-jump-perfect.png?v=12"
          alt="Spider-Man Peeking Right"
          className="w-32 sm:w-44 md:w-52 h-auto drop-shadow-[0_16px_36px_rgba(239,68,68,0.75)] filter brightness-110 pointer-events-none select-none will-change-transform"
        />

        {/* Web Shooting Line Animation to the Left */}
        <AnimatePresence>
          {webShot && (
            <motion.div
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1, opacity: [1, 0.9, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute right-28 top-16 w-[350px] sm:w-[500px] h-[2px] bg-gradient-to-l from-white via-white/80 to-transparent origin-right shadow-[0_0_12px_rgba(255,255,255,1)] pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Tip Bubble */}
        <AnimatePresence>
          {showTip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              className="absolute -left-64 -top-16 w-60 p-3 rounded-2xl bg-black/90 border border-red-500/60 text-white text-xs font-mono shadow-2xl backdrop-blur-xl"
            >
              <div className="text-red-400 font-bold text-[10px] mb-0.5">
                ⚡ SPIDEY DECODER SENSE:
              </div>
              <p className="text-zinc-200 text-[11px] leading-tight font-sans">
                "Drop your policy PDF in the box above! Groq AI LPU decompiles the exclusions in 140ms flat!"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Peeking Badge */}
        <motion.div
          animate={{ opacity: isPeeking ? 1 : 0 }}
          className="absolute -left-6 top-6 px-2.5 py-1 rounded-full bg-red-600/90 text-[10px] font-mono font-bold text-white shadow-lg pointer-events-none whitespace-nowrap"
        >
          🕷️ SPIDEY SENTRY
        </motion.div>
      </motion.div>
    </div>
  );
};
