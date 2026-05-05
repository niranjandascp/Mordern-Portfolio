import { useState, useRef, memo, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { User, Zap, Layout, Code2, ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import ScrollHeading from '@/components/ui/ScrollHeading';

function AboutCard({ card, idx }: { card: any, idx: number, theme: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt — GPU-accelerated via useMotionValue (no re-renders)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig);
  const scale = useSpring(1, { damping: 20, stiffness: 200 });

  // Spotlight position for cursor-following glow
  const spotlightX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const spotlightY = useTransform(mouseY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.03);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
    scale.set(1);
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.92,
      filter: 'blur(8px)',
    },
    show: (idx: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        mass: 0.8,
        damping: 22,
        stiffness: 120,
        delay: (idx % 3) * 0.1,
      }
    })
  };

  return (
    <motion.div
      ref={cardRef}
      custom={idx}
      variants={itemVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      style={{
        rotateX,
        rotateY,
        scale,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative rounded-2xl overflow-hidden bg-bg-secondary/50 border border-border-main p-4 sm:p-5 md:p-6 flex flex-col gap-3 sm:gap-4 hover:bg-bg-secondary/80 transition-colors duration-500 shadow-xl backdrop-blur-sm z-10 hover:z-20 cursor-pointer ${card.className} ${card.borderColor}`}
    >
      {/* Cursor-Following Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate(spotlightX, spotlightY, card.glowColor || 'rgba(196,82,26,0.25)'),
        }}
      />

      {/* Animated Border Shimmer */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 30%, ${card.accentHex || '#C4521A'}40 50%, transparent 70%)`,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Subtle Gradient Glow in background */}
      <div className={`absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl ${card.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-700 blur-[60px] pointer-events-none`} />
      <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${card.gradient} opacity-[0.08] group-hover:opacity-[0.2] transition-opacity duration-700 pointer-events-none`} />

      {/* Content — translateZ for true 3D depth */}
      <div className="relative z-10 flex flex-col h-full" style={{ transform: 'translateZ(40px)' }}>
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-bg-primary/40 border border-border-main flex items-center justify-center mb-3 sm:mb-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:scale-[1.15] group-hover:-rotate-[6deg] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-500 ease-out">
          {card.icon}
        </div>

        <h3 className="text-base sm:text-lg md:text-xl font-bold text-text-primary mb-1.5 sm:mb-2 tracking-tight">
          {card.title}
        </h3>

        <p className="text-text-secondary leading-relaxed text-xs md:text-sm font-light flex-grow">
          {card.description}
        </p>
      </div>

      {/* Arrow icon — 3D depth layer */}
      <div
        className="absolute top-5 right-5 sm:top-8 sm:right-8 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-out text-text-secondary group-hover:text-text-primary"
        style={{ transform: isHovered ? 'translateZ(60px)' : 'translateZ(0px)', transition: 'transform 0.5s ease' }}
      >
        <ArrowUpRight size={24} className="sm:w-8 sm:h-8" strokeWidth={1.5} />
      </div>
    </motion.div>
  );
}

// Helper for cursor-following spotlight
function useMotionTemplate(x: any, y: any, color: string) {
  return useTransform([x, y], ([xv, yv]: any) =>
    `radial-gradient(circle 250px at ${xv} ${yv}, ${color}, transparent 70%)`
  );
}

const AboutCardMemo = memo(AboutCard);

export default memo(function About() {
  const { theme } = useTheme();
  const cards = [
    {
      icon: <User className="text-[#C4521A]" size={24} />,
      title: 'Who I am',
      description: 'A passionate developer who loves transforming complex problems into elegant, intuitive, and scalable solutions.',
      gradient: 'from-[#C4521A]/40 to-transparent',
      borderColor: 'group-hover:border-[#C4521A]/60 hover:shadow-[0_10px_60px_-15px_rgba(196,82,26,0.3)]',
      className: 'md:col-span-2 md:row-span-1', // Wide
    },
    {
      icon: <Code2 className="text-blue-500" size={24} />,
      title: 'What I do',
      description: 'I build responsive front-end interfaces, robust backend APIs, and seamless full-stack applications.',
      gradient: 'from-blue-500/40 to-transparent',
      borderColor: 'group-hover:border-blue-500/60 hover:shadow-[0_10px_60px_-15px_rgba(59,130,246,0.3)]',
      className: 'md:col-span-1 md:row-span-2 flex flex-col justify-between', // Tall
    },
    {
      icon: <Zap className="text-emerald-500" size={24} />,
      title: 'My approach',
      description: 'Clean code, modern architecture, and a constant drive to learn.',
      gradient: 'from-emerald-500/40 to-transparent',
      borderColor: 'group-hover:border-emerald-500/60 hover:shadow-[0_10px_60px_-15px_rgba(16,185,129,0.3)]',
      className: 'md:col-span-1 md:row-span-1', // Square
    },
    {
      icon: <Layout className="text-purple-500" size={24} />,
      title: 'Design Philosophy',
      description: 'Functionality meets stunning visuals with high attention to detail.',
      gradient: 'from-purple-500/40 to-transparent',
      borderColor: 'group-hover:border-purple-500/60 hover:shadow-[0_10px_60px_-15px_rgba(168,85,247,0.3)]',
      className: 'md:col-span-1 md:row-span-1', // Square
    },
    // {
    //   icon: <Target className="text-pink-500" size={24} />,
    //   title: 'Goal Oriented',
    //   description: 'Dedicated to achieving product objectives and user accessibility.',
    //   gradient: 'from-pink-500/40 to-transparent',
    //   borderColor: 'group-hover:border-pink-500/60 hover:shadow-[0_10px_60px_-15px_rgba(236,72,153,0.3)]',
    //   className: 'md:col-span-3 md:row-span-1', // Extra Wide Bottom
    // },
  ];

  return (
    <section id="about" className="relative w-full min-h-[auto] md:min-h-screen bg-transparent py-16 sm:py-24 md:py-32 overflow-hidden flex items-center z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full relative z-10">

        {/* Superior Header Layout */}
        <ScrollHeading
          className="mb-10 sm:mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8"
        >
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter text-text-primary capitalize leading-[0.9]">
              About <span className="text-[#C4521A]">Me.</span>
            </h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 96, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="h-2 bg-gradient-to-r from-[#C4521A] to-transparent mt-8 rounded-full"
            />
          </div>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary font-light max-w-md leading-relaxed border-l-2 border-border-main pl-4 sm:pl-6">
            I don't just write code. I build digital experiences that merge high-end aesthetics with flawless engineering.
          </p>
        </ScrollHeading>

        {/* Professional Bento Box Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr"
          style={{ perspective: 1500 }}
        >
          {cards.map((card, idx) => (
            <AboutCardMemo key={idx} card={card} idx={idx} theme={theme} />
          ))}
        </div>

      </div>
    </section>
  );
});
