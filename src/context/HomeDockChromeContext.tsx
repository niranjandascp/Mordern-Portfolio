import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Value = {
  visible: boolean;
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
};

const HomeDockChromeContext = createContext<Value | null>(null);

export function HomeDockChromeProvider({
  children,
  thresholdPx = 100,
}: {
  children: React.ReactNode;
  thresholdPx?: number;
}) {
  const [visible, setVisible] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // If terminal is open, we don't necessarily want to hide the dock, 
      // but the original logic was about threshold.
      setVisible(window.scrollY < thresholdPx);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [thresholdPx]);

  const value = useMemo(() => ({
    visible,
    terminalOpen,
    setTerminalOpen
  }), [visible, terminalOpen]);

  return (
    <HomeDockChromeContext.Provider value={value}>
      {children}
    </HomeDockChromeContext.Provider>
  );
}

export function useHomeDockChrome() {
  const ctx = useContext(HomeDockChromeContext);
  if (!ctx) {
    throw new Error('useHomeDockChrome must be used within HomeDockChromeProvider');
  }
  return ctx;
}
