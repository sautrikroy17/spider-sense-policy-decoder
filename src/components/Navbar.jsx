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
            <div className="w-10 h-10 rounded-2xl bg-black/60 border border-red-500/60 p-2 shadow-[0_0_15px_rgba(239,68,68,0.45)] group-hover:scale-105 transition-transform flex items-center justify-center flex-shrink-0">
              <svg
                viewBox="0 0 340 270"
                className="w-full h-full text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]"
                fill="currentColor"
              >
                <path d="M178.6 86.6 C185.5 90.6 189.8 96.1 192.4 104.1 C194.4 112.2 192.1 118.1 189 125.6 C189.7 125.9 190.4 126.1 191.2 126.4 C193.8 127.5 195.9 128.7 198.4 130.1 C199.7 130.8 199.7 130.8 201 131.5 C202.4 132.3 202.4 132.3 203.8 133.1 C204.7 133.6 205.6 134.1 206.6 134.6 C210.1 136.5 213.5 138.4 216.8 140.6 C217.2 143 217.2 143 217.2 146 C217.3 147.1 217.3 148.2 217.3 149.3 C217.3 150.5 217.3 151.7 217.3 153 C217.3 154.2 217.3 155.5 217.3 156.7 C217.3 159.4 217.3 162 217.3 164.6 C217.3 167.3 217.3 170 217.4 172.7 C217.8 194.4 217.8 194.4 214.4 199.7 C210.7 203.3 206.5 204.9 201.7 206.6 C199.8 207.6 197.9 208.7 195.9 209.8 C194.1 210.7 192.4 211.7 190.6 212.6 C188.6 213.7 186.6 214.8 184.5 215.9 C183.6 216.3 182.7 216.8 181.7 217.3 C179.4 218.5 179.4 218.5 177.5 220.6 C175.9 221.5 174.3 222.4 172.6 223.3 C171.8 223.8 170.9 224.2 170 224.7 C167.1 225.8 166.3 225.8 163.5 224.6 C161.6 223.6 159.8 222.5 157.9 221.4 C154.1 219.2 150.3 217 146.4 214.9 C142.8 212.9 139.2 210.9 135.6 208.8 C134.3 208.1 134.3 208.1 133 207.3 C131.3 206.3 129.6 205.3 127.8 204.3 C127 203.8 126.2 203.4 125.4 202.9 C124.7 202.5 124 202.1 123.2 201.6 C121.5 200.6 121.5 200.6 119.4 200.7 C119.4 200.1 119.4 199.4 119.4 198.7 C118.4 198.4 117.4 198.1 116.4 197.7 C116.2 190.4 116 183.1 115.9 175.8 C115.9 172.4 115.8 169 115.7 165.6 C115.6 161.7 115.5 157.7 115.5 153.8 C115.4 152.6 115.4 151.4 115.3 150.1 C115.3 141.8 115.3 141.8 118.3 138.7 C120.6 137.2 122.9 136 125.3 134.8 C126 134.1 126.7 133.5 127.3 132.8 C128 132.5 128.7 132.2 129.4 132 C133.6 130.3 137.4 128 141.3 125.8 C141.3 124.1 141.3 122.5 141.3 120.8 C140.7 120.5 140 120.1 139.3 119.8 C138.9 111 138.6 103.5 143.3 95.8 C144 95.8 144.6 95.8 145.3 95.8 C145.6 95.2 145.8 94.6 146.1 94 C148.8 89.1 152.5 87.5 157.6 85.6 C164.7 83.5 171.2 84.4 178 87.4 Z" />
              </svg>
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
