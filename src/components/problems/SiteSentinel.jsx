import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, ShieldAlert, ShieldCheck, Terminal, AlertTriangle, Play, CheckCircle2, Copy } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

const DEMO_TARGETS = [
  'artisan-bakery-shop.com',
  'organic-fashion-store.in',
  'local-mechanic-booking.io'
];

export const SiteSentinel = () => {
  const { currentTheme } = useTheme();
  const [targetUrl, setTargetUrl] = useState(DEMO_TARGETS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [auditDone, setAuditDone] = useState(true);
  const [copied, setCopied] = useState(false);

  const startAudit = () => {
    if (isScanning) return;
    sound.playCharge();
    setIsScanning(true);
    setAuditDone(false);
    setScanProgress(0);
    setLogs([]);

    const steps = [
      { p: 20, log: 'Initiating TLS Handshake... Validating Let\'s Encrypt RSA 2048 certificate.' },
      { p: 40, log: 'Inspecting HTTP headers: HSTS, Content-Security-Policy, X-Frame-Options.' },
      { p: 65, log: 'Probing hidden configuration exposures: /.env, /.git/HEAD, /wp-config.php.' },
      { p: 85, log: 'Checking DOM sanitize defenses against reflected XSS vectors.' },
      { p: 100, log: 'Synthesizing plain-language threat intelligence report.' }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setScanProgress(step.p);
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${step.log}`]);
        sound.playHover();

        if (idx === steps.length - 1) {
          setIsScanning(false);
          setAuditDone(true);
          sound.playSuccess();
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        }
      }, (idx + 1) * 600);
    });
  };

  const copyRemediations = () => {
    sound.playClick();
    navigator.clipboard.writeText(`SITE SENTINEL AUDIT REPORT FOR: ${targetUrl}\nScore: 68/100\n1. Add Content-Security-Policy header\n2. Set X-Frame-Options: SAMEORIGIN\n3. Force HSTS preload`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Target URL Input & Scan Controller */}
      <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Radar className="w-5 h-5 animate-spin" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                SITE SENTINEL ZERO-BUDGET AUDITOR
              </h2>
              <p className="text-xs text-zinc-400">
                1-Click automated security assessment engineered for small businesses and e-commerce stores.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {DEMO_TARGETS.map((t) => (
              <button
                key={t}
                onClick={() => setTargetUrl(t)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-colors ${
                  targetUrl === t
                    ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                {t.split('.')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Input & Action Bar */}
        <div className="my-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white font-mono text-xs sm:text-sm">
            <span className="text-zinc-500 mr-2">https://</span>
            <input
              type="text"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="store-domain.com"
              className="flex-1 bg-transparent focus:outline-none text-white"
            />
          </div>

          <button
            onClick={startAudit}
            disabled={isScanning}
            className="py-3 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 disabled:opacity-50"
            style={{
              backgroundColor: currentTheme.accent,
              color: '#000000',
              boxShadow: `0 0 20px ${currentTheme.glowColor}`
            }}
          >
            <Play className={`w-4 h-4 fill-black ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'SCANNING TARGET...' : 'ONE-CLICK AUDIT'}</span>
          </button>
        </div>

        {/* Active Scan Progress Terminal */}
        {isScanning && (
          <div className="my-4 p-4 rounded-xl bg-black/80 border border-white/10 font-mono text-xs space-y-2">
            <div className="flex justify-between text-zinc-400 pb-1 border-b border-white/5">
              <span>ACTIVE TELEMETRY INJECTION</span>
              <span className="text-emerald-400">{scanProgress}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-rose-500 transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
            <div className="pt-2 text-zinc-300 space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="text-[11px] text-zinc-400">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audit Results Dashboard */}
        {auditDone && (
          <div className="pt-6 border-t border-white/10 space-y-6">
            {/* Top Score Banner */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-2xl font-black font-cyber text-amber-400">
                  68
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">OVERALL SECURITY GRADE: B-</h3>
                  <p className="text-xs text-zinc-400">
                    Target: <span className="font-mono text-zinc-300">{targetUrl}</span> • 2 High-Severity Alerts Found
                  </p>
                </div>
              </div>

              <button
                onClick={copyRemediations}
                className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 self-start sm:self-center"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'PLAN COPIED' : 'COPY 1-PAGE FIX PLAN'}</span>
              </button>
            </div>

            {/* Plain-Language Threat Findings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Finding 1 */}
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">
                      CRITICAL RISK
                    </span>
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                  </div>
                  <h4 className="font-bold text-sm text-white">Missing Content Security Policy</h4>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    Attackers can inject fake payment popups or stolen credit card skimmers directly into your checkout page.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-rose-500/10 text-[11px] font-mono text-rose-300">
                  Fix: Add HTTP header: Content-Security-Policy
                </div>
              </div>

              {/* Finding 2 */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                      MEDIUM RISK
                    </span>
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-sm text-white">Clickjacking Allowed</h4>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    Malicious external sites can load your store inside an invisible iframe to trick customers into authorized clicks.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-500/10 text-[11px] font-mono text-amber-300">
                  Fix: Set X-Frame-Options: SAMEORIGIN
                </div>
              </div>

              {/* Finding 3 */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      HEALTHY
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-sm text-white">TLS Certificate Valid</h4>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    Traffic is encrypted with TLS 1.3. Certificate expires in 64 days with auto-renewal enabled.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-500/10 text-[11px] font-mono text-emerald-300">
                  Status: No immediate action needed
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
