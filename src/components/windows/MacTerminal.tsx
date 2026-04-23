import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X, Folder, Terminal, Minus, Maximize2 } from 'lucide-react';
import { useHomeDockChrome } from '@/context/HomeDockChromeContext';
import { TerminalWindow } from '@/components/windows/TerminalWindow';
import { AboutTerminal } from '@/components/windows/AboutTerminal';

export default function MacTerminal() {
  const { terminalOpen, setTerminalOpen } = useHomeDockChrome();
  const [activeTab, setActiveTab] = useState<'terminal' | 'about'>('terminal');
  const [isMaximized, setIsMaximized] = useState(false);
  const [size, setSize] = useState({ width: 896, height: 600 }); // 896 is max-w-4xl
  const [resizingData, setResizingData] = useState<{
    initialWidth: number;
    initialHeight: number;
    initialMouseX: number;
    initialMouseY: number;
  } | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);

  // Resize Logic
  useEffect(() => {
    if (!resizingData) return;

    const handlePointerMove = (e: PointerEvent) => {
      const deltaX = e.clientX - resizingData.initialMouseX;
      const deltaY = e.clientY - resizingData.initialMouseY;

      const newWidth = Math.max(400, resizingData.initialWidth + deltaX * 2);
      const newHeight = Math.max(300, resizingData.initialHeight + deltaY * 2);

      setSize({ width: newWidth, height: newHeight });
    };

    const handlePointerUp = () => {
      setResizingData(null);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSize({ width: resizingData.initialWidth, height: resizingData.initialHeight });
        handlePointerUp();
      }
    };

    document.body.style.cursor = 'nwse-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [resizingData]);

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
              className="absolute inset-0 bg-black/20 pointer-events-auto"
            />

            {/* Terminal Window */}
            <motion.div
              ref={windowRef}
              drag={!isMaximized && !resizingData}
              dragControls={dragControls}
              dragListener={false}
              dragMomentum={false}
              onDragEnd={(_, info) => setDragPos(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }))}
              dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
              initial={{
                opacity: 0,
                scaleX: 0,
                scaleY: 0,
                x: 230, // Offset to align with Terminal icon in the dock
                y: 450,
                filter: 'blur(30px)',
              }}
              animate={{
                opacity: 1,
                scaleX: 1,
                scaleY: 1,
                x: isMaximized ? 0 : dragPos.x,
                y: isMaximized ? 0 : dragPos.y,
                filter: 'blur(0px)',
                width: isMaximized ? '100%' : size.width,
                height: isMaximized ? '100%' : size.height,
                maxWidth: isMaximized ? '100%' : '90vw',
                maxHeight: isMaximized ? '100%' : '90vh',
                borderRadius: isMaximized ? '0px' : '12px',
              }}
              exit={{
                opacity: 0,
                scaleX: 0.1,
                scaleY: 0,
                x: 230,
                y: 550,
                filter: 'blur(35px)',
                transition: {
                  duration: 0.6,
                  ease: [0.85, 0, 0.15, 1], // Custom sine-in-out for 'suction' feel
                }
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{
                zIndex: 61,
                transformOrigin: 'calc(50% + 230px) 100%',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.1) inset, 0 30px 100px rgba(0,0,0,0.9)',
              }}
              className="relative flex flex-col overflow-hidden border border-white/20 bg-[#0c0c0e]/85 shadow-[0_30px_100px_rgba(0,0,0,1)] backdrop-blur-[50px] pointer-events-auto"
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
                    onClick={() => setTerminalOpen(false)}
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

              {/* Resize Handle */}
              {!isMaximized && (
                <div
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.currentTarget.setPointerCapture(e.pointerId);
                    setResizingData({
                      initialWidth: size.width,
                      initialHeight: size.height,
                      initialMouseX: e.clientX,
                      initialMouseY: e.clientY,
                    });
                  }}
                  className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-30 flex items-end justify-end p-1"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 mr-0.5 mb-0.5" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
