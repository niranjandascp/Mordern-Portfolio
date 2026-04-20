import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaApple } from 'react-icons/fa6';

export default function MacStartup() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Lock scrolling while the startup animation is playing
    document.body.style.overflow = 'hidden';
    
    // Simulate the Mac loading time. After 2.3 seconds, trigger the fade out.
    const timer = setTimeout(() => {
      setShow(false);
      // Restore scrolling after fade out completes (approx 0.8s later)
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 800);
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
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
        >
          <div className="flex flex-col items-center gap-16 relative -top-10">
            {/* Apple Logo */}
            <FaApple className="text-white/90 w-20 h-20 sm:w-24 sm:h-24" />

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
}
