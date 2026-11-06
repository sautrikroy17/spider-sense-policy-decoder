import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Volume2,
  VolumeX,
  Radio,
  Activity,
  ShieldCheck,
  Cpu,
  ArrowDown,
  Scale,
  Zap,
  Terminal,
  Calculator,
  UploadCloud
} from 'lucide-react';
import { sound } from '../utils/soundEffects';
import { useTextScramble } from '../utils/useTextScramble';
import { SpotlightCard } from './ui/SpotlightCard';

export const HeroBanner = ({ onScrollToApp, onScrollToMath }) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Dynamic hacker text scramble
  const scrambledTitle = useTextScramble('POLICY DECODER', 20);
  const scrambledTheme = useTextScramble('SPIDEY SENSE', 25);

  const handleToggleMusic = () => {
    const next = sound.toggleSpiderTheme();
    setIsPlayingMusic(next);
  };

  return (
    <section className="relative pt-28 pb-16 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      
      {/* Top Cyber Telemetry Line */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] font-mono text-zinc-400"
      >
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 backdrop-blur-md text-red-400">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="font-bold uppercase tracking-wider">
            SPIDEY SENSE // AI POLICY FORENSICS
          </span>
        </span>

        <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Radio className="w-3 h-3 text-cyan-400" />
          <span>QUEENS & NEW YORK CONSUMER DEFENSE</span>
        </span>

        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-emerald-400 font-bold">
          ⚡ GROQ LPU ACTIVE (~140MS)
        </span>
      </motion.div>

      {/* Main Hero Title */}
      <div className="min-h-[140px] sm:min-h-[180px] flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white max-w-5xl leading-none select-none font-cyber">
          <span className="drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            {scrambledTitle}
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-300 to-blue-500 filter drop-shadow-[0_10px_35px_rgba(239,68,68,0.7)]">
            {scrambledTheme}
          </span>
        </h1>
      </div>

      {/* Hero Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-4 text-sm sm:text-base md:text-lg text-zinc-300 max-w-3xl font-mono leading-relaxed"
      >
        "Defeat the fine-print corporate syndicates. 40% room-rent traps, 48-hour emergency voids, and hidden co-pays stop here. With great premiums comes zero ambiguity."
      </motion.p>

      {/* Famous Movie Quote Pill + Audio Player */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mt-5 px-5 py-2.5 rounded-full bg-black/60 border border-red-500/30 text-xs text-zinc-300 flex items-center gap-3 backdrop-blur-xl shadow-[0_0_25px_rgba(239,68,68,0.2)]"
      >
        <span className="text-base">🕸️</span>
        <span className="italic text-zinc-300 font-mono">
          "With great power comes great responsibility — and zero hidden fine print."
        </span>

        {/* Music Play/Pause Button (NO BOUNCE) */}
        <button
          onClick={handleToggleMusic}
          className="ml-2 pl-3 border-l border-white/20 flex items-center gap-1.5 text-xs font-bold font-mono text-red-400 hover:text-white transition-colors"
        >
          {isPlayingMusic ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{isPlayingMusic ? 'ANNIHILATE [PLAYING]' : 'PLAY ANNIHILATE ♫'}</span>
        </button>
      </motion.div>

      {/* Hero CTA Button Group */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        {/* Main CTA: Jump to Policy Decoder */}
        <button
          onClick={() => {
            sound.playThwip();
            onScrollToApp();
          }}
          className="px-8 py-4 rounded-full font-black text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2.5 shadow-[0_0_35px_rgba(239,68,68,0.5)] hover:scale-105 active:scale-95 text-white bg-red-600 hover:bg-red-500"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>DECOMPILE A POLICY</span>
        </button>

        {/* Secondary CTA: Upload Policy PDF */}
        <button
          onClick={() => {
            sound.playThwip();
            const el = document.getElementById('policy-uploader');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else onScrollToApp();
          }}
          className="px-7 py-4 rounded-full font-bold text-sm tracking-wider uppercase bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 text-cyan-300 transition-all duration-200 flex items-center gap-2 shadow-xl hover:scale-105"
        >
          <UploadCloud className="w-4 h-4 text-cyan-400" />
          <span>UPLOAD POLICY PDF</span>
        </button>

        {/* Tertiary CTA: Aunt May Hospital Simulator */}
        <button
          onClick={() => {
            sound.playClick();
            onScrollToMath();
          }}
          className="px-7 py-4 rounded-full font-bold text-sm tracking-wider uppercase bg-white/5 hover:bg-white/15 border border-white/20 text-white transition-all duration-200 flex items-center gap-2 hover:border-red-500/50 shadow-xl"
        >
          <Calculator className="w-4 h-4 text-amber-400" />
          <span>AUNT MAY BILL SIMULATOR</span>
        </button>
      </motion.div>

      {/* Mission Briefing 3D Spotlight Card */}
      <div className="mt-12 w-full max-w-4xl">
        <SpotlightCard
          spotlightColor="rgba(239, 68, 68, 0.2)"
          glowColor="rgba(239, 68, 68, 0.35)"
          className="p-6 sm:p-8 text-left shadow-2xl bg-zinc-950/80 border border-red-500/30"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30">
                <Terminal className="w-6 h-6" />
              </span>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-white tracking-wide font-cyber">
                  POLICY DECODER // AUTONOMOUS IRDAI AUDIT ENGINE
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Engineered with Groq LPU™ (120B Parameters) & Supabase Real-Time Backend
                </p>
              </div>
            </div>
            <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-red-600/20 border border-red-500/40 text-red-400">
              ● CONSUMER DEFENSE
            </span>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
            "Policyholders make uninformed decisions because insurance documents are written in legal and technical language, obscuring exclusions and conditions that directly affect claim outcomes."
          </p>

          <div className="mt-6 pt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400 border-t border-white/5 font-mono">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-red-400" />
              HERO: SPIDER-MAN & CONSUMER DEFENSE
            </span>
            <span className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400" />
              GROQ LPU: ~140MS INFERENCE SPEED
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              IRDAI STATUTORY OMBUDSMAN REBUTTALS
            </span>
          </div>
        </SpotlightCard>
      </div>

      {/* Spider-Man Themed Down Indicator (Zero Bounce, Pure Glide) */}
      <button
        onClick={() => {
          sound.playThwip();
          onScrollToApp();
        }}
        className="mt-10 text-zinc-400 hover:text-white transition-colors flex flex-col items-center gap-2 text-xs font-mono group"
      >
        <span className="tracking-widest uppercase text-[11px] group-hover:text-red-400 transition-colors">
          EXPLORE POLICY DECODER
        </span>
        <div className="w-8 h-8 rounded-full border border-red-500/40 bg-red-600/10 flex items-center justify-center group-hover:border-red-500 group-hover:bg-red-600/25 transition-all shadow-[0_0_12px_rgba(239,68,68,0.3)]">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-red-500 group-hover:text-white transition-colors">
            <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>
    </section>
  );
};
