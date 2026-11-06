import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor = () => {
  const { currentTheme } = useTheme();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only on pointer-capable devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target;
      const clickable = target.closest('button, a, input, select, textarea, [role="button"], .clickable');
      setIsHovered(!!clickable);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Targeting Ring / Crosshairs */}
      <motion.div
        className="absolute top-0 left-0"
        animate={{
          x: pos.x - (isHovered ? 24 : 16),
          y: pos.y - (isHovered ? 24 : 16),
          scale: isClicking ? 0.8 : isHovered ? 1.4 : 1,
          rotate: isHovered ? 90 : 0
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
          mass: 0.2
        }}
      >
        <div
          className="relative flex items-center justify-center rounded-full border border-dashed transition-colors duration-200"
          style={{
            width: isHovered ? '48px' : '32px',
            height: isHovered ? '48px' : '32px',
            borderColor: currentTheme.accent,
            boxShadow: `0 0 12px ${currentTheme.glowColor}`
          }}
        >
          {/* Crosshair Corner Ticks */}
          <span
            className="absolute -top-1 w-1.5 h-0.5"
            style={{ backgroundColor: currentTheme.accent }}
          />
          <span
            className="absolute -bottom-1 w-1.5 h-0.5"
            style={{ backgroundColor: currentTheme.accent }}
          />
          <span
            className="absolute -left-1 w-0.5 h-1.5"
            style={{ backgroundColor: currentTheme.accent }}
          />
          <span
            className="absolute -right-1 w-0.5 h-1.5"
            style={{ backgroundColor: currentTheme.accent }}
          />
        </div>
      </motion.div>

      {/* Center Laser Point */}
      <motion.div
        className="absolute top-0 left-0 w-2 h-2 rounded-full"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: isClicking ? 1.5 : 1
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 450,
          mass: 0.1
        }}
        style={{
          backgroundColor: currentTheme.primary,
          boxShadow: `0 0 8px 2px ${currentTheme.primary}`
        }}
      />
    </div>
  );
};
