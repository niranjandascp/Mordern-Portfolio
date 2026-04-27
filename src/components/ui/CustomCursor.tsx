import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  // Motion values for high-performance updates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast spring for the outer part to maintain responsiveness while feeling premium
  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const outerX = useSpring(mouseX, springConfig);
  const outerY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Direct updates to motion values avoid React re-renders
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Accurate Inner Square - No Lag (Direct Motion Value) */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-[#C4521A] pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 10px rgba(196, 82, 26, 0.5)'
        }}
        animate={{
          scale: isHovered ? 2.5 : 1,
          rotate: isHovered ? 90 : 0,
          backgroundColor: isHovered ? '#f97316' : '#C4521A'
        }}
        transition={{
          rotate: { duration: 0.2 },
          scale: { duration: 0.2 }
        }}
      />


    </>
  );
};
