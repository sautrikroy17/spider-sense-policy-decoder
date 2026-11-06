import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Tactical Combat Reticle Cursor
 * Exact 1:1 reproduction of hackthesinisters.vercel.app:
 * - Inner 30px rotating scanner with 4 corner brackets + intense glowing core
 * - Outer 50px counter-rotating HUD ring with 4 directional crosshair spikes
 * - body.cursor-hover triggers expansion of brackets, dashed HUD ring, and spike flare
 * - body.cursor-active triggers tactical burst ripple
 * - Fully reactive to currentTheme.accent and currentTheme.glowColor
 */
export const CustomCursor = () => {
  const { currentTheme } = useTheme();
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  const mouse = useRef({ x: -100, y: -100 });
  const outlinePos = useRef({ x: -100, y: -100 });
  const isVisible = useRef(false);
  const rafId = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      return;
    }

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (outlineRef.current) outlineRef.current.style.opacity = '1';
      }
    };

    const onMouseOver = (e) => {
      if (
        e.target.closest(
          'a, button, input, select, textarea, [role="button"], .clickable, .cursor-pointer, .track-card'
        )
      ) {
        document.body.classList.add('cursor-hover');
      }
    };

    const onMouseOut = (e) => {
      if (
        e.target.closest(
          'a, button, input, select, textarea, [role="button"], .clickable, .cursor-pointer, .track-card'
        )
      ) {
        document.body.classList.remove('cursor-hover');
      }
    };

    const onMouseDown = () => {
      document.body.classList.add('cursor-active');
    };

    const onMouseUp = () => {
      document.body.classList.remove('cursor-active');
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (outlineRef.current) outlineRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (outlineRef.current) outlineRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.body.addEventListener('mouseover', onMouseOver, { passive: true });
    document.body.addEventListener('mouseout', onMouseOut, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth Lerp animation loop matching HackTheSinisters
    const animate = () => {
      const { x, y } = mouse.current;

      // Trailing spring for outline
      outlinePos.current.x += (x - outlinePos.current.x) * 0.14;
      outlinePos.current.y += (y - outlinePos.current.y) * 0.14;

      const ox = outlinePos.current.x;
      const oy = outlinePos.current.y;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate3d(${ox}px, ${oy}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.body.classList.remove('cursor-hover', 'cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseover', onMouseOver);
      document.body.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  const accent = currentTheme.accent || '#ef4444';
  const glow = currentTheme.glowColor || 'rgba(239, 68, 68, 0.5)';

  return (
    <>
      {/* Dynamic Scoped CSS for Theme + HackTheSinisters Reticle */}
      <style>{`
        .tactical-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          z-index: 10000;
          pointer-events: none;
          opacity: 0;
          will-change: transform;
          transition: opacity 0.2s ease;
        }

        .tactical-cursor-outline {
          position: fixed;
          top: 0;
          left: 0;
          width: 54px;
          height: 54px;
          z-index: 9999;
          pointer-events: none;
          opacity: 0;
          will-change: transform;
          transition: opacity 0.2s ease;
        }

        .reticle-bracket {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: ${accent} !important;
          filter: drop-shadow(0 0 8px ${accent});
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .reticle-b1 { top: 0; left: 0; border-top: 2.5px solid; border-left: 2.5px solid; }
        .reticle-b2 { top: 0; right: 0; border-top: 2.5px solid; border-right: 2.5px solid; }
        .reticle-b3 { bottom: 0; left: 0; border-bottom: 2.5px solid; border-left: 2.5px solid; }
        .reticle-b4 { bottom: 0; right: 0; border-bottom: 2.5px solid; border-right: 2.5px solid; }

        .reticle-core {
          width: 6px;
          height: 6px;
          background-color: ${accent};
          border-radius: 50%;
          box-shadow: 0 0 15px ${accent}, 0 0 30px ${glow};
          transition: all 0.2s ease;
        }

        .reticle-outline-main {
          width: 100%;
          height: 100%;
          border: 1.5px solid ${accent}66;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0.7;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .reticle-spike {
          position: absolute;
          background-color: ${accent};
          box-shadow: 0 0 8px ${accent};
          opacity: 0;
          transition: all 0.3s ease;
        }

        .rsp-top { top: -8px; left: calc(50% - 1px); width: 2px; height: 8px; }
        .rsp-right { right: -8px; top: calc(50% - 1px); width: 8px; height: 2px; }
        .rsp-bottom { bottom: -8px; left: calc(50% - 1px); width: 2px; height: 8px; }
        .rsp-left { left: -8px; top: calc(50% - 1px); width: 8px; height: 2px; }

        /* Hover States (when mouse is over buttons, cards, links) */
        body.cursor-hover .reticle-bracket {
          border-color: #ffffff !important;
          width: 14px;
          height: 14px;
          filter: drop-shadow(0 0 16px ${accent});
        }

        body.cursor-hover .reticle-core {
          transform: scale(1.8);
          box-shadow: 0 0 30px ${accent}, 0 0 60px ${glow};
        }

        body.cursor-hover .reticle-outline-main {
          transform: scale(1.35);
          opacity: 1;
          border-color: ${accent};
          border-style: dashed;
          box-shadow: 0 0 25px ${glow};
        }

        body.cursor-hover .reticle-spike {
          opacity: 1;
          box-shadow: 0 0 12px ${accent};
        }

        body.cursor-hover .rsp-top { transform: translateY(-4px); height: 12px; }
        body.cursor-hover .rsp-right { transform: translateX(4px); width: 12px; }
        body.cursor-hover .rsp-bottom { transform: translateY(4px); height: 12px; }
        body.cursor-hover .rsp-left { transform: translateX(-4px); width: 12px; }

        /* Click / Active State */
        body.cursor-active .reticle-core {
          transform: scale(3.5);
          opacity: 0;
          transition: all 0.25s ease-out;
        }

        body.cursor-active .reticle-outline-main {
          animation: balanced-ripple 0.3s ease-out forwards;
        }

        body.cursor-active .reticle-bracket {
          transform: scale(1.6);
          opacity: 0;
          transition: all 0.25s ease-out;
        }
      `}</style>

      {/* Layer 1: Inner Rotating Scanner Reticle */}
      <div ref={dotRef} className="tactical-cursor-dot">
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ animation: 'rotate-scanner 6s linear infinite' }}
        >
          <div className="reticle-bracket reticle-b1" />
          <div className="reticle-bracket reticle-b2" />
          <div className="reticle-bracket reticle-b3" />
          <div className="reticle-bracket reticle-b4" />
          <div className="reticle-core" />
        </div>
      </div>

      {/* Layer 2: Outer Counter-Rotating HUD Outline */}
      <div ref={outlineRef} className="tactical-cursor-outline">
        <div
          className="reticle-outline-main"
          style={{ animation: 'rotate-hud-reverse 10s linear infinite' }}
        >
          <div className="reticle-spike rsp-top" />
          <div className="reticle-spike rsp-right" />
          <div className="reticle-spike rsp-bottom" />
          <div className="reticle-spike rsp-left" />
        </div>
      </div>
    </>
  );
};
