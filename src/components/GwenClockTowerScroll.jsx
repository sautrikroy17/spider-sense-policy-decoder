import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, Clock, ArrowDown, Sparkles, Volume2, ShieldAlert, ChevronUp, Play } from 'lucide-react';
import { sound } from '../utils/soundEffects';

/**
 * 🎬 The Amazing Spider-Man 2: Clock Tower Freefall Scroll Climax
 * Recreates the heartbreaking climax of TASM 2 via scroll physics:
 * - 0% to 35%: Gwen Stacy freefall downwards through spinning 3D clock gears, Peter dives from top
 * - 35% to 75%: Spider-Man shoots desperate glowing web line towards her reaching hand
 * - 75% to 100%: Bottom climax reveals Peter Parker cradling Gwen Stacy in his arms, weeping, clock frozen at 1:21
 */
export const GwenClockTowerScroll = () => {
  const { scrollYProgress } = useScroll();
  const [scrollPct, setScrollPct] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasPlayedHeartbeat, setHasPlayedHeartbeat] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScrollPct(Math.round(latest * 100));
      if (latest > 0.65 && !hasPlayedHeartbeat) {
        sound.playSpiderSense();
        setHasPlayedHeartbeat(true);
      } else if (latest < 0.4) {
        setHasPlayedHeartbeat(false);
      }
    });
  }, [scrollYProgress, hasPlayedHeartbeat]);

  // Motion transforms driven by scroll
  const spideyDiveY = useTransform(scrollYProgress, [0, 0.4, 0.75], [-40, 120, 260]);
  const gwenFallY = useTransform(scrollYProgress, [0, 0.4, 0.75], [160, 290, 420]);
  const webLength = useTransform(scrollYProgress, [0.3, 0.72], [0, 100]);
  const webOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.75, 0.82], [0, 1, 1, 0]);
  const climaxOpacity = useTransform(scrollYProgress, [0.75, 0.88, 1], [0, 0.85, 1]);
  const freefallOpacity = useTransform(scrollYProgress, [0, 0.75, 0.82], [1, 1, 0]);

  const handleRewind = () => {
    sound.playThwip();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Left Side Altimeter HUD & Story Status Pill */}
      <div className="fixed bottom-6 left-6 z-30 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 bg-black/85 backdrop-blur-xl border border-red-500/40 px-4 py-2.5 rounded-2xl shadow-[0_0_25px_rgba(239,68,68,0.3)] font-mono text-xs text-white"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping absolute" />
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 relative" />
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3 text-red-400" />
              <span>CLOCK TOWER • {scrollPct < 80 ? 'FREEFALL' : '1:21 AM'}</span>
            </span>
            <span className="text-xs font-cyber font-bold text-red-400">
              {scrollPct < 40 && `ALT: ${Math.max(10, 320 - scrollPct * 3)}FT // DIVING`}
              {scrollPct >= 40 && scrollPct < 80 && `WEB FIRED // ${(scrollPct - 40) * 2.5}% DIST`}
              {scrollPct >= 80 && `GWEN IN PETER'S ARMS`}
            </span>
          </div>

          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="ml-2 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] text-zinc-300 transition-colors"
            title={isMinimized ? 'Expand Story HUD' : 'Minimize Story HUD'}
          >
            {isMinimized ? 'EXPAND' : 'HIDE'}
          </button>
        </motion.div>
      </div>

      {/* 2. Floating Story Freefall Stage (Positioned on the Left Edge for Perfect Symmetry) */}
      {!isMinimized && (
        <aside
          aria-label="Clock Tower Freefall Animation"
          className="fixed top-28 left-4 sm:left-6 z-20 pointer-events-none w-72 sm:w-80 h-[490px] select-none hidden lg:block"
        >
          {/* Outer Glass Frame */}
          <div className="relative w-full h-full rounded-3xl bg-black/45 backdrop-blur-md border border-red-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(239,68,68,0.2)] overflow-hidden pointer-events-auto">
            
            {/* Top Atmospheric Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none z-10" />

            {/* Subtle Clock Dial Inscription in Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <svg viewBox="0 0 200 200" className="w-72 h-72 text-red-500 fill-none stroke-current" strokeWidth="1.5">
                <circle cx="100" cy="100" r="90" strokeDasharray="3,6" />
                <line x1="100" y1="100" x2="140" y2="45" stroke="#ef4444" strokeWidth="2" />
                <line x1="100" y1="100" x2="165" y2="130" stroke="#fff" strokeWidth="1.5" />
              </svg>
            </div>

            {/* STAGE A: Freefall Sequence (Progress 0.0 - 0.75) */}
            <motion.div style={{ opacity: freefallOpacity }} className="absolute inset-0">
              
              {/* Header Badge */}
              <div className="absolute top-3 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-[10px] font-mono text-red-300">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                <span>SCROLL TO DIVE & SAVE GWEN</span>
              </div>

              {/* Spider-Man Diving Downwards */}
              <motion.div
                style={{ y: spideyDiveY }}
                className="absolute left-1/2 -translate-x-1/2 w-32 h-36 z-20 filter drop-shadow-[0_10px_25px_rgba(239,68,68,0.6)]"
              >
                <img
                  src="/spidey/spiderman-andrew-web.png"
                  alt="Andrew Garfield Spider-Man Diving"
                  className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] transform rotate-12"
                />

                {/* Dialogue Whisper */}
                {scrollPct > 15 && scrollPct < 65 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-6 -left-12 bg-black/90 border border-red-500/60 text-white text-[10px] font-mono px-2 py-1 rounded-lg whitespace-nowrap shadow-lg pointer-events-none"
                  >
                    "GWEN! Hold on!"
                  </motion.div>
                )}
              </motion.div>

              {/* Glowing Dynamic 3D Web Shooter Strand */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 z-15 pointer-events-none"
                style={{
                  top: '180px',
                  width: '3px',
                  height: '140px',
                  background: 'linear-gradient(180deg, #ffffff, #ef4444, #ffffff)',
                  boxShadow: '0 0 15px 3px rgba(255,255,255,0.9), 0 0 30px #ef4444',
                  transformOrigin: 'top center',
                  opacity: webOpacity
                }}
              />

              {/* Gwen Stacy Freefalling (Cutout) */}
              <motion.div
                style={{ y: gwenFallY }}
                className="absolute left-1/2 -translate-x-1/2 w-32 h-44 z-20 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
              >
                <img
                  src="/spidey/gwen-falling.png"
                  alt="Gwen Stacy Falling"
                  className="w-full h-full object-contain filter brightness-105 contrast-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                />

                {/* Gwen Dialogue Whisper */}
                {scrollPct > 35 && scrollPct < 75 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-2 -right-8 bg-black/90 border border-cyan-400/50 text-cyan-200 text-[10px] font-mono px-2 py-1 rounded-lg whitespace-nowrap shadow-lg pointer-events-none"
                  >
                    "PETER!!"
                  </motion.div>
                )}
              </motion.div>

              {/* Bottom Depth Warning Altimeter (NO BOUNCE) */}
              <div className="absolute bottom-3 inset-x-4 z-20 flex items-center justify-between text-[10px] font-mono text-zinc-400 bg-black/60 px-3 py-1.5 rounded-xl border border-white/5">
                <span className="flex items-center gap-1">
                  <ArrowDown className="w-3 h-3 text-red-500 opacity-80" />
                  <span>SCROLL DOWN</span>
                </span>
                <span className="text-red-400 font-bold">{scrollPct}% DEPTH</span>
              </div>
            </motion.div>

            {/* STAGE B: Bottom Climax Scene (Progress 0.75 - 1.0) */}
            <motion.div
              style={{ opacity: climaxOpacity }}
              className="absolute inset-0 z-30 flex flex-col justify-between p-4 bg-gradient-to-b from-black/90 via-black/95 to-black text-white pointer-events-auto"
            >
              {/* Climax Scene Header */}
              <div className="flex items-center justify-between pb-2 border-b border-red-500/30">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                  <span className="text-xs font-cyber font-bold tracking-wider text-red-400">
                    THE CLOCK TOWER
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">1:21 AM</span>
              </div>

              {/* Movie Still: Peter Weeping over Gwen */}
              <div className="relative my-2 rounded-2xl overflow-hidden border border-red-500/40 shadow-[0_0_25px_rgba(239,68,68,0.4)] aspect-video bg-black">
                <img
                  src="/spidey/spiderman-cradling-gwen.jpg"
                  alt="Spider-Man cradling Gwen Stacy in the clock tower"
                  className="w-full h-full object-cover filter brightness-95 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-mono text-zinc-300">
                  Andrew Garfield & Emma Stone • TASM 2
                </span>
              </div>

              {/* Tragic Eulogy Quote */}
              <div className="space-y-1.5 font-sans text-left">
                <p className="text-xs sm:text-[13px] text-zinc-200 italic leading-snug">
                  "Peter, stay with me... please don't go. I'm sorry. I'm so sorry..."
                </p>
                <p className="text-[10px] font-mono text-red-400 font-bold">
                  — Peter Parker weeping over Gwen Stacy
                </p>
              </div>

              {/* Rewind Action */}
              <button
                onClick={handleRewind}
                className="w-full mt-2 py-2 rounded-xl bg-red-600/30 hover:bg-red-600/50 border border-red-500 text-xs font-mono font-bold text-white flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] active:scale-95"
              >
                <ChevronUp className="w-3.5 h-3.5" />
                <span>RELIVE FREEFALL (SCROLL TO TOP)</span>
              </button>
            </motion.div>
          </div>
        </aside>
      )}
    </>
  );
};