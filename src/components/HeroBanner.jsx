import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Shield, Terminal, ArrowDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';

export const HeroBanner = ({ onOpenDiceModal, onScrollToApp }) => {
  const { currentTheme, currentProblem } = useTheme();

  return (
    <section className="relative pt-12 pb-16 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      {/* Top Tag / Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs font-semibold uppercase tracking-widest text-zinc-300 mb-6 shadow-inner"
      >
        <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentTheme.accent }} />
        <span>{currentTheme.badge}</span>
        <span className="text-zinc-600">•</span>
        <span className="text-zinc-400">DICE [ {currentTheme.id} & {currentProblem.id} ]</span>
      </motion.div>

      {/* Main Punchy Title */}
      <motion.h1
        key={currentTheme.name + currentProblem.title}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white max-w-5xl leading-none"
        style={{ fontFamily: currentTheme.fontFamily }}
      >
        <span>{currentProblem.title}</span>
        <br />
        <span
          className="bg-clip-text text-transparent bg-gradient-to-r filter drop-shadow-lg"
          style={{
            backgroundImage: `linear-gradient(135deg, ${currentTheme.accent}, #ffffff, ${currentTheme.primary})`
          }}
        >
          {currentTheme.name} EDITION
        </span>
      </motion.h1>

      {/* Dynamic Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-6 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed"
      >
        {currentProblem.subtitle}
      </motion.p>

      {/* Character Quote Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mt-4 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm italic text-zinc-400 flex items-center gap-2"
      >
        <span>{currentTheme.mascot}</span>
        <span>{currentTheme.quote}</span>
      </motion.div>

      {/* CTA Button Group */}
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
          className="px-6 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95"
          style={{
            backgroundColor: currentTheme.accent,
            color: '#000000',
            boxShadow: `0 0 25px ${currentTheme.glowColor}`
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
          className="px-6 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all duration-200 flex items-center gap-2 hover:border-white/40"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>ROLL / SWITCH THEME</span>
        </button>
      </motion.div>

      {/* Problem Challenge Intel Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mt-12 w-full max-w-4xl p-5 sm:p-6 rounded-2xl border bg-zinc-950/70 backdrop-blur-xl text-left shadow-2xl"
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${currentTheme.accent}20`, color: currentTheme.accent }}
            >
              <Terminal className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white tracking-wide">
                MISSION BRIEFING: {currentProblem.category}
              </h3>
              <p className="text-xs text-zinc-400">Target Group: {currentProblem.targetAudience}</p>
            </div>
          </div>
          <span className="self-start sm:self-center px-2.5 py-1 text-[11px] font-mono font-bold rounded border uppercase tracking-wider bg-white/5 border-white/10 text-zinc-300">
            60-MIN DEADLINE
          </span>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
          {currentProblem.description}
        </p>

        <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500 border-t border-white/5 font-mono">
          <span>CHARACTER INFLUENCE: {currentTheme.name.toUpperCase()}</span>
          <span>EST. EXECUTION: &lt; 200MS</span>
          <span>ARCHITECTURE: ZERO DEPENDENCY CLIENT RUNTIME</span>
        </div>
      </motion.div>

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
