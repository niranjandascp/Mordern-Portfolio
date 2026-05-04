import { useRef, useState, memo, type MouseEvent, useEffect } from 'react';
import type React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { FaDocker, FaGithub } from 'react-icons/fa';
import { SiReact, SiTailwindcss, SiTypescript, SiVite, SiMongodb, SiExpress } from 'react-icons/si';
import ScrollHeading from '@/components/ui/ScrollHeading';

const projects = [
  {
    id: '01',
    title: 'Personal Portfolio',
    category: 'FRONTEND REACT',
    description: 'A high-performance cinematic portfolio built with React Three Fiber and GSAP.',
    tags: [
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
    ],
    github: 'https://github.com/niranjandascp/react-ts-personal-portfolio',
    live: 'https://www.niranjandas.in/',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    color: '#ff4d4d',
  },
  {
    id: '02',
    title: 'Rest API Docker',
    category: 'BACKEND ARCH',
    description: 'Production-grade REST API with Node.js, Express, and Docker containerization.',
    tags: [
      { name: 'Express', icon: SiExpress },
      { name: 'Docker', icon: FaDocker },
    ],
    github: 'https://github.com/niranjandascp/rest-api-ts-docker',
    live: '#',
    image: 'https://images.unsplash.com/photo-1623141623999-03ef73ade49c?q=80&w=1000&auto=format&fit=crop',
    color: '#ff4d4d',
  },
  {
    id: '03',
    title: 'Mini Torque',
    category: 'E-COMMERCE',
    description: 'Full-stack e-commerce solution with real-time state management.',
    tags: [
      { name: 'Next.js', icon: SiReact },
      { name: 'Tailwind', icon: SiTailwindcss },
    ],
    github: 'https://github.com/niranjandascp/Mini-Torque-Ecommerce',
    live: 'https://mini-torque.onrender.com/',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    color: '#ff4d4d',
  },
  {
    id: '04',
    title: 'Personal AI Assistant',
    category: 'AI ASSISTANT',
    description: 'A personal AI assistant that can help you with your daily tasks with ease.',
    tags: [
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
    ],
    github: 'https://github.com/niranjandascp/Moltbot',
    live: '#',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000&auto=format&fit=crop',
    color: '#ff4d4d',
  },
  {
    id: '05',
    title: 'Liquid-Space-portfolio',
    category: 'PERSONAL MODERN PORTFOLIO',
    description: '',
    tags: [
      { name: 'Next.js', icon: SiReact },
      { name: 'MongoDB', icon: SiMongodb },
    ],
    github: '#',
    live: '#',
    image: 'https://images.unsplash.com/photo-1544383335-c533a440c298?q=80&w=1000&auto=format&fit=crop',
    color: '#ff4d4d',
  },
  {
    id: '06',
    title: 'React Movie app',
    category: 'REACT MOVIE APP',
    description: 'A movie app built with React and Vite.',
    tags: [
      { name: 'Vite', icon: SiVite },
      { name: 'Tailwind', icon: SiTailwindcss },
    ],
    github: '#',
    live: '#',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop',
    color: '#ff4d4d',
  },
];

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: { name: string; icon: React.ElementType }[];
  github: string;
  live: string;
  image: string;
  color: string;
}

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const isMobile = windowWidth < 640;
  const narrowWidth = isMobile ? 80 : 130;
  const expandedWidth = isMobile ? 280 : 420;

  // Calculate 3D tilt values based on mouse position
  const tiltX = isHovered ? (mousePos.y - 50) * 0.15 : 0;
  const tiltY = isHovered ? (mousePos.x - 50) * -0.15 : 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{
        opacity: 0,
        x: -150,
        y: 20,
        rotateY: -45,
        rotateX: -5,
        scale: 0.9,
        filter: 'blur(15px)'
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        filter: 'blur(0px)'
      }}
      viewport={{ once: true, margin: "-50px" }}
      animate={{
        width: isHovered ? expandedWidth : narrowWidth,
        rotateX: tiltX,
        rotateY: tiltY,
        z: isHovered ? 50 : 0
      }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1,
        delay: idx * 0.1,
        filter: { duration: 0.8, ease: "easeOut" }
      }}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d'
      }}
      className="relative flex-none h-[450px] sm:h-[500px] group cursor-pointer snap-center overflow-visible"
    >

      {/* Vertical Side Text */}
      <div className="absolute top-1/2 -right-4 -translate-y-1/2 rotate-90 origin-center z-20 hidden sm:block">
        <span className="text-[10px] font-mono text-[#C4521A] tracking-[0.4em] uppercase whitespace-nowrap opacity-40 group-hover:opacity-100 transition-opacity">
          {project.category} •
        </span>
      </div>

      {/* Main Container */}
      <div className="relative w-full h-full overflow-hidden border border-white/10 transition-all duration-700 group-hover:border-[#C4521A]/30 bg-[#0c0c0e] rounded-[2.5rem]">

        {/* Background Image with Desaturation Effect */}
        <div className="absolute inset-0 z-0 rounded-[2.5rem]">
          <motion.img
            src={project.image}
            alt={project.title}
            animate={{
              scale: isHovered ? 1.1 : 1.05,
              filter: isHovered ? 'grayscale(0) brightness(0.8)' : 'grayscale(1) brightness(0.4)'
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover origin-center rounded-[2.5rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent opacity-80 rounded-[2.5rem]" />
        </div>

        {/* HUD Scanlines/Grain Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] mix-blend-overlay rounded-[2.5rem]"
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">

          {/* Metadata Row */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0.4,
              z: isHovered ? 40 : 0
            }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-[#C4521A]" />
            <span className="text-[10px] font-mono text-[#C4521A] tracking-[0.3em] uppercase">
              PROJECTS #{project.id}
            </span>
          </motion.div>

          {/* Title - Serif Typography */}
          <motion.h3
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
              z: isHovered ? 80 : 0
            }}
            className="text-2xl sm:text-3xl font-serif text-white mb-4 tracking-tight leading-none group-hover:translate-x-2 transition-transform duration-500 whitespace-nowrap"
          >
            {project.title}
          </motion.h3>

          {/* Revealable Description */}
          <motion.div
            animate={{
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20
            }}
            className="overflow-hidden"
          >
            <p className="text-[13px] text-white/60 leading-relaxed font-light mb-8 max-w-[280px]">
              {project.description}
            </p>

            <div className="flex gap-6 mb-8">
              <a
                href={project.github}
                target="_blank"
                className="flex items-center gap-2 text-white/40 hover:text-[#C4521A] transition-all hover:scale-110"
                title="GitHub Repository"
              >
                <FaGithub size={20} />
                <span className="text-[10px] font-mono tracking-[0.1em] uppercase">GitHub</span>
              </a>
              <a
                href={project.live}
                target="_blank"
                className="flex items-center gap-2 text-white/40 hover:text-[#C4521A] transition-all hover:scale-110"
                title="Live Demo"
              >
                <ExternalLink size={18} />
                <span className="text-[10px] font-mono tracking-[0.1em] uppercase">Live Demo</span>
              </a>
            </div>
          </motion.div>

          {/* Bottom HUD Line */}
          <div className="relative w-full h-px bg-white/10 overflow-hidden">
            <motion.div
              animate={{ x: isHovered ? '100%' : '-100%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#C4521A] to-transparent"
            />
          </div>
        </div>

        {/* Interactive Spotlight Glow */}
        <div
          className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle 300px at ${mousePos.x}% ${mousePos.y}%, rgba(196, 82, 26, 0.08), transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

const ProjectCardMemo = memo(ProjectCard);

export default memo(function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden transition-colors">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C4521A]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <ScrollHeading className="text-center mb-20">
          <p className="text-text-secondary uppercase tracking-[0.25em] text-xs font-semibold mb-4">
            What I've Built
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary mb-5">
            Featured{' '}
            <span className="font-serif italic bg-gradient-to-r from-orange-400 via-[#C4521A] to-amber-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm leading-relaxed">
            Crafted with care, shipped with pride — a selection of my most impactful work.
          </p>
        </ScrollHeading>

        {/* Horizontal Scroll Container */}
        <div className="relative group/slider">
          <div
            className="flex gap-4 sm:gap-6 md:justify-center overflow-x-auto pb-12 pt-4 scrollbar-hide snap-x snap-mandatory px-4"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {projects.map((project, idx) => (
              <ProjectCardMemo key={project.id} project={project} idx={idx} />
            ))}

            {/* Significant Spacer for Scroll Alignment */}
            <div className="flex-none w-20 sm:w-40 h-full pointer-events-none md:hidden" />
          </div>

        </div>
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com/niranjandascp"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-border-main bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] text-text-primary text-sm font-medium transition-all duration-300 hover:border-[#C4521A]/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] group"
          >
            <FaGithub size={16} />
            View All Projects on GitHub
            <ArrowUpRight
              size={15}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
});
