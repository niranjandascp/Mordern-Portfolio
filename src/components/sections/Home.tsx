import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import heroImg from '@/assets/hero.png';
import { Spotlight } from '@/components/ui/Spotlight';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';
import { KillianBackground } from '@/components/ui/KillianBackground';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);


  // Scroll Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Background text parallax (moves slightly vertically)
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Spotlight Position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);


  return (
    <section
      id="home"
      ref={containerRef}
      className=""
    >
      {/* Dynamic Background Noise/Pattern */}
      <Spotlight
        className="animate-[spotlight-right_2s_ease_0.75s_1_forwards] -top-40 right-[-10%] md:right-[-10vw] md:-top-60"
        fill="#f59e0b"
      />

      {/* Dots — furthest back */}
      {/* <div className="absolute inset-0 z-1 select-none opacity-15 pointer-events-auto">
        <InteractiveDots
          backgroundColor="transparent"
          dotColor="#f94b00ff"
          gridSpacing={30}
          animationSpeed={0.001}
        />
      </div> */}

      {/* Orange glows — above dots, below the ghost title */}
      <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] bg-[radial-gradient(circle,rgba(196,82,26,0.15)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#C4521A]/30 blur-[150px] rounded-full" />
      </div>

      {/* Killian Herzer Background Effect */}
      <KillianBackground />

      {/* Ghost title — in front of glows + dots, behind portrait */}
      <div className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none select-none">
        <motion.div
          style={{ opacity: opacityText, y: yText }}
          className="flex items-center justify-center w-full mt-[-10vh]"
        >
          <motion.div
            className="relative"
            initial={{ filter: 'blur(20px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 1.5, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Background version of the text (subtle) */}
            <h1
              className={`text-[22vw] font-big-shoulders font-black leading-none uppercase whitespace-nowrap select-none scale-y-[1.0] scale-x-[0.9] tracking-[-0.05em] origin-center ${theme === 'dark' ? 'text-white/5' : 'text-black/[0.03]'
                }`}
            >
              NIRANJAN DAS
            </h1>

            {/* Glassy Black Spotlight Glow - ONLY IN LIGHT MODE */}
            {theme === 'light' && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-[2] mix-blend-multiply opacity-10"
                style={{
                  background: `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 0, 0, 0.5) 0%, transparent 100%)`,
                }}
              />
            )}

            {/* Revealed version of the text */}
            <h1
              className={`absolute inset-0 text-[22vw] font-big-shoulders font-black leading-none uppercase whitespace-nowrap select-none scale-y-[1.0] scale-x-[0.9] tracking-[-0.05em] origin-center ${theme === 'dark' ? 'text-white/40' : 'text-neutral-500'
                }`}

              style={{
                WebkitMaskImage: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, black 0%, rgba(0,0,0,0.6) 40%, transparent 100%)`,
                maskImage: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, black 0%, rgba(0,0,0,0.6) 40%, transparent 100%)`,
                textShadow: theme === 'light'
                  ? '0 15px 45px rgba(0,0,0,0.2), 0 5px 15px rgba(0,0,0,0.1)'
                  : '0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.05)'
              }}
            >
              NIRANJAN DAS
            </h1>



          </motion.div>


        </motion.div>
      </div>


      <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none perspective-[1000px]">
        <motion.div
          className="relative w-full max-w-[480px] lg:max-w-[620px] pointer-events-auto will-change-transform"
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 2.9, ease: [0.22, 1, 0.36, 1] }}
        >
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
        </motion.div>
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

      {/* Call to Action */}
      <motion.div
        className="absolute bottom-[18vh] sm:bottom-[15vh] right-[5vw] sm:right-[10vw] z-[30] pointer-events-auto flex flex-col items-center will-change-transform"
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, delay: 3.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <LiquidMetalButton
          label="Explore Projects"
          onClick={() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </motion.div>
    </section>
  );
}
