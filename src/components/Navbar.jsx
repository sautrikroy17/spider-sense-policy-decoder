import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Menu,
  Music,
  FileSearch,
  UploadCloud,
  Calculator,
  Scale,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';

export const Navbar = ({ onOpenSidebar }) => {
  const { isMuted, toggleSound } = useTheme();
  const [musicActive, setMusicActive] = useState(false);

  const handleToggleMusic = () => {
    const playing = sound.toggleSpiderTheme();
    setMusicActive(playing);
  };

  const scrollToSection = (id) => {
    sound.playHover();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 z-40 w-[96%] max-w-6xl transition-all">
      <div className="relative rounded-2xl bg-black/85 backdrop-blur-2xl border border-red-500/30 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-[0_12px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(239,68,68,0.2)] overflow-hidden">
        
        {/* Top Edge Laser Glow Accent */}
        <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-80 pointer-events-none" />

        {/* LEFT: Spider-Man Emblem & Brand Title */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => {
              sound.playThwip();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group text-left"
          >
            {/* Spider Radar Emblem */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 p-0.5 shadow-[0_0_15px_rgba(239,68,68,0.6)] group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-black/70 rounded-[10px] flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-red-500 group-hover:text-red-400 transition-colors drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]"
                >
                  <path d="M12 2C10.5 2 9.5 3 9 4.5C8 4.2 6.5 4.8 6 6C5 7 5 9 6 10.5C5 11 4.5 12 5 13.5C5.5 15 7 16 8 16C8.5 17.5 10 19 12 19C14 19 15.5 17.5 16 16C17 16 18.5 15 19 13.5C19.5 12 19 11 18 10.5C19 9 19 7 18 6C17.5 4.8 16 4.2 15 4.5C14.5 3 13.5 2 12 2M12 4C13 4 13.5 4.5 13.8 5.2C13.2 5.5 12.6 6 12 6C11.4 6 10.8 5.5 10.2 5.2C10.5 4.5 11 4 12 4M9.5 7.5C10.2 8.2 11.1 8.5 12 8.5C12.9 8.5 13.8 8.2 14.5 7.5C15 8.2 15.5 9.5 15 11C14.2 10.5 13.1 10.2 12 10.2C10.9 10.2 9.8 10.5 9 11C8.5 9.5 9 8.2 9.5 7.5M12 12C13.5 12 15 12.8 15.5 14.5C14.5 15.5 13.2 16 12 16C10.8 16 9.5 15.5 8.5 14.5C9 12.8 10.5 12 12 12Z" />
                </svg>
              </div>
            </div>

            {/* Typography */}
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="font-cyber font-black text-sm tracking-wider text-white">
                SPIDER-SENSE
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-400">
                // Policy Defense
              </span>
            </div>
          </button>
        </div>

        {/* CENTER: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5">
          <button
            onClick={() => scrollToSection('decoder')}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <FileSearch className="w-3.5 h-3.5 text-red-400" />
            <span>Policy Decoder</span>
          </button>

          <button
            onClick={() => scrollToSection('policy-uploader')}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
            <span>Document Scanner</span>
          </button>

          <button
            onClick={() => scrollToSection('aunt-may-calculator')}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>Aunt May Math</span>
          </button>

          <button
            onClick={() => scrollToSection('rebuttal-generator')}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <Scale className="w-3.5 h-3.5 text-rose-400" />
            <span>IRDAI Appeal</span>
          </button>
        </nav>

        {/* RIGHT: Production-Grade Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          
          {/* Classic Spider-Man Theme Song Player (NO BOUNCE) */}
          <button
            onClick={handleToggleMusic}
            title={musicActive ? 'Pause Spider-Man Theme' : 'Play Spider-Man Theme'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
              musicActive
                ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {musicActive ? 'THEME [PLAYING]' : 'SPIDEY THEME'}
            </span>
          </button>

          {/* Sound FX Mute Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              toggleSound();
            }}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="w-8 h-8 rounded-xl border border-white/10 bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-red-400" />
            )}
          </button>

          {/* Sleek CTA Button */}
          <button
            onClick={() => scrollToSection('policy-uploader')}
            className="px-4 py-1.5 rounded-xl text-xs font-bold font-cyber tracking-wider text-white bg-gradient-to-r from-red-600 to-rose-600 hover:brightness-110 border border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-95 flex items-center gap-1.5 transition-all"
          >
            <span>ANALYZE POLICY</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-1.5 text-zinc-400 hover:text-white rounded-lg ml-0.5"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
