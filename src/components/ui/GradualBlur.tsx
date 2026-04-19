import { type CSSProperties } from 'react';

type Direction = 'top' | 'bottom' | 'left' | 'right';

interface GradualBlurProps {
  /** Which edge blur appears strongest at */
  direction?: Direction;
  /** Height (vertical) or width (horizontal) of the blur zone */
  size?: number | string;
  /** Number of blur layers — more = smoother, but heavier. 8 is ideal. */
  layers?: number;
  /** Smallest blur value in px — layers scale up exponentially from here */
  baseBlur?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * GradualBlur
 *
 * Renders N stacked `backdrop-filter: blur()` layers with exponentially
 * increasing blur values and staggered gradient masks. Each successive
 * layer activates slightly later in the gradient, so lighter blur covers
 * more of the zone and heavy blur only applies at the very edge.
 *
 * Result: a photographic, perceptually-linear blur fade — zero glitches,
 * no harsh mask edge, GPU-composited, zero JS/animations.
 */
export default function GradualBlur({
  direction = 'bottom',
  size = '28vh',
  layers = 8,
  baseBlur = 0.5,
  className = '',
  style,
}: GradualBlurProps) {
  const isVertical = direction === 'top' || direction === 'bottom';

  // Axis of the mask gradient
  const axis: Record<Direction, string> = {
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right',
  };

  // Position the overlay at the correct edge
  const positionStyle: CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 20,
    ...(isVertical
      ? {
          left: 0,
          right: 0,
          height: typeof size === 'number' ? `${size}px` : size,
        }
      : {
          top: 0,
          bottom: 0,
          width: typeof size === 'number' ? `${size}px` : size,
        }),
    ...(direction === 'bottom' && { bottom: 0 }),
    ...(direction === 'top' && { top: 0 }),
    ...(direction === 'left' && { left: 0 }),
    ...(direction === 'right' && { right: 0 }),
  };

  return (
    <div className={className} style={{ ...positionStyle, ...style }}>
      {Array.from({ length: layers }).map((_, i) => {
        // Blur is exponential: 0.5, 1, 2, 4, 8, 16, 32, 64 px
        const blurPx = baseBlur * Math.pow(2, i);

        // Each layer starts transparent at (i / layers)% of the zone
        // and becomes fully opaque at 100%. So lighter blurs cover more
        // of the area while heavy blurs only apply near the edge.
        const startPercent = (i / layers) * 100;

        const mask = `linear-gradient(${axis[direction]}, transparent ${startPercent}%, black 100%)`;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              backdropFilter: `blur(${blurPx}px)`,
              WebkitBackdropFilter: `blur(${blurPx}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
              // No will-change — compositor handles this natively
            }}
          />
        );
      })}
    </div>
  );
}
