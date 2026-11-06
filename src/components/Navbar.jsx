import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dice5, Volume2, VolumeX, Monitor, Clock, ChevronDown,
  Search, Command, X, Sparkles, Zap
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';

export const Navbar = ({ onOpenDiceModal }) => {
  const {
    currentTheme, currentProblem, isMuted, toggleSound,
    crtEnabled, toggleCrt, themesList, problemsList,
    themeId, problemId, changeTheme, changeProblem
  } = useTheme();

  const [secondsLeft, setSecondsLeft] = useState(3600);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  const dropRef = useRef(null);

  // Sprint timer — 60 min countdown
  useEffect(() => {
    const t = setInterval(() =>
      setSecondsLeft(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  // Scroll-based glass depth
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Auto-focus search
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50);
  }, [searchOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const fn = e => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  // ⌘K / Ctrl+K  →  toggle search
  useEffect(() => {
    const fn = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(v => !v);
      }
      if (e.key === 'Escape') { setSearchOpen(false); setDropdownOpen(false); }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const fmt = s => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sc = (s % 60).toString().padStart(2, '0');
    return `${m}:${sc}`;
  };

  const urgent = secondsLeft < 600;

  const searchResults = searchQuery.length > 1
    ? [
        ...Object.values(themesList)
          .filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(t => ({ kind: 'theme', item: t })),
        ...Object.values(problemsList)
          .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(p => ({ kind: 'problem', item: p })),
      ]
    : [];

  return (
    <>
      {/* ════════════════════════════════════════
          NAVBAR — floating pill style like reference
      ════════════════════════════════════════ */}
      <header
        className="sticky top-0 z-40 w-full"
        style={{
          background: scrolled
            ? 'rgba(4,4,8,0.94)'
            : 'rgba(4,4,8,0.60)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.03)'}`,
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 h-[62px] flex items-center justify-between gap-4">

          {/* ── LEFT: Logo + live theme badge ── */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Logo mark */}
            <div className="flex items-center gap-1 select-none">
              <span className="font-black text-[22px] tracking-tight text-white font-cyber leading-none">
                RH
              </span>
              <span
                className="font-black text-[22px] tracking-tight leading-none font-cyber"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.accent} 0%, ${currentTheme.primary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                .0
              </span>
              {/* Pulsing accent dot (like "SR." reference) */}
              <span
                className="w-1.5 h-1.5 rounded-full ml-0.5 animate-pulse"
                style={{ backgroundColor: currentTheme.accent }}
              />
            </div>

            {/* Animated character badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={themeId}
                initial={{ opacity: 0, y: -6, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.9 }}
                transition={{ duration: 0.22 }}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-[5px] rounded-full text-[11px] font-semibold tracking-wide border"
                style={{
                  background: `${currentTheme.accent}18`,
                  borderColor: `${currentTheme.accent}45`,
                  color: currentTheme.accent,
                }}
              >
                <span className="text-sm leading-none">{currentTheme.mascot}</span>
                <span>{currentTheme.name}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── CENTER: Nav links (reference-matched minimal style) ── */}
          <nav className="hidden md:flex items-center">
            {/* Theme dropdown — Dice 1 */}
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => { setDropdownOpen(v => !v); sound.playHover(); }}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-[13.5px] font-medium text-zinc-400 hover:text-white transition-colors duration-150 group relative"
              >
                Dice 1
                <ChevronDown
                  className="w-3.5 h-3.5 transition-transform duration-200"
                  style={{ transform: dropdownOpen ? 'rotate(180deg)' : '' }}
                />
                <span
                  className="absolute bottom-1.5 left-4 right-4 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"
                  style={{ backgroundColor: currentTheme.accent }}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.14 }}
                    className="absolute top-full left-0 mt-2 w-56 rounded-2xl border border-white/10 shadow-2xl overflow-hidden py-1"
                    style={{ background: 'rgba(8,8,14,0.98)', backdropFilter: 'blur(20px)' }}
                  >
                    {Object.values(themesList).map(t => (
                      <button
                        key={t.id}
                        onClick={() => { changeTheme(t.id); setDropdownOpen(false); sound.playClick(); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5 transition-colors duration-100"
                      >
                        <span className="text-lg leading-none">{t.mascot}</span>
                        <div className="flex-1 min-w-0">
                          <div
                            className="text-[13px] font-semibold truncate"
                            style={{ color: themeId === t.id ? t.accent : '#e4e4e7' }}
                          >
                            {t.name}
                          </div>
                          <div className="text-[10px] text-zinc-500 truncate">{t.badge}</div>
                        </div>
                        {themeId === t.id && (
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: t.accent }} />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Static nav links */}
            {['Dice 2', 'Demo', 'Stack'].map(label => (
              <button
                key={label}
                onClick={() => sound.playHover()}
                className="relative px-4 py-2 rounded-lg text-[13.5px] font-medium text-zinc-400 hover:text-white transition-colors duration-150 group"
              >
                {label}
                <span
                  className="absolute bottom-1.5 left-4 right-4 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"
                  style={{ backgroundColor: currentTheme.accent }}
                />
              </button>
            ))}
          </nav>

          {/* ── RIGHT: Controls cluster (reference-matched) ── */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Search box — reference style with ⌘K hint */}
            <button
              onClick={() => { setSearchOpen(true); sound.playHover(); }}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/[0.09] text-[12.5px] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.15] transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.03)', minWidth: 148 }}
            >
              <Search className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Search...</span>
              <span className="ml-auto flex items-center gap-[3px] text-[10px] font-mono opacity-50">
                <Command className="w-2.5 h-2.5" />K
              </span>
            </button>

            {/* Sprint timer */}
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[12px] font-mono font-bold transition-all duration-300"
              style={{
                background: urgent ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.04)',
                borderColor: urgent ? 'rgba(239,68,68,0.45)' : 'rgba(255,255,255,0.09)',
                color: urgent ? '#f87171' : '#71717a',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: urgent ? '#f87171' : '#4ade80',
                  animation: 'ping 1.4s cubic-bezier(0,0,0.2,1) infinite',
                }}
              />
              <Clock className="w-3 h-3" />
              {fmt(secondsLeft)}
            </div>

            {/* Icon cluster: CRT + Sound (grouped like reference) */}
            <div className="flex items-center rounded-xl border border-white/[0.09] overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <button
                onClick={() => { toggleCrt(); sound.playHover(); }}
                title={crtEnabled ? 'Disable CRT' : 'Enable CRT'}
                className="p-2 hover:bg-white/8 transition-colors border-r border-white/[0.07]"
                style={{ color: crtEnabled ? currentTheme.accent : '#52525b' }}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={toggleSound}
                title={isMuted ? 'Unmute' : 'Mute'}
                className="p-2 hover:bg-white/8 transition-colors"
                style={{ color: isMuted ? '#f87171' : '#4ade80' }}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Avatar ring (reference — circular with accent ring, theme emoji inside) */}
            <button
              onClick={() => { onOpenDiceModal(); sound.playClick(); }}
              title="Switch Theme / Problem"
              className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-[17px] transition-transform hover:scale-110 active:scale-95 flex-shrink-0"
              style={{
                background: `${currentTheme.primary}28`,
                border: `2px solid ${currentTheme.accent}`,
                boxShadow: `0 0 14px ${currentTheme.glowColor}`,
              }}
            >
              {currentTheme.mascot}
            </button>

            {/* Primary CTA — gradient pill (reference "Resume →" style but ours is ROLL DICE) */}
            <button
              onClick={() => { onOpenDiceModal(); sound.playCharge(); }}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold text-black overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95 select-none"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.accent} 0%, ${currentTheme.primary} 100%)`,
                boxShadow: `0 4px 24px ${currentTheme.glowColor}`,
              }}
            >
              {/* Shimmer sweep */}
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                style={{ animation: 'shimmer 2.5s linear infinite' }}
              />
              <Dice5 className="w-4 h-4 relative z-10" />
              <span className="relative z-10 hidden sm:inline">ROLL DICE</span>
              <span className="relative z-10 sm:hidden">🎲</span>
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════
          SPOTLIGHT SEARCH OVERLAY
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[300] flex items-start justify-center px-4 pt-[13vh]"
            style={{ background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(10px)' }}
            onClick={e => { if (e.target === e.currentTarget) setSearchOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: -18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-[560px] rounded-2xl border border-white/[0.12] shadow-2xl overflow-hidden"
              style={{ background: 'rgba(8,8,14,0.98)', backdropFilter: 'blur(24px)' }}
            >
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.07]">
                <Search className="w-4.5 h-4.5 text-zinc-500 flex-shrink-0" />
                <input
                  ref={searchRef}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search themes, problems..."
                  className="flex-1 bg-transparent text-[14px] text-white placeholder-zinc-500 outline-none"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-white/8 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto">
                {searchResults.length > 0 ? searchResults.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (r.kind === 'theme') changeTheme(r.item.id);
                      else changeProblem(r.item.id);
                      sound.playClick();
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.05] text-left transition-colors"
                  >
                    <span className="text-xl leading-none">{r.kind === 'theme' ? r.item.mascot : '🎯'}</span>
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-white truncate">
                        {r.kind === 'theme' ? r.item.name : r.item.title}
                      </div>
                      <div className="text-[11px] text-zinc-500">
                        {r.kind === 'theme' ? `Dice 1 — Theme ${r.item.id}` : `Dice 2 — PS ${r.item.id}`}
                      </div>
                    </div>
                  </button>
                )) : searchQuery.length > 1 ? (
                  <div className="px-4 py-10 text-center text-sm text-zinc-500">
                    No results for "{searchQuery}"
                  </div>
                ) : (
                  /* Default: quick theme grid */
                  <div className="p-4 space-y-3">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">Quick Switch Themes</p>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.values(themesList).map(t => (
                        <button
                          key={t.id}
                          onClick={() => { changeTheme(t.id); sound.playClick(); setSearchOpen(false); }}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.14] transition-all text-left"
                          style={{ background: themeId === t.id ? `${t.accent}12` : '' }}
                        >
                          <span className="text-lg leading-none">{t.mascot}</span>
                          <span className="text-[12px] font-medium text-zinc-300 truncate">{t.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer keyboard hints */}
              <div className="px-4 py-2.5 border-t border-white/[0.06] flex items-center gap-4 text-[11px] text-zinc-600 font-mono">
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white/10 text-zinc-400 text-[10px]">↑↓</kbd> navigate</span>
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white/10 text-zinc-400 text-[10px]">↵</kbd> select</span>
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white/10 text-zinc-400 text-[10px]">Esc</kbd> close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes ping {
          75%, 100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </>
  );
};
