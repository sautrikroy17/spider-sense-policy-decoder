import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export const TerminalCard = ({
  title = 'TERMINAL_SESSION',
  badge = 'ENCRYPTED',
  children,
  className = '',
  actionText,
  onAction
}) => {
  const { currentTheme } = useTheme();

  return (
    <div
      className={`relative rounded-2xl border bg-black/75 backdrop-blur-xl p-5 sm:p-6 shadow-2xl transition-all duration-300 ${className}`}
      style={{
        borderColor: `${currentTheme.accent}35`,
        boxShadow: `0 10px 30px rgba(0,0,0,0.6)`
      }}
    >
      {/* Terminal Window Header Bar (like Image 4) */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10 text-xs font-mono">
        {/* Traffic Light Dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
          <span className="ml-2 text-[11px] font-bold tracking-wider text-zinc-400 uppercase">
            {title}
          </span>
        </div>

        {/* Status / Encryption Tag */}
        <div className="flex items-center gap-2">
          <span
            className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase border"
            style={{
              backgroundColor: `${currentTheme.accent}15`,
              borderColor: `${currentTheme.accent}40`,
              color: currentTheme.accent
            }}
          >
            {badge}
          </span>
        </div>
      </div>

      {/* Decorative Corner Brackets (HUD Reticle Aesthetic) */}
      <span className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 opacity-40 pointer-events-none" style={{ borderColor: currentTheme.accent }} />
      <span className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 opacity-40 pointer-events-none" style={{ borderColor: currentTheme.accent }} />
      <span className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 opacity-40 pointer-events-none" style={{ borderColor: currentTheme.accent }} />
      <span className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 opacity-40 pointer-events-none" style={{ borderColor: currentTheme.accent }} />

      {/* Main Body Content */}
      <div className="relative z-10">{children}</div>

      {/* Optional Terminal Bottom Action */}
      {actionText && (
        <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
          <button
            onClick={onAction}
            className="text-[11px] font-mono font-bold tracking-wider uppercase hover:underline flex items-center gap-1 transition-colors"
            style={{ color: currentTheme.accent }}
          >
            <span>{actionText}</span>
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
};
