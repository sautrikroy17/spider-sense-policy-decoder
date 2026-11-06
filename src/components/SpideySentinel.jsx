import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/soundEffects';

/**
 * Spider-Man #3: Right Edge 3D Sentinel & Jumper
 * - Guards the Policy Decoder workspace
 * - Performs an interactive 3D spring leap on click/hover
 * - 100% transparent PNG with dynamic drop shadow
 */
export const SpideySentinel = () => {
  const [isLeaping, setIsLeaping] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const handleClick = () => {
    sound.playThwip();
    setIsLeaping(true);
    setShowTip(true);

    setTimeout(() => {
      setIsLeaping(false);
    }, 1200);

    setTimeout(() => {
      setShowTip(false);
    }, 3500);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="fixed right-0 bottom-24 z-25 pointer-events-auto select-none hidden md:block"
    >
      <motion.div
        animate={
          isLeaping
            ? {
                x: [-10, -60, 0],
                y: [0, -70, 0],
                rotateZ: [0, -18, 0],
                rotateY: [0, -35, 0],
                scale: [1, 1.25, 1]
              }
            : {
                y: [0, 6, 0]
              }
        }
        transition={{
          duration: isLeaping ? 1.2 : 3.5,
          repeat: isLeaping ? 0 : Infinity,
          ease: 'easeInOut'
        }}
        whileHover={{ x: -15, scale: 1.05 }}
        onClick={handleClick}
        className="relative cursor-pointer group"
      >
        {/* Transparent Spider-Man Leaping Graphic */}
        <img
          src="/spidey/spiderman-jump-web.png"
          alt="Spider-Man Sentinel"
          className="w-28 sm:w-36 md:w-44 h-auto drop-shadow-[0_12px_32px_rgba(239,68,68,0.65)] filter brightness-110"
        />

        {/* Tip Bubble */}
        <AnimatePresence>
          {showTip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -left-64 -top-16 w-60 p-3 rounded-2xl bg-black/90 border border-red-500/60 text-white text-xs font-mono shadow-2xl backdrop-blur-xl"
            >
              <div className="text-red-400 font-bold text-[10px] mb-0.5">
                ⚡ SPIDEY DECODER SENSE:
              </div>
              <p className="text-zinc-200 text-[11px] leading-tight">
                "Drop your policy PDF in the box above! Groq AI LPU decompiles the exclusions in 140ms flat!"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
