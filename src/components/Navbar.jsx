import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Dice5,
  Menu,
  X,
  Music,
  Zap,
  UploadCloud,
  FileSearch,
  Scale,
  Calculator,
  Key,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Shield,
  Radio
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';
import { GroqService } from '../services/groqService';

export const Navbar = ({ onOpenDiceModal, onOpenSidebar }) => {
  const { currentTheme, isMuted, toggleSound } = useTheme();

  const [musicActive, setMusicActive] = useState(false);
  const [groqModalOpen, setGroqModalOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [savedKeySuccess, setSavedKeySuccess] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const key = GroqService.getApiKey();
    setHasApiKey(Boolean(key));
    if (key) setApiKeyInput(key);
  }, []);

  const handleToggleMusic = () => {
    const playing = sound.toggleSpiderTheme();
    setMusicActive(playing);
  };

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    GroqService.setApiKey(apiKeyInput);
    setHasApiKey(Boolean(apiKeyInput.trim()));
    setSavedKeySuccess(true);
    sound.playPizzaTime();
    setTimeout(() => setSavedKeySuccess(false), 2000);
  };

  const scrollToSection = (id) => {
    sound.playHover();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Sleek Floating Aerospace-Grade Cyber HUD Navbar */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-40 w-[96%] max-w-6xl transition-all">
        <div className="relative rounded-2xl bg-black/85 backdrop-blur-2xl border border-red-500/30 px-3.5 sm:px-5 py-2.5 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(239,68,68,0.2)] overflow-hidden">
          
          {/* Top Edge Laser Glow Accent */}
          <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-80 pointer-events-none" />
          
          {/* Bottom Edge Subtle Cyan Shadow Accent */}
          <div className="absolute inset-x-16 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent pointer-events-none" />

          {/* LEFT: Spider-Man Brand & Status Badge */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => {
                sound.playThwip();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group text-left"
            >
              {/* Spider Radar Emblem */}
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 p-0.5 shadow-[0_0_15px_rgba(239,68,68,0.6)] group-hover:scale-105 transition-transform flex items-center justify-center">
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

              {/* Title Typography (Single line, strictly no wrap) */}
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-cyber font-black text-sm tracking-wider text-white">
                  SPIDER-SENSE
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/30">
                  BRAND NEW DAY
                </span>
              </div>
            </button>
          </div>

          {/* CENTER: Navigation Links (Clean, Centered, No Wrap) */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => scrollToSection('decoder')}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
            >
              <FileSearch className="w-3.5 h-3.5 text-red-400" />
              <span>Decoder</span>
            </button>

            <button
              onClick={() => scrollToSection('policy-uploader')}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
            >
              <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
              <span>Upload Doc</span>
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

          {/* RIGHT: High-Tech Controls (Groq AI, Spidey Theme, Audio, Roll Dice) */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            
            {/* Groq AI Status Pill / Modal Trigger */}
            <button
              onClick={() => {
                sound.playClick();
                setGroqModalOpen(true);
              }}
              title="Groq Llama 3.3 70B AI Engine Settings"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold border transition-all ${
                hasApiKey
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50'
                  : 'bg-red-950/30 border-red-500/40 text-red-300 hover:bg-red-900/40'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span className="hidden sm:inline">GROQ AI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            {/* Spider-Man Brass Theme Song Player */}
            <button
              onClick={handleToggleMusic}
              title={musicActive ? 'Pause Spider-Man Theme' : 'Play Spider-Man Theme'}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold border transition-all ${
                musicActive
                  ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Music className={`w-3.5 h-3.5 ${musicActive ? 'animate-bounce' : ''}`} />
              <span className="hidden md:inline">
                {musicActive ? 'THEME ON' : 'SPIDEY SONG'}
              </span>

              {/* Animated Audio Equalizer Bars when active */}
              {musicActive && (
                <div className="flex items-center gap-0.5 ml-1">
                  {[12, 18, 14, 20].map((h, i) => (
                    <motion.span
                      key={i}
                      animate={{ height: [4, h, 6, h * 0.8, 4] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                      className="w-0.5 bg-white rounded-full"
                    />
                  ))}
                </div>
              )}
            </button>

            {/* SFX Mute Button */}
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

            {/* Roll Dice Button */}
            <button
              onClick={() => {
                sound.playCharge();
                onOpenDiceModal();
              }}
              className="px-3.5 sm:px-4 py-1.5 rounded-xl text-xs font-bold font-cyber tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:brightness-110 border border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.5)] active:scale-95 flex items-center gap-1.5 transition-all"
            >
              <span className="whitespace-nowrap">ROLL DICE</span>
              <Dice5 className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Sidebar Hamburger */}
            <button
              onClick={onOpenSidebar}
              className="lg:hidden p-1.5 text-zinc-400 hover:text-white rounded-lg ml-0.5"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Groq AI Engine Modal */}
      <AnimatePresence>
        {groqModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg rounded-3xl border border-red-500/40 bg-zinc-950 p-6 sm:p-7 shadow-[0_0_60px_rgba(239,68,68,0.3)] text-white relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setGroqModalOpen(false)}
                className="absolute top-5 right-5 p-1 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
                  <Zap className="w-5 h-5 fill-red-500 text-red-500" />
                </div>
                <div>
                  <h3 className="font-cyber font-bold text-base text-white tracking-wide">
                    GROQ LPU™ INFERENCE ENGINE
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Model: Meta Llama 3.3 70B Versatile (&lt; 400ms speed)
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 text-xs font-mono text-zinc-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">ENGINE STATUS:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      READY // ACTIVE
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">FALLBACK SAFETY:</span>
                    <span className="text-cyan-400">100% Offline IRDAI Decompiler</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">SPEED BENCHMARK:</span>
                    <span className="text-amber-400">~340 tokens/sec</span>
                  </div>
                </div>

                <form onSubmit={handleSaveApiKey} className="space-y-3">
                  <label className="block text-xs font-mono text-zinc-300 font-bold">
                    GROQ API KEY (OPTIONAL - OVERRIDES DEFAULT):
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      placeholder="gsk_..."
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/15 text-xs text-white placeholder-zinc-600 font-mono focus:outline-none focus:border-red-500 shadow-inner"
                    />
                    <Key className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3.5" />
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    Keys are stored securely in local browser storage. If omitted, the app uses built-in credentials or instant local forensic decompilation.
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center gap-2"
                    >
                      {savedKeySuccess ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                          <span>KEY SAVED!</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          <span>SAVE & ACTIVATE</span>
                        </>
                      )}
                    </button>

                    <a
                      href="https://console.groq.com/keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>Get Groq API Key</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
