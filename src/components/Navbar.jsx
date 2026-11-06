import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Music,
  FileText,
  ScanLine,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';

export const Navbar = ({ onOpenSidebar }) => {
  const { isMuted, toggleSound } = useTheme();
  const [musicActive, setMusicActive] = useState(false);
  const [activeTab, setActiveTab] = useState('decoder');

  const handleToggleMusic = () => {
    const playing = sound.toggleSpiderTheme();
    setMusicActive(playing);
  };

  const scrollToSection = (id) => {
    sound.playHover();
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[96%] max-w-6xl transition-all">
      {/* Sleek Pill Glassmorphic Container matching Reference Image */}
      <div className="relative rounded-full bg-[#08080d]/85 backdrop-blur-2xl border border-white/10 px-4 sm:px-6 py-2 flex items-center justify-between shadow-[0_12px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(239,68,68,0.2)] overflow-hidden">
        
        {/* Top & Bottom Cinematic Neon Edge Glows */}
        <div className="absolute inset-x-16 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-90 shadow-[0_0_12px_#ef4444] pointer-events-none" />
        <div className="absolute inset-x-24 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent opacity-60 pointer-events-none" />

        {/* LEFT: Spider Emblem & Brand Title */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => {
              sound.playThwip();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group text-left"
          >
            {/* Red Spider Emblem Box */}
            <div className="w-10 h-10 rounded-2xl bg-black/70 border border-red-500/60 p-1.5 shadow-[0_0_15px_rgba(239,68,68,0.5)] group-hover:scale-105 transition-transform flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src="/spidey/authentic-spidey-logo.svg"
                alt="Spider-Man Official Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(239,68,68,0.9)]"
              />
            </div>

            {/* Typography */}
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-cyber font-black text-sm sm:text-base tracking-wider text-white">
                SPIDER-SENSE
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-400">
                <span className="text-red-500 font-bold">//</span> Policy Defense
              </span>
            </div>
          </button>
        </div>

        {/* CENTER: Navigation Links (Stacked 2-Line Labels matching Image) */}
        <nav className="hidden lg:flex items-center gap-2">
          {/* 1. Policy Decoder (Active Pill) */}
          <button
            onClick={() => scrollToSection('decoder')}
            className={`px-3.5 py-1.5 rounded-2xl flex items-center gap-2 text-left transition-all ${
              activeTab === 'decoder'
                ? 'bg-gradient-to-r from-red-950/70 to-red-900/50 border border-red-500/50 text-white shadow-[0_0_15px_rgba(239,68,68,0.35)]'
                : 'hover:bg-white/5 text-zinc-300 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-white flex-shrink-0" />
            <div className="flex flex-col text-[11px] leading-tight font-mono font-bold">
              <span>Policy</span>
              <span>Decoder</span>
            </div>
          </button>

          {/* 2. Document Scanner */}
          <button
            onClick={() => scrollToSection('policy-uploader')}
            className={`px-3.5 py-1.5 rounded-2xl flex items-center gap-2 text-left transition-all ${
              activeTab === 'policy-uploader'
                ? 'bg-gradient-to-r from-cyan-950/70 to-cyan-900/50 border border-cyan-500/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                : 'hover:bg-white/5 text-zinc-300 hover:text-white'
            }`}
          >
            <ScanLine className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <div className="flex flex-col text-[11px] leading-tight font-mono font-medium">
              <span>Document</span>
              <span>Scanner</span>
            </div>
          </button>

          {/* 3. Aunt May Math with Sigma */}
          <button
            onClick={() => scrollToSection('aunt-may-calculator')}
            className={`px-3.5 py-1.5 rounded-2xl flex items-center gap-2 text-left transition-all ${
              activeTab === 'aunt-may-calculator'
                ? 'bg-gradient-to-r from-amber-950/70 to-amber-900/50 border border-amber-500/50 text-white shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                : 'hover:bg-white/5 text-zinc-300 hover:text-white'
            }`}
          >
            <span className="text-amber-400 font-serif font-black text-base flex-shrink-0 leading-none">
              Σ
            </span>
            <div className="flex flex-col text-[11px] leading-tight font-mono font-medium">
              <span>Aunt May</span>
              <span>Math</span>
            </div>
          </button>

          {/* 4. IRDAI Appeal with Purple Shield */}
          <button
            onClick={() => scrollToSection('rebuttal-generator')}
            className={`px-3.5 py-1.5 rounded-2xl flex items-center gap-2 text-left transition-all ${
              activeTab === 'rebuttal-generator'
                ? 'bg-gradient-to-r from-purple-950/70 to-purple-900/50 border border-purple-500/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.35)]'
                : 'hover:bg-white/5 text-zinc-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <div className="flex flex-col text-[11px] leading-tight font-mono font-medium">
              <span>IRDAI</span>
              <span>Appeal</span>
            </div>
          </button>
        </nav>

        {/* RIGHT: Audio Theme + Volume Mute + Main Analyze Policy CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          
          {/* Spidey Theme Audio Pill Button */}
          <button
            onClick={handleToggleMusic}
            title={musicActive ? 'Pause Annihilate' : 'Play Annihilate (Metro Boomin & Swae Lee)'}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono font-bold border transition-all ${
              musicActive
                ? 'bg-red-600/30 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Music className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">
              {musicActive ? 'Annihilate ♫' : 'Spidey Theme'}
            </span>
          </button>

          {/* Sound FX Mute Toggle Button */}
          <button
            onClick={() => {
              sound.playClick();
              toggleSound();
            }}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-zinc-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-zinc-300" />
            )}
          </button>

          {/* Main Analyze Policy Pill CTA with Waveform Icon */}
          <button
            onClick={() => scrollToSection('policy-uploader')}
            className="px-5 py-2.5 rounded-full text-xs font-cyber font-bold tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:brightness-110 border border-red-400/50 shadow-[0_0_25px_rgba(239,68,68,0.6)] active:scale-95 flex items-center gap-2 transition-all flex-shrink-0"
          >
            {/* Audio Waveform Signal Lines */}
            <div className="flex items-center gap-0.5">
              <span className="w-0.5 h-2 bg-white rounded-full animate-pulse" />
              <span className="w-0.5 h-3.5 bg-white rounded-full" />
              <span className="w-0.5 h-4.5 bg-white rounded-full animate-pulse delay-75" />
              <span className="w-0.5 h-3 bg-white rounded-full" />
              <span className="w-0.5 h-1.5 bg-white rounded-full" />
            </div>
            <span>Analyze Policy</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </header>
  );
};
