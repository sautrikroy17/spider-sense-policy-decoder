import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Clock, Flame, Check, Plus, Sparkles, AlertCircle, Play, RotateCcw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

const PANTRY_ITEMS = [
  { id: 'eggs', name: 'Eggs (2x)', icon: '🥚', selected: true },
  { id: 'onion', name: 'Half Onion', icon: '🧅', selected: true },
  { id: 'bread', name: 'Stale Bread', icon: '🍞', selected: true },
  { id: 'cheese', name: 'Cheese Slice', icon: '🧀', selected: false },
  { id: 'garlic', name: 'Garlic Pods', icon: '🧄', selected: false },
  { id: 'butter', name: 'Butter / Oil', icon: '🧈', selected: true },
  { id: 'chili', name: 'Green Chili', icon: '🌶️', selected: false },
  { id: 'noodles', name: 'Instant Noodles', icon: '🍜', selected: false },
  { id: 'tomato', name: '1 Tomato', icon: '🍅', selected: false },
  { id: 'milk', name: 'Milk Splash', icon: '🥛', selected: false },
  { id: 'potato', name: '1 Boiled Potato', icon: '🥔', selected: false },
  { id: 'soy', name: 'Soy Sauce', icon: '🥢', selected: false },
];

const RECIPES_DB = [
  {
    title: 'Hacker Golden French Toast Royale',
    time: '7 Mins',
    difficulty: 'Survival: Rookie Proof',
    calories: '340 kcal',
    description: 'Breathes life into stale bread through an egg and onion-infused savory emulsion pan-fried to crisp perfection.',
    steps: [
      'Whisk 2 eggs vigorously with sliced onion, green chili, and a pinch of salt & pepper.',
      'Soak the stale bread slices for 30 seconds on each side until spongy.',
      'Heat a dab of butter on a hot skillet over medium heat.',
      'Pan fry the soaked bread for 2 minutes each side until golden and caramelized.'
    ],
    proTip: 'The starch in stale bread absorbs the egg better than fresh bread without getting soggy!'
  },
  {
    title: 'Midnight Crispy Bread Omelette Burger',
    time: '5 Mins',
    difficulty: 'Survival: Rapid Fire',
    calories: '420 kcal',
    description: 'High-protein survival fuel utilizing browned onions, fluffy eggs, and toasted bread crusts.',
    steps: [
      'Finely dice the half onion and sauté in butter for 60 seconds.',
      'Pour whisked eggs directly over the sizzling onions.',
      'Press the bread slices directly into the wet egg mixture, then flip the entire sheet.',
      'Fold the egg edges inwards, add cheese if available, and fold into a sandwich.'
    ],
    proTip: 'Press down with a spatula for 20 seconds to achieve street-style crispiness.'
  },
  {
    title: 'Deconstructed Onion & Egg Frittata Pan',
    time: '9 Mins',
    difficulty: 'Survival: Moderate',
    calories: '380 kcal',
    description: 'A skillet-baked rustic frittata with crouton-crisp bread cubes and caramelized onion ribbons.',
    steps: [
      'Cut stale bread into small 1-inch crouton cubes.',
      'Toast the bread cubes in butter until crunchy, then remove.',
      'Sauté onions until translucent and fragrant.',
      'Pour whisked eggs over onions, fold in crunchy bread croutons, and cover on low heat for 3 minutes.'
    ],
    proTip: 'Covering the pan with a lid traps steam, making the eggs puff up without burning the bottom.'
  }
];

export const RecipeRoulette = () => {
  const { currentTheme } = useTheme();
  const [items, setItems] = useState(PANTRY_ITEMS);
  const [customItem, setCustomItem] = useState('');
  const [recipe, setRecipe] = useState(RECIPES_DB[0]);
  const [cookingTimer, setCookingTimer] = useState(420); // 7 mins in secs
  const [timerRunning, setTimerRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState({});

  const toggleItem = (id) => {
    sound.playClick();
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, selected: !it.selected } : it))
    );
  };

  const addCustomItem = (e) => {
    e.preventDefault();
    if (!customItem.trim()) return;
    sound.playHover();
    const newItem = {
      id: `custom-${Date.now()}`,
      name: customItem.trim(),
      icon: '✨',
      selected: true
    };
    setItems((prev) => [...prev, newItem]);
    setCustomItem('');
  };

  const generateSurvivalRecipe = () => {
    sound.playCharge();
    const randomIdx = Math.floor(Math.random() * RECIPES_DB.length);
    setRecipe(RECIPES_DB[randomIdx]);
    setCompletedSteps({});
    setCookingTimer(420);
    setTimerRunning(false);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const toggleStep = (idx) => {
    sound.playClick();
    setCompletedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const selectedCount = items.filter((i) => i.selected).length;

  return (
    <div className="space-y-8">
      {/* Fridge Pantry Selector Box */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Utensils className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                FRIDGE INGREDIENT DETECTOR
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Tap what remains in your fridge. Zero supermarket runs required.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-zinc-300">
              {selectedCount} Selected
            </span>
          </div>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-6">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center justify-between gap-2 ${
                item.selected
                  ? 'border-white/40 bg-white/15 text-white shadow-lg'
                  : 'border-white/5 bg-zinc-900/50 hover:bg-zinc-800/80 text-zinc-400'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-semibold truncate">{item.name}</span>
              </div>
              {item.selected && <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
            </button>
          ))}
        </div>

        {/* Custom Input + Generate Button */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/10">
          <form onSubmit={addCustomItem} className="flex-1 flex gap-2">
            <input
              type="text"
              value={customItem}
              onChange={(e) => setCustomItem(e.target.value)}
              placeholder="Got something else? (e.g. Leftover Curry, Mayo...)"
              className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold text-white transition-colors flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </form>

          <button
            onClick={generateSurvivalRecipe}
            className="py-3 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:scale-105 active:scale-95"
            style={{
              backgroundColor: currentTheme.accent,
              color: '#000000',
              boxShadow: `0 0 20px ${currentTheme.glowColor}`
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span>GENERATE SURVIVAL RECIPE</span>
          </button>
        </div>
      </div>

      {/* Generated Recipe Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={recipe.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="glass-panel-glow rounded-2xl p-6 sm:p-8 border border-white/15 text-white"
        >
          {/* Recipe Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-bold block mb-1">
                OPTIMIZED SURVIVAL DISH • {currentTheme.name.toUpperCase()} KITCHEN
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-cyber tracking-tight">
                {recipe.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl">
                {recipe.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> {recipe.time}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-400" /> {recipe.calories}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                {recipe.difficulty}
              </span>
            </div>
          </div>

          {/* Cooking Steps Checkboxes */}
          <div className="my-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
              PREPARATION SEQUENCE (CLICK TO TICK OFF):
            </h4>
            {recipe.steps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => toggleStep(idx)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  completedSteps[idx]
                    ? 'border-emerald-500/30 bg-emerald-500/5 text-zinc-400 line-through'
                    : 'border-white/5 bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-200'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                    completedSteps[idx]
                      ? 'bg-emerald-500 text-black'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  {completedSteps[idx] ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                </div>
                <p className="text-xs sm:text-sm flex-1 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {/* Pro Chef Hack */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                SURVIVAL CHEF HACK:
              </span>
              <p className="text-xs text-zinc-300 mt-0.5">{recipe.proTip}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
