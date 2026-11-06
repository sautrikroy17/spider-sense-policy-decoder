import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/soundEffects';

const SPIDEY_QUIPS = [
  "Hey! Looking for hidden fine-print traps?",
  "Doc Ock is hiding in your room-rent clause!",
  "Room-rent capping? You'll get your rent when you fix this damn door!",
  "Aunt May says: Always read Section 4.2(b) before signing!",
  "THWIP! Caught another 40% co-pay deduction in the act!",
  "Gonna cry? Put some IRDAI dirt in the insurer's eye!"
];

export const HangingSpiderman = () => {
  const [quipIndex, setQuipIndex] = useState(0);
  const [showSpeech, setShowSpeech] = useState(false);
  const [isSwinging, setIsSwinging] = useState(true);

  const handleClick = () => {
    sound.playThwip();
    setQuipIndex((prev) => (prev + 1) % SPIDEY_QUIPS.length);
    setShowSpeech(true);
    setTimeout(() => setShowSpeech(false), 3500);
  };

  const handleMouseEnter = () => {
    sound.playHover();
    setShowSpeech(true);
  };

  const handleMouseLeave = () => {
    setShowSpeech(false);
  };

  return (
    <div className="fixed top-0 right-6 sm:right-16 z-30 pointer-events-auto select-none">
      {/* Spider-Man Web Rope Line extending from top of viewport */}
      <motion.div
        animate={{
          scaleY: [1, 1.05, 0.98, 1],
          opacity: [0.85, 1, 0.85]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-[2px] h-20 sm:h-28 mx-auto origin-top bg-gradient-to-b from-white via-white/80 to-white/40 shadow-[0_0_8px_rgba(255,255,255,0.9)]"
      />

      {/* Hanging Upside Down Spider-Man Container */}
      <motion.div
        animate={
          isSwinging
            ? {
                rotate: [-6, 6, -6],
                y: [0, 8, 0]
              }
            : {}
        }
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        whileHover={{
          scale: 1.08,
          y: 12,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-pointer origin-top -mt-2 group"
      >
        {/* Transparent PNG of Spider-Man Hanging Upside Down */}
        <img
          src="/spidey/spiderman-hanging.png"
          alt="Spider-Man Hanging Upside Down"
          className="w-24 sm:w-32 md:w-36 h-auto drop-shadow-[0_12px_24px_rgba(239,68,68,0.6)] filter brightness-110 contrast-105"
        />

        {/* Comic Speech Bubble */}
        <AnimatePresence>
          {showSpeech && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              className="absolute -left-56 sm:-left-64 top-24 w-52 sm:w-60 p-3 rounded-2xl bg-white text-black text-xs font-bold font-sans shadow-2xl border-2 border-red-600 leading-snug"
            >
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-red-600 uppercase mb-1">
                <span>🕷️ SPIDEY SAYS:</span>
              </div>
              <p>"{SPIDEY_QUIPS[quipIndex]}"</p>
              <span className="text-[9px] font-mono text-zinc-500 block mt-1">
                Tap me to shoot webs!
              </span>
              {/* Pointer triangle */}
              <div className="absolute top-4 -right-2 w-3 h-3 bg-white border-t-2 border-r-2 border-red-600 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

