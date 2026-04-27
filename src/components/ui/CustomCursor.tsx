import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Motion values for high-performance updates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovered(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  const accentColor = '#C4521A';

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]">
      {/* High-Performance Square Cursor */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 12,
          height: 12,
        }}
      >
        {/* The Base Square */}
        <motion.div
          className="w-full h-full relative flex items-center justify-center"
          style={{
            backgroundColor: isHovered ? 'transparent' : accentColor,
            boxShadow: !isHovered ? `0 0 15px ${accentColor}44` : 'none',
            border: isHovered ? `1.5px solid ${accentColor}` : '0px solid transparent',
          }}
          animate={{
            scale: isHovered ? 2.8 : (isClicking ? 0.8 : 1),
            rotate: isHovered ? 45 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
        >
          {/* Inner Core that appears on hover */}
          {isHovered && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 0.3, opacity: 1 }}
              className="w-full h-full bg-white"
            />
          )}
        </motion.div>

        {/* Technical Corner Accents on Hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.25 }}
            className="absolute inset-[-6px] border border-orange-500/30"
          />
        )}
      </motion.div>
    </div>
  );
};
