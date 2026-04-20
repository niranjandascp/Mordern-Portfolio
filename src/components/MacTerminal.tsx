import React, { useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X, Folder, Terminal, Minus, Maximize2 } from 'lucide-react';
import { useHomeDockChrome } from '../context/HomeDockChromeContext';
import { TerminalWindow } from './TerminalWindow';
import { AboutTerminal } from './AboutTerminal';

export default function MacTerminal() {
  const { terminalOpen, setTerminalOpen } = useHomeDockChrome();
  const [activeTab, setActiveTab] = useState<'terminal' | 'about'>('terminal');
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();

  if (!terminalOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
      <AnimatePresence>
        {terminalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTerminalOpen(false)}
              className="absolute inset-0 bg-black/20 pointer-events-auto"
            />

            {/* Terminal Window */}
            <motion.div
              drag={!isMaximized}
              dragControls={dragControls}
              dragListener={false}
              dragMomentum={false}
              dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
              initial={{ opacity: 0, scale: 0.1, y: 100, filter: 'blur(10px)' }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: 'blur(0px)',
                width: isMaximized ? '100vw' : '100%',
                height: isMaximized ? '100vh' : '85vh',
                maxWidth: isMaximized ? '100vw' : '896px',
                borderRadius: isMaximized ? '0px' : '12px',
              }}
              exit={{
                opacity: 0,
                scale: 0.1,
                y: 100,
                filter: 'blur(10px)',
                transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] }
              }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
                mass: 0.8
              }}
              style={{
                zIndex: 61,
                transformOrigin: 'bottom center', // Animates from/to the dock at the bottom
                boxShadow: '0 0 0 1px rgba(255,255,255,0.1) inset, 0 30px 100px rgba(0,0,0,0.8)',
              }}
              className="relative flex flex-col overflow-hidden border border-white/20 bg-[#0c0c0e]/80 shadow-[0_30px_100px_rgba(0,0,0,1)] backdrop-blur-[50px] pointer-events-auto"
            >
              {/* Liquid Glass Overlay Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-30" />
                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none" />
              </div>

              {/* macOS Header - Draggable Area */}
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="relative z-20 flex h-11 shrink-0 items-center justify-between px-4 bg-white/5 border-b border-white/10 cursor-grab active:cursor-grabbing"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTerminalOpen(false)}
                    className="h-3 w-3 rounded-full bg-[#ff5f56] flex items-center justify-center group relative overflow-hidden"
                  >
                    <X className="h-2 w-2 text-black/60 opacity-0 group-hover:opacity-100 transition-opacity relative z-10" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button
                    onClick={() => setTerminalOpen(false)} // Minimizing just closes it in this context
                    className="h-3 w-3 rounded-full bg-[#ffbd2e] flex items-center justify-center group relative overflow-hidden"
                  >
                    <Minus className="h-2 w-2 text-black/60 opacity-0 group-hover:opacity-100 transition-opacity relative z-10" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="h-3 w-3 rounded-full bg-[#27c93f] flex items-center justify-center group relative overflow-hidden"
                  >
                    <Maximize2 className="h-2 w-2 text-black/60 opacity-0 group-hover:opacity-100 transition-opacity relative z-10" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>

                {/* Tabs Section */}
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg backdrop-blur-md">
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`px-3 py-1 text-[11px] font-medium transition-all rounded-[6px] flex items-center gap-2 ${activeTab === 'terminal'
                      ? 'bg-white/10 text-white shadow-[0_2px_10px_rgba(0,0,0,0.3)] ring-1 ring-white/10'
                      : 'text-white/40 hover:text-white/60'
                      }`}
                  >
                    <Terminal className="h-3 w-3" />
                    Terminal
                  </button>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`px-3 py-1 text-[11px] font-medium transition-all rounded-[6px] flex items-center gap-2 ${activeTab === 'about'
                      ? 'bg-white/10 text-white shadow-[0_2px_10px_rgba(0,0,0,0.3)] ring-1 ring-white/10'
                      : 'text-white/40 hover:text-white/60'
                      }`}
                  >
                    <Folder className="h-3 w-3" />
                    about.txt
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-medium text-white/30 tracking-tight select-none sm:w-16 justify-end">
                  <span>zsh</span>
                </div>
              </div>

              {/* Content Area */}
              <div className="relative z-10 flex-1 overflow-hidden flex flex-col p-6 font-mono bg-black/10">
                <AnimatePresence mode="wait">
                  {activeTab === 'terminal' ? (
                    <motion.div
                      key="terminal"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex-1 flex flex-col overflow-hidden"
                    >
                      <div className="flex-1 overflow-hidden">
                        <TerminalWindow />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="about"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex-1 flex flex-col overflow-hidden"
                    >
                      <AboutTerminal isInView={true} typingSpeed={10} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Bar */}
              <div className="relative z-10 flex h-9 shrink-0 items-center justify-between px-6 bg-white/5 border-t border-white/10 text-[10px] font-medium text-white/40 uppercase tracking-widest select-none">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 italic normal-case">
                    <span className="animate-pulse text-green-400">●</span>
                    <span>esc interrupt</span>
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="bg-white/10 px-1 rounded text-white/60">ctrl+t</span>
                    <span>new prompt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-white/10 px-1 rounded text-white/60">cmd+k</span>
                    <span>clear</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
