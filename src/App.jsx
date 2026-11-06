import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useTheme } from './context/ThemeContext';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundFX } from './components/BackgroundFX';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { HangingSpiderman } from './components/HangingSpiderman';
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

  // Initialize Lenis Super Smooth Gliding Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollToApp = () => {
    if (appSectionRef.current) {
      appSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMath = () => {
    const el = document.getElementById('aunt-may-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (appSectionRef.current) {
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
    <div className={`min-h-screen text-slate-100 relative ${currentTheme.themeClass} overflow-x-hidden`}>
      {/* First Loading Screen (Access Granted Spider-Man Preloader with authentic logo) */}
      {loading && <ThemePreloader onFinish={() => setLoading(false)} />}

      {/* Floating Spider-Man Hanging Upside Down from Top Web Strand! */}
      <HangingSpiderman />

      {/* Floating Scroll To Top Action Button */}
      <ScrollToTop />

      {/* Custom Tactical Reticle Cursor with Web Shoot FX */}
      <CustomCursor />

      {/* 100% Original Interactive Spider-Web Physics & Manhattan Horizon Background */}
      <BackgroundFX />

      {/* Spider-Sense Themed Floating Pill Navbar */}
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
      <main id="top" className="relative z-10">
        {/* Cinematic Landing Page Hero */}
        <HeroBanner
          onScrollToApp={scrollToApp}
          onScrollToMath={scrollToMath}
        />

        {/* Live Telemetry Bar */}
        <StatsCounter />

        {/* Interactive Problem Statement Engine (Policy Decoder Workstation) */}
        <section id="decoder" ref={appSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 my-16">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <h2 className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-white">
                TACTICAL WORKSPACE // PS 0{currentProblem.id}: {currentProblem.title}
              </h2>
            </div>
            <button
              onClick={() => setDiceModalOpen(true)}
              className="text-xs font-mono text-red-400 hover:text-white transition-colors"
            >
              [🎲 Roll / Switch Dice]
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
