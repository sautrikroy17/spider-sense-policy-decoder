import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Dice5, Volume2, Monitor, Shield, Sparkles, Clock,
  Terminal, Award, ExternalLink, Play, Radio
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';

export const SidebarDrawer = ({ isOpen, onClose, onOpenDiceModal }) => {
  const {
    currentTheme, currentProblem, themesList, problemsList,
    themeId, problemId, changeTheme, changeProblem,
    isMuted, toggleSound, crtEnabled, toggleCrt
  } = useTheme();

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
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#090a10]/95 border-l border-white/10 shadow-2xl flex flex-col backdrop-blur-2xl text-white overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-md border border-white/20"
                  style={{
                    backgroundColor: currentTheme.primary,
                    boxShadow: `0 0 14px ${currentTheme.glowColor}`
                  }}
                >
                  {currentTheme.mascot}
                </span>
                <div>
                  <h3 className="font-cyber font-bold text-sm tracking-wide text-white">
                    ROGUEHACK COMMAND DECK
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    HTB SRMIST • 60-MIN SPRINT
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
              {/* Active Matchup Card */}
              <div
                className="p-4 rounded-2xl border bg-white/5 relative overflow-hidden"
                style={{ borderColor: currentTheme.accent }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    ACTIVE 2-DICE COMBO
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                    style={{ backgroundColor: `${currentTheme.accent}25`, color: currentTheme.accent }}
                  >
                    DICE {currentTheme.id} × {currentProblem.id}
                  </span>
                </div>
                <div className="text-base font-bold text-white font-cyber">
                  {currentTheme.name}
                </div>
                <div className="text-xs text-zinc-300 mt-0.5 font-medium">
                  {currentProblem.title}
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 flex gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenDiceModal();
                    }}
                    className="flex-1 py-2 px-3 rounded-xl font-bold text-xs uppercase tracking-wider text-black flex items-center justify-center gap-1.5 shadow-md"
                    style={{ backgroundColor: currentTheme.accent }}
                  >
                    <Dice5 className="w-3.5 h-3.5" /> Re-Roll Dice
                  </button>
                </div>
              </div>

              {/* Theme Selector Grid (Dice 1) */}
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2.5 flex items-center justify-between">
                  <span>DICE 1 : CHARACTER THEMES</span>
                  <span className="text-[10px] text-zinc-500">1 TAP SWITCH</span>
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(themesList).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        changeTheme(t.id);
                        sound.playClick();
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                        themeId === t.id
                          ? 'border-white bg-white/15 text-white shadow-md'
                          : 'border-white/5 bg-zinc-900/50 hover:bg-zinc-800/80 text-zinc-400'
                      }`}
                    >
                      <span className="text-lg">{t.mascot}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-white truncate">{t.name}</div>
                        <div className="text-[10px] text-zinc-500 truncate">Die {t.id}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Problem Selector List (Dice 2) */}
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2.5 flex items-center justify-between">
                  <span>DICE 2 : PROBLEM STATEMENTS</span>
                  <span className="text-[10px] text-zinc-500">LIVE ENGINE</span>
                </span>
                <div className="space-y-1.5">
                  {Object.values(problemsList).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        changeProblem(p.id);
                        sound.playClick();
                      }}
                      className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                        problemId === p.id
                          ? 'border-white/40 bg-white/15 text-white shadow-md'
                          : 'border-white/5 bg-zinc-900/50 hover:bg-zinc-800/80 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-bold text-zinc-300">
                          {p.id}
                        </span>
                        <span className="text-xs font-medium text-white truncate">{p.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">{p.category.split('/')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Web Audio SFX Test Soundboard */}
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2.5">
                  LIVE AUDIO SOUNDBOARD (OFFLINE-SAFE)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Click', fn: () => sound.playClick() },
                    { label: 'Charge', fn: () => sound.playCharge() },
                    { label: 'Laser', fn: () => sound.playLaser() },
                    { label: 'Alert', fn: () => sound.playAlert() },
                    { label: 'Victory', fn: () => sound.playSuccess() },
                    { label: 'Dice Roll', fn: () => sound.playDiceRoll() },
                  ].map((sfx) => (
                    <button
                      key={sfx.label}
                      onClick={sfx.fn}
                      className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 transition-colors flex items-center justify-center gap-1"
                    >
                      <Volume2 className="w-3 h-3 text-emerald-400" />
                      <span>{sfx.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* System Toggles */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-300 flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-emerald-400" /> CRT Scanlines
                  </span>
                  <button
                    onClick={toggleCrt}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                      crtEnabled ? 'bg-emerald-500' : 'bg-zinc-700'
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
                    <Volume2 className="w-4 h-4 text-amber-400" /> Audio Synthesizer
                  </span>
                  <button
                    onClick={toggleSound}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                      !isMuted ? 'bg-emerald-500' : 'bg-zinc-700'
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
            <div className="p-4 border-t border-white/10 bg-black/40 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
              <span>ROGUEHACK 1.0</span>
              <span>SRMIST HTB EDITION</span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
