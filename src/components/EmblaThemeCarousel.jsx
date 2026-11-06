import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';
import { SpotlightCard } from './ui/SpotlightCard';

export const EmblaThemeCarousel = () => {
  const { themesList, themeId, changeTheme, currentTheme } = useTheme();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false
  });
  const [selectedIndex, setSelectedIndex] = useState(themeId - 1);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      sound.playHover();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      sound.playHover();
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  const themes = Object.values(themesList);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 my-8">
      {/* Header Label */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: currentTheme.accent }} />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
            DICE 1 CHARACTER SHOWCASE • 3D TILT SLIDER
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={scrollPrev}
            className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-zinc-300 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollNext}
            className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-zinc-300 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Embla Viewport */}
      <div className="overflow-hidden py-4" ref={emblaRef}>
        <div className="flex gap-4 touch-pan-y">
          {themes.map((theme, idx) => {
            const isCurrent = theme.id === themeId;

            return (
              <div
                key={theme.id}
                className="flex-[0_0_82%] sm:flex-[0_0_45%] md:flex-[0_0_32%] min-w-0"
              >
                <SpotlightCard
                  spotlightColor={theme.accent + '25'}
                  glowColor={theme.glowColor}
                  onClick={() => {
                    changeTheme(theme.id);
                    sound.playClick();
                  }}
                  className={`cursor-pointer p-5 transition-all duration-300 ${
                    isCurrent
                      ? 'border-white/40 shadow-2xl bg-zinc-900/90'
                      : 'border-white/10 bg-zinc-950/60 hover:border-white/20'
                  }`}
                >
                  {/* Top Character Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl filter drop-shadow-md">{theme.mascot}</span>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border"
                      style={{
                        backgroundColor: `${theme.accent}15`,
                        borderColor: `${theme.accent}40`,
                        color: theme.accent
                      }}
                    >
                      DICE {theme.id}
                    </span>
                  </div>

                  {/* Character Name & Tagline */}
                  <h3
                    className="text-xl font-bold font-cyber tracking-tight"
                    style={{ color: isCurrent ? theme.accent : '#ffffff' }}
                  >
                    {theme.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {theme.tagline}
                  </p>

                  {/* Quote / Sub-badge */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span className="truncate">{theme.badge}</span>
                    {isCurrent && (
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <Check className="w-3.5 h-3.5" /> ACTIVE
                      </span>
                    )}
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
