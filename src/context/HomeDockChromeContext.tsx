import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Value = {
  visible: boolean;
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  vscodeOpen: boolean;
  setVscodeOpen: (open: boolean) => void;
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
  const [vscodeOpen, setVscodeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY < thresholdPx);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [thresholdPx]);

  const value = useMemo(() => ({
    visible,
    terminalOpen,
    setTerminalOpen,
    activeTab,
    setActiveTab,
    vscodeOpen,
    setVscodeOpen
  }), [visible, terminalOpen, activeTab, vscodeOpen]);

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
