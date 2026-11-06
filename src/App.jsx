import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundFX } from './components/BackgroundFX';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { HangingSpiderman } from './components/HangingSpiderman';
import { SpideyWallPeeker } from './components/SpideyWallPeeker';
import { SpideySentinel } from './components/SpideySentinel';
import { StatsCounter } from './components/StatsCounter';
import { SidebarDrawer } from './components/SidebarDrawer';
import { ThemePreloader } from './components/ThemePreloader';
import { ScrollToTop } from './components/ScrollToTop';
import { BlurFade } from './components/ui/BlurFade';
import { Footer } from './components/Footer';
import { PolicyDecoder } from './components/problems/PolicyDecoder';

export const App = () => {
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="min-h-screen text-slate-100 relative bg-[#050508] overflow-x-hidden font-display selection:bg-red-600 selection:text-white">
      {/* 1. Spider-Man Preloader with authentic logo */}
      {loading && <ThemePreloader onFinish={() => setLoading(false)} />}

      {/* 2. THREE 3D INTERACTIVE SPIDER-MAN CHARACTERS */}
      {/* Spider-Man #1: Top Web Swinger & Leaper (Upside Down) */}
      <HangingSpiderman />

      {/* Spider-Man #2: Left Edge 3D Wall Crawler & Peeker */}
      <SpideyWallPeeker />

      {/* Spider-Man #3: Right Corner 3D Sentinel & Jumper */}
      <SpideySentinel />

      {/* 3. Themed Scroll To Top Action Button (NO bounce) */}
      <ScrollToTop />

      {/* 4. Custom Ultra-Smooth Spider-Sense Cursor with Web Splat */}
      <CustomCursor />

      {/* 5. Cinematic New York Movie Wallpaper & Spider-Silk Physics Canvas */}
      <BackgroundFX />

      {/* 6. Production-Grade Cyber Floating Navbar */}
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

      {/* 7. Cyber HUD Quick Controls Drawer */}
      <SidebarDrawer
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onReplayPreloader={() => setLoading(true)}
      />

      {/* Main Content Area */}
      <main id="top" className="relative z-10">
        {/* Cinematic Landing Page Hero */}
        <HeroBanner
          onScrollToApp={scrollToApp}
          onScrollToMath={scrollToMath}
        />

        {/* Live Consumer Defense Telemetry Bar */}
        <StatsCounter />

        {/* Production-Grade Policy Decoder Workstation */}
        <section id="decoder" ref={appSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 my-16">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <h2 className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-white">
                LEGAL WORKSPACE // AUTONOMOUS POLICY DECODER
              </h2>
            </div>
            <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>GROQ LPU ACTIVE (~140MS)</span>
            </div>
          </div>

          {/* Dynamic Policy Decoder Component */}
          <BlurFade duration={0.4} blur="8px">
            <PolicyDecoder />
          </BlurFade>
        </section>
      </main>

      {/* 8. Dedicated Spider-Man Policy Defense Footer */}
      <Footer />
    </div>
  );
};
