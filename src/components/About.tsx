import { motion, type Variants } from 'framer-motion';
import { User, Target, Zap, Layout, Code2, ArrowUpRight } from 'lucide-react';
import ShapeBlur from './ui/ShapeBlur';

export default function About() {
  const cards = [
    {
      icon: <User className="text-[#C4521A]" size={36} />,
      title: 'Who I am',
      description: 'A passionate developer who loves transforming complex problems into elegant, intuitive, and scalable solutions. I focus on bridging the gap between design and sophisticated architecture.',
      gradient: 'from-[#C4521A]/40 to-transparent',
      borderColor: 'group-hover:border-[#C4521A]/60 hover:shadow-[0_10px_60px_-15px_rgba(196,82,26,0.3)]',
      className: 'md:col-span-2 md:row-span-1', // Wide
    },
    {
      icon: <Code2 className="text-blue-500" size={36} />,
      title: 'What I do',
      description: 'I build responsive front-end interfaces, robust backend APIs, and piece them together to create seamless full-stack applications. I ensure high performance, security, and scalability in every single deployment.',
      gradient: 'from-blue-500/40 to-transparent',
      borderColor: 'group-hover:border-blue-500/60 hover:shadow-[0_10px_60px_-15px_rgba(59,130,246,0.3)]',
      className: 'md:col-span-1 md:row-span-2 flex flex-col justify-between', // Tall
    },
    {
      icon: <Zap className="text-emerald-500" size={36} />,
      title: 'My approach',
      description: 'Clean code, modern architecture, and a constant drive to learn new technologies and workflows.',
      gradient: 'from-emerald-500/40 to-transparent',
      borderColor: 'group-hover:border-emerald-500/60 hover:shadow-[0_10px_60px_-15px_rgba(16,185,129,0.3)]',
      className: 'md:col-span-1 md:row-span-1', // Square
    },
    {
      icon: <Layout className="text-purple-500" size={36} />,
      title: 'Design Philosophy',
      description: 'Creating user interfaces that are not only functional but visually stunning with high attention to detail.',
      gradient: 'from-purple-500/40 to-transparent',
      borderColor: 'group-hover:border-purple-500/60 hover:shadow-[0_10px_60px_-15px_rgba(168,85,247,0.3)]',
      className: 'md:col-span-1 md:row-span-1', // Square
    },
    {
      icon: <Target className="text-pink-500" size={36} />,
      title: 'Goal Oriented',
      description: 'Every line of code and millimeter of design is entirely dedicated to achieving the core objectives of the product, maximizing both conversion rates and user accessibility.',
      gradient: 'from-pink-500/40 to-transparent',
      borderColor: 'group-hover:border-pink-500/60 hover:shadow-[0_10px_60px_-15px_rgba(236,72,153,0.3)]',
      className: 'md:col-span-3 md:row-span-1', // Extra Wide Bottom
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 80, 
      scale: 0.85, 
      rotateX: 25,
      filter: 'blur(20px)' 
    },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotateX: 0,
      filter: 'blur(0px)', 
      transition: { 
        type: 'spring', 
        mass: 1.2,
        damping: 22, 
        stiffness: 90,
      } 
    }
  };

  return (
    <section id="about" className="relative w-full min-h-screen bg-transparent py-24 sm:py-32 overflow-hidden flex items-center z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">

        {/* Superior Header Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter text-text-primary capitalize leading-[0.9]">
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
          <p className="text-lg md:text-xl text-text-secondary font-light max-w-md leading-relaxed border-l-2 border-white/10 pl-6 hidden md:block">
            I don't just write code. I build digital experiences that merge high-end aesthetics with flawless engineering.
          </p>
        </motion.div>

        {/* Professional Bento Box Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -8, 
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.98 }}
              style={{ transformPerspective: 1200, transformStyle: "preserve-3d" }}
              className={`group relative rounded-[2rem] overflow-hidden bg-white/[0.02] border border-white/10 p-8 md:p-10 flex flex-col gap-6 hover:bg-white/[0.04] transition-colors duration-500 shadow-xl backdrop-blur-sm z-10 hover:z-20 ${card.className} ${card.borderColor}`}
            >
              {/* ShapeBlur Effect as Border */}
              <div 
                className="absolute inset-0 z-20 pointer-events-none rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  padding: '2px', // Border width
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              >
                <div className="absolute inset-0 w-full h-full rounded-[2rem]">
                  <ShapeBlur
                    variation={4}
                    pixelRatioProp={2}
                    circleSize={0.4}
                    circleEdge={0.9}
                  />
                </div>
              </div>

              {/* Subtle Gradient Glow in background */}
              <div className={`absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl ${card.gradient} opacity-0 group-hover:opacity-[0.8] transition-all duration-1000 blur-[80px] pointer-events-none group-hover:scale-125`} />
              <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${card.gradient} opacity-[0.1] group-hover:opacity-[0.25] transition-all duration-1000 pointer-events-none`} />

              {/* Content Wrapper for internal shifting */}
              <div className="relative z-10 flex flex-col h-full transform transition-all duration-500 ease-out group-hover:translate-y-[-2px]">
                <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:scale-[1.15] group-hover:-rotate-[8deg] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-500 ease-out">
                  {card.icon}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-3 tracking-tight group-hover:text-white transition-colors duration-300">
                  {card.title}
                </h3>

                <p className="text-text-secondary leading-relaxed text-lg font-light flex-grow group-hover:text-white/90 transition-colors duration-300">
                  {card.description}
                </p>
              </div>

              {/* Sophisticated Arrow icon entering on hover */}
              <div className="absolute top-8 right-8 opacity-0 -translate-x-6 translate-y-6 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] text-white/50 group-hover:text-white">
                <ArrowUpRight size={32} strokeWidth={1.5} />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}