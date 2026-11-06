import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor = () => {
  const { currentTheme } = useTheme();
  const followerRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isClicking = useRef(false);
  const isVisible = useRef(false);
  const rafId = useRef(null);

  useEffect(() => {
    // Disable on touch screens
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onPointerMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        if (followerRef.current) followerRef.current.style.opacity = '1';
        if (dotRef.current) dotRef.current.style.opacity = '1';
      }

      // Check for interactive targets
      const target = e.target;
      isHovered.current = !!target.closest('button, a, input, select, textarea, [role="button"], label, .clickable');
    };

    const onPointerDown = () => { isClicking.current = true; };
    const onPointerUp = () => { isClicking.current = false; };
    const onMouseLeave = () => {
      isVisible.current = false;
      if (followerRef.current) followerRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };
    const onMouseEnter = () => {
      isVisible.current = true;
      if (followerRef.current) followerRef.current.style.opacity = '1';
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // 120Hz-ready lerp animation loop
    const LERP_FACTOR = 0.22; // Snappy, zero sluggishness

    const render = () => {
      const { x, y } = pos.current;

      // Laser dot tracks instantly at screen refresh rate
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0) scale(${isClicking.current ? 1.6 : 1})`;
      }

      // Magnetic reticle ring follows with smooth snappy spring
      followerPos.current.x += (x - followerPos.current.x) * LERP_FACTOR;
      followerPos.current.y += (y - followerPos.current.y) * LERP_FACTOR;

      const fx = followerPos.current.x;
      const fy = followerPos.current.y;
      const size = isHovered.current ? 40 : 24;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${fx - size / 2}px, ${fy - size / 2}px, 0) scale(${isClicking.current ? 0.8 : 1}) rotate(${isHovered.current ? '45deg' : '0deg'})`;
        followerRef.current.style.width = `${size}px`;
        followerRef.current.style.height = `${size}px`;
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
      {/* Outer Magnetic Reticle Ring */}
      <div
        ref={followerRef}
        className="absolute top-0 left-0 rounded-full border border-dashed flex items-center justify-center transition-opacity duration-200"
        style={{
          width: '24px',
          height: '24px',
          opacity: 0,
          borderColor: currentTheme.accent,
          boxShadow: `0 0 12px ${currentTheme.glowColor}`,
          willChange: 'transform, width, height'
        }}
      >
        {/* Subtle crosshair brackets */}
        <span className="absolute -top-1 w-1 h-0.5" style={{ backgroundColor: currentTheme.accent }} />
        <span className="absolute -bottom-1 w-1 h-0.5" style={{ backgroundColor: currentTheme.accent }} />
        <span className="absolute -left-1 w-0.5 h-1" style={{ backgroundColor: currentTheme.accent }} />
        <span className="absolute -right-1 w-0.5 h-1" style={{ backgroundColor: currentTheme.accent }} />
      </div>

      {/* Tiny Laser Dot Center */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full transition-opacity duration-200"
        style={{
          opacity: 0,
          backgroundColor: currentTheme.primary,
          boxShadow: `0 0 8px 1px ${currentTheme.primary}`,
          willChange: 'transform'
        }}
      />
    </div>
  );
};
