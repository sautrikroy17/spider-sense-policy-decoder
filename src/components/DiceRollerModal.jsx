import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dice6, Sparkles, X, Shuffle, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export const DiceRollerModal = ({ isOpen, onClose }) => {
  const { themeId, problemId, changeTheme, changeProblem, themesList, problemsList, currentTheme } = useTheme();
  const [isRolling, setIsRolling] = useState(false);
  const [tempDice1, setTempDice1] = useState(themeId);
  const [tempDice2, setTempDice2] = useState(problemId);

  const rollBothDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    sound.playDiceRoll();

    let rollCount = 0;
    const interval = setInterval(() => {
      const rand1 = Math.floor(Math.random() * 6) + 1;
      const rand2 = Math.floor(Math.random() * 6) + 1;
      setTempDice1(rand1);
      setTempDice2(rand2);
      rollCount++;

      if (rollCount > 15) {
        clearInterval(interval);
        const finalD1 = Math.floor(Math.random() * 6) + 1;
        const finalD2 = Math.floor(Math.random() * 6) + 1;
        setTempDice1(finalD1);
        setTempDice2(finalD2);
        changeTheme(finalD1);
        changeProblem(finalD2);
        setIsRolling(false);
        sound.playSuccess();

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 80);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 p-6 shadow-2xl text-white"
          style={{ borderColor: currentTheme.accent }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Dice6 className="w-6 h-6" style={{ color: currentTheme.accent }} />
              <h2 className="text-xl font-bold tracking-wider font-cyber">ROGUEHACK 2-DICE CONSOLE</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Info */}
          <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
            Roll die 1 for your Character Theme and die 2 for your Problem Statement, or click any direct preset below to instantly transform the entire application.
          </p>

          {/* Interactive Dice Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            {/* Dice 1: Theme */}
            <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/60 flex flex-col items-center">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1">
                DICE 1 : CHARACTER THEME
              </span>
              <motion.div
                animate={isRolling ? { rotate: [0, 90, 180, 270, 360], scale: [1, 1.15, 0.9, 1.1, 1] } : {}}
                transition={{ duration: 0.3, repeat: isRolling ? Infinity : 0 }}
                className="w-16 h-16 my-2 rounded-xl border-2 flex items-center justify-center text-3xl font-bold shadow-lg"
                style={{
                  borderColor: themesList[tempDice1].accent,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: themesList[tempDice1].accent
                }}
              >
                {tempDice1}
              </motion.div>
              <span className="text-lg font-bold" style={{ color: themesList[tempDice1].accent }}>
                {themesList[tempDice1].mascot} {themesList[tempDice1].name}
              </span>
              <span className="text-xs text-zinc-400 text-center mt-1">
                {themesList[tempDice1].badge}
              </span>
            </div>

            {/* Dice 2: Problem Statement */}
            <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/60 flex flex-col items-center">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1">
                DICE 2 : PROBLEM STATEMENT
              </span>
              <motion.div
                animate={isRolling ? { rotate: [0, -90, -180, -270, -360], scale: [1, 1.15, 0.9, 1.1, 1] } : {}}
                transition={{ duration: 0.3, repeat: isRolling ? Infinity : 0 }}
                className="w-16 h-16 my-2 rounded-xl border-2 flex items-center justify-center text-3xl font-bold shadow-lg"
                style={{
                  borderColor: problemsList[tempDice2].accentColor,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: problemsList[tempDice2].accentColor
                }}
              >
                {tempDice2}
              </motion.div>
              <span className="text-lg font-bold" style={{ color: problemsList[tempDice2].accentColor }}>
                {problemsList[tempDice2].title}
              </span>
              <span className="text-xs text-zinc-400 text-center mt-1">
                {problemsList[tempDice2].category}
              </span>
            </div>
          </div>

          {/* Roll Button */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={rollBothDice}
              disabled={isRolling}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              style={{
                backgroundColor: currentTheme.accent,
                color: '#000000',
                boxShadow: `0 0 20px ${currentTheme.glowColor}`
              }}
            >
              <Shuffle className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
              {isRolling ? 'Rolling Dice in 3D...' : 'ROLL BOTH DICE (RANDOM ROLL)'}
            </button>
          </div>

          {/* Direct Select Grid */}
          <div className="space-y-3">
            <div>
              <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block mb-2">
                Or Select Theme Directly (Dice 1):
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6].map((id) => (
                  <button
                    key={id}
                    onClick={() => {
                      changeTheme(id);
                      setTempDice1(id);
                    }}
                    className={`p-2 rounded-lg text-xs font-semibold border transition-all text-center flex flex-col items-center gap-1 ${
                      themeId === id
                        ? 'border-white bg-white/15 shadow-md'
                        : 'border-white/10 bg-zinc-900/50 hover:bg-zinc-800/80 text-zinc-300'
                    }`}
                  >
                    <span>{themesList[id].mascot}</span>
                    <span className="truncate w-full">{themesList[id].name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block mb-2">
                Or Select Problem Statement Directly (Dice 2):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((id) => (
                  <button
                    key={id}
                    onClick={() => {
                      changeProblem(id);
                      setTempDice2(id);
                    }}
                    className={`p-2 rounded-lg text-xs font-semibold border transition-all text-left flex items-center gap-2 ${
                      problemId === id
                        ? 'border-white bg-white/15 shadow-md'
                        : 'border-white/10 bg-zinc-900/50 hover:bg-zinc-800/80 text-zinc-300'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-white/10">
                      {id}
                    </span>
                    <span className="truncate flex-1">{problemsList[id].title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="py-2 px-5 rounded-lg text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Confirm & Apply to Workspace
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
