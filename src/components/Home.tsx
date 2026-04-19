import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImg from '../assets/hero.png';
import InteractiveDots from './InteractiveDots';
import { Spotlight } from './ui/Spotlight';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Background text parallax (moves slightly vertically)
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background Noise/Pattern */}
      <Spotlight
        className="animate-[spotlight-right_2s_ease_0.75s_1_forwards] -top-40 right-[-10%] md:right-[-10vw] md:-top-60"
        fill="#f59e0b"
      />

      {/* Dots — furthest back */}
      <div className="absolute inset-0 z-1 select-none opacity-10 pointer-events-auto">
        <InteractiveDots
          backgroundColor="transparent"
          dotColor="#f94b00ff"
          gridSpacing={35}
          animationSpeed={0.001}
        />
      </div>

      {/* Orange glows — above dots, below the ghost title */}
      <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] bg-[radial-gradient(circle,rgba(196,82,26,0.15)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#C4521A]/30 blur-[150px] rounded-full" />
      </div>

      {/* Ghost title — in front of glows + dots, behind portrait */}
      <div className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none select-none">
        <motion.div
          style={{ opacity: opacityText, y: yText }}
          className="flex items-center justify-center w-full mt-[-10vh]"
        >
          <h1
            className="text-[22vw] font-big-shoulders font-black text-white/20 leading-none uppercase whitespace-nowrap select-none scale-y-[1.7] scale-x-[0.9] tracking-[-0.05em] origin-center"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)'
            }}
          >
            NIRANJAN DAS
          </h1>
        </motion.div>
      </div>

      {/* Portrait — front */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-[480px] lg:max-w-[620px] pointer-events-auto">
          {/* Portrait Image (Static / No Effects) */}
          <div
            className="relative w-full aspect-[4/5]"
            style={{
              maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
            }}
          >
            <img
              src={heroImg}
              alt="Niranjan Das"
              className="w-full h-full object-cover grayscale-[0.05] contrast-[1.1] brightness-[1.1]"
              style={{ objectPosition: 'center 20%' }}
            />
          </div>
        </div>
      </div>

      {/* Cinematic Bottom Blur Fade (Seamless transition while scrolling) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[25vh] min-h-[200px] z-20 pointer-events-none"
        style={{
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 80%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 80%)',
        }}
      />
    </section>
  );
}
