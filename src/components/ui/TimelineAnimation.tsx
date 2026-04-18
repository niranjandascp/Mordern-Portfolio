import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { useMemo, type ReactNode, type ElementType } from 'react';

type HTMLMotionTag =
  | 'div' | 'span' | 'section' | 'article' | 'header' | 'footer' | 'main' | 'nav'
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'ul' | 'ol' | 'li' | 'a' | 'button';

interface TimelineContentProps<T extends HTMLMotionTag> {
  children?: ReactNode;
  /** Index for staggering */
  animationNum: number;
  /** The HTML tag to render */
  as?: T;
  /** Optional custom variants */
  customVariants?: Variants;
  /** Animate once */
  once?: boolean;
  /** Delay between each item */
  staggerDelay?: number;
  /** Duration of the animation */
  duration?: number;
  className?: string;
  /** How much of the item should be in view to trigger (0 to 1) */
  threshold?: number;
}

/**
 * Elite 3D Timeline Animation
 * Implements a high-end 3D perspective entrance.
 */
export const TimelineAnimation = <T extends HTMLMotionTag = 'div'>({
  children,
  animationNum,
  className,
  as = 'div' as T,
  customVariants,
  once = true,
  staggerDelay = 0.15,
  duration = 1.4,
  threshold = 0.2,
  ...props
}: TimelineContentProps<T> & Omit<HTMLMotionProps<T>, keyof TimelineContentProps<T>>) => {
  
  // High-end 3D "Float Emerge" variants
  const elite3DVariants: Variants = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -25, // 3D Tilt backwards
      translateZ: -100, // Move into the distance
      scale: 0.9,
      filter: 'blur(10px)',
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      translateZ: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * staggerDelay,
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // Cinematic Quartic
      },
    }),
  }), [staggerDelay, duration]);

  const variants = customVariants || elite3DVariants;

  const Component = motion[as as keyof typeof motion] as ElementType;

  return (
    <div style={{ perspective: '1200px' }} className="w-full h-full">
      <Component
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: threshold }}
        custom={animationNum}
        variants={variants}
        className={className}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform, opacity, filter' }}
        {...props}
      >
        {children}
      </Component>
    </div>
  );
};

export default TimelineAnimation;
