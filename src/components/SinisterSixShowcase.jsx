import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, ShieldAlert, Zap } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const SINISTER_VILLAINS = [
  {
    id: 'doc_oc',
    name: 'Doctor Octopus',
    title: 'The Room-Rent Guillotine',
    clauseType: 'Proportionate Deduction',
    threatLevel: 'OMEGA THREAT (40% CUT)',
    image: '/spidey/doctor-octopus-pfp.jpg',
    color: '#10b981',
    lore: 'Otto Octavius manipulates room rent limits. Choose a room with a window, and his four mechanical arms confiscate 40% of your surgeon payout.',
    sampleClause:
      'Section 4.2(b): Room rent capped strictly at 1% of base sum insured. Proportionate deduction applies to all associated medical expenses.',
    quote: '"The power of the fine print, in the palm of my hand."'
  },
  {
    id: 'electro',
    name: 'Electro',
    title: 'The 48-Hour Coma Trap',
    clauseType: 'Emergency Notice Void',
    threatLevel: 'INSTANT VOID',
    image: '/spidey/electro-pfp.jpg',
    color: '#06b6d4',
    lore: 'High voltage shock puts you in intensive care? If you fail to send an email while unconscious within 48 hours, Electro shorts your entire claim.',
    sampleClause:
      'Clause 8.1: Notice of claim must be served in writing within 48 hours of emergency admission. Failure strictly repudiates all indemnity obligations.',
    quote: '"You thought you were covered? Shocking, isn\'t it?"'
  },
  {
    id: 'lizard',
    name: 'The Lizard',
    title: 'Pre-Existing Lookback Trap',
    clauseType: '36-Month Ambiguous Lookback',
    threatLevel: 'CHRONIC DENIAL',
    image: '/spidey/lizard-pfp.jpg',
    color: '#22c55e',
    lore: 'Dr. Curt Connors regenerates insurer profits. Had a minor headache 3 years ago? He labels it an undisclosed pre-existing condition and rejects everything.',
    sampleClause:
      'Section 3.1: Any symptoms exhibited within 36 calendar months prior to inception shall be deemed pre-existing and excluded for 4 policy years.',
    quote: '"All humans are biological pre-existing liabilities."'
  },
  {
    id: 'mysterio',
    name: 'Mysterio',
    title: 'The Ambiguous Legalese Illusion',
    clauseType: 'Unproven Treatment Exclusion',
    threatLevel: 'PSYCHOLOGICAL TRAP',
    image: '/spidey/mysterio-pfp.jpg',
    color: '#a855f7',
    lore: 'Quentin Beck projects marketing illusions. His brochures say "100% Cashless", but the fine print says "Subject to TPA discretion".',
    sampleClause:
      'Clause 19.4: Insurer reserves sole unilateral discretion to designate modern robotic surgeries as unproven or experimental.',
    quote: '"People need to believe in coverage. And nowadays, they’ll believe anything."'
  },
  {
    id: 'sandman',
    name: 'Sandman',
    title: 'Non-Payables Consumable Sinkhole',
    clauseType: 'Consumables & PPE Exclusion',
    threatLevel: 'OUT-OF-POCKET BLEED',
    image: '/spidey/sandman-pfp.jpg',
    color: '#f59e0b',
    lore: 'Flint Marko buries your savings in sand. Cotton, surgical gloves, PPE kits, masks, and syringes are classified as "non-medical" expenses.',
    sampleClause:
      'Schedule 1: All items categorized under IRDAI Annexure non-payable list (gloves, oxygen masks, sanitizers, cannulas) are 100% patient payable.',
    quote: '"I’m not a bad insurer. Just had bad underwriting."'
  },
  {
    id: 'vulture',
    name: 'The Vulture',
    title: '50% Depreciation Scavenger',
    clauseType: 'Salvage & Plastic Deduction',
    threatLevel: 'SALVAGE ROBBERY',
    image: '/spidey/vulture-pfp.jpg',
    color: '#ef4444',
    lore: 'Adrian Toomes picks your motor accident claims clean. Slashes 50% on plastic bumpers, fiber body panels, and glass components automatically.',
    sampleClause:
      'Section 2.3: Plastics, rubber parts, and nylon accessories are indemnified subject to 50% mandatory salvage deduction unless Zero-Dep rider endorsed.',
    quote: '"The rich and powerful, they do whatever they want. We salvage what\'s left."'
  }
];

export const SinisterSixShowcase = ({ onSelectVillain }) => {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-red-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white">
              FINE-PRINT ROGUES GALLERY
            </span>
            <span className="text-xs font-mono text-zinc-400">TARGET ARCHIVES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-cyber mt-2">
            THE SINISTER SIX OF FINE-PRINT
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1 max-w-2xl">
            Tap any villain to decompile their signature policy trap in the Spider-Sense interactive decoder.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-red-400">
          <ShieldAlert className="w-4 h-4 animate-pulse" />
          <span>6 ACTIVE CORPORATE THREATS</span>
        </div>
      </div>

      {/* 6 Villain 3D Spotlight Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SINISTER_VILLAINS.map((v, idx) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => {
              sound.playThwip();
              onSelectVillain(v);
            }}
            className="group relative cursor-pointer rounded-3xl overflow-hidden bg-zinc-950/80 border border-white/10 hover:border-red-500/60 p-6 flex flex-col justify-between shadow-2xl transition-all duration-300"
            style={{
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            {/* Ambient hover glow */}
            <div
              className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
              style={{ backgroundColor: v.color }}
            />

            <div>
              {/* Header: Villain Avatar + Threat Badge */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 transition-transform duration-300 group-hover:scale-105"
                    style={{ borderColor: v.color }}
                  />
                  <span
                    className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black flex items-center justify-center text-[8px]"
                    style={{ backgroundColor: v.color }}
                  >
                    ⚡
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-white font-cyber tracking-wide group-hover:text-red-400 transition-colors">
                    {v.name}
                  </h3>
                  <span
                    className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${v.color}20`, color: v.color }}
                  >
                    {v.threatLevel}
                  </span>
                </div>
              </div>

              {/* Trap Title */}
              <div className="mb-3">
                <span className="text-xs font-mono font-bold text-zinc-300 uppercase block">
                  {v.title}
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  {v.clauseType}
                </span>
              </div>

              {/* Lore description */}
              <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
                {v.lore}
              </p>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500 italic">"{v.quote.slice(0, 32)}..."</span>
              <span className="flex items-center gap-1 font-bold text-red-400 group-hover:translate-x-1 transition-transform">
                <span>AUDIT TRAP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
