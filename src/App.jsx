import React, { useState, useRef } from 'react';
import { useTheme } from './context/ThemeContext';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundFX } from './components/BackgroundFX';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { EmblaThemeCarousel } from './components/EmblaThemeCarousel';
import { StatsCounter } from './components/StatsCounter';
import { DiceRollerModal } from './components/DiceRollerModal';
import { SidebarDrawer } from './components/SidebarDrawer';
import { ThemePreloader } from './components/ThemePreloader';
import { ScrollToTop } from './components/ScrollToTop';
import { BlurFade } from './components/ui/BlurFade';
import { Footer } from './components/Footer';

// Problem Statements
import { RecipeRoulette } from './components/problems/RecipeRoulette';
import { PersonaProbe } from './components/problems/PersonaProbe';
import { PasswordForge } from './components/problems/PasswordForge';
import { PolicyDecoder } from './components/problems/PolicyDecoder';
import { SiteSentinel } from './components/problems/SiteSentinel';
import { PhishProtocol } from './components/problems/PhishProtocol';

export const App = () => {
  const { problemId, currentProblem, currentTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [diceModalOpen, setDiceModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const appSectionRef = useRef(null);

  const scrollToApp = () => {
    if (appSectionRef.current) {
      appSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderActiveProblem = () => {
    switch (problemId) {
      case 1:
        return <RecipeRoulette />;
      case 2:
        return <PersonaProbe />;
      case 3:
        return <PasswordForge />;
      case 4:
        return <PolicyDecoder />;
      case 5:
        return <SiteSentinel />;
      case 6:
      default:
        return <PhishProtocol />;
    }
  };

  return (
    <div className={`min-h-screen text-slate-100 relative ${currentTheme.themeClass}`}>
      {/* First Loading Screen (Access Granted Cyber Preloader) */}
      {loading && <ThemePreloader onFinish={() => setLoading(false)} />}

      {/* Floating Scroll To Top Action Button (Benchmark Match) */}
      <ScrollToTop />

      {/* Custom Tactical Reticle Cursor */}
      <CustomCursor />

      {/* Dynamic Background FX (Canvas particles, Mesh glowing blobs, CRT scanline) */}
      <BackgroundFX />

      {/* Header Navigation (Floating Benchmark Pill) */}
      <Navbar
        onOpenDiceModal={() => setDiceModalOpen(true)}
        onOpenSidebar={() => setSidebarOpen(true)}
      />

      {/* Cyber HUD Sidebar Drawer */}
      <SidebarDrawer
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenDiceModal={() => setDiceModalOpen(true)}
        onReplayPreloader={() => setLoading(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        <HeroBanner
          onOpenDiceModal={() => setDiceModalOpen(true)}
          onScrollToApp={scrollToApp}
        />

        {/* 3D Embla Theme Showcase Slider */}
        <EmblaThemeCarousel />

        {/* Live Telemetry Bar */}
        <StatsCounter />

        {/* Interactive Problem Statement Engine */}
        <section ref={appSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 my-12">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentTheme.accent }} />
              <h2 className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-zinc-400">
                ACTIVE PROBLEM ENGINE // PS 0{currentProblem.id}
              </h2>
            </div>
            <button
              onClick={() => setDiceModalOpen(true)}
              className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              [Change Problem / Theme]
            </button>
          </div>

          {/* Dynamic Problem Component with Blur-Fade entrance */}
          <BlurFade key={problemId + currentTheme.name} duration={0.4} blur="8px">
            {renderActiveProblem()}
          </BlurFade>
        </section>
      </main>

      {/* Dice Console Modal */}
      <DiceRollerModal
        isOpen={diceModalOpen}
        onClose={() => setDiceModalOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenDiceModal={() => setDiceModalOpen(true)} />
    </div>
  );
};

