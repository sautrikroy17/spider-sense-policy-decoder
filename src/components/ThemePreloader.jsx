import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/soundEffects';

export const ThemePreloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('AUTHENTICATING SPIDER-SENSE NODE...');
  const [isDone, setIsDone] = useState(false);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    try {
      sound.playCharge();
    } catch {}

    // Hard fail-safe: never trap user on black screen for >1.2s under any circumstances
    const safetyTimer = setTimeout(() => {
      setIsDone(true);
      if (onFinishRef.current) onFinishRef.current();
    }, 1200);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 12) + 8;
        if (next >= 100) {
          clearInterval(interval);
          setStatusText('ACCESS GRANTED.');
          try {
            sound.playSuccess();
          } catch {}
          setTimeout(() => {
            setIsDone(true);
            if (onFinishRef.current) onFinishRef.current();
          }, 250);
          return 100;
        }

        if (next > 75) setStatusText('INJECTING CONSUMER DEFENSE PROTOCOL...');
        else if (next > 45) setStatusText('CALIBRATING FINE-PRINT RADAR...');
        else if (next > 20) setStatusText('INITIALIZING SPIDER-SENSE 2.0...');

        return next;
      });
    }, 40);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
    };
  }, []);

  if (isDone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04, filter: 'blur(16px)' }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center p-6 text-white select-none overflow-hidden"
      >
        {/* Subtle Cyber Hex Grid in Background (HackTheSinisters match) */}
        <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        {/* Scanline Sweep */}
        <div className="absolute inset-0 crt-overlay opacity-30 pointer-events-none" />

        {/* Authentic Spider-Man Official Red Logo */}
        <motion.div
          animate={{
            scale: [0.96, 1.06, 0.96],
            filter: [
              'drop-shadow(0 0 15px rgba(239,68,68,0.7))',
              'drop-shadow(0 0 35px rgba(239,68,68,0.95))',
              'drop-shadow(0 0 15px rgba(239,68,68,0.7))'
            ]
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-8 w-24 sm:w-32 flex items-center justify-center"
        >
          <img
            src="/spidey/authentic-spidey-logo.svg"
            alt="Spider-Man Official Logo"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* Status Text (ACCESS GRANTED.) */}
        <motion.div
          key={statusText}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs sm:text-sm font-mono font-bold tracking-[0.3em] uppercase mb-4 text-center"
          style={{ color: progress === 100 ? '#22c55e' : '#ef4444' }}
        >
          {statusText}
        </motion.div>

        {/* Progress Bar (Exact reference style from Image 2!) */}
        <div className="w-full max-w-xs space-y-2">
          <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden border border-white/10">
            <motion.div
              className="h-full transition-all duration-100 bg-red-600"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 14px rgba(239,68,68,0.8)'
              }}
            />
          </div>

          {/* Percentage Indicator */}
          <div className="text-center font-mono text-[11px] font-bold tracking-widest text-zinc-400">
            {progress}%
          </div>
        </div>

        {/* Event Sub-text */}
        <div className="absolute bottom-8 text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
          ROGUEHACK 1.0 • SPIDER-MAN PROTOCOL // PS 04 POLICY DECODER
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
