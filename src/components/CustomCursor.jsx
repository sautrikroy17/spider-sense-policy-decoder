import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../utils/soundEffects';

/**
 * Ultra-Smooth Spider-Sense Cursor with Web Splat Particle Engine
 * - Smooth inertia trailing ring
 * - Compact luminous red focal point that doesn't block reading text
 * - Dynamic web particle splat on click with THWIP sound
 */
export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isVisible = useRef(false);
  const isHovered = useRef(false);
  const rafId = useRef(null);
  const [splats, setSplats] = useState([]);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      return;
    }

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      // Check if hovering clickable element
      const target = e.target;
      const clickable = target?.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer');
      isHovered.current = !!clickable;
    };

    const onMouseDown = (e) => {
      sound.playThwip();
      const id = Date.now();
      setSplats((prev) => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setSplats((prev) => prev.filter((s) => s.id !== id));
      }, 550);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });

    let rotation = 0;
    const animate = () => {
      const { x, y } = mouse.current;
      // High-precision smooth inertia lerp
      ringPos.current.x += (x - ringPos.current.x) * 0.18;
      ringPos.current.y += (y - ringPos.current.y) * 0.18;
      rotation += isHovered.current ? 2.5 : 0.6;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${isHovered.current ? 1.4 : 1})`;
      }

      if (ringRef.current) {
        const scale = isHovered.current ? 1.6 : 1;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;
        ringRef.current.style.borderColor = isHovered.current ? 'rgba(239, 68, 68, 0.9)' : 'rgba(239, 68, 68, 0.45)';
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  return (
    <>
      {/* Spider-Sense Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_14px_#ef4444,0_0_24px_rgba(239,68,68,0.8)] pointer-events-none z-[10000] opacity-0 will-change-transform transition-all duration-150"
      />

      {/* Spider-Man Tactical HUD Cyber Ring with 4 Crosshair Tick Marks */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-red-500/50 bg-red-600/10 shadow-[0_0_20px_rgba(239,68,68,0.35)] pointer-events-none z-[9999] opacity-0 will-change-transform transition-colors duration-200 flex items-center justify-center"
      >
        {/* Subtle Crosshairs */}
        <div className="absolute inset-x-[-3px] top-1/2 h-[1px] bg-red-400/60 pointer-events-none" />
        <div className="absolute inset-y-[-3px] left-1/2 w-[1px] bg-red-400/60 pointer-events-none" />
      </div>

      {/* Web Splat Particle Bursts on Click */}
      {splats.map((s) => (
        <div
          key={s.id}
          style={{ top: s.y, left: s.x }}
          className="fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[10001] w-14 h-14 flex items-center justify-center animate-ping"
        >
          <svg viewBox="0 0 40 40" className="w-12 h-12 text-white drop-shadow-[0_0_12px_#ef4444]">
            <path
              d="M20 2 L20 38 M2 20 L38 20 M7 7 L33 33 M7 33 L33 7"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="20" cy="20" r="9" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.85" />
          </svg>
        </div>
      ))}
    </>
  );
};
