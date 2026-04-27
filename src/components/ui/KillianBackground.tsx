import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export const KillianBackground: React.FC = () => {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-[1]">
      {/* Background Grid/Lines */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'opacity-[0.03]' : 'opacity-[0.05]'}`}
        style={{
          backgroundImage: `linear-gradient(to right, ${theme === 'dark' ? '#C4521A' : '#C4521A'} 1px, transparent 1px), linear-gradient(to bottom, ${theme === 'dark' ? '#C4521A' : '#C4521A'} 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Scanlines Effect */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'opacity-[0.02]' : 'opacity-[0.01]'} pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]`} />

      {/* Technical UI Accents */}
      <div className={`absolute top-10 left-10 text-[10px] font-mono uppercase tracking-[0.2em] flex flex-col gap-1 ${theme === 'dark' ? 'text-orange-600/60' : 'text-orange-600/80'}`}>
        <span className="flex items-center gap-2">
          <span className="w-1 h-1 bg-orange-600 rounded-full" />
        </span>
        <span className="text-orange-600/40"></span>
      </div>

      <div className={`absolute top-10 right-10 text-[10px] font-mono text-right flex flex-col gap-1 ${theme === 'dark' ? 'text-orange-600/60' : 'text-orange-600/80'}`}>
        <span></span>
        <span className="text-orange-600/40 uppercase tracking-widest text-[9px]"></span>
      </div>

      <div className="absolute bottom-10 left-10 flex items-center gap-3">
        <div className="flex flex-col gap-1">
          <div className="h-[1px] w-20 bg-orange-600/20" />
          <span className={`text-[9px] font-mono uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-orange-600/60' : 'text-orange-600/80'}`}></span>
        </div>
      </div>

      <div className={`absolute bottom-10 right-10 text-[10px] font-mono text-right uppercase ${theme === 'dark' ? 'text-orange-600/60' : 'text-orange-600/80'}`}>
        <span className="text-orange-600/40"></span> <span className="text-orange-600/80"></span>
        <div className="mt-1 h-[2px] w-full bg-orange-600/20">
          <motion.div
            className="h-full bg-orange-600/60"
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      {/* Coordinates following mouse */}
      <motion.div
        className={`absolute text-[8px] font-mono pointer-events-none ${theme === 'dark' ? 'text-orange-600/50' : 'text-orange-600/70'}`}
        style={{
          left: smoothX,
          top: smoothY,
          x: 25,
          y: 25
        }}
      >
        <div className={`flex flex-col border-l pl-2 ${theme === 'dark' ? 'border-orange-600/20' : 'border-orange-600/40'}`}>
          <span>X: {Math.round(mousePos.x)}</span>
          <span>Y: {Math.round(mousePos.y)}</span>
          <span className="text-[7px] text-orange-600/30"></span>
        </div>
      </motion.div>
    </div>
  );
};



