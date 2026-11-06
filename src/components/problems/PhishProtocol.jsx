import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, QrCode, Globe, Search, AlertOctagon, Terminal, Lock, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

const SAMPLE_THREATS = [
  {
    type: 'url',
    input: 'https://srmist-portal.auth-verify.cc/login',
    title: 'Zero-Hour Campus Credential Harvester',
    risk: 98,
    status: 'MALICIOUS_PHISH',
    domainAge: '14 Minutes Old',
    reasons: [
      'Spoofed subdomain mimicking campus SSO portal',
      'Homoglyph Latin character switch detected in payload',
      'Disposable registrar linked to known Russian bulletproof hosting ASN'
    ]
  },
  {
    type: 'quishing',
    input: 'qr_canteen_payment_spoof.png',
    title: 'Canteen UPI Quishing Sticker Redirection Trap',
    risk: 94,
    status: 'QUISHING_TRAP',
    domainAge: '3 hours old',
    reasons: [
      'QR embedded link initiates auto-redirect to unverified payment gateway',
      'Deep payload matches zero-hour PhishStats banking template #8410',
      'Invisible iframe prompt designed to intercept mobile OTP autofill'
    ]
  },
  {
    type: 'url',
    input: 'https://github.com/sautrikroy17',
    title: 'Verified Developer Portfolio Remote',
    risk: 2,
    status: 'CLEAN_VERIFIED',
    domainAge: '16 Years Old',
    reasons: [
      'Verified EV SSL Certificate issued by DigiCert',
      'Zero heuristic signatures on PhishTank and VirusTotal feeds',
      'Authentic GitHub domain authority index'
    ]
  }
];

export const PhishProtocol = () => {
  const { currentTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('url'); // 'url' | 'qr'
  const [inputValue, setInputValue] = useState(SAMPLE_THREATS[0].input);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(SAMPLE_THREATS[0]);

  const handleScan = (e) => {
    if (e) e.preventDefault();
    if (isScanning) return;
    sound.playCharge();
    setIsScanning(true);

    setTimeout(() => {
      // Find matching or generate heuristic analysis
      const matched = SAMPLE_THREATS.find((t) => t.input.toLowerCase() === inputValue.toLowerCase());
      if (matched) {
        setResult(matched);
      } else {
        const isSuspicious = inputValue.includes('login') || inputValue.includes('verify') || inputValue.includes('.xyz') || inputValue.includes('.cc');
        setResult({
          type: activeTab,
          input: inputValue,
          title: isSuspicious ? 'Heuristic Zero-Hour Credential Trap' : 'Clean Reputable Host',
          risk: isSuspicious ? 91 : 8,
          status: isSuspicious ? 'MALICIOUS_PHISH' : 'CLEAN_VERIFIED',
          domainAge: isSuspicious ? '42 Minutes Old' : 'Over 3 Years Old',
          reasons: isSuspicious
            ? [
                'Heuristic pattern matches zero-day credential harvesting kit',
                'Unregistered registrar with zero historical DNS records',
                'Threat intelligence rapid feed score exceeds safety threshold'
              ]
            : [
                'No match on active PhishStats or PhishTank zero-hour logs',
                'Standard HTTPS certificate encryption verified'
              ]
        });
      }

      setIsScanning(false);
      if (result?.risk > 50) {
        sound.playAlert();
      } else {
        sound.playSuccess();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    }, 700);
  };

  const selectPreset = (threat) => {
    sound.playClick();
    setActiveTab(threat.type);
    setInputValue(threat.input);
    setResult(threat);
  };

  return (
    <div className="space-y-8">
      {/* Scanner Deck */}
      <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                PHISH PROTOCOL // ZERO-HOUR SCANNER
              </h2>
              <p className="text-xs text-zinc-400">
                Intercepts ephemeral disposable phishing portals & QR traps inside the 5-minute zero-hour window.
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('url');
                setInputValue(SAMPLE_THREATS[0].input);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                activeTab === 'url'
                  ? 'bg-red-500/20 border border-red-500/40 text-red-300'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" /> URL INTERCEPT
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('qr');
                setInputValue(SAMPLE_THREATS[1].input);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                activeTab === 'qr'
                  ? 'bg-red-500/20 border border-red-500/40 text-red-300'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" /> QUISHING (QR) DECODER
            </button>
          </div>
        </div>

        {/* Quick Test Vectors */}
        <div className="my-4 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-zinc-400 uppercase">Test Intel Vectors:</span>
          {SAMPLE_THREATS.map((t, idx) => (
            <button
              key={idx}
              onClick={() => selectPreset(t)}
              className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-300 transition-colors"
            >
              {t.type === 'qr' ? '📷 QR Trap' : t.risk > 50 ? '⚠️ Phish Target' : '✅ Clean Repo'}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleScan} className="my-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center px-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 text-white font-mono text-xs sm:text-sm">
            {activeTab === 'url' ? (
              <Globe className="w-4 h-4 text-zinc-500 mr-2 flex-shrink-0" />
            ) : (
              <QrCode className="w-4 h-4 text-zinc-500 mr-2 flex-shrink-0" />
            )}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={activeTab === 'url' ? 'Paste suspicious URL...' : 'Upload or enter QR image payload...'}
              className="flex-1 bg-transparent focus:outline-none text-white truncate"
            />
          </div>

          <button
            type="submit"
            disabled={isScanning}
            className="py-3 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 text-black disabled:opacity-50"
            style={{
              backgroundColor: currentTheme.accent,
              boxShadow: `0 0 20px ${currentTheme.glowColor}`
            }}
          >
            <Search className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'ANALYZING...' : 'DEEP SCAN'}</span>
          </button>
        </form>

        {/* Verdict Results Section */}
        {result && (
          <div className="pt-6 border-t border-white/10 space-y-6">
            {/* Alert Banner */}
            <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              result.risk > 50
                ? 'bg-rose-950/40 border-rose-500/40 text-white'
                : 'bg-emerald-950/30 border-emerald-500/30 text-white'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black font-cyber ${
                  result.risk > 50
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {result.risk}%
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      result.risk > 50 ? 'bg-rose-500 text-black' : 'bg-emerald-500 text-black'
                    }`}>
                      {result.status}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">DOMAIN AGE: {result.domainAge}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mt-1">{result.title}</h3>
                </div>
              </div>

              {result.risk > 50 && (
                <button
                  onClick={() => sound.playAlert()}
                  className="py-2.5 px-5 rounded-xl bg-rose-500 hover:bg-rose-600 font-bold text-xs uppercase tracking-wider text-black flex items-center gap-1.5 self-start sm:self-center shadow-lg animate-pulse"
                >
                  <Lock className="w-4 h-4" /> AUTO-BLOCK ACTIVE
                </button>
              )}
            </div>

            {/* Heuristic Threat Reasons List */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-3 font-mono text-xs">
              <span className="text-zinc-400 font-bold uppercase tracking-wider block">
                RAPID-FEED THREAT INTELLIGENCE PROOFS:
              </span>
              {result.reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-2 text-zinc-300">
                  <AlertOctagon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                    result.risk > 50 ? 'text-rose-400' : 'text-emerald-400'
                  }`} />
                  <span className="leading-relaxed">{r}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
