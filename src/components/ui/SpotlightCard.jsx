import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.12)',
  glowColor = 'rgba(239, 68, 68, 0.3)',
  onClick
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt spring mechanics
  const rotateX = useSpring(0, { damping: 20, stiffness: 200 });
  const rotateY = useSpring(0, { damping: 20, stiffness: 200 });

  // Spotlight position
  const mouseX = useSpring(0, { damping: 25, stiffness: 250 });
  const mouseY = useSpring(0, { damping: 25, stiffness: 250 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight coordinates
    mouseX.set(x);
    mouseY.set(y);

    // 3D Tilt calculation (max 12 deg tilt)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -((y - centerY) / centerY) * 10;
    const tiltY = ((x - centerX) / centerX) * 10;

    rotateX.set(tiltX);
    rotateY.set(tiltY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className={`relative rounded-2xl border border-white/10 bg-zinc-950/70 backdrop-blur-xl overflow-hidden transition-colors duration-300 ${className}`}
    >
      {/* 21st.dev Dynamic Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, ${spotlightColor}, transparent 75%)`
        }}
      />

      {/* Subtle outer glow when hovered */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.6 : 0,
          boxShadow: `inset 0 0 20px ${glowColor}`
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
