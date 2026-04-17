import { useRef, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { SiReact, SiTailwindcss, SiTypescript, SiVite, SiNodedotjs, SiMongodb, SiSocketdotio, SiExpress, SiOpenai, SiFirebase } from 'react-icons/si';

const projects = [
  {
    title: "Personal Portfolio",
    description: "My portfolio website, showcasing my professional background and more. Clean, responsive, and shows off my work while keeping things simple and professional.",
    tags: [
      { name: "React", icon: SiReact }, 
      { name: "TypeScript", icon: SiTypescript }, 
      { name: "Tailwind", icon: SiTailwindcss }, 
      { name: "Vite", icon: SiVite }
    ],
    github: "https://github.com/niranjandascp/react-ts-personal-portfolio",
    live: "https://www.niranjandas.in/",
    gradient: "from-violet-600 via-purple-600 to-indigo-600",
    glowColor: "rgba(139,92,246,0.3)",
    accentColor: "#8b5cf6",
    icon: "🚀",
    featured: true,
  },
  {
    title: "Real-time Task Manager",
    description: "Collaborative project management tool with real-time updates. Implemented WebSockets for instant state sync across multiple connected clients.",
    tags: [
      { name: "React", icon: SiReact }, 
      { name: "Node.js", icon: SiNodedotjs }, 
      { name: "Socket.io", icon: SiSocketdotio }, 
      { name: "MongoDB", icon: SiMongodb }
    ],
    github: "#",
    live: "#",
    gradient: "from-cyan-600 via-blue-600 to-teal-600",
    glowColor: "rgba(6,182,212,0.3)",
    accentColor: "#06b6d4",
    icon: "⚡",
    featured: false,
  },
  {
    title: "AI Image Generator",
    description: "SaaS application leveraging OpenAI's DALL-E API. Includes user authentication, image gallery, and cloud storage integration.",
    tags: [
      { name: "React", icon: SiReact }, 
      { name: "OpenAI", icon: SiOpenai }, 
      { name: "Firebase", icon: SiFirebase }, 
      { name: "Node.js", icon: SiNodedotjs }
    ],
    github: "#",
    live: "#",
    gradient: "from-pink-600 via-rose-600 to-orange-600",
    glowColor: "rgba(244,63,94,0.3)",
    accentColor: "#f43f5e",
    icon: "🤖",
    featured: false,
  },
];

interface Project {
  title: string;
  description: string;
  tags: { name: string; icon: any }[];
  github: string;
  live: string;
  gradient: string;
  glowColor: string;
  accentColor: string;
  icon: string;
  featured: boolean;
}

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const tiltX = ((y - cy) / cy) * -10;
    const tiltY = ((x - cx) / cx) * 10;
    setTilt({ x: tiltX, y: tiltY });
    setSpotlight({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight(prev => ({ ...prev, opacity: 0 }));
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px' }}
      className="group"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d',
          boxShadow: isHovered ? `0 25px 60px ${project.glowColor}, 0 0 80px ${project.glowColor}25` : '0 10px 40px rgba(0,0,0,0.1)',
        }}
        className="relative rounded-3xl overflow-hidden border border-border-main bg-bg-secondary h-full cursor-pointer shadow-sm transition-colors duration-300"
      >
        {/* Animated Gradient Border */}
        <div
          className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
          style={{
            background: `linear-gradient(135deg, ${project.accentColor}40, transparent, ${project.accentColor}20)`,
            padding: '1px',
          }}
        />

        {/* Spotlight Effect */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 200px at ${spotlight.x}% ${spotlight.y}%, ${project.glowColor}, transparent)`,
            opacity: spotlight.opacity * 0.4,
          }}
        />

        {/* Top Gradient Banner */}
        <div className={`relative w-full h-44 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
          {/* Mesh texture overlay */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          {/* Floating icon */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: `translateZ(30px)` }}
          >
            <span className="text-7xl opacity-80 select-none drop-shadow-2xl"
              style={{
                transform: isHovered ? 'scale(1.15) translateY(-4px)' : 'scale(1)',
                transition: 'transform 0.4s ease',
              }}
            >
              {project.icon}
            </span>
          </div>
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 left-4">
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white border border-white/30">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Featured
              </span>
            </div>
          )}
          {/* Links */}
          <div className="absolute top-4 right-4 flex gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all hover:scale-110"
            >
              <FaGithub size={15} />
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all hover:scale-110"
            >
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col gap-4" style={{ transform: 'translateZ(10px)' }}>
          {/* Title row */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[18px] font-bold text-text-primary leading-snug tracking-tight group-hover:opacity-80 transition-all">
              {project.title}
            </h3>
            <ArrowUpRight
              size={18}
              className="shrink-0 mt-0.5 text-text-secondary group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
            />
          </div>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Divider */}
          <div
            className="h-px w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(to right, transparent, ${project.accentColor}60, transparent)` }}
          />

          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span
                key={tag.name}
                className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all duration-300"
                style={{
                  color: project.accentColor,
                  borderColor: `${project.accentColor}30`,
                  background: `${project.accentColor}08`,
                }}
              >
                <tag.icon size={12} />
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative bg-bg-primary overflow-hidden transition-colors">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="text-text-secondary uppercase tracking-[0.25em] text-xs font-semibold mb-4">
            What I've Built
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary mb-5">
            Featured{' '}
            <span className="font-serif italic bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm leading-relaxed">
            Crafted with care, shipped with pride — a selection of my most impactful work.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} idx={idx} />
          ))}
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
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-border-main bg-bg-secondary hover:bg-bg-secondary/80 text-text-primary text-sm font-medium transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] group"
          >
            <FaGithub size={16} />
            View All Projects on GitHub
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
