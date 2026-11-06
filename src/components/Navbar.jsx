import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Command, X, Github, Linkedin, Mail, ArrowRight,
  Dice5, Volume2, VolumeX, Monitor, Clock, Menu
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';

export const Navbar = ({ onOpenDiceModal, onOpenSidebar }) => {
  const {
    currentTheme, currentProblem, isMuted, toggleSound,
    crtEnabled, toggleCrt, themesList, problemsList,
    themeId, problemId, changeTheme, changeProblem
  } = useTheme();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  // Auto focus search input
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  // ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const searchResults = searchQuery.length > 0
    ? [
        ...Object.values(themesList)
          .filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((t) => ({ kind: 'theme', item: t })),
        ...Object.values(problemsList)
          .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((p) => ({ kind: 'problem', item: p }))
      ]
    : [];

  return (
    <>
      {/* Floating Centered Pill Navbar — Exact Benchmark Match */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl rounded-full bg-[#0a0a0f]/85 backdrop-blur-2xl border border-white/10 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.85)] transition-all">
        
        {/* Left: SR. Logo with Cyan Glowing Dot */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playHover();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1 group"
          >
            <span className="font-bold text-lg sm:text-xl text-white tracking-tight font-sans">
              SR
            </span>
            <span
              className="w-2 h-2 rounded-[2px] transition-all duration-300 group-hover:scale-125"
              style={{
                backgroundColor: '#22d3ee', // Cyan glowing dot
                boxShadow: '0 0 10px #22d3ee'
              }}
            />
          </button>
        </div>

        {/* Center: Clean Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { label: 'About', href: '#' },
            { label: 'Projects', href: '#themes' },
            { label: 'Skills', href: '#problems' },
            { label: 'Experience', href: '#telemetry' },
            { label: 'Contact', href: '#contact' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => sound.playHover()}
              className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-zinc-400 hover:text-white transition-colors duration-150 hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Section: Search, Avatar, Social Icons, and Action Button */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Search Pill Button */}
          <button
            onClick={() => {
              sound.playClick();
              setSearchOpen(true);
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-400 hover:text-white hover:border-white/20 transition-all shadow-inner"
          >
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-[12px]">Search...</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/10 text-zinc-400 border border-white/10 ml-1">
              ⌘K
            </span>
          </button>

          {/* Avatar with Cyan Ring & Active Status Dot */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSidebar();
            }}
            title="Open Command Deck"
            className="relative p-0.5 rounded-full border-2 border-cyan-400 hover:scale-110 transition-transform flex-shrink-0"
            style={{
              boxShadow: '0 0 12px rgba(34, 211, 238, 0.45)'
            }}
          >
            <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-sm overflow-hidden text-white font-bold">
              <span>{currentTheme.mascot}</span>
            </div>
            {/* Tiny green status dot */}
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-black animate-pulse" />
          </button>

          {/* Social / Tool Circular Glass Buttons */}
          <div className="hidden lg:flex items-center gap-1.5">
            {/* GitHub */}
            <a
              href="https://github.com/sautrikroy17"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playHover()}
              className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playHover()}
              className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>

            {/* Mail */}
            <button
              onClick={() => {
                sound.playHover();
                onOpenSidebar();
              }}
              className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              title="Command Deck / Mail"
            >
              <Mail className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action CTA Button: Resume / Roll Dice with subtle glow */}
          <button
            onClick={() => {
              sound.playCharge();
              onOpenDiceModal();
            }}
            className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-all duration-200 flex items-center gap-1.5 shadow-lg hover:shadow-cyan-500/20 active:scale-95"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }}
          >
            <span>Roll Dice</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Sidebar Trigger */}
          <button
            onClick={onOpenSidebar}
            className="md:hidden p-1.5 text-zinc-400 hover:text-white rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Spotlight Search Modal (⌘K) */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-xl rounded-2xl border border-white/10 bg-zinc-950 p-4 shadow-2xl text-white overflow-hidden"
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <Search className="w-5 h-5 text-zinc-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 6 Themes or 6 Problem Statements..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search Results */}
              <div className="my-3 max-h-64 overflow-y-auto space-y-1">
                {searchResults.length > 0 ? (
                  searchResults.map((res, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        sound.playClick();
                        if (res.kind === 'theme') changeTheme(res.item.id);
                        if (res.kind === 'problem') changeProblem(res.item.id);
                        setSearchOpen(false);
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-white/10 text-left transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">
                          {res.kind === 'theme' ? res.item.mascot : '🎯'}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-white">
                            {res.kind === 'theme' ? res.item.name : res.item.title}
                          </div>
                          <div className="text-[10px] text-zinc-400">
                            {res.kind === 'theme' ? res.item.tagline : res.item.category}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        {res.kind}
                      </span>
                    </button>
                  ))
                ) : searchQuery.length > 0 ? (
                  <p className="text-xs text-zinc-500 text-center py-6">
                    No matching themes or problems found.
                  </p>
                ) : (
                  <div className="py-2 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                      Quick Themes (Dice 1):
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.values(themesList).map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            changeTheme(t.id);
                            setSearchOpen(false);
                          }}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 flex items-center gap-1.5"
                        >
                          <span>{t.mascot}</span>
                          <span className="truncate">{t.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Select to switch theme/problem immediately</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
