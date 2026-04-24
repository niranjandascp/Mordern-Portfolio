import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';

/**
 * Bridges Lenis smooth scroll with GSAP ScrollTrigger.
 * Must be rendered inside <ReactLenis root>.
 */
export default function GSAPScrollSync() {
  // Notify ScrollTrigger on every Lenis scroll tick
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Refresh after mount so ScrollTrigger has correct positions
    ScrollTrigger.refresh();
  }, []);

  return null;
}
