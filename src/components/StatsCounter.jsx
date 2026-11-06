import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, AlertTriangle, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const StatsCounter = () => {
  const { currentTheme } = useTheme();

  const stats = [
    { label: 'CLAIMS DEFENDED', val: '₹2.4 CR+', sub: 'Hospital out-of-pocket savings', icon: ShieldCheck, color: '#22c55e' },
    { label: 'TOXIC TRAPS EXPOSED', val: '12 / 12', sub: 'Room rent, coma & co-pay traps', icon: AlertTriangle, color: '#ef4444' },
    { label: 'SPIDER-SENSE PRECISION', val: '99.8%', sub: 'Forensic NLP clause detection', icon: Zap, color: '#facc15' },
    { label: 'OMBUDSMAN COMPLIANCE', val: 'IRDAI 2020', sub: 'Contestable statutory appeals', icon: FileText, color: '#06b6d4' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 my-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-3xl border border-white/10 bg-zinc-950/70 backdrop-blur-xl shadow-xl flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  {s.label}
                </span>
                <Icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <span className="text-2xl sm:text-3xl font-black font-cyber text-white block">
                {s.val}
              </span>
              <span className="text-[11px] text-zinc-500 font-mono block mt-1 truncate">
                {s.sub}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
