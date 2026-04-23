import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X, Minus, Maximize2, Files, Search, GitBranch, Settings } from 'lucide-react';
import { useHomeDockChrome } from '@/context/HomeDockChromeContext';

export default function VSCodeWindow() {
  const { vscodeOpen, setVscodeOpen } = useHomeDockChrome();
  const [isMaximized, setIsMaximized] = useState(false);
  const [size, setSize] = useState({ width: 900, height: 600 });
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

      const newWidth = Math.max(500, resizingData.initialWidth + deltaX * 2);
      const newHeight = Math.max(400, resizingData.initialHeight + deltaY * 2);

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

  if (!vscodeOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
      <AnimatePresence>
        {vscodeOpen && (
          <>
            {/* Backdrop - Note: kept as pointer-events-none for continuity */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 pointer-events-none"
            />

            {/* VS Code Window */}
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
                x: 100, // Offset to align with VS Code icon in the dock
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
                x: 100,
                y: 550,
                filter: 'blur(35px)',
                transition: {
                  duration: 0.6,
                  ease: [0.85, 0, 0.15, 1],
                }
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{
                zIndex: 61,
                transformOrigin: 'calc(50% + 100px) 100%',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.1) inset, 0 30px 100px rgba(0,0,0,0.9)',
              }}
              className="relative flex flex-col border border-white/20 bg-[#1e1e1e] shadow-[0_30px_100px_rgba(0,0,0,1)] pointer-events-auto overflow-hidden"
            >
              {/* macOS Header - Draggable Area */}
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="relative z-20 flex h-11 shrink-0 items-center justify-between px-4 bg-[#252526] border-b border-[#333333] cursor-grab active:cursor-grabbing"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setVscodeOpen(false)}
                    className="h-3 w-3 rounded-full bg-[#ff5f56] flex items-center justify-center group relative overflow-hidden"
                  >
                    <X className="h-2 w-2 text-black/60 opacity-0 group-hover:opacity-100 transition-opacity relative z-10" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button
                    onClick={() => setVscodeOpen(false)}
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
                
                <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2 pointer-events-none">
                  <span className="text-[#cccccc] text-[13px]">main.tsx - Modern Portfolio - VS Code</span>
                </div>
                
                <div className="w-[52px]"></div> {/* spacer to center title purely visually */}
              </div>

              {/* Main VSCode Body */}
              <div className="flex flex-1 relative overflow-hidden">
                {/* Activity Bar */}
                <div className="w-12 bg-[#333333] flex flex-col items-center py-4 gap-6 shrink-0 z-10">
                  <Files className="w-[22px] h-[22px] text-white cursor-pointer" />
                  <Search className="w-[22px] h-[22px] text-[#858585] hover:text-white cursor-pointer transition-colors" />
                  <GitBranch className="w-[22px] h-[22px] text-[#858585] hover:text-white cursor-pointer transition-colors" />
                  <div className="flex-1" />
                  <Settings className="w-[22px] h-[22px] text-[#858585] hover:text-white cursor-pointer transition-colors" />
                </div>
                
                {/* Sidebar (File Explorer) */}
                <div className="w-56 lg:w-64 bg-[#252526] border-r border-[#333333] flex flex-col shrink-0 hidden sm:flex z-10">
                  <div className="p-3 text-[11px] text-[#cccccc] tracking-widest uppercase font-semibold">
                    Explorer
                  </div>
                  <div className="flex flex-col text-[13px] text-[#cccccc]">
                    <div className="px-6 py-1 bg-[#37373d] flex items-center gap-2 cursor-pointer border-l-[3px] border-[#007acc]">
                      <span className="text-[#E34F26] text-[15px] font-bold">{"<>"}</span>
                      <span>main.tsx</span>
                    </div>
                    <div className="px-6 py-1 hover:bg-[#2a2d2e] flex items-center gap-2 cursor-pointer transition-colors border-l-[3px] border-transparent">
                      <span className="text-[#3178c6] font-bold">TS</span>
                      <span>App.tsx</span>
                    </div>
                    <div className="px-6 py-1 hover:bg-[#2a2d2e] flex items-center gap-2 cursor-pointer transition-colors border-l-[3px] border-transparent">
                      <span className="text-[#519aba] font-bold">#</span>
                      <span>index.css</span>
                    </div>
                    <div className="px-6 py-1 hover:bg-[#2a2d2e] flex items-center gap-2 cursor-pointer transition-colors border-l-[3px] border-transparent">
                      <span className="text-[#cbcb41]" style={{fontSize: "12px", marginLeft: "2px", marginRight: "3px"}}>{"{ }"}</span>
                      <span>package.json</span>
                    </div>
                  </div>
                </div>

                {/* Editor Content */}
                <div className="flex-1 bg-[#1e1e1e] flex flex-col relative z-10 overflow-hidden">
                  {/* Tabs */}
                  <div className="flex bg-[#252526] h-9 shrink-0 overflow-x-auto scrollbar-hide">
                    <div className="bg-[#1e1e1e] border-t-[3px] border-[#007acc] px-4 flex items-center gap-2 min-w-[120px] text-[13px] text-white">
                      <span className="text-[#E34F26] text-[15px] font-bold">{"<>"}</span>
                      main.tsx
                    </div>
                    <div className="px-4 flex items-center gap-2 min-w-[120px] text-[13px] text-[#969696] hover:bg-[#1e1e1e] cursor-pointer border-t-[3px] border-transparent">
                      <span className="text-[#3178c6] font-bold">TS</span>
                      App.tsx
                    </div>
                  </div>

                  {/* Breadcrumbs */}
                  <div className="h-[22px] bg-[#1e1e1e] border-b border-[#252526] flex items-center px-4 text-[12px] text-[#969696] shrink-0">
                    <span className="hover:text-white cursor-pointer ml-1">src</span>
                    <span className="mx-1">{">"}</span>
                    <span className="hover:text-white cursor-pointer">main.tsx</span>
                  </div>

                  {/* Code Area */}
                  <div className="flex-1 overflow-auto p-4 py-2 text-[13px] sm:text-[14px] leading-relaxed font-mono">
                    <div className="flex">
                      {/* Line Numbers */}
                      <div className="flex flex-col text-[#6e7681] text-right select-none pr-6 shrink-0">
                        {[...Array(14)].map((_, i) => (
                          <div key={i}>{i + 1}</div>
                        ))}
                      </div>
                      
                      {/* Code */}
                      <div className="flex flex-col whitespace-pre text-[#d4d4d4] font-mono">
                        <div><span className="text-[#c586c0]">import</span> <span className="text-[#9cdcfe]">React</span> <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">'react'</span>;</div>
                        <div><span className="text-[#c586c0]">import</span> {'{'} <span className="text-[#9cdcfe]">createRoot</span> {'}'} <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">'react-dom/client'</span>;</div>
                        <div><span className="text-[#c586c0]">import</span> <span className="text-[#9cdcfe]">App</span> <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">'./App'</span>;</div>
                        <div><span className="text-[#c586c0]">import</span> <span className="text-[#ce9178]">'./index.css'</span>;</div>
                        <div><br /></div>
                        <div><span className="text-[#6a9955]">// Initialize modern cinematic portfolio</span></div>
                        <div><span className="text-[#569cd6]">const</span> <span className="text-[#4fc1ff]">container</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#4ec9b0]">document</span>.<span className="text-[#dcdcaa]">getElementById</span>(<span className="text-[#ce9178]">'root'</span>);</div>
                        <div><span className="text-[#569cd6]">const</span> <span className="text-[#4fc1ff]">root</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#dcdcaa]">createRoot</span>(<span className="text-[#4fc1ff]">container</span><span className="text-[#569cd6]">!</span>);</div>
                        <div><br /></div>
                        <div><span className="text-[#4fc1ff]">root</span>.<span className="text-[#dcdcaa]">render</span>(</div>
                        <div>  <span className="text-[#808080]">&lt;</span><span className="text-[#4ec9b0]">React.StrictMode</span><span className="text-[#808080]">&gt;</span></div>
                        <div>    <span className="text-[#808080]">&lt;</span><span className="text-[#4ec9b0]">App</span> <span className="text-[#808080]">/&gt;</span></div>
                        <div>  <span className="text-[#808080]">&lt;/</span><span className="text-[#4ec9b0]">React.StrictMode</span><span className="text-[#808080]">&gt;</span></div>
                        <div>);</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Bar */}
                  <div className="h-[22px] bg-[#007acc] w-full flex items-center px-4 text-white text-[11px] justify-between z-20 shrink-0 absolute bottom-0 left-0">
                    <div className="flex items-center gap-4">
                      <span className="flex gap-1.5 items-center cursor-pointer hover:bg-white/10 px-1 py-0.5 rounded"><GitBranch className="w-3 h-3"/> main</span>
                      <span className="flex gap-1.5 items-center cursor-pointer hover:bg-white/10 px-1 py-0.5 rounded"><X className="w-3 h-3"/> 0</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="cursor-pointer hover:bg-white/10 px-1 py-0.5 rounded hidden sm:inline">Ln 14, Col 3</span>
                      <span className="cursor-pointer hover:bg-white/10 px-1 py-0.5 rounded hidden md:inline">Spaces: 2</span>
                      <span className="cursor-pointer hover:bg-white/10 px-1 py-0.5 rounded hidden sm:inline">UTF-8</span>
                      <span className="cursor-pointer hover:bg-white/10 px-1 py-0.5 rounded">TypeScript React</span>
                    </div>
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
                  className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-30"
                />
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
