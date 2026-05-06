import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface MouseContextType {
  // We expose the ref for high-performance consumers (like Cursor/Particles)
  positionRef: React.MutableRefObject<MousePosition>;
  isHovering: boolean;
  isClicking: boolean;
}

const MouseContext = createContext<MouseContextType | undefined>(undefined);

// Global singleton for cases where context is tricky or for vanilla listeners
export const globalMousePos = { x: 0, y: 0 };

export function MouseProvider({ children }: { children: React.ReactNode }) {
  const positionRef = useRef<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      globalMousePos.x = e.clientX;
      globalMousePos.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <MouseContext.Provider value={{ positionRef, isHovering, isClicking }}>
      {children}
    </MouseContext.Provider>
  );
}

export function useMouse() {
  const context = useContext(MouseContext);
  if (context === undefined) {
    throw new Error('useMouse must be used within MouseProvider');
  }
  return context;
}
