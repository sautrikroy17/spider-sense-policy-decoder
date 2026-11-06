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
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          title="Scroll To Top"
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-red-600 via-rose-700 to-black border-2 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.7)] transition-transform group"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5] text-white group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
