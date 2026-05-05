import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { executeThemeTransition } from '@/lib/theme-transition';
import nIcon from '@/assets/N.png';

export default memo(function MacStartup() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Lock scrolling while the startup animation is playing
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      executeThemeTransition(() => setShow(false), { 
        coordinates: { x: window.innerWidth, y: 0 },
        duration: 1000,
        variant: "circle" 
      });
      
      // Restore scrolling after fade out completes
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 1000);
    }, 2300);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="mac-startup"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
        >
          <div className="flex flex-col items-center gap-16 relative -top-10">
            {/* Liquid Glass Logo Wrapper */}
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))",
                  "drop-shadow(0 0 35px rgba(255, 255, 255, 0.8))",
                  "drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))"
                ]
              }}
              transition={{
                duration: 3.0,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <img
                src={nIcon}
                alt="N Logo"
                className="w-28 h-28 sm:w-36 sm:h-36 object-contain relative z-10"
              />
            </motion.div>

            {/* Loading Bar */}
            <div className="w-48 sm:w-56 h-[4px] bg-[#333333] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white/90"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
