import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Volume2,
  VolumeX,
  Dice5,
  ArrowRight,
  Menu,
  X,
  Music,
  Radio,
  Clock,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';

export const Navbar = ({ onOpenDiceModal, onOpenSidebar, onScrollToSection }) => {
  const {
    currentTheme,
    isMuted,
    toggleSound,
    themesList,
    problemsList,
    changeTheme,
    changeProblem
  } = useTheme();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [musicActive, setMusicActive] = useState(false);
  const searchInputRef = useRef(null);

  // Auto focus search input
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  // ⌘K shortcut
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

  const handleToggleMusic = () => {
    const playing = sound.toggleSpiderTheme();
    setMusicActive(playing);
  };

  const navItems = [
    { label: 'Overview', id: 'top' },
    { label: 'Sinister Six', id: 'sinister' },
    { label: 'Policy Decoder', id: 'decoder' },
    { label: 'Aunt May Math', id: 'calculator' },
    { label: 'IRDAI Rebuttal', id: 'rebuttal' }
  ];

  return (
    <>
      {/* Floating Centered Themed Pill Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl rounded-full bg-[#0a0a0f]/90 backdrop-blur-2xl border border-red-500/30 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-[0_12px_40px_rgba(239,68,68,0.25)] transition-all">
        
        {/* Left: Spider Emblem + Brand */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sound.playThwip();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-7 h-7 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center text-sm shadow-[0_0_12px_rgba(239,68,68,0.5)] group-hover:scale-110 transition-transform">
              <span>🕸️</span>
            </div>
            <div className="text-left font-cyber">
              <span className="font-black text-sm sm:text-base text-white tracking-wide block leading-none">
                SPIDER-SENSE
              </span>
              <span className="text-[9px] font-mono font-bold text-red-400 tracking-wider">
                BRAND NEW DAY
              </span>
            </div>
          </button>
        </div>

        {/* Center: Themed Nav Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                sound.playHover();
                const el = document.getElementById(item.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.scrollTo({ top: 600, behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-full text-xs font-mono font-bold text-zinc-300 hover:text-white hover:bg-red-500/10 transition-all duration-150"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Section: Theme Song Toggle, Sound FX, Search, and Roll Dice */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Theme Song Toggle Button */}
          <button
            onClick={handleToggleMusic}
            title={musicActive ? 'Pause Spider-Man Theme' : 'Play Spider-Man Theme'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold border transition-all ${
              musicActive
                ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${musicActive ? 'animate-bounce' : ''}`} />
            <span className="hidden sm:inline">
              {musicActive ? 'THEME [ON]' : 'THEME [OFF]'}
            </span>
          </button>

          {/* Mute/Unmute Web Shooter Sound Effects */}
          <button
            onClick={() => {
              sound.playClick();
              toggleSound();
            }}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-500" /> : <Volume2 className="w-3.5 h-3.5 text-red-400" />}
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              setSearchOpen(true);
            }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 hover:text-white"
            title="Search Themes / Problems (⌘K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono bg-white/10 px-1 py-0.5 rounded">⌘K</span>
          </button>

          {/* Roll Dice Button */}
          <button
            onClick={() => {
              sound.playCharge();
              onOpenDiceModal();
            }}
            className="px-4 py-1.5 rounded-full text-xs font-bold font-cyber tracking-wider border border-red-500 bg-red-600 hover:bg-red-500 text-white transition-all shadow-[0_0_20px_rgba(239,68,68,0.5)] active:scale-95 flex items-center gap-1.5"
          >
            <span>ROLL DICE</span>
            <Dice5 className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Sidebar Trigger */}
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-1.5 text-zinc-400 hover:text-white rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* ⌘K Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-xl rounded-2xl border border-red-500/40 bg-zinc-950 p-4 shadow-[0_0_50px_rgba(239,68,68,0.3)] text-white overflow-hidden"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <Search className="w-5 h-5 text-red-500" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 6 Themes or 6 Problem Statements..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-mono"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                  Quick Select Themes (Dice 1):
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {Object.values(themesList).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        changeTheme(t.id);
                        setSearchOpen(false);
                      }}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 hover:border-red-500/40 border border-white/10 text-xs text-zinc-300 flex items-center gap-2 transition-all"
                    >
                      <span>{t.mascot}</span>
                      <span className="truncate font-bold">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
