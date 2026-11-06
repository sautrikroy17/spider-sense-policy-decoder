import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileSearch, AlertOctagon, CheckCircle2, ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { sound } from '../../utils/soundEffects';

const SAMPLE_POLICIES = [
  {
    id: 'health',
    title: 'HealthCare Gold 360 (Pre-existing Condition Clause)',
    survivalScore: 38,
    riskLevel: 'HIGH TRAP RISK',
    legalese: 'Section 4.2(b): Notwithstanding anything to the contrary, pre-existing ailments diagnosed or symptomatic within 36 calendar months preceding inception shall be subject to proportionate deductible co-pay up to 40% with mandatory room rent capping at 1% of base sum insured.',
    plainEnglish: 'If you ever had symptoms in the last 3 years, they will force you to pay 40% of the entire hospital bill out of your own pocket. Plus, if your hospital room costs more than 1% of your cover, they slash your doctor fees proportionately too!',
    redFlags: [
      'Room rent capping triggers proportionate claim deduction on total bill',
      '36-Month extended lookback window on vague "symptoms"',
      'Mandatory 40% co-payment applied before claim disbursement'
    ]
  },
  {
    id: 'auto',
    title: 'Bumper-to-Bumper Auto Shield (Depreciation Clause)',
    survivalScore: 54,
    riskLevel: 'MODERATE RISK',
    legalese: 'Clause 9.1: Consumables, nylon, rubber, and glass fittings shall be indemnified strictly subject to 50% salvage depreciation unless Nil-Depreciation rider endorsement code ND-08 is actively endorsed prior to claim loss occurrence.',
    plainEnglish: 'In an accident, half the cost of headlights, plastic bumpers, windshields, and coolants comes straight from your wallet unless you specifically bought the hidden extra rider beforehand.',
    redFlags: [
      '50% upfront deduction on all plastics, rubber, and glass',
      'Excludes roadside towing unless declared within 120 minutes of impact'
    ]
  },
  {
    id: 'device',
    title: 'Ultra-Gadget Accidental Care (Liquid Ingress Clause)',
    survivalScore: 22,
    riskLevel: 'CRITICAL VOID TRAP',
    legalese: 'Subsection 11.4: Accidental damage coverage explicitly excludes direct or indirect ingress of moisture, sweat, precipitation, or unverified humidity exceeding 65% RH at internal circuit inspection.',
    plainEnglish: 'If you dropped your phone in rain or even held it with sweaty gym hands, their internal inspection strip turns red and your entire warranty claim is automatically rejected with 0 refund.',
    redFlags: [
      'Moisture indicator strip voids entire accidental drop warranty',
      'Unverified atmospheric humidity threshold of 65% voids repair'
    ]
  }
];

export const PolicyDecoder = () => {
  const { currentTheme } = useTheme();
  const [selectedPolicy, setSelectedPolicy] = useState(SAMPLE_POLICIES[0]);
  const [customText, setCustomText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSelectPreset = (p) => {
    sound.playClick();
    setSelectedPolicy(p);
  };

  const handleAnalyzeCustom = (e) => {
    e.preventDefault();
    if (!customText.trim()) return;
    sound.playCharge();
    setIsAnalyzing(true);

    setTimeout(() => {
      setSelectedPolicy({
        id: 'custom',
        title: 'Custom User Policy Clause',
        survivalScore: 45,
        riskLevel: 'AMBIGUOUS EXCLUSION DETECTED',
        legalese: customText,
        plainEnglish: 'This clause contains ambiguous indemnity language allowing the insurer to contest claims if written notification is delayed past 48 hours or if tertiary diagnostic records are missing.',
        redFlags: [
          'Vague exclusion for non-standardized treatments',
          'Strict 48-hour incident reporting window under Clause 6'
        ]
      });
      setIsAnalyzing(false);
      sound.playSuccess();
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* Policy Selector & Paste Deck */}
      <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FileSearch className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                POLICY DECODER & EXCLUSION RADAR
              </h2>
              <p className="text-xs text-zinc-400">
                Translate obscure insurance fine-print into brutally honest human terms.
              </p>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1.5">
            {SAMPLE_POLICIES.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedPolicy.id === p.id
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                    : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                {p.id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Clause Input */}
        <form onSubmit={handleAnalyzeCustom} className="my-6">
          <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2">
            Paste Any Confusing Insurance Clause / Exclusions Section:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <textarea
              rows={2}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="e.g. 'Notwithstanding anything contained herein, in no event shall liability accrue if notification is not received in 48 hours...'"
              className="flex-1 p-3 rounded-xl bg-zinc-900/80 border border-white/10 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={isAnalyzing}
              className="px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-black shadow-lg"
              style={{ backgroundColor: currentTheme.accent }}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAnalyzing ? 'DECODING...' : 'DECODE CLAUSE'}</span>
            </button>
          </div>
        </form>

        {/* Decoded Report Card */}
        <div className="pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Claim Survival Score Metric */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase text-zinc-400 block mb-1">
                REAL CLAIM SURVIVAL SCORE
              </span>
              <div className="flex items-baseline gap-2 my-2">
                <span className={`text-4xl sm:text-5xl font-black font-cyber ${
                  selectedPolicy.survivalScore < 40 ? 'text-rose-500' : 'text-amber-400'
                }`}>
                  {selectedPolicy.survivalScore}%
                </span>
                <span className="text-xs font-mono text-zinc-400">OUTCOME PROBABILITY</span>
              </div>
              <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                {selectedPolicy.riskLevel}
              </span>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 space-y-2 text-xs">
              <span className="font-bold text-zinc-300 block">DETECTED TOXIC TRAPS:</span>
              {selectedPolicy.redFlags.map((flag, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-zinc-400">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>{flag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Side-by-Side Legalese vs Plain Translation */}
          <div className="md:col-span-2 space-y-4">
            <div className="p-4 rounded-xl bg-black/60 border border-white/5">
              <span className="text-xs font-mono uppercase text-rose-400 font-bold block mb-1">
                ORIGINAL INSURANCE LEGALESE (WHAT THEY WROTE):
              </span>
              <p className="text-xs sm:text-sm text-zinc-300 italic font-mono leading-relaxed">
                "{selectedPolicy.legalese}"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold block mb-1">
                PLAIN ENGLISH TRANSLATION (WHAT IT ACTUALLY MEANS TO YOU):
              </span>
              <p className="text-xs sm:text-sm text-zinc-100 leading-relaxed font-medium">
                {selectedPolicy.plainEnglish}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
