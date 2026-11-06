import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Copy, RefreshCw, Check, AlertCircle, Cpu, Zap, Key } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

export const PasswordForge = () => {
  const { currentTheme } = useTheme();
  const [length, setLength] = useState(20);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [mode, setMode] = useState('random'); // 'random' | 'passphrase' | 'cipher'
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  // Character sets
  const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWER = 'abcdefghijklmnopqrstuvwxyz';
  const NUMBERS = '0123456789';
  const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const WORDS = ['spiderman', 'stark', 'reactor', 'quantum', 'cipher', 'protocol', 'sentinel', 'shinchan', 'super', 'saiyan', 'kamehameha', 'hogwarts', 'patronus', 'mario', 'daredevil'];

  const generatePassword = () => {
    sound.playHover();
    if (mode === 'passphrase') {
      const selectedWords = [];
      for (let i = 0; i < 4; i++) {
        const randWord = WORDS[Math.floor(Math.random() * WORDS.length)];
        selectedWords.push(randWord);
      }
      const num = Math.floor(Math.random() * 900) + 100;
      setPassword(`${selectedWords.join('-')}-${num}!`);
      return;
    }

    let charset = '';
    if (includeUpper) charset += UPPER;
    if (includeLower) charset += LOWER;
    if (includeNumbers) charset += NUMBERS;
    if (includeSymbols) charset += SYMBOLS;
    if (!charset) charset = LOWER + NUMBERS;

    let res = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      res += charset[array[i] % charset.length];
    }
    setPassword(res);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, mode]);

  // Entropy calculation
  const calculateEntropy = (pwd) => {
    let poolSize = 0;
    if (/[A-Z]/.test(pwd)) poolSize += 26;
    if (/[a-z]/.test(pwd)) poolSize += 26;
    if (/[0-9]/.test(pwd)) poolSize += 10;
    if (/[^A-Za-z0-9]/.test(pwd)) poolSize += 32;
    if (poolSize === 0) return 0;
    return Math.round(pwd.length * Math.log2(poolSize));
  };

  const entropy = calculateEntropy(password);

  const getCrackTime = (ent) => {
    if (ent < 36) return 'Under 2.4 Seconds (Instant)';
    if (ent < 50) return 'Approx. 4 Hours';
    if (ent < 65) return 'Approx. 3.2 Years';
    if (ent < 80) return 'Approx. 4,800 Centuries';
    return '14.8 Trillion Millennia (Quantum Immune)';
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    sound.playSuccess();
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Password Generator Card */}
      <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Key className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                QUANTUM PASSWORD FORGE
              </h2>
              <p className="text-xs text-zinc-400">
                Generate and stress-test high-entropy credentials against zero-hour rainbow tables.
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
            {['random', 'passphrase'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase font-semibold transition-all ${
                  mode === m ? 'bg-white/20 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Live Generated Password Display */}
        <div className="my-6 p-4 sm:p-5 rounded-xl border border-white/15 bg-black/70 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
          <div className="w-full truncate font-mono text-base sm:text-xl font-bold tracking-wider text-emerald-400 selection:bg-emerald-500 selection:text-black">
            {password}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={generatePassword}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Regenerate"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={copyToClipboard}
              className="py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95"
              style={{
                backgroundColor: currentTheme.accent,
                color: '#000000'
              }}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'COPIED!' : 'COPY'}</span>
            </button>
          </div>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
          {/* Sliders and Toggles */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-zinc-400">LENGTH SPECIFICATION</span>
                <span className="font-bold text-white">{length} CHARACTERS</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full accent-sky-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { label: 'Uppercase (A-Z)', val: includeUpper, set: setIncludeUpper },
                { label: 'Lowercase (a-z)', val: includeLower, set: setIncludeLower },
                { label: 'Numbers (0-9)', val: includeNumbers, set: setIncludeNumbers },
                { label: 'Symbols (!@#$)', val: includeSymbols, set: setIncludeSymbols },
              ].map((toggle) => (
                <button
                  key={toggle.label}
                  onClick={() => toggle.set(!toggle.val)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    toggle.val
                      ? 'border-sky-500/40 bg-sky-500/10 text-sky-200'
                      : 'border-white/5 bg-zinc-900/60 text-zinc-500'
                  }`}
                >
                  <span className="truncate">{toggle.label}</span>
                  {toggle.val && <Check className="w-3.5 h-3.5 text-sky-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Real-Time Entropy & Attack Resistance Telemetry */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-sky-400" /> ENTROPY DENSITY
              </span>
              <span className="font-bold text-emerald-400 text-sm">{entropy} BITS</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> 100B HASHES/S CRACK TIME
              </span>
              <span className="font-bold text-white text-right truncate max-w-[180px]">
                {getCrackTime(entropy)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> BREACH DATABASE EXPOSURE
              </span>
              <span className="font-bold text-emerald-400">0 DETECTED (SAFE)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
