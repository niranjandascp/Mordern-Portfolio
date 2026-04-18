import { useCallback, useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'framer-motion';

const SHOW_AFTER_PX = 280;
const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 138.23

// Quartic ease-out for the scroll-back animation
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);
  const lastScrollRef = useRef(0);

  // Direct DOM update — zero React re-renders per scroll tick
  const updateRing = useCallback((scroll: number, limit: number) => {
    const ratio = limit > 0 ? Math.min(scroll / limit, 1) : 0;
    if (ringRef.current) {
      ringRef.current.style.strokeDashoffset = String(
        CIRCUMFERENCE * (1 - ratio)
      );
    }

    // Only trigger a React re-render when crossing the visibility threshold
    const shouldShow = scroll > SHOW_AFTER_PX;
    if (shouldShow !== (lastScrollRef.current > SHOW_AFTER_PX)) {
      setVisible(shouldShow);
    }
    lastScrollRef.current = scroll;
  }, []);

  // useLenis fires on every Lenis tick — update ring without React state
  useLenis(({ scroll, limit }) => {
    updateRing(scroll, limit);
  });

  // Init ring offset on mount
  useEffect(() => {
    if (ringRef.current) {
      ringRef.current.style.strokeDashoffset = String(CIRCUMFERENCE);
    }
  }, []);

  const lenis = useLenis(undefined);

  const handleClick = useCallback(() => {
    lenis?.scrollTo(0, {
      duration: 1.6,
      easing: easeOutQuart,
      lock: true,        // prevent user interruption mid-scroll
      force: true,       // scroll even if already at target
    });
  }, [lenis]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.button
          key="stt"
          onClick={handleClick}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.5, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 16 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.8 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full cursor-pointer group"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Glass background */}
          <span
            className="absolute inset-0 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(196,82,26,0.3)] group-hover:border-[#C4521A]/50 transition-all duration-300"
            style={{
              background: 'rgba(10,10,10,0.72)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          />

          {/* Orange inner glow on hover */}
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(196,82,26,0.15),transparent_70%)]" />

          {/* SVG Progress ring — updated via ref, no re-renders */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 56 56"
            aria-hidden="true"
          >
            {/* Track */}
            <circle
              cx="28" cy="28" r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="2.5"
            />
            {/* Progress — driven directly by DOM ref */}
            <circle
              ref={ringRef}
              cx="28" cy="28" r={RADIUS}
              fill="none"
              stroke="url(#stt-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE}
            />
            <defs>
              <linearGradient id="stt-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#C4521A" />
              </linearGradient>
            </defs>
          </svg>

          {/* Arrow icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 w-[18px] h-[18px] text-orange-400 group-hover:text-amber-300 transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
