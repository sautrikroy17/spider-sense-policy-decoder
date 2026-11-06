import React from 'react';
import { Terminal, Heart, Scale, ShieldCheck, Zap, FileText } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const Footer = () => {
  const scrollTo = (id) => {
    sound.playHover();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-white/10 bg-black/90 backdrop-blur-md pt-12 pb-16 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-red-600/20 border border-red-500/50 flex items-center justify-center text-sm shadow-[0_0_12px_rgba(239,68,68,0.5)]">
                <span>🕸️</span>
              </div>
              <span className="font-cyber font-bold text-white tracking-wider text-base">
                SPIDER-SENSE POLICY DECODER
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed text-xs max-w-md">
              "With great power comes great responsibility — and zero hidden fine print." Autonomous consumer protection platform defending patients against unfair room-rent caps, 48-hour emergency voids, and unpayable hospital consumables.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-zinc-500 font-mono text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Zap className="w-3.5 h-3.5" />
                <span>GROQ LPU (120B PARAMETERS)</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>IRDAI OMBUDSMAN COMPLIANCE</span>
              </span>
            </div>
          </div>

          {/* Direct Navigation */}
          <div>
            <h4 className="font-mono font-bold text-white uppercase tracking-wider mb-3 text-xs flex items-center gap-1.5">
              <span>WORKSPACES</span>
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <button
                  onClick={() => scrollTo('decoder')}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5"
                >
                  <span>→</span> Policy Decoder
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('policy-uploader')}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5"
                >
                  <span>→</span> Document Scanner (PDF)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('aunt-may-calculator')}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5"
                >
                  <span>→</span> Aunt May Bill Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('rebuttal-generator')}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5"
                >
                  <span>→</span> IRDAI Legal Notice
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Citations */}
          <div>
            <h4 className="font-mono font-bold text-white uppercase tracking-wider mb-3 text-xs flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-red-500" />
              <span>STATUTORY CITATIONS</span>
            </h4>
            <ul className="space-y-1.5 font-mono text-[11px] text-zinc-400">
              <li>• IRDAI Circular 194/07/2020</li>
              <li>• Section 45, Insurance Act 1938</li>
              <li>• Section 2(47), Consumer Protection Act</li>
              <li>• Supreme Court Contra Proferentem Precedent</li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <div>
            SPIDER-SENSE • Autonomous Policy Defense Platform
          </div>
          <div className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Sautrik Roy (Krish)
          </div>
        </div>
      </div>
    </footer>
  );
};
