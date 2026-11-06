import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Terminal, ArrowDown, Radio, Activity, ShieldCheck, Cpu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';
import { useTextScramble } from '../utils/useTextScramble';
import { SpotlightCard } from './ui/SpotlightCard';

export const HeroBanner = ({ onOpenDiceModal, onScrollToApp }) => {
  const { currentTheme, currentProblem } = useTheme();

  // Dynamic hacker text scramble when theme or problem switches
  const scrambledTitle = useTextScramble(currentProblem.title, 20);
  const scrambledTheme = useTextScramble(`${currentTheme.name.toUpperCase()} EDITION`, 25);

  return (
    <section className="relative pt-24 pb-14 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      
      {/* Top Cyber Telemetry HUD Line */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] font-mono text-zinc-400"
      >
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentTheme.accent }} />
          <span className="font-bold text-white uppercase">{currentTheme.badge}</span>
        </span>

        <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Radio className="w-3 h-3 text-emerald-400" />
          <span>LOC: SRM CHENNAI [12.8231°N, 80.0442°E]</span>
        </span>

        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-amber-300 font-bold">
          DICE [ {currentTheme.id} & {currentProblem.id} ]
        </span>
      </motion.div>

      {/* Main Punchy Scrambled Title */}
      <div className="min-h-[140px] sm:min-h-[170px] flex flex-col items-center justify-center">
        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white max-w-5xl leading-none select-none"
          style={{ fontFamily: currentTheme.fontFamily }}
        >
          <span>{scrambledTitle}</span>
          <br />
          <span
            className="bg-clip-text text-transparent bg-gradient-to-r filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
            style={{
              backgroundImage: `linear-gradient(135deg, ${currentTheme.accent}, #ffffff, ${currentTheme.primary})`
            }}
          >
            {scrambledTheme}
          </span>
        </h1>
      </div>

      {/* Dynamic Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-4 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed"
      >
        {currentProblem.subtitle}
      </motion.p>

      {/* Live Equalizer + Character Quote Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mt-4 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-zinc-300 flex items-center gap-3 backdrop-blur-xl shadow-lg"
      >
        <span className="text-lg">{currentTheme.mascot}</span>
        <span className="italic text-zinc-400">{currentTheme.quote}</span>

        {/* Dynamic Equalizer Visualizer Bars */}
        <div className="hidden sm:flex items-center gap-0.5 ml-2 pl-3 border-l border-white/10">
          {[12, 24, 16, 28, 14, 22, 18, 26, 15].map((h, i) => (
            <motion.span
              key={i}
              animate={{
                height: [6, h, 8, h * 0.7, 6],
                opacity: [0.4, 1, 0.6, 0.9, 0.4]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.12,
                ease: 'easeInOut'
              }}
              className="w-1 rounded-full"
              style={{ backgroundColor: currentTheme.accent }}
            />
          ))}
        </div>
      </motion.div>

      {/* CTA Button Group with Magnetic Feel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <button
          onClick={() => {
            sound.playCharge();
            onScrollToApp();
          }}
          className="px-7 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 text-black"
          style={{
            backgroundColor: currentTheme.accent,
            boxShadow: `0 0 30px ${currentTheme.glowColor}`
          }}
        >
          <Play className="w-4 h-4 fill-black" />
          <span>EXECUTE SOLUTION</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onOpenDiceModal();
          }}
          className="px-6 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase bg-white/5 hover:bg-white/15 border border-white/15 text-white transition-all duration-200 flex items-center gap-2 hover:border-white/40 shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>ROLL / SWITCH THEME</span>
        </button>
      </motion.div>

      {/* 21st.dev 3D Spotlight Tilt Intel Card */}
      <div className="mt-12 w-full max-w-4xl">
        <SpotlightCard
          spotlightColor={currentTheme.accent + '25'}
          glowColor={currentTheme.glowColor}
          className="p-6 sm:p-7 text-left shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span
                className="p-2.5 rounded-xl border border-white/10"
                style={{ backgroundColor: `${currentTheme.accent}20`, color: currentTheme.accent }}
              >
                <Terminal className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-white tracking-wide font-cyber">
                  MISSION BRIEFING: {currentProblem.category}
                </h3>
                <p className="text-xs text-zinc-400">Target Group: {currentProblem.targetAudience}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-full border uppercase tracking-wider bg-white/5 border-white/10 text-emerald-400">
                ● 60-MIN DEADLINE
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
            {currentProblem.description}
          </p>

          <div className="mt-5 pt-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400 border-t border-white/5 font-mono">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              INFLUENCE: {currentTheme.name.toUpperCase()}
            </span>
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              EXECUTION: &lt; 150MS
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              CLIENT EDGE ARCHITECTURE
            </span>
          </div>
        </SpotlightCard>
      </div>

      {/* Down Indicator */}
      <button
        onClick={onScrollToApp}
        className="mt-8 text-zinc-500 hover:text-white transition-colors flex flex-col items-center gap-1 text-xs"
      >
        <span>INTERACTIVE WORKSPACE</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};
