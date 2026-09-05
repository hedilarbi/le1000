"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    // Check for pointer device
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    
    // Add reduce motion check
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let cx = 0, cy = 0, tx = 0, ty = 0;
    
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      cursor.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    // Event delegation for hover effect
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-card]')) {
        Object.assign(cursor.style, {
          width: '46px',
          height: '46px',
          marginLeft: '-23px',
          marginTop: '-23px',
          background: 'rgba(209,166,71,.12)'
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-card]')) {
        Object.assign(cursor.style, {
          width: '26px',
          height: '26px',
          marginLeft: '-13px',
          marginTop: '-13px',
          background: 'transparent'
        });
      }
    };

    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    const onMouseLeave = () => {
        cursor.style.opacity = '0';
    };
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '26px',
        height: '26px',
        marginLeft: '-13px',
        marginTop: '-13px',
        border: '1px solid rgba(209,166,71,.75)',
        borderRadius: '50%',
        zIndex: 9999, // Ensure it's on top of everything
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity .4s ease, width .4s cubic-bezier(.16,.84,.24,1), height .4s cubic-bezier(.16,.84,.24,1), margin .4s cubic-bezier(.16,.84,.24,1), background .4s ease',
        mixBlendMode: 'screen'
      }}
    />
  );
}
