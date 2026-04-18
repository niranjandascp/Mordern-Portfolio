import { useRef } from 'react';
// Stick to one entry point for the library
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiPrisma, SiGit, SiGithub,
  SiVercel, SiDocker, SiLinux, SiHtml5, SiNestjs, SiRedis,
  SiBitbucket, SiPostman, SiFigma
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { IoLogoCss3 } from "react-icons/io";
import { VscVscode } from 'react-icons/vsc';

const techStack = [
  { name: 'Html5', icon: SiHtml5, color: '#E34F26' },
  { name: 'Css3', icon: IoLogoCss3, color: '#1572B6' },
  { name: 'ReactJS', icon: SiReact, color: '#61DAFB' },
  { name: 'NextJS', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'NodeJS', icon: SiNodedotjs, color: '#339933' },
  { name: 'ExpressJS', icon: SiExpress, color: '#ffffff' },
  { name: 'Nestjs', icon: SiNestjs, color: '#E0234E' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Prisma', icon: SiPrisma, color: '#ffffff' },
  { name: 'Redis', icon: SiRedis, color: '#FF4438' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
  { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
  { name: 'AWS', icon: FaAws, color: '#FF9900' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Bitbucket', icon: SiBitbucket, color: '#47A248' },
  { name: 'VS Code', icon: VscVscode, color: '#007ACC' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'Linux', icon: SiLinux, color: '#FCC624' },
];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Rotate from 0 to 180 degrees as user scrolls strictly past the section
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section id="skills" ref={containerRef} className="py-24 relative overflow-hidden transition-colors">

      {/* Background Rotating Fan Image Layer */}
      <div className="absolute inset-0 w-full opacity-20 dark:opacity-40 mix-blend-multiply dark:mix-blend-screen pointer-events-none flex items-center justify-center transition-opacity">
        <motion.img
          src="/abstract-fan.png"
          alt="Abstract 3D Shape"
          style={{ rotate }}
          className="w-[1050px] h-[1050px] object-contain origin-center"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center pt-24">

        {/* Header Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-text-secondary uppercase tracking-[0.2em] text-xs font-semibold mb-4">
            My Skillset
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary mb-2">
            The Magic <span className="font-serif italic bg-gradient-to-r from-orange-400 to-orange-400 bg-clip-text text-transparent pr-2">Behind</span>
          </h2>
        </motion.div>

        {/* Skills Floating Cloud Grid */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-4 max-w-4xl mx-auto">
          {techStack.map((skill, idx) => {
            const Icon = skill.icon;
            // Handle icons that are white in dark mode but should be dark in light mode
            const iconColor = skill.color === '#ffffff' ? 'var(--text-primary)' : skill.color;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 10) * 0.05 }}
                className="flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.03] backdrop-blur-md border border-border-main rounded-full hover:border-[#C4521A]/30 transition-all duration-300 shadow-lg cursor-default group"
              >
                <Icon
                  className="text-lg group-hover:scale-110 transition-transform duration-300"
                  style={{ color: iconColor }}
                />
                <span className="text-[14px] font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
