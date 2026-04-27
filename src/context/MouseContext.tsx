import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface MouseContextType {
  position: MousePosition;
  isHovering: boolean;
  isClicking: boolean;
}

const MouseContext = createContext<MouseContextType | undefined>(undefined);

export function MouseProvider({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Throttled position update for performance
  const updatePosition = useCallback((x: number, y: number) => {
    setPosition({ x, y });
  }, []);

  useEffect(() => {
    let lastUpdate = 0;
    const throttleMs = 16; // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastUpdate < throttleMs) return;
      lastUpdate = now;
      updatePosition(e.clientX, e.clientY);
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

    // Use passive listeners for better performance
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
  }, [updatePosition]);

  return (
    <MouseContext.Provider value={{ position, isHovering, isClicking }}>
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
