import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Optimized Stacked Panel effect (Home -> About only).
 * Highly stable, handles refreshes correctly, and prevents "half-page" overlaps.
 */
export function useStackedPanels(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!containerRef.current) return;

    // Use a slight delay to ensure browser has settled (especially for Lenis/ScrollTrigger interaction)
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>('.panel-section', containerRef.current!);
        
        if (panels.length < 2) return;

        // Panel 1: Home
        const homePanel = panels[0];

        // Panel 2: About
        const aboutPanel = panels[1];

        // Ensure clean layout state before calc
        gsap.set([homePanel, aboutPanel], { clearProps: 'all' });
        
        // Pin Home while scrolling into About
        ScrollTrigger.create({
          trigger: homePanel,
          start: 'top top',
          endTrigger: aboutPanel,
          end: 'top top',
          pin: true,
          pinSpacing: false,
          scrub: true,
          onRefresh: (self) => {
            // Force reset on refresh to prevent "half-page" bug
            if (self.progress === 0) {
              gsap.set(homePanel, { clearProps: 'transform' });
            }
          }
        });

        // Animation for Home scaling/fading as we scroll
        gsap.to(homePanel, {
          scale: 0.92,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: aboutPanel,
            start: 'top bottom', // Start animating as soon as About enters from bottom
            end: 'top top',    // Complete when About covers the screen
            scrub: true,
          }
        });

      }, containerRef);

      // Refresh ScrollTrigger after a short wait to fix the reload position bug
      ScrollTrigger.refresh();
      
      return () => ctx.revert();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [containerRef]);
}
