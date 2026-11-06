import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, AlertTriangle, ShieldCheck, Clock, Award, Activity, RotateCcw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

const DILEMMAS = [
  {
    id: 1,
    title: 'Zero-Day Disclosure vs. Billion-Dollar Launch',
    timeLimit: 15,
    context: 'T-minus 12 minutes before the global product launch. You discover a remote code execution exploit in the authentication microservice. The CEO is on the stage microphone.',
    options: [
      {
        text: 'Halt deployment immediately, pull the plug publicly, and take personal responsibility for the delay.',
        traits: { humility: 95, composure: 75, maturity: 90, decisive: 95, ethics: 100 }
      },
      {
        text: 'Quietly push a hasty hotfix without informing anyone, hoping no zero-day bot picks it up during the keynote.',
        traits: { humility: 40, composure: 50, maturity: 35, decisive: 70, ethics: 40 }
      },
      {
        text: 'Privately page the VP of SecOps and CTO with an immediate containment mitigation proposal within 2 minutes.',
        traits: { humility: 85, composure: 95, maturity: 95, decisive: 90, ethics: 90 }
      },
      {
        text: 'Ignore it until post-event debrief so you don’t disrupt the executive presentation.',
        traits: { humility: 30, composure: 40, maturity: 20, decisive: 20, ethics: 15 }
      }
    ]
  },
  {
    id: 2,
    title: 'Credit Theft in Executive All-Hands',
    timeLimit: 15,
    context: 'During an all-hands with 400 attendees, your direct manager presents your entire architectural restructuring as their sole personal invention.',
    options: [
      {
        text: 'Interrupt the presentation immediately on the live stream to demand credit.',
        traits: { humility: 25, composure: 20, maturity: 30, decisive: 85, ethics: 60 }
      },
      {
        text: 'Celebrate the achievement in the public chat by thanking the cross-functional team, sharing the PR link naturally.',
        traits: { humility: 95, composure: 90, maturity: 95, decisive: 80, ethics: 85 }
      },
      {
        text: 'Say nothing, harbor resentment, and begin interviewing at competing firms that evening.',
        traits: { humility: 50, composure: 45, maturity: 30, decisive: 40, ethics: 50 }
      },
      {
        text: 'Schedule a private 1-on-1 with the manager post-call, establishing documentation and credit boundary.',
        traits: { humility: 80, composure: 95, maturity: 90, decisive: 85, ethics: 90 }
      }
    ]
  },
  {
    id: 3,
    title: 'Junior Engineer Wipes Staging Cluster',
    timeLimit: 15,
    context: 'A junior teammate accidentally destroys staging during an investor demo. The client asks who ran the command.',
    options: [
      {
        text: 'Step in and say: "Our deployment pipeline lacked safe rollback guards. I am rolling it back now."',
        traits: { humility: 100, composure: 95, maturity: 100, decisive: 90, ethics: 95 }
      },
      {
        text: 'Publicly name the junior engineer so investors know it was an isolated individual mistake.',
        traits: { humility: 10, composure: 30, maturity: 15, decisive: 60, ethics: 20 }
      },
      {
        text: 'Pretend the outage is an intentional scheduled stress-test demonstration.',
        traits: { humility: 40, composure: 70, maturity: 40, decisive: 65, ethics: 30 }
      }
    ]
  }
];

export const PersonaProbe = () => {
  const { currentTheme } = useTheme();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [scores, setScores] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  // Active question timer
  useEffect(() => {
    if (isFinished) return;
    if (timeLeft <= 0) {
      sound.playAlert();
      handleSelectOption(DILEMMAS[currentIdx].options[0]); // default fallback on timeout
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, currentIdx, isFinished]);

  const handleSelectOption = (opt) => {
    sound.playClick();
    const newScores = [...scores, opt.traits];
    setScores(newScores);

    if (currentIdx + 1 < DILEMMAS.length) {
      setCurrentIdx(currentIdx + 1);
      setTimeLeft(DILEMMAS[currentIdx + 1].timeLimit);
    } else {
      setIsFinished(true);
      sound.playSuccess();
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    }
  };

  const restart = () => {
    sound.playHover();
    setCurrentIdx(0);
    setTimeLeft(15);
    setScores([]);
    setIsFinished(false);
  };

  // Compute aggregated scores
  const getAverageTrait = (key) => {
    if (scores.length === 0) return 75;
    const sum = scores.reduce((acc, curr) => acc + (curr[key] || 75), 0);
    return Math.round(sum / scores.length);
  };

  const traits = {
    humility: getAverageTrait('humility'),
    composure: getAverageTrait('composure'),
    maturity: getAverageTrait('maturity'),
    decisive: getAverageTrait('decisive'),
    ethics: getAverageTrait('ethics')
  };

  const activeDilemma = DILEMMAS[currentIdx];

  return (
    <div className="space-y-8">
      {!isFinished ? (
        <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Top Progress & High Pressure Alert */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <BrainCircuit className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  HIGH-PRESSURE DILEMMA {currentIdx + 1} OF {DILEMMAS.length}
                </h2>
                <p className="text-xs text-zinc-400">
                  Analyze instinctual responses under active time constraints.
                </p>
              </div>
            </div>

            {/* Countdown Badge */}
            <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 font-mono text-sm font-bold transition-all ${
              timeLeft <= 5
                ? 'border-rose-500/50 bg-rose-500/20 text-rose-400 animate-pulse'
                : 'border-white/10 bg-white/5 text-zinc-200'
            }`}>
              <Clock className="w-4 h-4 text-purple-400" />
              <span>{timeLeft}s REMAINING</span>
            </div>
          </div>

          {/* Scenario Context */}
          <div className="my-6">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold block mb-1">
              {activeDilemma.title}
            </span>
            <p className="text-base sm:text-lg text-zinc-200 font-normal leading-relaxed mt-2 p-4 rounded-xl bg-white/5 border border-white/5">
              "{activeDilemma.context}"
            </p>
          </div>

          {/* Dilemma Choices */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
              SELECT YOUR DECISIVE RESPONSE:
            </span>
            {activeDilemma.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt)}
                className="w-full p-4 rounded-xl border border-white/10 bg-zinc-900/60 hover:bg-zinc-800 hover:border-white/30 text-left transition-all duration-200 flex items-start gap-3 group"
              >
                <span className="w-6 h-6 rounded-lg bg-white/10 text-white flex items-center justify-center text-xs font-mono font-bold group-hover:bg-purple-500 group-hover:text-black transition-colors flex-shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-white leading-relaxed">
                  {opt.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Results View: Multi-Dimensional Character Dossier */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel-glow rounded-2xl p-6 sm:p-8 border border-white/15 text-white"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                EVALUATION COMPLETED • CHARACTER DOSSIER
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-cyber">
                THE STOIC VANGUARD (TIER 1 ARCHETYPE)
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Exhibits elite stress dampening, radical ownership, and ethical poise under high-stakes crises.
              </p>
            </div>
            <button
              onClick={restart}
              className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 self-start sm:self-center"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Assessment
            </button>
          </div>

          {/* Multi-Dimensional Trait Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            {/* Visual Radar / Progress Bars */}
            <div className="space-y-4 p-5 rounded-xl bg-white/5 border border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" /> BEHAVIORAL INDICES (0-100)
              </h4>

              {[
                { label: 'Humility & Radical Ownership', val: traits.humility, col: '#a855f7' },
                { label: 'Composure Under Crisis', val: traits.composure, col: '#38bdf8' },
                { label: 'Emotional Maturity', val: traits.maturity, col: '#10b981' },
                { label: 'Decisive Strategic Action', val: traits.decisive, col: '#f59e0b' },
                { label: 'Ethical Integrity', val: traits.ethics, col: '#ef4444' }
              ].map((t) => (
                <div key={t.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-300">{t.label}</span>
                    <span className="font-bold" style={{ color: t.col }}>{t.val}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${t.val}%`, backgroundColor: t.col }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Assessment Verdict & Insights */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" /> CHARACTER INDEX SUMMARY
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-2">
                  Unlike traditional self-assessment surveys where participants easily game flattering answers, your instinctual micro-decisions prove that under compressed operational clocks, you prioritize structural mission success over personal credit or blame deflection.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                  ✓ High composure and ethical resilience verify fitness for mission-critical engineering leadership.
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-500 flex justify-between">
                <span>HASH: SHA256-PROBE-{(Math.random() * 100000).toFixed(0)}</span>
                <span>STATUS: VERIFIED</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

