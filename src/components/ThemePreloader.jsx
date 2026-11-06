import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';

// Vector SVG Emblems for each of the 6 Character Themes
const THEME_EMBLEMS = {
  // 1: Shinchan / Action Kamen Mask & Beam
  1: (color) => (
    <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]">
      <path
        d="M20,35 Q50,15 80,35 Q85,70 50,85 Q15,70 20,35 Z"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
      />
      <circle cx="35" cy="45" r="8" fill={color} />
      <circle cx="65" cy="45" r="8" fill={color} />
      <path d="M35,65 Q50,75 65,65" stroke={color} strokeWidth="3" fill="none" />
      <polygon points="50,10 43,25 57,25" fill={color} />
    </svg>
  ),
  // 2: Spider-Man Tactical Spider Insignia (Exact match to hackthesinisters reference!)
  2: (color) => (
    <svg viewBox="0 0 100 100" className="w-24 h-24 filter drop-shadow-[0_0_20px_rgba(239,68,68,0.7)]">
      {/* Spider Head & Body */}
      <polygon points="50,25 43,38 50,45 57,38" fill={color} />
      <polygon points="50,47 41,60 50,80 59,60" fill={color} />
      {/* Left Legs */}
      <path d="M43,36 L25,18 L18,28" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M41,43 L20,35 L12,48" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M41,52 L18,62 L15,76" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M44,60 L28,78 L26,92" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Right Legs */}
      <path d="M57,36 L75,18 L82,28" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M59,43 L80,35 L88,48" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M59,52 L82,62 L85,76" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M56,60 L72,78 L74,92" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  // 3: Kick Buttowski Stunt Skull / Flame Helmet
  3: (color) => (
    <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_0_16px_rgba(249,115,22,0.6)]">
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth="3.5" />
      {/* Red racing stripe */}
      <rect x="46" y="18" width="8" height="64" fill="#ef4444" />
      <polygon points="50,28 35,68 65,68" fill="none" stroke={color} strokeWidth="2.5" />
      <polygon points="50,38 42,58 58,58" fill={color} />
    </svg>
  ),
  // 4: Dragon Ball 4-Star Ball
  4: (color) => (
    <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_0_20px_rgba(234,179,8,0.7)]">
      <circle cx="50" cy="50" r="35" fill="none" stroke={color} strokeWidth="3.5" />
      {/* 4 Stars */}
      <polygon points="50,32 52,38 58,38 53,42 55,48 50,44 45,48 47,42 42,38 48,38" fill="#ef4444" />
      <polygon points="50,68 52,74 58,74 53,78 55,84 50,80 45,84 47,78 42,74 48,74" fill="#ef4444" />
      <polygon points="32,50 34,56 40,56 35,60 37,66 32,62 27,66 29,60 24,56 30,56" fill="#ef4444" />
      <polygon points="68,50 70,56 76,56 71,60 73,66 68,62 63,66 65,60 60,56 66,56" fill="#ef4444" />
    </svg>
  ),
  // 5: Harry Potter Deathly Hallows & Scar
  5: (color) => (
    <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_0_18px_rgba(217,119,6,0.6)]">
      <polygon points="50,20 18,78 82,78" fill="none" stroke={color} strokeWidth="3" />
      <circle cx="50" cy="58" r="20" fill="none" stroke={color} strokeWidth="3" />
      <line x1="50" y1="20" x2="50" y2="78" stroke={color} strokeWidth="3" />
    </svg>
  ),
  // 6: Super Mario 8-Bit Pixel Mushroom
  6: (color) => (
    <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_0_18px_rgba(239,68,68,0.7)]">
      {/* Mushroom Cap */}
      <path d="M25,50 Q25,20 50,20 Q75,20 75,50 Z" fill={color} />
      <circle cx="38" cy="38" r="6" fill="#ffffff" />
      <circle cx="62" cy="38" r="6" fill="#ffffff" />
      <circle cx="50" cy="28" r="5" fill="#ffffff" />
      {/* Stem */}
      <rect x="35" y="50" width="30" height="25" rx="4" fill="#fde047" stroke={color} strokeWidth="2" />
      <circle cx="42" cy="62" r="2.5" fill="#000000" />
      <circle cx="58" cy="62" r="2.5" fill="#000000" />
    </svg>
  )
};

export const ThemePreloader = ({ onFinish }) => {
  const { currentTheme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('AUTHENTICATING NODE...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    sound.playCharge();

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 3;
        if (next >= 100) {
          clearInterval(interval);
          setStatusText('ACCESS GRANTED.');
          sound.playSuccess();
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onFinish, 600);
          }, 400);
          return 100;
        }

        if (next > 70) setStatusText('INJECTING CLIENT RUNTIME...');
        else if (next > 45) setStatusText('CALIBRATING CYBER TELEMETRY...');
        else if (next > 20) setStatusText('INITIALIZING ROGUE PROTOCOL...');

        return next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onFinish]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04, filter: 'blur(16px)' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center p-6 text-white select-none"
      >
        {/* Glowing Centered Emblem with Pulse */}
        <motion.div
          animate={{
            scale: [0.95, 1.08, 0.95],
            opacity: [0.85, 1, 0.85]
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-8"
        >
          {THEME_EMBLEMS[currentTheme.id]
            ? THEME_EMBLEMS[currentTheme.id](currentTheme.accent)
            : THEME_EMBLEMS[2](currentTheme.accent)}
        </motion.div>

        {/* Status Text (ACCESS GRANTED.) */}
        <motion.div
          key={statusText}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] uppercase mb-4 text-center"
          style={{ color: progress === 100 ? '#22c55e' : currentTheme.accent }}
        >
          {statusText}
        </motion.div>

        {/* Progress Bar (Exact reference style from Image 2!) */}
        <div className="w-full max-w-xs space-y-2">
          <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden border border-white/10">
            <motion.div
              className="h-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                backgroundColor: currentTheme.accent,
                boxShadow: `0 0 12px ${currentTheme.glowColor}`
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
          ROGUEHACK 1.0 • SRMIST HTB INTRA-CLUB HACKATHON
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

