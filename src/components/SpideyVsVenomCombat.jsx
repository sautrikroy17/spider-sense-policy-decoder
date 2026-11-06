import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Zap, Shield, Sparkles, Volume2, Skull } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

const COMBAT_QUIPS = [
  {
    spidey: "Symbiote fine-print? Meet my web-shooters!",
    venom: "WE WILL DEVOUR YOUR POLICY CO-PAYS!",
    damage: 94
  },
  {
    spidey: "Section 4.2 room-rent cap? You want forgiveness? Get IRDAI!",
    venom: "NO STATUTORY OMBUDSMAN CAN SAVE YOU, PARKER!",
    damage: 120
  },
  {
    spidey: "THWIP! Tied you up with Section 45 Consumer Defense!",
    venom: "ARGHHH! THE PROPORTIONATE DEDUCTIONS ARE CRUMBLING!",
    damage: 145
  },
  {
    spidey: "I'm gonna put some IRDAI dirt in your eye, Eddie!",
    venom: "WE ARE THE 48-HOUR EMERGENCY VOID TRAP!",
    damage: 110
  }
];

export const SpideyVsVenomCombat = () => {
  const [combatIndex, setCombatIndex] = useState(0);
  const [isStriking, setIsStriking] = useState(false);
  const [spideyHealth, setSpideyHealth] = useState(100);
  const [venomHealth, setVenomHealth] = useState(100);
  const [tilt, setTilt] = useState({ rotateY: -15, rotateX: 5 });
  const [comboCount, setComboCount] = useState(0);
  const [showSparks, setShowSparks] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const normX = (e.clientX / W - 0.5) * 20;
      const normY = (e.clientY / H - 0.5) * 20;
      setTilt({ rotateY: -normX, rotateX: normY });

      // If mouse is on right 40% of screen, peek closer into battle
      if (e.clientX > W * 0.6) {
        setIsPeeking(true);
      } else {
        setIsPeeking(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleFightClick = () => {
    sound.playThwip();
    sound.playVineBoom();
    setIsStriking(true);
    setShowSparks(true);
    setComboCount((prev) => prev + 1);

    // Damage Venom
    setVenomHealth((prev) => Math.max(12, prev - 18));
    setCombatIndex((prev) => (prev + 1) % COMBAT_QUIPS.length);

    // Mini confetti combat spark
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { x: 0.88, y: 0.78 },
      colors: ['#ef4444', '#a855f7', '#ffffff', '#38bdf8']
    });

    setTimeout(() => {
      setShowSparks(false);
    }, 450);

    setTimeout(() => {
      setIsStriking(false);
    }, 700);
  };

  const currentQuip = COMBAT_QUIPS[combatIndex];

  return (
    <div
      style={{ perspective: 1200 }}
      className="fixed right-2 sm:right-6 bottom-16 sm:bottom-20 z-30 pointer-events-auto select-none"
    >
      <motion.div
        animate={{
          x: isPeeking ? 0 : 25,
          rotateY: tilt.rotateY,
          rotateX: tilt.rotateX,
          scale: isStriking ? 1.08 : (isPeeking ? 1.04 : 0.98)
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        onClick={handleFightClick}
        className="relative cursor-pointer group p-3 rounded-3xl bg-black/40 border border-red-500/30 backdrop-blur-md shadow-[0_12px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(239,68,68,0.25)]"
      >
        {/* Top Battle HUD Bar */}
        <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/10 text-[10px] font-mono">
          <div className="flex items-center gap-1 text-red-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span>SPIDEY VS VENOM</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 font-bold">
            ⚔️ BOSS CLASH
          </span>
        </div>

        {/* Combat Arena View */}
        <div className="relative w-64 sm:w-80 h-40 sm:h-48 flex items-center justify-between overflow-hidden mt-1">
          {/* Background Combat Aura */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-purple-600/20 rounded-2xl pointer-events-none" />

          {/* SPIDER-MAN (Striker / Defender) */}
          <motion.div
            animate={
              isStriking
                ? {
                    x: [0, 60, -10, 0],
                    y: [0, -25, 0],
                    rotateZ: [0, -15, 0],
                    scale: [1, 1.25, 1]
                  }
                : {
                    y: [0, -6, 0],
                    rotateZ: [-3, 3, -3]
                  }
            }
            transition={{
              duration: isStriking ? 0.6 : 3,
              repeat: isStriking ? 0 : Infinity,
              ease: 'easeInOut'
            }}
            className="relative z-10 w-28 sm:w-36 flex-shrink-0"
          >
            <img
              src="/spidey/spidey-jump-perfect.png?v=12"
              alt="Spider-Man Fighting"
              className="w-full h-auto drop-shadow-[0_10px_25px_rgba(239,68,68,0.85)] filter brightness-115"
            />

            {/* Dynamic Web Blast Filament */}
            <motion.div
              animate={isStriking ? { scaleX: [0, 1.2, 0], opacity: [0, 1, 0] } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/2 left-20 w-32 h-[3px] bg-gradient-to-r from-white via-red-400 to-transparent origin-left shadow-[0_0_12px_#ffffff] pointer-events-none"
            />
          </motion.div>

          {/* IMPACT SPARKS ON CLASH */}
          <AnimatePresence>
            {showSparks && (
              <motion.div
                initial={{ scale: 0, opacity: 1, rotate: 0 }}
                animate={{ scale: [0.5, 1.6, 0], opacity: [1, 1, 0], rotate: 45 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 via-red-500 to-purple-600 blur-[6px] opacity-90 animate-spin" />
                <span className="absolute inset-0 flex items-center justify-center font-black text-white text-xs font-cyber drop-shadow-[0_0_8px_#ffffff]">
                  💥 POW!
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* VENOM (Symbiote Boss) */}
          <motion.div
            animate={
              isStriking
                ? {
                    x: [0, 25, 5, 0],
                    rotateZ: [0, 12, 0],
                    scale: [1, 0.9, 1],
                    filter: ['drop-shadow(0 0 20px #a855f7)', 'drop-shadow(0 0 35px #ef4444)', 'drop-shadow(0 0 20px #a855f7)']
                  }
                : {
                    y: [0, 6, 0],
                    rotateZ: [2, -2, 2]
                  }
            }
            transition={{
              duration: isStriking ? 0.6 : 3.5,
              repeat: isStriking ? 0 : Infinity,
              ease: 'easeInOut'
            }}
            className="relative z-10 w-28 sm:w-36 flex-shrink-0 -ml-4"
          >
            <img
              src="/spidey/venom-clean.png"
              alt="Venom Boss"
              className="w-full h-auto drop-shadow-[0_12px_32px_rgba(168,85,247,0.7)] filter brightness-105"
            />

            {/* Symbiote Tendril Particle Effect */}
            <div className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-purple-500/80 blur-[2px] animate-ping pointer-events-none" />
          </motion.div>
        </div>

        {/* Live Combat Quip Subtitle */}
        <div className="mt-2 pt-2 border-t border-white/10 text-[11px] font-mono">
          <div className="text-red-400 font-bold truncate">
            🕸️ "{currentQuip.spidey}"
          </div>
          <div className="text-purple-300 font-bold truncate mt-0.5">
            👾 "{currentQuip.venom}"
          </div>
          <div className="flex items-center justify-between mt-2 text-[9px] text-zinc-400">
            <span>⚡ Tap to Web-Strike! (Hits: {comboCount})</span>
            <span className="text-emerald-400 font-bold">VENOM HP: {venomHealth}%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

