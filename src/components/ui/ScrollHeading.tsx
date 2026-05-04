import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ScrollHeadingProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  viewportMargin?: string;
}

/**
 * A premium heading component that animates from bottom with a slow-mo blur effect.
 * Perfect for section titles and intro texts.
 */
const ScrollHeading = ({
  children,
  className = "",
  delay = 0,
  viewportMargin = "-100px"
}: ScrollHeadingProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
        filter: 'blur(20px)',
        scale: 0.95
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1
      }}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom cinematic cubic-bezier
        filter: { duration: 1.0, ease: "easeOut" } // Slightly longer blur transition for "slowmo" feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollHeading;
