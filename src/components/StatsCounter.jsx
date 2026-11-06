import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Terminal, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const StatsCounter = () => {
  const { currentTheme, currentProblem } = useTheme();

  const stats = [
    { label: 'FRAME RATE TARGET', val: '60 FPS', sub: 'GPU Accelerated Canvas' },
    { label: 'EXECUTION ARCHITECTURE', val: 'CLIENT-EDGE', sub: 'Zero Server Latency' },
    { label: 'THEME IDENTITY', val: currentTheme.name.toUpperCase(), sub: currentTheme.badge },
    { label: 'ACTIVE CHALLENGE', val: `PS 0${currentProblem.id}`, sub: currentProblem.category }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 my-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <motion.div
            key={s.label + s.val}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 rounded-xl border border-white/5 bg-zinc-950/60 backdrop-blur-md"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
              {s.label}
            </span>
            <span className="text-xl sm:text-2xl font-black font-cyber text-white block">
              {s.val}
            </span>
            <span className="text-[11px] text-zinc-500 font-mono block mt-1 truncate">
              {s.sub}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

