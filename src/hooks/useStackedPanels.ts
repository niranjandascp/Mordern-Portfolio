import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Implements the stacked-panels GSAP scroll effect.
 * Each `.panel-section > .panel-inner` gets pinned, scrolled (if taller than viewport),
 * then scaled + faded out as the next section enters.
 * The last panel is intentionally excluded (it stays on screen normally).
 */
export function useStackedPanels(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!containerRef.current) return;

    // Small delay to ensure layout is computed after React paint
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const allPanels = gsap.utils.toArray<HTMLElement>(
          '.panel-section',
          containerRef.current!
        );

        if (allPanels.length === 0) return;

        // Exclude last panel — it has no exit animation
        const panels = allPanels.slice(0, -1);

        panels.forEach((panel) => {
          const innerpanel = panel.querySelector<HTMLElement>('.panel-inner');
          if (!innerpanel) return;

          const panelHeight = innerpanel.offsetHeight;
          const windowHeight = window.innerHeight;
          const difference = panelHeight - windowHeight;

          // Ratio of the animation that's for "fake scrolling" tall panels
          const fakeScrollRatio =
            difference > 0 ? difference / (difference + windowHeight) : 0;

          // Add margin-bottom so the next panel enters at the right moment
          if (fakeScrollRatio) {
            panel.style.marginBottom = panelHeight * fakeScrollRatio + 'px';
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: 'bottom bottom',
              end: () =>
                fakeScrollRatio
                  ? `+=${innerpanel.offsetHeight}`
                  : 'bottom top',
              pinSpacing: false,
              pin: true,
              scrub: true,
            },
          });

          // Fake-scroll tall content upward before applying scale/fade
          if (fakeScrollRatio) {
            tl.to(innerpanel, {
              yPercent: -100,
              y: window.innerHeight,
              duration: 1 / (1 - fakeScrollRatio) - 1,
              ease: 'none',
            });
          }

          // Scale down & fade out
          tl.fromTo(
            panel,
            { scale: 1, opacity: 1 },
            { scale: 0.85, opacity: 0.4, duration: 0.9, ease: 'none' }
          ).to(panel, { opacity: 0, duration: 0.1, ease: 'none' });
        });
      }, containerRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [containerRef]);
}
