import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/soundEffects';

const SPIDEY_QUIPS = [
  "With great power comes great responsibility — and zero room-rent deductions!",
  "Doc Ock is hiding inside that 40% co-pay clause!",
  "Room-rent capping? You'll get your rent when you fix this damn fine print!",
  "Aunt May says: Always decompile Section 4.2 before signing!",
  "THWIP! Caught another sneaky exclusion in the act!",
  "Gonna cry? Put some IRDAI dirt in the insurer's eye!"
];

export const HangingSpiderman = () => {
  const [quipIndex, setQuipIndex] = useState(0);
  const [showSpeech, setShowSpeech] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  const handleClick = () => {
    sound.playThwip();
    setIsJumping(true);
    setQuipIndex((prev) => (prev + 1) % SPIDEY_QUIPS.length);
    setShowSpeech(true);

    setTimeout(() => {
      setIsJumping(false);
    }, 1800);

    setTimeout(() => {
      setShowSpeech(false);
    }, 4000);
  };

  return (
    <div className="fixed top-0 right-8 sm:right-20 z-30 pointer-events-auto select-none">
      {/* Spider-Man Web Filament Line */}
      <motion.div
        animate={
          isJumping
            ? { height: [80, 220, 80] }
            : { scaleY: [1, 1.05, 0.98, 1], opacity: [0.85, 1, 0.85] }
        }
        transition={{ duration: isJumping ? 1.8 : 3.5, repeat: isJumping ? 0 : Infinity }}
        className="w-[2px] h-20 sm:h-24 mx-auto origin-top bg-gradient-to-b from-white via-white/80 to-white/40 shadow-[0_0_10px_rgba(255,255,255,0.9)]"
      />

      {/* Hanging / Jumping 3D Spider-Man Container */}
      <motion.div
        animate={
          isJumping
            ? {
                y: [0, 140, -10, 0],
                rotateY: [0, 180, 360],
                rotateZ: [-6, 20, -10, 0],
                scale: [1, 1.35, 0.95, 1]
              }
            : {
                rotateZ: [-5, 5, -5],
                y: [0, 8, 0]
              }
        }
        transition={{
          duration: isJumping ? 1.8 : 4,
          repeat: isJumping ? 0 : Infinity,
          ease: 'easeInOut'
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="relative cursor-pointer origin-top -mt-2 group"
      >
        {/* 100% Clean Isolated Transparent Spider-Man Hanging Upside Down */}
        <img
          src="/spidey/spidey-hanging-perfect.png?v=12"
          alt="Spider-Man Hanging"
          className="w-24 sm:w-32 md:w-36 h-auto drop-shadow-[0_12px_28px_rgba(239,68,68,0.8)] pointer-events-none select-none will-change-transform"
        />

        {/* Comic Speech Bubble */}
        <AnimatePresence>
          {showSpeech && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              className="absolute -left-64 top-20 w-60 p-3.5 rounded-2xl bg-zinc-950/95 text-white text-xs font-bold font-sans shadow-2xl border-2 border-red-500 leading-snug backdrop-blur-xl"
            >
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-red-400 uppercase mb-1">
                <span>🕷️ SPIDEY ALERT:</span>
              </div>
              <p>"{SPIDEY_QUIPS[quipIndex]}"</p>
              <span className="text-[9px] font-mono text-zinc-400 block mt-1.5">
                ⚡ Tap me to swing & jump!
              </span>
              <div className="absolute top-4 -right-2 w-3 h-3 bg-zinc-950 border-t-2 border-r-2 border-red-500 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
