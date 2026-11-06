import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';

/**
 * Tactical Combat Spider-Web Reticle Cursor
 * - Exact 1:1 HackTheSinisters tactical reticle architecture
 * - Real Spider-Web crosshair lines & spider emblem core
 * - Dynamic Web Splat burst on click with THWIP sound effect!
 * - Suppressed OS cursor globally
 */
export const CustomCursor = () => {
  const { currentTheme } = useTheme();
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  const mouse = useRef({ x: -100, y: -100 });
  const outlinePos = useRef({ x: -100, y: -100 });
  const isVisible = useRef(false);
  const rafId = useRef(null);

  // Web Splat effect state
  const [splats, setSplats] = useState([]);

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

    const onMouseDown = (e) => {
      document.body.classList.add('cursor-active');
      sound.playThwip();

      // Add a cool web splat particle at click coordinates
      const id = Date.now();
      setSplats((prev) => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setSplats((prev) => prev.filter((s) => s.id !== id));
      }, 600);
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

    const animate = () => {
      const { x, y } = mouse.current;

      // Trailing spring for outer HUD outline
      outlinePos.current.x += (x - outlinePos.current.x) * 0.16;
      outlinePos.current.y += (y - outlinePos.current.y) * 0.16;

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

  const accent = currentTheme?.accent || '#ef4444';
  const glow = currentTheme?.glowColor || 'rgba(239, 68, 68, 0.5)';

  return (
    <>
      <style>{`
        .tactical-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 28px;
          height: 28px;
          pointer-events: none;
          z-index: 10000;
          opacity: 0;
          will-change: transform;
          transition: opacity 0.2s ease;
        }

        .tactical-cursor-outline {
          position: fixed;
          top: 0;
          left: 0;
          width: 52px;
          height: 52px;
          pointer-events: none;
          z-index: 9999;
          opacity: 0;
          will-change: transform;
          transition: opacity 0.2s ease;
        }

        /* Central Reticle Core */
        .reticle-core {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background-color: ${accent};
          box-shadow: 0 0 16px ${accent}, 0 0 32px ${glow};
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* Outer HUD Ring */
        .reticle-outline-main {
          width: 100%;
          height: 100%;
          border: 1.5px solid ${accent}77;
          border-radius: 9999px;
          box-shadow: 0 0 12px ${glow};
          transition: all 0.25s ease-out;
        }

        /* 4 Tactical Brackets */
        .reticle-bracket {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: ${accent};
          opacity: 0.9;
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .reticle-b1 { top: 0; left: 0; border-top: 2px solid; border-left: 2px solid; }
        .reticle-b2 { top: 0; right: 0; border-top: 2px solid; border-right: 2px solid; }
        .reticle-b3 { bottom: 0; right: 0; border-bottom: 2px solid; border-right: 2px solid; }
        .reticle-b4 { bottom: 0; left: 0; border-bottom: 2px solid; border-left: 2px solid; }

        .reticle-spike {
          position: absolute;
          background-color: ${accent};
          box-shadow: 0 0 8px ${accent};
          opacity: 0.8;
          transition: all 0.3s ease;
        }

        .rsp-top { top: -8px; left: calc(50% - 1px); width: 2px; height: 8px; }
        .rsp-right { right: -8px; top: calc(50% - 1px); width: 8px; height: 2px; }
        .rsp-bottom { bottom: -8px; left: calc(50% - 1px); width: 2px; height: 8px; }
        .rsp-left { left: -8px; top: calc(50% - 1px); width: 8px; height: 2px; }

        /* Web crosshair diagonals */
        .web-cross-1 {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${accent}55, transparent);
          transform: rotate(45deg);
        }
        .web-cross-2 {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${accent}55, transparent);
          transform: rotate(-45deg);
        }

        /* Hover States */
        body.cursor-hover .reticle-bracket {
          border-color: #ffffff !important;
          width: 15px;
          height: 15px;
          filter: drop-shadow(0 0 16px ${accent});
        }

        body.cursor-hover .reticle-core {
          transform: scale(1.9);
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

      {/* Layer 2: Outer Counter-Rotating HUD with Web Crosshairs */}
      <div ref={outlineRef} className="tactical-cursor-outline">
        <div
          className="relative reticle-outline-main"
          style={{ animation: 'rotate-hud-reverse 10s linear infinite' }}
        >
          {/* Faint Internal Web Filaments */}
          <div className="web-cross-1" />
          <div className="web-cross-2" />

          {/* Tactical Spikes */}
          <div className="reticle-spike rsp-top" />
          <div className="reticle-spike rsp-right" />
          <div className="reticle-spike rsp-bottom" />
          <div className="reticle-spike rsp-left" />
        </div>
      </div>

      {/* Dynamic Animated Web Splat on Click */}
      {splats.map((s) => (
        <div
          key={s.id}
          className="pointer-events-none fixed z-[10001] animate-ping"
          style={{
            top: s.y,
            left: s.x,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <svg viewBox="0 0 60 60" className="w-14 h-14 text-white opacity-80 filter drop-shadow-[0_0_10px_#ef4444]">
            <path
              d="M30,30 L10,12 M30,30 L50,12 M30,30 L52,48 M30,30 L8,48 M30,30 L30,5 M30,30 L30,55 M30,30 L5,30 M30,30 L55,30"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="1.5" />
            <circle cx="30" cy="30" r="16" fill="none" stroke="white" strokeWidth="1" strokeDasharray="3,3" />
          </svg>
        </div>
      ))}
    </>
  );
};
