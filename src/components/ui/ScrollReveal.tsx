import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { useMemo, memo, type ReactNode, type ElementType } from 'react';

type HTMLMotionTag =
  | 'div'
  | 'span'
  | 'section'
  | 'article'
  | 'header'
  | 'footer'
  | 'main'
  | 'nav'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'ul'
  | 'ol'
  | 'li'
  | 'a'
  | 'button';

interface ScrollRevealProps<T extends HTMLMotionTag> {
  children?: ReactNode;
  /** Index for staggering */
  animationNum: number;
  /** The HTML tag to render */
  as?: T;
  /** Direction of animation: 'left', 'right', 'up', 'down', or 'alternate' */
  direction?: 'left' | 'right' | 'up' | 'down' | 'alternate';
  /** Animate once */
  once?: boolean;
  /** Delay between each item */
  staggerDelay?: number;
  /** Duration of the animation */
  duration?: number;
  /** How much of the item should be in view to trigger (0 to 1) */
  threshold?: number;
  /** Distance to travel (in pixels) */
  distance?: number;
  className?: string;
}

/**
 * Smooth Scroll Reveal Animation
 * Cards arrive smoothly from sides when scrolling into view
 */
export const ScrollReveal = memo(<T extends HTMLMotionTag = 'div'>({
  children,
  animationNum,
  className,
  as = 'div' as T,
  direction = 'alternate',
  once = true,
  staggerDelay = 0.1,
  duration = 0.8,
  threshold = 0.15,
  distance = 80,
  ...props
}: ScrollRevealProps<T> & Omit<HTMLMotionProps<T>, keyof ScrollRevealProps<T>>) => {
  const variants: Variants = useMemo(() => {
    const getDirection = (idx: number) => {
      if (direction === 'alternate') {
        return idx % 2 === 0 ? 'left' : 'right';
      }
      return direction;
    };

    return {
      hidden: (i: number) => {
        const dir = getDirection(i);
        // Reduced multiplier for smoother travel
        const travelDistance = distance * 1.5;
        const x = dir === 'left' ? -travelDistance : dir === 'right' ? travelDistance : 0;
        const y = dir === 'up' ? travelDistance : dir === 'down' ? -travelDistance : 0;
        return {
          opacity: 0,
          x,
          y,
          scale: 0.9,
          filter: 'blur(10px)',
        };
      },
      visible: (i: number) => {
        return {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            delay: i * staggerDelay,
            type: 'spring',
            damping: 25, // Higher damping for a cleaner, non-shaky arrival
            stiffness: 100,
            mass: 1,
            duration: duration,
          },
        };
      },
    };
  }, [direction, staggerDelay, duration, distance]);

  const Component = motion[as as keyof typeof motion] as ElementType;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      custom={animationNum}
      variants={variants}
      className={className}
      style={{ willChange: 'transform, opacity' }}
      {...props}
    >
      {children}
    </Component>
  );
});

export default ScrollReveal;
