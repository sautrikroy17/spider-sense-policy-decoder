import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor = () => {
  const { currentTheme } = useTheme();
  const reticleRef = useRef(null);
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  const pos = useRef({ x: -100, y: -100 });
  const reticlePos = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isClicking = useRef(false);
  const isVisible = useRef(false);
  const rafId = useRef(null);

  useEffect(() => {
    // Touch screens disabled
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onPointerMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        if (reticleRef.current) reticleRef.current.style.opacity = '1';
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (glowRef.current) glowRef.current.style.opacity = '0.4';
      }

      // Check if hovering over interactive element
      const target = e.target;
      isHovered.current = !!target.closest(
        'button, a, input, select, textarea, [role="button"], label, .clickable, .cursor-pointer'
      );
    };

    const onPointerDown = () => { isClicking.current = true; };
    const onPointerUp = () => { isClicking.current = false; };
    const onMouseLeave = () => {
      isVisible.current = false;
      if (reticleRef.current) reticleRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };
    const onMouseEnter = () => {
      isVisible.current = true;
      if (reticleRef.current) reticleRef.current.style.opacity = '1';
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (glowRef.current) glowRef.current.style.opacity = '0.4';
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // High performance lerp loop
    const LERP = 0.24;

    const render = () => {
      const { x, y } = pos.current;
      const hovered = isHovered.current;
      const clicking = isClicking.current;

      // Laser dot tracks instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0) scale(${clicking ? 1.8 : hovered ? 1.2 : 1})`;
      }

      // Trailing ambient glow
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x - 32}px, ${y - 32}px, 0)`;
      }

      // Reticle with smooth spring follow
      reticlePos.current.x += (x - reticlePos.current.x) * LERP;
      reticlePos.current.y += (y - reticlePos.current.y) * LERP;

      const rx = reticlePos.current.x;
      const ry = reticlePos.current.y;
      const size = hovered ? 46 : 28;

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${rx - size / 2}px, ${ry - size / 2}px, 0) rotate(${hovered ? '45deg' : '0deg'}) scale(${clicking ? 0.75 : 1})`;
        reticleRef.current.style.width = `${size}px`;
        reticleRef.current.style.height = `${size}px`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Ambient Radial Soft Glow */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-16 h-16 rounded-full transition-opacity duration-300"
        style={{
          opacity: 0,
          background: `radial-gradient(circle, ${currentTheme.accent}70 0%, transparent 70%)`,
          willChange: 'transform'
        }}
      />

      {/* Tactical Crosshair Reticle (Exact match to hackthesinisters reference!) */}
      <div
        ref={reticleRef}
        className="absolute top-0 left-0 transition-opacity duration-200"
        style={{
          width: '28px',
          height: '28px',
          opacity: 0,
          willChange: 'transform, width, height'
        }}
      >
        {/* Top-Left Bracket */}
        <span
          className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2"
          style={{ borderColor: currentTheme.accent, filter: `drop-shadow(0 0 6px ${currentTheme.glowColor})` }}
        />
        {/* Top-Right Bracket */}
        <span
          className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2"
          style={{ borderColor: currentTheme.accent, filter: `drop-shadow(0 0 6px ${currentTheme.glowColor})` }}
        />
        {/* Bottom-Left Bracket */}
        <span
          className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2"
          style={{ borderColor: currentTheme.accent, filter: `drop-shadow(0 0 6px ${currentTheme.glowColor})` }}
        />
        {/* Bottom-Right Bracket */}
        <span
          className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2"
          style={{ borderColor: currentTheme.accent, filter: `drop-shadow(0 0 6px ${currentTheme.glowColor})` }}
        />

        {/* Central Crosshair Tick Lines */}
        <span
          className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-1"
          style={{ backgroundColor: currentTheme.accent }}
        />
        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-1"
          style={{ backgroundColor: currentTheme.accent }}
        />
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0.5"
          style={{ backgroundColor: currentTheme.accent }}
        />
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-0.5"
          style={{ backgroundColor: currentTheme.accent }}
        />
      </div>

      {/* Center Laser Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full transition-opacity duration-200"
        style={{
          opacity: 0,
          backgroundColor: currentTheme.accent,
          boxShadow: `0 0 10px 2px ${currentTheme.accent}`,
          willChange: 'transform'
        }}
      />
    </div>
  );
};
