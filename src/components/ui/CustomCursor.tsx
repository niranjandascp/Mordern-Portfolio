import React, { memo } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useMouse } from '@/context/MouseContext';

export const CustomCursor: React.FC = memo(() => {
  const { position, isHovering, isClicking } = useMouse();

  // Motion values for high-performance updates
  const mouseX = useMotionValue(position.x);
  const mouseY = useMotionValue(position.y);

  // Sync motion values with context position
  React.useEffect(() => {
    mouseX.set(position.x);
    mouseY.set(position.y);
  }, [position.x, position.y, mouseX, mouseY]);

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
          className="w-full h-full relative flex items-center justify-center rounded"
          style={{
            backgroundColor: isHovering ? 'transparent' : accentColor,
            boxShadow: !isHovering ? `0 0 15px ${accentColor}44` : 'none',
            border: isHovering ? `1.5px solid ${accentColor}` : '0px solid transparent',
          }}
          animate={{
            scale: isHovering ? 2.8 : (isClicking ? 0.8 : 1),
            rotate: isHovering ? 45 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
        >
          {/* Inner Core that appears on hover */}
          {isHovering && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 0.3, opacity: 1 }}
              className="w-full h-full bg-white"
            />
          )}
        </motion.div>

        {/* Technical Corner Accents on Hover */}
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.25 }}
            className="absolute inset-[-6px] border border-orange-500/30"
          />
        )}
      </motion.div>
    </div>
  );
});
