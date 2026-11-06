import React, { useState, useEffect } from 'react';
import { Dice5, Volume2, VolumeX, Monitor, Clock, ShieldCheck, Flame } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';

export const Navbar = ({ onOpenDiceModal }) => {
  const { currentTheme, currentProblem, isMuted, toggleSound, crtEnabled, toggleCrt } = useTheme();

  // 60-minute hackathon sprint timer
  const [secondsLeft, setSecondsLeft] = useState(3600); // 60 mins
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let timer;
    if (timerActive && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive, secondsLeft]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Event Branding & HTB SRMIST */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg border border-white/20"
            style={{
              backgroundColor: currentTheme.primary,
              boxShadow: `0 0 15px ${currentTheme.glowColor}`
            }}
          >
            <span>{currentTheme.mascot}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cyber font-black tracking-wider text-sm sm:text-base text-white">
                ROGUEHACK <span style={{ color: currentTheme.accent }}>1.0</span>
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-bold uppercase rounded tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                HTB SRMIST
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-tech truncate max-w-[200px] sm:max-w-none">
              {currentTheme.name} × {currentProblem.title}
            </p>
          </div>
        </div>

        {/* Center: Live 60-Min Sprint Countdown */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
          <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
            SPRINT:
          </span>
          <span className="font-tech text-xs font-bold text-amber-400">
            {formatTime(secondsLeft)}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Right: Quick Controls & Roll Dice Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* CRT scanline toggle */}
          <button
            onClick={toggleCrt}
            title={crtEnabled ? 'Disable CRT Scanlines' : 'Enable CRT Scanlines'}
            className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1 ${
              crtEnabled
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden lg:inline text-[10px] font-semibold">CRT</span>
          </button>

          {/* Sound Mute/Unmute */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute SFX' : 'Mute SFX'}
            className="p-2 rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-all text-xs"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Dice Selector Pill Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenDiceModal();
            }}
            className="px-3.5 py-1.5 rounded-xl font-cyber text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border border-white/20 shadow-lg hover:scale-105"
            style={{
              backgroundColor: currentTheme.accent,
              color: '#000000',
              boxShadow: `0 0 16px ${currentTheme.glowColor}`
            }}
          >
            <Dice5 className="w-4 h-4 animate-bounce" />
            <span>ROLL DICE</span>
          </button>
        </div>
      </div>
    </header>
  );
};
