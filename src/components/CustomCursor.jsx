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
    };

    const onMouseDown = (e) => {
      sound.playThwip();
      const id = Date.now();
      setSplats((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setSplats((prev) => prev.filter((s) => s.id !== id));
      }, 500);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });

    const animate = () => {
      const { x, y } = mouse.current;
      ringPos.current.x += (x - ringPos.current.x) * 0.22;
      ringPos.current.y += (y - ringPos.current.y) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
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
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_12px_#ef4444] pointer-events-none z-[10000] opacity-0 will-change-transform transition-opacity duration-200"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-red-500/50 bg-red-500/10 shadow-[0_0_16px_rgba(239,68,68,0.3)] pointer-events-none z-[9999] opacity-0 will-change-transform transition-opacity duration-200"
      />

      {/* Web Splat Particle Bursts on Click */}
      {splats.map((s) => (
        <div
          key={s.id}
          style={{ top: s.y, left: s.x }}
          className="fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[10001] w-12 h-12 flex items-center justify-center animate-ping"
        >
          <svg viewBox="0 0 40 40" className="w-10 h-10 text-white/90 drop-shadow-[0_0_8px_#ef4444]">
            <path
              d="M20 2 L20 38 M2 20 L38 20 M7 7 L33 33 M7 33 L33 7"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7" />
          </svg>
        </div>
      ))}
    </>
  );
};
