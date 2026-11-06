import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Terminal, Heart } from 'lucide-react';

export const Footer = ({ onOpenDiceModal }) => {
  const { currentTheme, themesList, problemsList } = useTheme();

  return (
    <footer className="mt-20 border-t border-white/10 bg-black/80 backdrop-blur-md pt-12 pb-16 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg bg-white/10 text-white font-mono font-bold text-sm">
                HTB
              </span>
              <span className="font-cyber font-bold text-white tracking-wider text-base">
                ROGUEHACK 1.0
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed text-xs">
              Intra-Club Hackathon hosted by Hack The Box SRMIST. Built with a 2-dice dynamic character theme and problem generator.
            </p>
            <div className="mt-4 flex items-center gap-2 text-zinc-500 font-mono text-[11px]">
              <Terminal className="w-3.5 h-3.5" />
              <span>SHIPPED IN 60-MIN SPRINT</span>
            </div>
          </div>

          {/* Dice 1 Themes Reference */}
          <div>
            <h4 className="font-mono font-bold text-white uppercase tracking-wider mb-3 text-xs flex items-center gap-2">
              <span>DICE 1 : THEMES</span>
              <button
                onClick={onOpenDiceModal}
                className="text-[10px] text-amber-400 hover:underline uppercase"
              >
                (Switch)
              </button>
            </h4>
            <ul className="space-y-1 font-mono text-xs">
              {Object.values(themesList).map((t) => (
                <li key={t.id} className="flex items-center gap-2">
                  <span className="text-zinc-500">{t.id}.</span>
                  <span>{t.mascot}</span>
                  <span className={t.id === currentTheme.id ? 'text-white font-bold' : 'text-zinc-400'}>
                    {t.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dice 2 Problems Reference */}
          <div>
            <h4 className="font-mono font-bold text-white uppercase tracking-wider mb-3 text-xs flex items-center gap-2">
              <span>DICE 2 : PROBLEM STATEMENTS</span>
              <button
                onClick={onOpenDiceModal}
                className="text-[10px] text-amber-400 hover:underline uppercase"
              >
                (Switch)
              </button>
            </h4>
            <ul className="space-y-1 font-mono text-xs">
              {Object.values(problemsList).map((p) => (
                <li key={p.id} className="flex items-center gap-2">
                  <span className="text-zinc-500">{p.id}.</span>
                  <span className="truncate">{p.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <div>
            ROGUEHACK 1.0 • SRMIST Intra-Club Hackathon Edition
          </div>
          <div className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Sautrik Roy (Krish)
          </div>
        </div>
      </div>
    </footer>
  );
};

