import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    sound.playThwip();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          whileHover={{ scale: 1.12, boxShadow: '0 0 35px rgba(239, 68, 68, 0.9)' }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          title="Web Zip To Top"
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-red-600 via-zinc-900 to-black border-2 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.7)] transition-all group overflow-hidden"
        >
          {/* Subtle Spider-Web Radial Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:6px_6px] opacity-30 pointer-events-none" />
          
          {/* Spider-Man Themed Ascent Arrow */}
          <div className="relative z-10 flex flex-col items-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white group-hover:-translate-y-0.5 transition-transform">
              <path
                d="M12 19V5M5 12l7-7 7 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 2v3"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
