import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor = () => {
  const { currentTheme } = useTheme();
  const outerRef = useRef(null);
  const dotRef = useRef(null);
  const haloRef = useRef(null);
  const pos = useRef({ x: -300, y: -300 });
  const outerPos = useRef({ x: -300, y: -300 });
  const hovered = useRef(false);
  const clicking = useRef(false);
  const visible = useRef(false);
  const raf = useRef(null);

  useEffect(() => {
    // Touch devices — skip entirely
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.documentElement.style.cursor = 'none';

    const show = () => {
      if (!visible.current) {
        visible.current = true;
        outerRef.current && (outerRef.current.style.opacity = '1');
        dotRef.current && (dotRef.current.style.opacity = '1');
        haloRef.current && (haloRef.current.style.opacity = '1');
      }
    };
    const hide = () => {
      visible.current = false;
      outerRef.current && (outerRef.current.style.opacity = '0');
      dotRef.current && (dotRef.current.style.opacity = '0');
      haloRef.current && (haloRef.current.style.opacity = '0');
    };

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      show();
      hovered.current = !!e.target.closest(
        'button,a,input,select,textarea,[role="button"],label,.cursor-pointer'
      );
    };
    const onDown = () => { clicking.current = true; };
    const onUp = () => { clicking.current = false; };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    // Pure RAF lerp — zero Framer-Motion overhead, zero lag
    const lerp = (a, b, t) => a + (b - a) * t;
    const LERP_OUTER = 0.14;

    const tick = () => {
      const { x, y } = pos.current;
      const h = hovered.current;
      const c = clicking.current;

      // Dot = instant snap
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${x - 4}px,${y - 4}px) scale(${c ? 2 : h ? 0.5 : 1})`;
      }

      // Outer ring = soft lerp
      outerPos.current.x = lerp(outerPos.current.x, x, LERP_OUTER);
      outerPos.current.y = lerp(outerPos.current.y, y, LERP_OUTER);
      const ox = outerPos.current.x;
      const oy = outerPos.current.y;

      const sz = h ? 48 : 28;
      if (outerRef.current) {
        outerRef.current.style.transform =
          `translate(${ox - sz / 2}px,${oy - sz / 2}px) rotate(${h ? '45deg' : '0deg'}) scale(${c ? 0.7 : 1})`;
        outerRef.current.style.width = `${sz}px`;
        outerRef.current.style.height = `${sz}px`;
      }

      // Wide ambient halo = very slow lerp
      if (haloRef.current) {
        const hx = lerp(outerPos.current.x, x, 0.06);
        const hy = lerp(outerPos.current.y, y, 0.06);
        haloRef.current.style.transform = `translate(${ox - 32}px,${oy - 32}px)`;
        haloRef.current.style.opacity = visible.current ? (h ? '0.5' : '0.18') : '0';
      }

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
    };
  }, []);

  // Update colors when theme changes (direct DOM write, no re-render)
  useEffect(() => {
    const { accent, primary, glowColor } = currentTheme;
    if (dotRef.current) {
      dotRef.current.style.backgroundColor = primary;
      dotRef.current.style.boxShadow = `0 0 12px 4px ${primary}`;
    }
    if (outerRef.current) {
      outerRef.current.style.borderColor = accent;
      outerRef.current.style.boxShadow = `0 0 16px ${glowColor}`;
      outerRef.current.querySelectorAll('i').forEach(s => {
        s.style.backgroundColor = accent;
      });
    }
    if (haloRef.current) {
      haloRef.current.style.background =
        `radial-gradient(circle, ${accent}60 0%, transparent 68%)`;
    }
  }, [currentTheme]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
      style={{ mixBlendMode: 'normal' }}
    >
      {/* Soft ambient halo */}
      <div
        ref={haloRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 64, height: 64,
          borderRadius: '50%',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          willChange: 'transform',
          background: `radial-gradient(circle, ${currentTheme.accent}60 0%, transparent 68%)`
        }}
      />

      {/* Targeting ring with corner ticks */}
      <div
        ref={outerRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 28, height: 28,
          borderRadius: '50%',
          border: `1.5px solid ${currentTheme.accent}`,
          boxShadow: `0 0 16px ${currentTheme.glowColor}`,
          opacity: 0,
          transition: 'width 0.12s ease, height 0.12s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          willChange: 'transform, width, height',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <i style={{ position:'absolute', top:'-3px', left:'50%', transform:'translateX(-50%)', width:'6px', height:'2px', borderRadius:'1px', backgroundColor: currentTheme.accent }} />
        <i style={{ position:'absolute', bottom:'-3px', left:'50%', transform:'translateX(-50%)', width:'6px', height:'2px', borderRadius:'1px', backgroundColor: currentTheme.accent }} />
        <i style={{ position:'absolute', left:'-3px', top:'50%', transform:'translateY(-50%)', width:'2px', height:'6px', borderRadius:'1px', backgroundColor: currentTheme.accent }} />
        <i style={{ position:'absolute', right:'-3px', top:'50%', transform:'translateY(-50%)', width:'2px', height:'6px', borderRadius:'1px', backgroundColor: currentTheme.accent }} />
      </div>

      {/* Inner hot dot — zero lag */}
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          backgroundColor: currentTheme.primary,
          boxShadow: `0 0 12px 4px ${currentTheme.primary}`,
          opacity: 0,
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          willChange: 'transform'
        }}
      />
    </div>
  );
};
