import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Volume2,
  Monitor,
  Sparkles,
  Terminal,
  FileSearch,
  UploadCloud,
  Calculator,
  Scale,
  Play,
  Zap,
  Music
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';

export const SidebarDrawer = ({ isOpen, onClose, onReplayPreloader }) => {
  const { isMuted, toggleSound, crtEnabled, toggleCrt } = useTheme();

  const scrollTo = (id) => {
    onClose();
    sound.playHover();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#090a10]/95 border-l border-red-500/30 shadow-2xl flex flex-col backdrop-blur-2xl text-white overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-600/20 border border-red-500 flex items-center justify-center text-sm shadow-[0_0_12px_rgba(239,68,68,0.5)]">
                  <span>🕸️</span>
                </div>
                <div>
                  <h3 className="font-cyber font-bold text-sm tracking-wide text-white">
                    SPIDER-SENSE COMMAND DECK
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    Autonomous Policy Defense Suite
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {/* Mission Intelligence Card */}
              <div className="p-4 rounded-2xl border border-red-500/40 bg-gradient-to-br from-red-950/40 via-black to-zinc-900/60 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold">
                    ACTIVE FORENSIC ENGINE
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    GROQ LPU READY
                  </span>
                </div>
                <div className="text-base font-bold text-white font-cyber">
                  SPIDER-MAN POLICY DECODER
                </div>
                <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                  "Defending policyholders against 40% room-rent traps, 48-hour emergency voids, and hidden co-pays."
                </p>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      if (onReplayPreloader) onReplayPreloader();
                    }}
                    className="flex-1 py-2 px-3 rounded-xl font-bold text-xs uppercase tracking-wider border border-red-500/40 bg-red-600/20 hover:bg-red-600/40 text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 text-red-400 fill-red-400" /> Replay Intro
                  </button>
                  <button
                    onClick={() => {
                      sound.toggleSpiderTheme();
                    }}
                    className="py-2 px-3 rounded-xl font-bold text-xs uppercase tracking-wider border border-white/10 bg-white/5 hover:bg-white/15 text-zinc-300 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Music className="w-3.5 h-3.5 text-cyan-400" /> Theme Song
                  </button>
                </div>
              </div>

              {/* Navigation Shortcuts */}
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2.5">
                  DEFENSE WORKSPACES
                </span>
                <div className="space-y-1.5">
                  <button
                    onClick={() => scrollTo('decoder')}
                    className="w-full p-3 rounded-xl border border-white/10 bg-zinc-900/60 hover:bg-zinc-800 text-left transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileSearch className="w-4 h-4 text-red-400" />
                      <span className="text-xs font-bold text-white">Policy Decoder Workstation</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 group-hover:text-red-400">JUMP →</span>
                  </button>

                  <button
                    onClick={() => scrollTo('policy-uploader')}
                    className="w-full p-3 rounded-xl border border-white/10 bg-zinc-900/60 hover:bg-zinc-800 text-left transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <UploadCloud className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-bold text-white">Document Scanner (PDF / TXT)</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 group-hover:text-cyan-400">JUMP →</span>
                  </button>

                  <button
                    onClick={() => scrollTo('aunt-may-calculator')}
                    className="w-full p-3 rounded-xl border border-white/10 bg-zinc-900/60 hover:bg-zinc-800 text-left transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Calculator className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-white">Aunt May Hospital Bill Simulator</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 group-hover:text-amber-400">JUMP →</span>
                  </button>

                  <button
                    onClick={() => scrollTo('rebuttal-generator')}
                    className="w-full p-3 rounded-xl border border-white/10 bg-zinc-900/60 hover:bg-zinc-800 text-left transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Scale className="w-4 h-4 text-rose-400" />
                      <span className="text-xs font-bold text-white">IRDAI Ombudsman Legal Rebuttal</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 group-hover:text-rose-400">JUMP →</span>
                  </button>
                </div>
              </div>

              {/* Spider-Man Soundboard */}
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2.5">
                  SPIDER-MAN SOUND EFFECTS (OFFLINE-SAFE)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => sound.playThwip()}
                    className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 transition-colors flex items-center gap-2"
                  >
                    <span>🕷️</span>
                    <span>Thwip! (Web Shoot)</span>
                  </button>
                  <button
                    onClick={() => sound.playSpiderSense()}
                    className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 transition-colors flex items-center gap-2"
                  >
                    <span>⚡</span>
                    <span>Spider-Sense Tingle</span>
                  </button>
                  <button
                    onClick={() => sound.playVineBoom()}
                    className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 transition-colors flex items-center gap-2"
                  >
                    <span>💥</span>
                    <span>Vine Boom</span>
                  </button>
                  <button
                    onClick={() => sound.playPizzaTime()}
                    className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 transition-colors flex items-center gap-2"
                  >
                    <span>🍕</span>
                    <span>Pizza Time!</span>
                  </button>
                </div>
              </div>

              {/* System Toggles */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-300 flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-emerald-400" /> CRT Film Scanlines
                  </span>
                  <button
                    onClick={toggleCrt}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                      crtEnabled ? 'bg-red-600' : 'bg-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        crtEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-300 flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-amber-400" /> Sound Effects & Audio
                  </span>
                  <button
                    onClick={toggleSound}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                      !isMuted ? 'bg-red-600' : 'bg-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        !isMuted ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-white/10 bg-black/60 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
              <span>SPIDER-SENSE 2026</span>
              <span className="text-red-500">CONSUMER DEFENSE</span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
