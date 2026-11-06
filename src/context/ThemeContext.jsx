import React, { createContext, useContext, useState, useEffect } from 'react';
import { sound } from '../utils/soundEffects';

export const THEMES = {
  1: {
    id: 1,
    key: 'shinchan',
    name: 'Shinchan',
    tagline: 'Action Kamen Beam! Unpredictable Mischief meets Bulletproof Code.',
    accent: '#facc15', // Vibrant Yellow
    primary: '#ef4444', // Red shirt
    secondary: '#22c55e', // Green shorts
    bgGradient: 'from-amber-950/40 via-red-950/30 to-black',
    glowColor: 'rgba(250, 204, 21, 0.4)',
    fontFamily: 'font-comic',
    badge: 'ACTION BASTARD LEVEL 99',
    mascot: '🖍️',
    quote: '"I may be mischievous, but my frontend is unstoppable!"',
    cursorStyle: 'comic-star',
    heroEffect: 'comic-bubbles',
    themeClass: 'theme-shinchan'
  },
  2: {
    id: 2,
    key: 'spiderman',
    name: 'Spider-Man',
    tagline: 'Defeat the Sinisters. With Great Power Comes Great Responsiveness.',
    accent: '#ef4444', // Crimson Red
    primary: '#3b82f6', // Spider Blue
    secondary: '#06b6d4', // Web glow
    bgGradient: 'from-red-950/50 via-blue-950/40 to-black',
    glowColor: 'rgba(239, 68, 68, 0.45)',
    fontFamily: 'font-cyber',
    badge: 'SPIDER-SENSE ENGAGED',
    mascot: '🕸️',
    quote: '"With great power comes great security and clean UI."',
    cursorStyle: 'crosshair-reticle',
    heroEffect: 'web-grid',
    themeClass: 'theme-spiderman'
  },
  3: {
    id: 3,
    key: 'kickbuttowski',
    name: 'Kick Buttowski',
    tagline: 'Suburban Daredevil Protocol. Chimichanga! Go Big or Go Home.',
    accent: '#f97316', // Fiery Orange
    primary: '#e11d48', // Adrenaline Red
    secondary: '#facc15', // Nitro Yellow
    bgGradient: 'from-orange-950/50 via-red-950/40 to-black',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    fontFamily: 'font-comic',
    badge: '100% NITRO STUNT CERTIFIED',
    mascot: '⚡',
    quote: '"Aw, biscuits! Never back down from a deadline."',
    cursorStyle: 'flame-trail',
    heroEffect: 'nitro-fire',
    themeClass: 'theme-kickbuttowski'
  },
  4: {
    id: 4,
    key: 'dragonball',
    name: 'Dragon Ball',
    tagline: 'Power Level Over 9000! Super Saiyan Ki-Infused Architecture.',
    accent: '#eab308', // Super Saiyan Gold
    primary: '#f97316', // Turtle Gi Orange
    secondary: '#3b82f6', // Super Saiyan Blue
    bgGradient: 'from-amber-950/60 via-orange-950/40 to-black',
    glowColor: 'rgba(234, 179, 8, 0.5)',
    fontFamily: 'font-cyber',
    badge: 'POWER LEVEL: 9,001+',
    mascot: '🐉',
    quote: '"Surpass your limits! Even beyond Super Saiyan UI."',
    cursorStyle: 'saiyan-spark',
    heroEffect: 'ki-aura',
    themeClass: 'theme-dragonball'
  },
  5: {
    id: 5,
    key: 'harrypotter',
    name: 'Harry Potter',
    tagline: 'Mischief Managed. Ancient Charms, Dark Arts Defense & Pure Sorcery.',
    accent: '#d97706', // Gryffindor Gold
    primary: '#991b1b', // Deep Crimson
    secondary: '#0284c7', // Patronus Cyan
    bgGradient: 'from-amber-950/30 via-slate-950 to-black',
    glowColor: 'rgba(217, 119, 6, 0.4)',
    fontFamily: 'font-magic',
    badge: 'MARAUDER INTEL PROTOCOL',
    mascot: '⚡🪄',
    quote: '"I solemnly swear that I am up to high-stakes shipping."',
    cursorStyle: 'snitch-trail',
    heroEffect: 'magic-runes',
    themeClass: 'theme-harrypotter'
  },
  6: {
    id: 6,
    key: 'supermario',
    name: 'Super Mario',
    tagline: "Let's-a Go! 8-Bit Warp Pipe Precision & 1-Up Performance.",
    accent: '#ef4444', // Mario Red
    primary: '#2563eb', // Overalls Blue
    secondary: '#22c55e', // Luigi 1-Up Green
    bgGradient: 'from-blue-950/40 via-red-950/30 to-black',
    glowColor: 'rgba(239, 68, 68, 0.45)',
    fontFamily: 'font-retro',
    badge: 'WORLD 8-4 WARP ZONE',
    mascot: '🍄',
    quote: '"Thank you Mario! But our solution is in this exact repository!"',
    cursorStyle: 'arcade-coin',
    heroEffect: 'pixel-crt',
    themeClass: 'theme-supermario'
  }
};

export const PROBLEMS = {
  1: {
    id: 1,
    key: 'recipe_roulette',
    title: 'Recipe Roulette',
    subtitle: 'Zero-Grocery Fridge Survival Cooking Engine',
    description: 'You open the fridge: two eggs, half an onion, stale bread. Instantly construct gourmet survival recipes without a grocery run.',
    category: 'SURVIVAL AI / UTILITY',
    iconName: 'UtensilsCrossed',
    accentColor: '#f59e0b',
    targetAudience: 'College Students & Late-Night Hackers'
  },
  2: {
    id: 2,
    key: 'persona_probe',
    title: 'Persona Probe',
    subtitle: 'High-Pressure Behavioral & Psychological Stress Engine',
    description: 'Conventional tests fail under pressure. Timed dilemmas reveal true emotional maturity, composure, and humility with a radar index.',
    category: 'BEHAVIORAL AI / PSYCH',
    iconName: 'BrainCircuit',
    accentColor: '#a855f7',
    targetAudience: 'High-Stakes Teams & Executive Profiling'
  },
  3: {
    id: 3,
    key: 'password_forge',
    title: 'Password Forge',
    subtitle: 'Quantum-Grade Entropy Matrix & Breach Vulnerability Analyzer',
    description: 'Generate hyper-secure, entropy-dense credentials while simulating brute-force cracking resistance across supercomputer clusters.',
    category: 'CYBERSECURITY / CRYPTO',
    iconName: 'ShieldAlert',
    accentColor: '#38bdf8',
    targetAudience: 'DevSecOps & Cyber Defense Operatives'
  },
  4: {
    id: 4,
    key: 'policy_decoder',
    title: 'Policy Decoder',
    subtitle: 'Autonomous Legalese & Hidden Exclusion Decompiler',
    description: 'De-obfuscate convoluted insurance policies. Highlight critical exclusion traps and calculate real-world claim success odds.',
    category: 'LEGALTECH / CONSUMER DEFENSE',
    iconName: 'FileSearch',
    accentColor: '#10b981',
    targetAudience: 'Policyholders & Consumer Rights Advocates'
  },
  5: {
    id: 5,
    key: 'site_sentinel',
    title: 'Site Sentinel',
    subtitle: 'One-Click Enterprise Vulnerability & Zero-Day Threat Auditor',
    description: 'Small businesses lack cyber budgets. Run automated deep-audits for malware injections, header leaks, and open vectors in plain English.',
    category: 'INFOSEC / THREAT RADAR',
    iconName: 'Radar',
    accentColor: '#f43f5e',
    targetAudience: 'SMBs & E-Commerce Storefronts'
  },
  6: {
    id: 6,
    key: 'phish_protocol',
    title: 'Phish Protocol',
    subtitle: 'Real-Time Zero-Hour Phishing & Quishing (Malicious QR) Interceptor',
    description: 'Solve the critical 5-minute zero-hour vulnerability window. Rapid-feed threat intelligence + heuristic verification for URLs & QR traps.',
    category: 'ZERO-HOUR THREAT INTELLIGENCE',
    iconName: 'ShieldCheck',
    accentColor: '#ef4444',
    targetAudience: 'Campuses, Startups & Incident Response Units'
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeId, setThemeId] = useState(2); // Default: Spider-Man (hero vibe)
  const [problemId, setProblemId] = useState(6); // Default: Phish Protocol (high-tech CTF vibe)
  const [isMuted, setIsMuted] = useState(false);
  const [crtEnabled, setCrtEnabled] = useState(true);

  const currentTheme = THEMES[themeId] || THEMES[2];
  const currentProblem = PROBLEMS[problemId] || PROBLEMS[6];

  const changeTheme = (id) => {
    setThemeId(id);
    sound.playCharge();
  };

  const changeProblem = (id) => {
    setProblemId(id);
    sound.playClick();
  };

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sound.setMuted(nextState);
    if (!nextState) {
      sound.playSuccess();
    }
  };

  const toggleCrt = () => {
    setCrtEnabled(!crtEnabled);
    sound.playHover();
  };

  // Sync CSS variables with theme colors
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', currentTheme.primary);
    document.documentElement.style.setProperty('--color-accent', currentTheme.accent);
    document.documentElement.style.setProperty('--color-secondary', currentTheme.secondary);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        themeId,
        problemId,
        currentTheme,
        currentProblem,
        changeTheme,
        changeProblem,
        isMuted,
        toggleSound,
        crtEnabled,
        toggleCrt,
        themesList: THEMES,
        problemsList: PROBLEMS
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

